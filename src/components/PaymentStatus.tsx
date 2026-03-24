import { CheckCircle, Clock, XCircle } from "lucide-react";
import React from "react";
import { decryptData } from "../utils/crypto";
import { useParams } from "react-router-dom";
interface PaymentStatusProps {
    status: "success" | "pending" | "failed";
    orderId?: string;
    amount?: number;
}
const PaymentStatus: React.FC<PaymentStatusProps> = () => {
    const { paymentid } = useParams();
    if (!paymentid) {
        return null
    }
    const { status, orderId, amount } = decryptData(paymentid) as PaymentStatusProps
    console.log(status,orderId,amount)
    const renderStatus = () => {
        switch (status) {
            case "success":
                return (
                    <div className="text-center p-5 animate-fadeIn">
                        <CheckCircle className="mx-auto w-20 h-20" />
                        <h2 className="text-3xl font-extrabold mt-4">Payment Successful</h2>
                        <p className="text-lg mt-2 text-gray-600">Your payment has been received.</p>
                        <div className="mt-6 bg-green-50 p-4 rounded-xl">
                            <p>Order ID: <span className="font-semibold">{orderId}</span></p>
                            <p>Amount: <span className="font-semibold">₹{amount}</span></p>
                        </div>
                    </div>
                );
            case "pending":
                return (
                    <div className="text-center p-5 animate-fadeIn">
                        <Clock className="mx-auto w-20 h-20" />
                        <h2 className="text-3xl font-extrabold mt-4">Payment Pending</h2>
                        <p className="text-lg mt-2 text-gray-600">We are verifying your payment...</p>
                        <div className="mt-6 bg-yellow-50 p-4 rounded-xl">
                            <p>Order ID: <span className="font-semibold">{orderId}</span></p>
                            <p>Amount: <span className="font-semibold">₹{amount}</span></p>
                        </div>
                    </div>
                );
            case "failed":
                return (
                    <div className="text-center p-5 animate-fadeIn">
                        <XCircle className="mx-auto w-20 h-20 text-red-500" />
                        <h2 className="text-3xl font-extrabold mt-4 text-red-500">Payment Failed</h2>
                        <p className="text-lg mt-2 text-gray-600">Please try again.</p>
                        <div className="mt-6 bg-red-50 p-4 rounded-xl">
                            <p>Order ID: <span className="font-semibold">{orderId}</span></p>
                            <p>Amount: <span className="font-semibold">₹{amount}</span></p>
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen flex justify-center items-center bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100">
            <div className="w-full max-w-lg bg-white shadow-lg rounded-2xl p-6">
                {renderStatus()}
            </div>
        </div>
    );
};


export default PaymentStatus;
