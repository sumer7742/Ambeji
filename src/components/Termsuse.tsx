import React from "react";
import {
  FileText,
  UserCheck,
  Shield,
  AlertTriangle,
  CreditCard,
  Scale,
} from "lucide-react";

const TermsOfUse: React.FC = () => {
  return (
    <div className="bg-white text-gray-900 font-sans">

      {/* ================= HERO ================= */}
      <section className="bg-[#111] text-white py-20 px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black/60"></div>

        <div className="relative z-10 max-w-3xl mx-auto">
          <span className="text-xs tracking-widest uppercase text-[#dd3333] font-semibold">
            Legal
          </span>

          <h1 className="text-4xl md:text-5xl font-extrabold mt-4 leading-tight">
            Terms & Conditions
          </h1>

          <p className="text-gray-300 mt-4 text-sm md:text-base">
            Please read these terms carefully before using our platform.
            By accessing our services, you agree to follow these guidelines.
          </p>
        </div>
      </section>

      {/* ================= CONTENT ================= */}
      <section className="max-w-6xl mx-auto px-6 py-16">

        <div className="grid md:grid-cols-2 gap-8">

          {[
            {
              icon: <UserCheck />,
              title: "Eligibility",
              desc: "You must be at least 18 years old and legally capable of entering into contracts.",
            },
            {
              icon: <FileText />,
              title: "Account Registration",
              desc: "Provide accurate details and keep your account credentials secure at all times.",
            },
            {
              icon: <Shield />,
              title: "Platform Usage",
              desc: "Unauthorized access, misuse, or illegal activities are strictly prohibited.",
            },
            {
              icon: <CreditCard />,
              title: "Payments & Fees",
              desc: "All transactions are secure and charges are clearly displayed before payment.",
            },
            {
              icon: <AlertTriangle />,
              title: "Prohibited Activities",
              desc: "Selling illegal or counterfeit products may lead to account suspension.",
            },
            {
              icon: <Scale />,
              title: "Liability",
              desc: "We are not responsible for indirect or incidental damages from platform use.",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="group border border-gray-200 p-8 hover:border-[#dd3333] transition rounded-2xl bg-white hover:shadow-xl"
            >
              <div className="w-12 h-12 flex items-center justify-center bg-[#fff0f0] text-[#dd3333] rounded-xl mb-4 group-hover:scale-110 transition">
                {item.icon}
              </div>

              <h3 className="text-lg font-bold mb-2">
                {item.title}
              </h3>

              <p className="text-sm text-gray-600 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}

        </div>
      </section>

      {/* ================= EXTRA SECTIONS ================= */}
      <section className="bg-gray-50 py-16 px-6">
        <div className="max-w-5xl mx-auto space-y-10">

          <div>
            <h2 className="text-xl font-bold mb-2 text-[#dd3333]">
              Termination of Access
            </h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              We reserve the right to suspend or terminate accounts that violate
              our policies or applicable laws without prior notice.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-2 text-[#dd3333]">
              Governing Law
            </h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              These terms are governed by Indian laws and disputes will fall under
              the jurisdiction of Indian courts.
            </p>
          </div>

        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="bg-[#111] text-white py-16 px-6 text-center">
        <h2 className="text-2xl font-bold mb-4">
          Need Help?
        </h2>

        <p className="text-gray-400 mb-6 text-sm">
          Have questions regarding our policies? Contact our support team.
        </p>

        <a
          href="mailto:support@ambeji.com"
          className="inline-block px-8 py-3 bg-[#dd3333] text-white text-sm font-semibold rounded-full hover:bg-[#bb2222] transition"
        >
          Contact Support
        </a>
      </section>

    </div>
  );
};

export default TermsOfUse;