// src/components/Affiliate.tsx
import React from "react";
import { Link } from "react-router-dom";
import PageHeadline from "../screens/PageHeadline";
import { unibcompLogo3 } from "../assets";

const Affiliate: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-green-600 to-green-400 p-6 text-white">
        <PageHeadline title="Become an Affiliate" />
        <p className="mt-2 text-sm opacity-90 max-w-xl">
          Join the Unibcomp Affiliate Program and start earning commissions by
          promoting our products and services.
        </p>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col md:flex-row gap-8">
        {/* Left: Info */}
        <div className="md:w-1/2 flex flex-col justify-center gap-6">
          <h2 className="text-2xl font-bold text-gray-800">
            Partner with Unibcomp and Earn
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Become a part of our growing affiliate network. Share your referral
            links, drive traffic, and earn commissions for every successful
            sale or lead.
          </p>
          <ul className="list-disc list-inside text-gray-600 space-y-1">
            <li>Easy signup and dashboard access</li>
            <li>Real-time performance tracking</li>
            <li>Competitive commission rates</li>
            <li>Marketing materials provided</li>
          </ul>
          <Link
            to="/affiliate-signup"
            className="inline-block mt-4 px-6 py-3 bg-yellow-500 text-black font-semibold rounded-lg hover:bg-yellow-400 transition"
          >
            Join as Affiliate →
          </Link>
        </div>

        {/* Right: Image */}
        <div className="md:w-1/2 flex justify-center items-center">
          <img
            src={unibcompLogo3}
            alt="Become an Affiliate"
            className="w-full max-w-md rounded-xl shadow-lg"
          />
        </div>
      </div>

      {/* Footer CTA */}
      <div className="bg-green-50 mt-10 py-6 text-center">
        <h3 className="text-xl font-semibold text-gray-800">
          Ready to start earning with Unibcomp?
        </h3>
        <Link
          to="/affiliate-signup"
          className="mt-4 inline-block px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-500 transition"
        >
          Sign Up Now →
        </Link>
      </div>
    </div>
  );
};

export default Affiliate;
