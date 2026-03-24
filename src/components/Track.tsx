import React, { useState } from "react";

const Track: React.FC = () => {
  const [email, setEmail] = useState("");
  const [orderNumber, setOrderNumber] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add your tracking logic here
    console.log("Tracking order for:", { email, orderNumber });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-pink-50 font-sans py-16 px-4 sm:px-6 lg:px-8">
      
      {/* Hero Section */}
      <section className="text-center mb-12">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4">
          Track Your Order
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base">
          Enter your email address or order number below to track your order status. 
          Deliveries may take 7–10 working days after shipping due to current conditions.
        </p>
      </section>

      {/* Form Section */}
      <section className="max-w-lg mx-auto bg-white/70 backdrop-blur-md shadow-2xl rounded-3xl p-8 sm:p-12">
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-6">
          Track Your Order
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">

          {/* Email */}
          <FloatingInput
            label="Email Address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {/* OR Separator */}
          <div className="text-center text-gray-500 text-sm">— OR —</div>

          {/* Order Number */}
          <FloatingInput
            label="Order Number"
            type="text"
            value={orderNumber}
            onChange={(e) => setOrderNumber(e.target.value)}
          />

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold shadow-lg transition"
          >
            Track Order
          </button>

        </form>
      </section>

      {/* Info Note */}
      <p className="mt-8 text-center text-gray-600 text-sm max-w-2xl mx-auto">
        Thank you for shopping with us. We’re working hard to ensure safe and timely deliveries.
      </p>

      {/* Optional CTA Section */}
      <div className="mt-16 text-center">
        <h3 className="text-xl font-bold text-gray-900 mb-4">
          Want to explore more products?
        </h3>
        <button className="px-8 py-3 rounded-full bg-pink-500 hover:bg-pink-600 text-white font-semibold shadow-lg transition">
          Start Shopping
        </button>
      </div>

    </div>
  );
};

export default Track;

// Floating Input Component
interface FloatingInputProps {
  label: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FloatingInput: React.FC<FloatingInputProps> = ({ label, type = "text", value, onChange }) => (
  <div className="relative">
    <input 
    type={type}
      value={value}
      onChange={onChange}
      placeholder=" "
      className="peer w-full px-4 py-3 rounded-xl border border-gray-300 placeholder-transparent focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
    />
    <label
      className={`absolute left-4 transition-all duration-200 bg-white px-1 rounded
        ${value ? "-top-2 text-sm text-indigo-500" : "top-3 text-sm text-gray-500 peer-focus:-top-2 peer-focus:text-sm peer-focus:text-indigo-500"}
      `}
    >
      {label}
    </label>
  </div>
);
