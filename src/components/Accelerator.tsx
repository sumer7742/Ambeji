import React from "react";
import { Link } from "react-router-dom";
import { Rocket, BarChart3, Megaphone, Package } from "lucide-react";
import { unibcompLogo3 } from "../assets";

const Accelerator: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-red-100">

      {/* ================= HERO ================= */}
      <section className="relative bg-gradient-to-r from-[#DD3333] via-red-500 to-pink-500 text-white py-20 px-6 text-center overflow-hidden">
        <div className="absolute inset-0 bg-black/30 backdrop-blur-sm"></div>

        <div className="relative z-10 max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-extrabold">
            🚀 Unibcomp Accelerator
          </h1>
          <p className="mt-4 text-lg text-white/90">
            Boost your sales, reach more customers, and grow faster with our platform.
          </p>

          <Link
            to="/accelerator-signup"
            className="inline-block mt-8 px-10 py-4 bg-white text-[#DD3333] font-semibold rounded-full shadow-lg hover:scale-105 transition"
          >
            Get Started →
          </Link>
        </div>
      </section>

      {/* ================= FEATURES ================= */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Why Choose Accelerator?
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

          {[
            {
              icon: <Rocket size={28} />,
              title: "Fast Launch",
              desc: "Launch products quickly with zero hassle."
            },
            {
              icon: <Megaphone size={28} />,
              title: "Marketing Boost",
              desc: "Promote products with powerful tools."
            },
            {
              icon: <BarChart3 size={28} />,
              title: "Insights",
              desc: "Track and optimize your performance."
            },
            {
              icon: <Package size={28} />,
              title: "Wider Reach",
              desc: "Sell across India with ease."
            },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition group"
            >
              <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-gradient-to-br from-[#DD3333] to-red-500 text-white mb-4 group-hover:scale-110 transition">
                {item.icon}
              </div>
              <h3 className="text-lg font-semibold text-gray-900">
                {item.title}
              </h3>
              <p className="text-gray-600 text-sm mt-2">
                {item.desc}
              </p>
            </div>
          ))}

        </div>
      </section>

      {/* ================= IMAGE + CONTENT ================= */}
      <section className="max-w-7xl mx-auto px-6 py-16 flex flex-col md:flex-row items-center gap-10">

        <div className="md:w-1/2">
          <img
            src={unibcompLogo3}
            alt="Accelerator"
            className="w-full max-w-md mx-auto rounded-3xl shadow-2xl hover:scale-105 transition"
          />
        </div>

        <div className="md:w-1/2 space-y-5">
          <h2 className="text-3xl font-bold text-gray-900">
            Scale Faster 🔥
          </h2>
          <p className="text-gray-600">
            Grow your business with marketing tools, analytics, and trusted support.
          </p>

          <ul className="space-y-2 text-gray-700">
            <li>✔ Easy onboarding</li>
            <li>✔ High product visibility</li>
            <li>✔ Dedicated support</li>
            <li>✔ Real-time analytics</li>
          </ul>

          <Link
            to="/accelerator-signup"
            className="inline-block mt-4 px-8 py-3 bg-[#DD3333] text-white font-semibold rounded-full shadow hover:bg-red-600 transition"
          >
            Join Now →
          </Link>
        </div>
      </section>

    

    </div>
  );
};

export default Accelerator;