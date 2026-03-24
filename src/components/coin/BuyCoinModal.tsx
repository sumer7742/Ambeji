import { useState } from "react";
import type { BuyCoinPayload } from "../../common/types/types";

const BuyCoinModal = ({
  open,
  amount,
  loading,
  onClose,
  onSubmit,
}: {
  open: boolean;
  amount: number;
  loading: boolean;
  onClose: () => void;
  onSubmit: (data: BuyCoinPayload) => void;
}) => {
  const [method, setMethod] = useState("");

  if (!open) return null;

  const handlePay = () => {
    if (!method) return;
    onSubmit({
      amount,
      method,
    });
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl w-[95%] sm:w-full max-w-md p-4 sm:p-6 space-y-4 sm:space-y-5">
        <h2 className="text-lg font-semibold">Confirm Buy Coins</h2>

        {/* AMOUNT */}
        <div className="bg-gray-50 p-4 rounded text-center">
          <p className="text-sm text-gray-500">Amount</p>
          <p className="text-2xl font-bold text-pink-600">₹{amount}</p>
        </div>

        {/* PAYMENT MODE */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Payment Method</label>

          <select
            value={method}
            onChange={(e) => setMethod(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
          >
            <option value="">Select payment mode</option>
            <option value="upi">UPI</option>
            <option value="card">Card</option>
            <option value="netbanking">Net Banking</option>
            <option value="wallet">Wallet</option>
          </select>
        </div>

        <p className="text-sm text-gray-600 text-center">
          You will be redirected to the selected payment gateway.
        </p>

        {/* BUTTONS */}
        <div className="flex justify-end gap-3 pt-2">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded-lg"
          >
            Cancel
          </button>

          <button
            disabled={loading || !method}
            onClick={handlePay}
            className="px-4 py-2 bg-pink-600 text-white rounded-lg disabled:opacity-50"
          >
            {loading ? "Processing..." : "Proceed to Pay"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BuyCoinModal;
