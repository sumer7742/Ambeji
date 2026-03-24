// OrderDetails.tsx
import React from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import OrderStepper from "./orderStapper";
import type { OrderItem } from "../common/types/types";
import { useOrderStatus } from "../hooks/useOrder";
import InvoicePDFWrapper from "../screens/InvoiceGenerate";

const OrderDetails: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const orderId = searchParams.get("order_id") ?? "";
  const itemId = searchParams.get("item_id") ?? "";

  const { data, isLoading, isError, error } = useOrderStatus({
    orderId,
    item_id: itemId,
    orderStatus: "",
  });

  if (!orderId) {
    return (
      <div className="p-6">
        <h2 className="text-lg font-semibold">Missing order id</h2>
        <p className="text-sm text-gray-600">
          This page needs order_id in the query string.
        </p>
        <button
          onClick={() => navigate("/")}
          className="mt-3 px-4 py-2 bg-[#dd3333] text-white rounded-lg hover:bg-[#b82a2a]"
        >
          Back to orders
        </button>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-40 text-[#dd3333]">
        Loading order details...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-4 bg-red-100 text-red-700 rounded-lg">
        Failed to load order: {error?.message ?? "Unknown error"}
      </div>
    );
  }

  const result = data?.result;
  const {
    _id,
    orderStatus,
    paymentStatus,
    paymentMethod,
    transaction_id,
    totalAmount,
    shippingAddress,
    items = [],
    activity,
  } = result || {};

  return (
    <div className="max-w-6xl mx-auto bg-[#fff5f5] p-6 space-y-6">

      {/* Refund */}
      {paymentStatus === "Refunded" && (
        <div className="bg-white border border-red-100 shadow rounded-xl p-4">
          <h2 className="text-lg font-semibold text-[#dd3333]">
            Total refund - ₹{totalAmount}
          </h2>
          <p className="text-sm text-gray-600">
            Refund was added to your {paymentMethod} account.
          </p>
        </div>
      )}

      <div className="grid md:grid-cols-3 gap-6">

        {/* LEFT */}
        <div className="md:col-span-2 space-y-6">

          {/* Order Info */}
          <div className="bg-white border border-red-100 shadow rounded-xl p-5 space-y-3 text-sm">
            <h2 className="text-xl font-semibold text-gray-800">Order Details</h2>

            <p><span className="font-medium">Order ID:</span> <span className="font-mono">{_id}</span></p>

            <p>
              <span className="font-medium">Status:</span>{" "}
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                orderStatus === "Cancelled"
                  ? "bg-red-100 text-red-700"
                  : "bg-green-100 text-green-700"
              }`}>
                {orderStatus}
              </span>
            </p>

            <p><span className="font-medium">Payment:</span> {paymentStatus} ({paymentMethod})</p>
            <p><span className="font-medium">Transaction:</span> <span className="font-mono">{transaction_id}</span></p>
            <p><span className="font-medium">Payment ID:</span> {result?.paymentRef || "—"}</p>
            <p><span className="font-medium">UTR:</span> {result?.payer_details?.utr || "—"}</p>

            <p className="text-lg font-semibold text-[#dd3333]">
              ₹{totalAmount}
            </p>
          </div>

          {/* Items */}
          <div className="bg-white border border-red-100 shadow rounded-xl p-5 space-y-4">
            <h3 className="text-lg font-semibold">Items</h3>

            {items.length ? (
              items.map((it: OrderItem) => (
                <div
                  key={it._id}
                  className="flex gap-4 border rounded-lg p-3 hover:shadow-md transition"
                >
                  <img
                    src={it.image || "/placeholder.png"}
                    alt={it.name}
                    className="w-20 h-20 object-cover rounded"
                  />

                  <div className="flex-1 space-y-1 text-sm">
                    <p className="font-medium">{it.name}</p>

                    <p className="text-gray-600">
                      {it.color ? `${it.color} - ` : ""}
                      {it.size?.size} {it.size?.sizeName}
                    </p>

                    <p>Qty: {it.quantity ?? 1}</p>
                    <p>Price: ₹{it.price}</p>

                    {it.discount && (
                      <p className="text-red-600">-₹{it.discount}</p>
                    )}

                    <p className="font-medium">
                      Subtotal: ₹{Number(it.total ?? 0).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p>No items found</p>
            )}

            <div className="pt-4 border-t">
              <OrderStepper
                currentStatus={orderStatus}
                size="normal"
                activity={activity}
              />
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="space-y-6">

          {/* Address */}
          {shippingAddress && (
            <div className="bg-white border border-red-100 shadow rounded-xl p-4 text-sm">
              <h3 className="text-lg font-semibold mb-2">Delivery Details</h3>
              <p className="font-medium">{shippingAddress.name}</p>
              <p>{shippingAddress.addressLine1}, {shippingAddress.addressLine2}</p>
              <p>{shippingAddress.city}, {shippingAddress.state} - {shippingAddress.postalCode}</p>
              <p>{shippingAddress.country}</p>
              <p className="mt-2">📞 {shippingAddress.phone}</p>
            </div>
          )}

          {/* Price */}
          <div className="bg-white border border-red-100 shadow rounded-xl p-4 space-y-2">
            <h3 className="text-lg font-semibold">Price Details</h3>

            <div className="flex justify-between">
              <span>Price</span>
              <span>
                ₹{items.reduce((s, it) => s + Number(it.price ?? 0), 0).toFixed(2)}
              </span>
            </div>

            {items.some(it => it.discount) && (
              <div className="flex justify-between text-green-600">
                <span>Discount</span>
                <span>
                  -₹{items.reduce((s, it) => s + Number(it.discount ?? 0), 0).toFixed(2)}
                </span>
              </div>
            )}

            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>
                ₹{items.reduce((s, it) => s + Number(it.total ?? 0), 0).toFixed(2)}
              </span>
            </div>

            <hr />

            <div className="flex justify-between font-semibold text-[#dd3333]">
              <span>Total</span>
              <span>₹{totalAmount}</span>
            </div>
          </div>

          {/* Invoice */}
          {result && paymentStatus === "Pending" && (
            <div className="flex justify-center">
              <InvoicePDFWrapper order={result} itemId={itemId} />
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default OrderDetails;