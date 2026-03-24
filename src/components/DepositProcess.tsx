

import  { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { razorpayIntegration, useInitPayment } from "../hooks/useDepositInit";
import DepositInitShimmer from "./shimmer/DepositInitShimmer";

// Polished UI with premium payment feel
const DepositPage2 = () => {
  const [message, setMessage] = useState("⏳ Navigating to payment gateway...");
  const [status, setStatus] = useState("loading");
  const [searchParams] = useSearchParams();
  const paymentSessionId = searchParams.get("payment_session_id");
  const { depositProcessMutation } = useInitPayment();
  const { openRazorpayCheckout } = razorpayIntegration();
  const [amount, setAmount] = useState(0);

  useEffect(() => {
    if (!paymentSessionId) {
      setStatus("error");
      setMessage("❌ Payment link is invalid, expired, or already used.");
      return;
    }

    depositProcessMutation.mutate(paymentSessionId, {
      onSuccess: (res) => {
        if (!res || !res.data) {
          setStatus("error");
          setMessage("❌ Invalid response from server.");
          return;
        }

        const { paymentMode, data } = res;
        const { key, order_id, amount, customer } = data;
        if (paymentMode === "razorpay") {
          if (key && order_id && amount) {
            setAmount(amount);
            openRazorpayCheckout({ key, order_id, amount, customer, currency: "INR" });
            setStatus("success");
            setMessage("🚀 Redirecting to Razorpay...");
          } else {
            setStatus("error");
            setMessage("❌ Missing Razorpay configuration.");
          }
        } else {
          setStatus("error");
          setMessage(`❌ Payment mode ${paymentMode} not supported yet.`);
        }
      },
      onError: (err) => {
        console.error("Deposit API Error:", err);
        setStatus("error");
        setMessage("❌ Payment link is invalid, expired, or already used.");
      },
    });
  }, [paymentSessionId]);

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black px-4 py-6">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-xl p-6 rounded-2xl shadow-2xl border border-white/20 text-center animate-fadeIn">
        {/* Header */}
        <div className="mb-4">
          <h2 className="text-xl font-semibold text-white tracking-wide">Secure Payment Processing</h2>
          <p className="text-gray-300 text-sm">Powered by Razorpay</p>
        </div>

        {status === "loading" && <DepositInitShimmer />}

        {/* Message Box */}
        <div
          className={`p-4 rounded-xl mt-4 text-sm font-medium transition-all duration-300
            ${status === "loading" ? "bg-blue-600/20 text-blue-300 border border-blue-500/30" : ""}
            ${status === "success" ? "bg-green-600/20 text-green-300 border border-green-500/30" : ""}
            ${status === "error" ? "bg-red-600/20 text-red-300 border border-red-500/30" : ""}
          `}
        >
          {message}
        </div>

        {/* Amount Display */}
        {status === "success" && amount > 0 && (
          <div className="mt-6 text-gray-200">
            <p className="text-sm mb-1">Processing Payment</p>
            <p className="text-3xl font-bold text-green-400">₹{amount}</p>
            <p className="text-xs text-gray-400 mt-1">Please wait while we redirect you...</p>
          </div>
        )}

        {/* Error Button */}
        {status === "error" && (
          <button
            className="mt-5 w-full py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl transition-all shadow-lg"
            onClick={() => window.history.back()}
          >
            🔁 Try Again
          </button>
        )}
      </div>
    </div>
  );
};

export default DepositPage2;