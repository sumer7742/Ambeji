import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useInitPayment } from '../hooks/useDepositInit';
import DepositInitShimmer from './shimmer/DepositInitShimmer';
interface DepositResponse {
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

const DepositInit: React.FC = () => {
    const [message, setMessage] = useState('⏳ Navigating to payment gateway...');
    const [status, setStatus] = useState<'loading' | 'error' | 'success'>('loading');

    const [searchParams] = useSearchParams();
    const paymentSessionId = searchParams.get('payment_session_id');

    const { depositRequestMutation } = useInitPayment();
    const [data, setData] = useState<DepositResponse | null>(null);

    useEffect(() => {
        if (!paymentSessionId) {
            setStatus('error');
            setMessage('❌ Payment link is invalid, expired, or already used.');
            return;
        }
        depositRequestMutation.mutate(paymentSessionId, {
            onSuccess: async (res: DepositResponse) => {
                const { paymentMode, data } = res;
                setData(res);
                // if (paymentMode === 'CASHFREE') {
                //   await cashFreePageRedirection(data?.payment_session_id ?? '');
                // } else
                if (paymentMode === 'PHONEPAY' || paymentMode === 'PAYU' || paymentMode === 'GATEPAY'||paymentMode==="RAZORPAY") {
                    if (data.redirectUrl) {
                        window.open(data.redirectUrl, '_self');
                    }
                } else {
                    setStatus('error');
                    setMessage('❌ Payment link is invalid, expired, or already used.');
                }
            },
            onError: () => {
                setStatus('error');
                setMessage('❌ Payment link is invalid, expired, or already used.');
            }
        });
    }, [paymentSessionId]);
    // const cashFreePageRedirection = async (sessionId: string) => {
    //     try {
    //         const cashfree = (await load({ mode: 'production' })) as CashfreeCheckout;
    //         cashfree.checkout({
    //             paymentSessionId: sessionId,
    //             redirectTarget: '_self'
    //         });
    //     } catch (error) {
    //         console.error('Cashfree redirect error:', error);
    //         setMessage('❌ Failed to load payment gateway. Please try again later.');
    //         setStatus('error');
    //     }
    // };
    return (
        <div className="deposit-container">
            <div className="deposit-card">
                {status === 'loading' && !data && <DepositInitShimmer />}
                <p className={`message ${status}`}>
                    {status === 'loading' &&<DepositInitShimmer />}
                    {message}
                </p>
                {status === 'error' && (
                    <button className="retry-btn" onClick={() => window.history.back()}>
                        🔁 Try Again
                    </button>
                )}
                {data?.amount && (
                    <div className="text-gray-600">
                        <p className="text-sm">Please wait while we process your payment of ₹{data.amount}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DepositInit;
