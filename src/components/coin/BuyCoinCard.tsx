import { useState } from "react";
import { IndianRupee, Coins } from "lucide-react";

const PRESETS = [100, 500, 1000];
const MIN = 10;
const MAX = 50000;

const BuyCoinCard = ({
    onSelectAmount,
}: {
    onSelectAmount: (amount: number) => void;
}) => {
    const [amount, setAmount] = useState<string>("");
    const [selected, setSelected] = useState<number | null>(null);
    const [error, setError] = useState("");

    const validate = (value: number) => {
        if (!value) return "Enter amount";
        if (value < MIN) return `Minimum ₹${MIN}`;
        if (value > MAX) return `Maximum ₹${MAX}`;
        return "";
    };

    const handlePreset = (amt: number) => {
        setSelected(amt);
        setAmount(String(amt));
        setError("");
    };

    const handleChange = (val: string) => {
        if (!/^\d*$/.test(val)) return;
        setSelected(null);
        setAmount(val);

        const err = validate(Number(val));
        setError(err);
    };

    const submit = () => {
        const num = Number(amount);
        const err = validate(num);
        if (err) return setError(err);

        onSelectAmount(num);
    };

    return (
  <div className="bg-white rounded-2xl shadow-md border px-4 py-3
flex flex-col justify-between w-full h-full aspect-[1.9/1]"
>

    {/* TOP */}
    <div className="flex items-center justify-between">
      <div>
        <h3 className="text-sm font-semibold">Add Payment</h3>
        <p className="text-[11px] text-gray-500">UPI/Card/NetBanking </p>
      </div>

      <div className="flex gap-2 shrink-0">
        {PRESETS.map((amt) => (
          <button
            key={amt}
            onClick={() => handlePreset(amt)}
            className={`px-3 py-1 rounded-lg text-xs font-medium border transition
            ${
              selected === amt
                ? "bg-pink-600 text-white border-pink-600"
                : "hover:bg-pink-50"
            }`}
          >
            ₹{amt}
          </button>
        ))}
      </div>
    </div>

    {/* INPUT ROW */}
    <div className="flex items-center gap-2">
      <div className="flex items-center border rounded-lg px-2 py-1 flex-1 focus-within:ring-1 focus-within:ring-pink-500">
        <IndianRupee size={14} className="text-gray-400 mr-1" />
        <input
          type="text"
          inputMode="numeric"
          placeholder="Amount"
          value={amount}
          onChange={(e) => handleChange(e.target.value)}
          className="flex-1 outline-none text-sm"
        />
      </div>

      <button
        onClick={submit}
        disabled={!amount || !!error}
        className="bg-pink-600 text-white px-4 py-2 rounded-lg text-sm font-medium
        hover:bg-pink-700 transition disabled:opacity-40"
      >
        Pay
      </button>
    </div>

    {/* FOOTER */}
    <div className="flex justify-between text-xs">
      <span className="text-gray-400">Min ₹{MIN}</span>

      {amount && !error && (
        <span className="text-pink-600 font-medium flex items-center gap-1">
          <Coins size={12} /> {amount} Coins
        </span>
      )}
    </div>
  </div>
);

};

export default BuyCoinCard;
