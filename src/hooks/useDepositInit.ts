import axios, { AxiosError } from "axios";
import apiClient from "../constant/apiclient";
import { useMutation } from "@tanstack/react-query";
import { handleApiHookResponse } from "../common/utils/queryToast";
import { encryptData } from "../utils/crypto";

export interface InitPaymentResponse {
    paymentMode: string;
    amount: number;
    data: {
        payment_session_id?: string;
        redirectUrl?: string;
        encData?: string;
        clientCode?: string;
        spURL?: string;
    };
}
export interface DepositProcessResponse {
    paymentMode: 'razorpay' | 'cashfree' | string;
    data: {
        key: string;
        order_id: string;
        amount: number;
        currency?: string;
        customer: {
            name?: string
            email?: string
            contact?: string
        }
    };
}
export interface RazorpayCustomer {
    name?: string;
    email?: string;
    contact?: string;
}

export interface RazorpayCheckoutParams {
    key: string;
    order_id: string;
    amount: number;
    currency?: string;
    customer: RazorpayCustomer;
}
export interface DepositProcessPayload {
    order_id: string;
    status: string;
    payment_id?: string;
    signature?: string;
}
const initPayment = async (
    payment_session_id: string
): Promise<InitPaymentResponse> => {
    const response = await axios.post(
        'https://api.unibcomp.co.in/api/v1/user/payment/pay',
        { payment_session_id }
    );
    return response.data;
};
const paymentProcess = async (
    payment_session_id: string
): Promise<DepositProcessResponse> => {
    const response = await apiClient.post('/check/deposit', {
        payment_session_id,
    });
    return response.data;
};
const depositStatusUpdate = async (order_id: string): Promise<any> => {
    const response = await axios.put(
        `https://api.unibcomp.in/api/v1/user/deposit/update/${order_id}`
    );
    return response.data;
};
const depositStatusUpdate2 = async (data: DepositProcessPayload): Promise<any> => {
    const response = await apiClient.post('/payment/update', data);
    return response.data;
};
export const useInitPayment = () => {
    const depositRequestMutation = useMutation({
        mutationFn: initPayment,
    });
    const depositProcessMutation = useMutation<DepositProcessResponse, AxiosError, string>({
        mutationFn: paymentProcess,
    });
    const depositStatusUpdateMutation = useMutation({
        mutationFn: depositStatusUpdate,
    });
    const depositUpdate2 = useMutation<DepositProcessResponse, AxiosError, DepositProcessPayload>({
        mutationFn: depositStatusUpdate2,
    });
    return {
        depositRequestMutation,
        depositProcessMutation,
        depositStatusUpdateMutation,
        depositUpdate2,
    };
};
declare global {
    interface Window {
        Razorpay: any;
    }
}

export const razorpayIntegration = () => {
    const { depositUpdate2 } = useInitPayment();
    const openRazorpayCheckout = ({
        key,
        order_id,
        amount,
        currency,
        customer,
    }: RazorpayCheckoutParams) => {
        if (!window.Razorpay) {
            alert('Razorpay SDK not loaded properly.');
            return;
        }
        const options = {
            key,
            order_id,
            amount: amount * 100,
            currency: currency || 'INR',
            name: 'UnibComp',
            description: 'Order Payment',
            prefill: {
                name: customer?.name || '',
                email: customer?.email || '',
                contact: customer?.contact || '',
            },
            theme: { color: '#3399cc' },
            handler: function (response: any) {
                depositUpdate2.mutate({
                    order_id,
                    status: 'SUCCESS',
                    payment_id: response.razorpay_payment_id,
                    signature: response.razorpay_signature,
                });
                const success_payment_id = encryptData({
                    amount: amount,
                    orderId: order_id,
                    status: "success",
                })
                window.location.replace(`/payment-status/${encodeURIComponent(success_payment_id)}`);
            },

            modal: {
                ondismiss: function () {
                    depositUpdate2.mutate({
                        order_id,
                        status: 'FAILED',
                    }, handleApiHookResponse(() => window.location.replace('/')));
                    const failed_payment_id = encryptData({
                        amount: amount,
                        orderId: order_id,
                        status: "failed",
                    })
                    window.location.replace(`/payment-status/${encodeURIComponent(failed_payment_id)}`);
                },
            },
        };
        const razor = new window.Razorpay(options);
        razor.open();
    };
    return { openRazorpayCheckout };
};
