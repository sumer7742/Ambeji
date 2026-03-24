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

  const { transaction_id, orderStatus, paymentStatus, totalAmount } = order.result;

  // status color logic
  const orderColor =
    orderStatus === "Delivered"
      ? "text-green-600"
      : orderStatus === "Pending"
      ? "text-yellow-600"
      : "text-red-600";

  const paymentColor =
    paymentStatus === "Paid"
      ? "text-green-600"
      : paymentStatus === "Pending"
      ? "text-yellow-600"
      : "text-red-600";

  return (
    <div className="flex items-center justify-center min-h-screen 
                    bg-gradient-to-br from-[#fff5f5] via-[#ffe5e5] to-[#ffd6d6] p-6">

      <motion.div
        className="bg-white max-w-md w-full rounded-3xl shadow-xl p-8 border border-red-100"
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.4 }}
      >

        {/* Header */}
        <div className="border-b-4 border-[#dd3333] pb-4 mb-6 text-center">
          <h1 className="text-3xl font-bold text-[#dd3333] tracking-wide">
            Order Status
          </h1>
        </div>

        {/* Transaction */}
        <p className="text-center text-gray-700 text-sm break-all mb-4">
          <span className="font-semibold">Transaction ID:</span>{" "}
          <span className="font-mono text-[#dd3333]">
            {transaction_id}
          </span>
        </p>

        {/* Order Status */}
        <p className={`text-lg font-semibold mb-2 ${orderColor}`}>
          Order Status:{" "}
          <span className="font-normal text-gray-700">
            {orderStatus}
          </span>
        </p>

        {/* Payment Status */}
        <p className={`text-lg font-semibold mb-2 ${paymentColor}`}>
          Payment Status:{" "}
          <span className="font-normal text-gray-700">
            {paymentStatus}
          </span>
        </p>

        {/* Amount */}
        <p className="text-xl font-bold text-[#dd3333] mb-6">
          ₹{totalAmount}
        </p>

        {/* Button */}
        <div className="border-t border-red-100 pt-6 flex justify-center">
          <Link
            to="/orders"
            className="bg-[#dd3333] hover:bg-[#b82a2a] text-white 
                       font-medium px-6 py-3 rounded-xl shadow-md
                       hover:shadow-lg transition-all duration-200"
          >
            View Orders
          </Link>
        </div>

      </motion.div>
    </div>
  );
};

export default OrderStatusUI;