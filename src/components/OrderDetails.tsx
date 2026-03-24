import React from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import OrderStepper from "./orderStapper";
import type { OrderItem } from "../common/types/types";
import { useOrderStatus } from "../hooks/useOrder"; import InvoicePDFWrapper from "../screens/InvoiceGenerate";
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
          className="mt-3 px-3 py-2 bg-blue-600 text-white rounded"
        >
          Back to orders
        </button>
      </div>
    );
  }
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-40 text-gray-500">
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
    activity
  } = result || {};

  return (
    <>
      <div className="max-w-5xl mx-auto bg-gray-50 p-6 space-y-6">
        {paymentStatus === "Refunded" && (
          <div className="bg-white shadow-md rounded-xl p-4 border">
            <h2 className="text-lg font-semibold">Total refund - ₹{totalAmount}</h2>
            <p className="text-sm text-gray-600">
              Refund was added to your {paymentMethod} account.{" "}
            </p>
          </div>
        )}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            <div className="bg-white shadow-md rounded-xl p-4 border space-y-4 text-sm">
              <h2 className="text-xl font-semibold">Order Details</h2>
              <p className="flex flex-wrap items-center gap-1">
                <span className="font-medium">Order ID:</span>
                <span className="font-mono break-all">{_id}</span>
              </p>
              <p className="flex flex-wrap items-center gap-1">
                <span className="font-medium">Status:</span>
                <span
                  className={`px-2 py-1 rounded text-sm ${orderStatus === "Cancelled"
                    ? "bg-red-100 text-red-700"
                    : "bg-green-100 text-green-700"
                    }`}
                >
                  {orderStatus}
                </span>
              </p>
              <p><span className="font-medium">Payment:</span> {paymentStatus} ({paymentMethod})</p>
              <p className="flex flex-wrap items-center gap-1">
                <span className="font-medium">Transaction ID:</span>
                <span className="font-mono break-all">{transaction_id}</span>
              </p>
              <p className="flex flex-wrap items-center gap-1">
                <span className="font-medium">Payment ID:</span>
                <span className="font-mono break-all">{result?.paymentRef || "—"}</span>
              </p>
              <p className="flex flex-wrap items-center gap-1">
                <span className="font-medium">Payment Reference Number:</span>
                <span className="font-mono break-all">{result?.payer_details?.utr || "—"}</span>
              </p>
              <p><span className="font-medium">Total Amount:</span> ₹{totalAmount}</p>
            </div>
            <div className="bg-white shadow-md rounded-xl p-4 border space-y-3 max-[640px]:mx-auto max-[640px]:max-w-[335px]">
              <h3 className="text-lg font-semibold">Items</h3>
              {items.length ? (
                items.map((it: OrderItem) => (
                  <div key={it._id} className="flex flex-col sm:flex-row gap-3 border rounded-lg p-3">
                    <img
                      src={it.image || "/placeholder.png"}
                      alt={it.name}
                      className="w-full h-32 sm:w-20 sm:h-20 object-cover rounded"
                    />
                    <div className="min-w-0 flex-1 space-y-1 text-xs sm:text-sm">
                      <p className="font-medium line-clamp-2 break-words">{it.name}</p>
                      <p className="text-gray-600">
                        {it.color ? `${it.color} - ` : ""}
                        {it.size?.size} {it.size?.sizeName}
                      </p>
                      <p className="text-gray-700">Quantity: {it.quantity ?? 1}</p>
                      <p className="text-gray-700 font-medium">Price: ₹{it.price}</p>
                      {it.discount ? (
                        <p className="text-red-600 font-medium">Discount: - ₹{it.discount}</p>
                      ) : null}
                      <p className="font-medium">
                        Subtotal: ₹{Number(it.total ?? 0).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-500">No items found in this order.</p>
              )}
              <div className="mt-6 border-t pt-4">
                <OrderStepper
                  currentStatus={orderStatus}
                  size="normal"
                  activity={activity}
                />
              </div>
            </div>
          </div>
          <div className="space-y-6">
            {shippingAddress && (
              <div className="bg-white shadow-md rounded-xl p-4 border text-sm">
                <h3 className="text-lg font-semibold mb-2">Delivery details</h3>
                <p className="font-medium">{shippingAddress.name}</p>
                <p>{shippingAddress.addressLine1}, {shippingAddress.addressLine2}</p>
                <p>{shippingAddress.city}, {shippingAddress.state} - {shippingAddress.postalCode}</p>
                <p>{shippingAddress.country}</p>
                <p className="mt-2">📞 {shippingAddress.phone}</p>
              </div>
            )}
            <div className="bg-white shadow-md rounded-xl p-4 border space-y-2">
              <h3 className="text-lg font-semibold">Price Details</h3>

              {/* Price (before discount) */}
              <div className="flex justify-between text-gray-700">
                <span>Price</span>
                <span>
                  ₹{items
                    .reduce((sum, it) => sum + Number(it.price ?? 0), 0)
                    .toFixed(2)}
                </span>
              </div>

              {/* Discount */}
              {items.some(it => it.discount) && (
                <div className="flex justify-between text-green-600">
                  <span>Discount</span>
                  <span>
                    -₹{items
                      .reduce((sum, it) => sum + Number(it.discount ?? 0), 0)
                      .toFixed(2)}
                  </span>
                </div>
              )}

              {/* Subtotal (After Discount) */}
              <div className="flex justify-between text-gray-700">
                <span>Subtotal (Incl. GST)</span>
                <span>
                  ₹{items
                    .reduce((sum, it) => sum + Number(it.total ?? 0), 0)
                    .toFixed(2)}
                </span>
              </div>

              {/* Platform Fee (including GST) */}
              <div className="flex justify-between text-gray-700">
                <span>Platform Fee (incl. GST)</span>
                <span>
                  ₹{items
                    .reduce(
                      (sum, it) =>
                        sum +
                        Number((it as any)?.PLATFORM_FEE?.amount ?? 0) +
                        Number((it as any)?.SERVICE_TAX?.amount ?? 0),
                      0
                    )
                    .toFixed(2)}
                </span>
              </div>

              <hr />

              {/* Final Total */}
              <div className="flex justify-between font-medium">
                <span>Total Amount</span>
                <span>₹{totalAmount}</span>
              </div>
            </div>

            {result && paymentStatus === "Completed" && (
              <div className="flex justify-center">
                <InvoicePDFWrapper order={result} itemId={itemId} />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
export default OrderDetails;
