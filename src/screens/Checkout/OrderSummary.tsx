import React from "react";
import {
  useCardActionFunction,
  type CartItem,
  type CartProduct,
} from "../../hooks/useCart";
import type { AddressData } from "../../common/types/types";
import PageHeadline from "../PageHeadline";
import LoadingOverlay from "../../components/Loading";

interface OrderSummaryProps {
  products: CartItem[];
  address: AddressData;
  subtotal: number;
  discount?: number;
  refetch: () => void;
  onContinue: () => void;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({
  products,
  address,
  subtotal,
  discount = 0,
  refetch,
  onContinue,
}) => {
  const { handleIncrease, handleDecrease, handleRemove, isPending } =
    useCardActionFunction(refetch);

  const totalPrice = subtotal + discount;
  const totalPayable = subtotal;

  return (
    <div className="bg-[#fafafa] min-h-screen py-8 px-4">
      <div className="max-w-5xl mx-auto space-y-6">

        <PageHeadline title="Order Summary" />

        {/* ADDRESS */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h3 className="text-lg font-semibold mb-3 border-b pb-2">
            Delivery Address
          </h3>

          <div className="text-sm text-gray-700 space-y-1">
            <p className="font-semibold text-base">{address.name}</p>
            <p>
              {address.addressLine1}
              {address.addressLine2 && `, ${address.addressLine2}`}
            </p>
            <p>
              {address.city}, {address.state} - {address.postalCode}
            </p>
            <p>{address.country}</p>
            <p className="text-gray-500">📞 {address.phone}</p>
          </div>
        </div>

        {/* PRODUCTS */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h3 className="text-lg font-semibold mb-4">
            Items ({products.length})
          </h3>

          <div className="space-y-5 max-h-[55vh] overflow-y-auto pr-2">
            {isPending && <LoadingOverlay />}

            {products.map((item) => {
              const product =
                typeof item.product_id === "string"
                  ? null
                  : (item.product_id as CartProduct);

              if (!product) return null;

              const isOutOfStock = !product.inStock;

              return (
                <div
                  key={item._id}
                  className="flex flex-col md:flex-row gap-5 border rounded-xl p-4 hover:shadow-md transition"
                >
                  {/* IMAGE */}
                  <img
                    src={product.images || "https://via.placeholder.com/150"}
                    alt={product.name}
                    className="w-24 h-24 rounded-lg object-cover"
                  />

                  {/* DETAILS */}
                  <div className="flex-1 space-y-1">
                    <p className="font-semibold text-gray-800">
                      {product.name}
                    </p>

                    <p className="text-sm text-gray-500">
                      Qty: {item.quantity}
                    </p>

                    {isOutOfStock && (
                      <p className="text-red-600 text-sm font-medium">
                        Out of Stock
                      </p>
                    )}
                  </div>

                  {/* ACTIONS */}
                  <div className="flex items-center gap-3">

                    {/* PRICE */}
                    <p className="font-bold text-[#dd3333] text-lg">
                      ₹{product.total_sell_price}
                    </p>

                    {/* QTY */}
                    <div className="flex items-center border rounded-full overflow-hidden">
                      <button
                        onClick={() => handleDecrease(item)}
                        className="px-3 py-1 hover:bg-gray-100"
                      >
                        -
                      </button>

                      <span className="px-3">{item.quantity}</span>

                      <button
                        onClick={() => handleIncrease(item)}
                        className="px-3 py-1 hover:bg-gray-100"
                      >
                        +
                      </button>
                    </div>

                    {/* REMOVE */}
                    <button
                      onClick={() => handleRemove(item)}
                      className="text-[#dd3333] text-sm hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* PRICE SUMMARY */}
        <div className="bg-white rounded-2xl shadow-sm p-6 space-y-3">
          <div className="flex justify-between text-sm text-gray-700">
            <span>Price</span>
            <span>₹{totalPrice.toFixed(2)}</span>
          </div>

          {discount > 0 && (
            <div className="flex justify-between text-green-600 text-sm">
              <span>Discount</span>
              <span>-₹{discount.toFixed(2)}</span>
            </div>
          )}

          <div className="flex justify-between text-sm text-gray-700">
            <span>Subtotal (Incl. GST)</span>
            <span>₹{subtotal.toFixed(2)}</span>
          </div>

          <div className="flex justify-between text-lg font-bold border-t pt-3">
            <span>Total</span>
            <span className="text-[#dd3333]">
              ₹{totalPayable.toFixed(2)}
            </span>
          </div>
        </div>

        {/* CTA */}
        <button
          onClick={onContinue}
          className="w-full py-4 rounded-full bg-[#dd3333] hover:bg-red-700 text-white font-semibold transition"
        >
          Proceed to Payment →
        </button>
      </div>
    </div>
  );
};

export default OrderSummary;