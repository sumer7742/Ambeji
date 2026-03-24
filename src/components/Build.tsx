import React from "react";
import { Link } from "react-router-dom";
import { ShieldCheck, TrendingUp, BarChart3, BadgeCheck } from "lucide-react";
import { unibcompLogo3 } from "../assets";

const Build: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-red-100">

      {/* ================= HERO ================= */}
      <section className="relative bg-gradient-to-r from-[#DD3333] via-red-500 to-pink-500 text-white py-20 px-6 text-center overflow-hidden">
        <div className="absolute inset-0 bg-black/30 backdrop-blur-sm"></div>

        <div className="relative z-10 max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-extrabold">
            🛡️ Protect & Build Your Brand
          </h1>
          <p className="mt-4 text-lg text-white/90">
            Secure your brand identity, grow your online presence, and build trust with customers.
          </p>

          <Link
            to="/build-signup"
            className="inline-block mt-8 px-10 py-4 bg-white text-[#DD3333] font-semibold rounded-full shadow-lg hover:scale-105 transition"
          >
            Get Started →
          </Link>
        </div>
      </section>

      {/* ================= FEATURES ================= */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Why Build Your Brand With Us?
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              icon: <ShieldCheck size={28} />,
              title: "Brand Protection",
              desc: "Secure your brand identity and prevent misuse."
            },
            {
              icon: <TrendingUp size={28} />,
              title: "Growth Strategy",
              desc: "Boost visibility and grow your digital reach."
            },
            {
              icon: <BarChart3 size={28} />,
              title: "Analytics",
              desc: "Track brand performance and insights."
            },
            {
              icon: <BadgeCheck size={28} />,
              title: "Trust & Credibility",
              desc: "Build customer trust with verified branding."
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

        {/* Image */}
        <div className="md:w-1/2">
          <img
            src={unibcompLogo3}
            alt="Build Brand"
            className="w-full max-w-md mx-auto rounded-3xl shadow-2xl hover:scale-105 transition"
          />
        </div>

        {/* Content */}
        <div className="md:w-1/2 space-y-5">
          <h2 className="text-3xl font-bold text-gray-900">
            Build Strong Brand Presence 🔥
          </h2>
          <p className="text-gray-600">
            From protection to promotion, Unibcomp helps you establish a powerful and trusted brand online.
          </p>

          <ul className="space-y-2 text-gray-700">
            <li>✔ Trademark & brand safety</li>
            <li>✔ Online visibility boost</li>
            <li>✔ Reputation management</li>
            <li>✔ Real-time analytics</li>
          </ul>

          <Link
            to="/build-signup"
            className="inline-block mt-4 px-8 py-3 bg-[#DD3333] text-white font-semibold rounded-full shadow hover:bg-red-600 transition"
          >
            Start Building →
          </Link>
        </div>
      </section>

      {/* ================= CTA =================
      <section className="bg-gradient-to-r from-[#DD3333] to-red-600 text-white py-16 text-center">
        <h2 className="text-3xl font-bold">
          Ready to Build Your Brand?
        </h2>
        <p className="mt-3 text-white/80">
          Join Unibcomp and create a strong, trusted digital identity.
        </p>

        <Link
          to="/build-signup"
          className="inline-block mt-6 px-10 py-4 bg-white text-[#DD3333] font-semibold rounded-full shadow-lg hover:scale-105 transition"
        >
          Get Started →
        </Link>
      </section> */}

    </div>
  );
};

export default Build;