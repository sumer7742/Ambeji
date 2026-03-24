import React from "react";
import { Link, useSearchParams } from "react-router-dom";
import LoadingOverlay from "./Loading";
import { motion } from "framer-motion";
import { useOrderStatus } from "../hooks/useOrder";

const OrderStatusUI: React.FC = () => {
  const [searchParams] = useSearchParams();
  const order_id = searchParams.get("order_id") || "";

  const {
    data: order,
    isError,
    isLoading,
    error,
  } = useOrderStatus({ orderId: order_id });

  const isOnlinePaymentPending =
    order?.result?.paymentMethod !== "cod" &&
    order?.result?.paymentStatus === "Pending";

  // ✅ HARD STOP: show loader ONLY when really needed
  if (isLoading || isOnlinePaymentPending) {
    return <LoadingOverlay />;
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-screen text-red-600">
        {error?.message || "Something went wrong"}
      </div>
    );
  }

  if (!order?.result) {
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-500">
        No order data found
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-tr from-purple-100 via-pink-50 to-pink-100 p-6">
      <motion.div
        className="bg-white max-w-md w-full rounded-3xl shadow-2xl p-10 border border-gray-200"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="border-b-4 border-pink-400 pb-4 mb-8">
          <h1 className="text-4xl font-extrabold text-center text-pink-600 tracking-wide">
            Order Status
          </h1>
        </div>

        <p className="text-center text-gray-700 font-semibold text-lg break-words mb-4">
          <strong>Transaction ID:</strong>{" "}
          {order.result.transaction_id}
        </p>

        <p className="text-green-800 font-semibold text-xl mb-2">
          Order Status:{" "}
          <span className="font-normal">
            {order.result.orderStatus}
          </span>
        </p>

        <p className="text-purple-700 font-semibold text-xl mb-2">
          Payment Status:{" "}
          <span className="font-normal">
            {order.result.paymentStatus}
          </span>
        </p>

        <p className="text-lg font-semibold mb-6">
          Amount: ₹{order.result.totalAmount}
        </p>

        <div className="border-t border-pink-300 pt-6 flex justify-center">
          <Link
            to="/orders"
            className="inline-flex items-center gap-2 bg-pink-600 hover:bg-pink-700 text-white font-semibold px-6 py-3 rounded-lg transition"
          >
            See Orders
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default OrderStatusUI;
