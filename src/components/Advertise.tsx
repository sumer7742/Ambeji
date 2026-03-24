// src/components/Advertise.tsx
import React from "react";
import { Link } from "react-router-dom";
import PageHeadline from "../screens/PageHeadline";
import { unibcompLogo3 } from "../assets";

const Advertise: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-purple-600 to-purple-400 p-6 text-white">
        <PageHeadline title="Advertise Your Products" />
        <p className="mt-2 text-sm opacity-90 max-w-xl">
          Promote your products on Unibcomp and reach thousands of potential customers.
          Our platform makes advertising easy and effective.
        </p>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col md:flex-row gap-8">
        {/* Left: Info */}
        <div className="md:w-1/2 flex flex-col justify-center gap-6">
          <h2 className="text-2xl font-bold text-gray-800">
            Reach More Customers with Unibcomp Advertising
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Advertise your products on our platform and get high visibility. Track
            performance, reach your target audience, and increase sales.
          </p>
          <ul className="list-disc list-inside text-gray-600 space-y-1">
            <li>Targeted marketing to the right audience</li>
            <li>Detailed analytics & performance tracking</li>
            <li>Boost product visibility and sales</li>
            <li>Easy setup and management</li>
          </ul>
          <Link
            to="/advertise-form"
            className="inline-block mt-4 px-6 py-3 bg-yellow-500 text-black font-semibold rounded-lg hover:bg-yellow-400 transition"
          >
            Start Advertising →
          </Link>
        </div>

        {/* Right: Image */}
        <div className="md:w-1/2 flex justify-center items-center">
          <img
            src={unibcompLogo3}
            alt="Advertise Your Products"
            className="w-full max-w-md rounded-xl shadow-lg"
          />
        </div>
      </div>

      {/* Footer CTA */}
      <div className="bg-purple-50 mt-10 py-6 text-center">
        <h3 className="text-xl font-semibold text-gray-800">
          Ready to boost your product sales?
        </h3>
        <Link
          to="/advertise-form"
          className="mt-4 inline-block px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-500 transition"
        >
          Advertise Now →
        </Link>
      </div>
    </div>
  );
};

export default Advertise;
