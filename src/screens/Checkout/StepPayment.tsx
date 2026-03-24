  import type { AddressData } from "../../common/types/types";
  import type { CartListResponse, CartProduct } from "../../hooks/useCart";
  import React from "react";

  type PaymentMethod = "razorpay" | "cod";
  type OnlinePaymentMode = "upi" | "card" | "netbanking" | "wallet";

  interface StepPaymentProps {
    productData: CartListResponse;
    setPaymentMethod: (method: PaymentMethod) => void;
    onConfirm: (orderData: any) => void;
    isPending: boolean;
    address: AddressData | null;
  }

  export const StepPayment: React.FC<StepPaymentProps> = ({
    productData,
    setPaymentMethod,
    onConfirm,
    isPending,
    address,
  }) => {
    const { results, total_carts } = productData;
    const [paymentMethod, setLocalPaymentMethod] =
      React.useState<PaymentMethod>("razorpay");
    const [onlineMode, setOnlineMode] =
      React.useState<OnlinePaymentMode>("upi");
    const handlePaymentChange = (method: PaymentMethod) => {
      setLocalPaymentMethod(method);
      setPaymentMethod(method);
    };
    const handleConfirm = () => {
      onConfirm({
        address_id: address?._id,
        card_id: results.map((e) => e._id),
        paymentMethod,
        ...(paymentMethod === "razorpay" && {
          method: onlineMode,
        }),
      });
    };

    return (
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-3xl mx-auto space-y-6">
        <h3 className="text-xl font-semibold border-b pb-3">Review & Payment</h3>

        <div className="space-y-4">
          {results.map((item) => (
            <ProductItem key={item._id} item={item} />
          ))}
        </div>

        <OrderSummary totals={total_carts} />

        <div>
          <label className="block mb-2 font-medium">Select Payment Method</label>
          <select
            className="w-full border px-3 py-2 rounded"
            value={paymentMethod}
            onChange={(e) => handlePaymentChange(e.target.value as PaymentMethod)}
          >
            <option value="razorpay">Pay With Online</option>
            <option value="cod">Cash on Delivery</option>
          </select>
        </div>
        {paymentMethod === "razorpay" && (
          <div>
            <label className="block mb-2 font-medium">
              Choose Online Payment Mode
            </label>
            <select
              className="w-full border px-3 py-2 rounded"
              value={onlineMode}
              onChange={(e) =>
                setOnlineMode(e.target.value as OnlinePaymentMode)
              }
            >
              <option value="upi">UPI</option>
              <option value="card">Debit / Credit Card</option>
              <option value="netbanking">Net Banking</option>
              <option value="wallet">Wallet</option>
            </select>
          </div>
        )}

        <button
          className="w-full py-3 rounded-full bg-[#dd3333] hover:bg-red-700 text-white font-semibold transition disabled:opacity-50"
          onClick={handleConfirm}
          disabled={isPending}
        >
          {isPending
            ? "Processing..."
            : `Confirm & Pay`}
        </button>
      </div>
    );
  };


  const ProductItem: React.FC<{
    item: {
      _id: string;
      quantity: number;
      product_id: CartProduct;
    };
  }> = ({ item }) => (
    <div className="flex items-center gap-4 border-b pb-4 last:border-none">
      <img
        src={item.product_id.images}
        alt={item.product_id.name}
        className="w-20 h-20 object-contain rounded border"
      />
      <div className="flex-1">
        <h4 className="font-medium text-gray-800">{item.product_id.name}</h4>
        <p className="text-sm text-gray-500">
          Quantity: {item.quantity} | In stock: {item.product_id.stock}
        </p>
        <div className="mt-1 flex items-center gap-2">
          <span className="text-lg font-semibold text-green-700">
            ₹{item.product_id.total_sell_price}
          </span>
          <span className="text-sm line-through text-gray-400">
            ₹{item.product_id.total_original_price}
          </span>
        </div>
      </div>
      <div className="font-semibold text-gray-700 mr-16">
        ₹{(item.product_id.total_sell_price * item.quantity).toFixed(2)}
      </div>
    </div>
  );

  const OrderSummary: React.FC<{
    totals: {
      total_original_price: number;
      total_sell_price: number;
      total_quantity: number;
    };
  }> = ({ totals }) => (
    <div className="bg-gray-50 p-4 rounded-lg border">
      <h4 className="font-semibold mb-2">Order Summary</h4>

      <div className="flex justify-between text-sm">
        <span>Total Items</span>
        <span>{totals.total_quantity}</span>
      </div>

      <div className="flex justify-between text-sm">
        <span>Price</span>
        <span>₹{totals.total_original_price.toFixed(2)}</span>
      </div>

      <div className="flex justify-between text-sm text-green-700">
        <span>Discount</span>
        <span>
          -₹{(totals.total_original_price - totals.total_sell_price).toFixed(2)}
        </span>
      </div>

      <div className="flex justify-between text-sm font-medium">
        <span>Subtotal (Incl. GST)</span>
        <span>₹{totals.total_sell_price.toFixed(2)}</span>
      </div>

      <hr className="my-2" />

      <div className="flex justify-between text-sm font-semibold">
        <span>Item Total (Incl. GST)</span>
        <span>₹{totals.total_sell_price.toFixed(2)}</span>
      </div>

      {/* <p className="text-xs text-gray-500 mt-2">
        Platform fee and applicable taxes will be added at payment.
        Final payable amount will be shown on the payment screen.
      </p> */}
    </div>
  );

