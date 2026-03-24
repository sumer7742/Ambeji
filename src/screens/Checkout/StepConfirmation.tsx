import { Link } from "react-router-dom";

export const StepSuccess: React.FC = () => {
  return (
    <div className="bg-green-50 p-6 rounded-lg shadow text-center max-w-xl mx-auto">
      <h3 className="text-xl font-bold text-green-700">Order Successful!</h3>
      <p className="mt-2 text-gray-700">
        Thank you for your purchase. Your order ID will be sent to your email.
      </p>
      <Link
        to="/"
        className="mt-4 inline-block bg-[#dd3333] text-white px-6 py-2 roundedhover:bg-red-700"
      >
      </Link>
    </div>
  );
};