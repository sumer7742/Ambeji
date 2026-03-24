import React from "react";

const Terms: React.FC = () => {
  return (
    <div className="bg-white text-gray-900 font-sans">

      {/* ================= HERO ================= */}
      <section className="bg-[#111] text-white py-20 px-6 text-center relative">
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black/60"></div>

        <div className="relative z-10 max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-extrabold">
            Terms & Conditions
          </h1>
          <p className="mt-4 text-gray-300 text-sm md:text-base">
            Please read these terms carefully before using our services.
          </p>
        </div>
      </section>

      {/* ================= PRINT BUTTON ================= */}
      <div className="max-w-7xl mx-auto px-6 mt-10 flex justify-end print:hidden">
        <button
          onClick={() => window.print()}
          className="flex items-center gap-2 px-5 py-2 border border-gray-300 text-sm rounded-full hover:border-[#dd3333] hover:text-[#dd3333] transition"
        >
          Print / Download
        </button>
      </div>

      {/* ================= CONTENT ================= */}
      <section className="max-w-7xl mx-auto px-6 py-12 space-y-10 text-sm leading-relaxed">

        {/* Intro */}
        <div className="border border-gray-200 p-8 rounded-2xl hover:shadow-lg transition">
          <h2 className="font-bold text-[#dd3333] mb-3 text-lg">Introduction</h2>
          <p className="text-gray-600">
            This website is operated by{" "}
            <span className="font-semibold text-[#dd3333]">Ambeji</span>.
            By using our services, you agree to these Terms & Conditions.
          </p>
        </div>

        {/* Things */}
        <div className="border border-gray-200 p-8 rounded-2xl hover:shadow-lg transition">
          <h2 className="font-bold text-[#dd3333] mb-3 text-lg">Things to Remember</h2>
          <ul className="list-disc pl-5 space-y-2 text-gray-600">
            <li>Read terms carefully before using.</li>
            <li>We may update terms anytime.</li>
            <li>Check latest version regularly.</li>
            <li>Continued use means acceptance.</li>
          </ul>
        </div>

        {/* Sections */}
        {[
          {
            title: "Section 1: Online Market Terms",
            body: (
              <>
                <p>You must be legally eligible to use this platform.</p>
                <p className="mt-2">No harmful or malicious activity allowed.</p>
              </>
            ),
          },
          {
            title: "Section 2: General Conditions",
            body: (
              <ul className="list-disc pl-5 space-y-2 text-gray-600">
                <li>We may refuse service anytime.</li>
                <li>No duplication without permission.</li>
                <li>Payments are secure.</li>
              </ul>
            ),
          },
          {
            title: "Section 3: Information Accuracy",
            body: <p>We do not guarantee all information is accurate or updated.</p>,
          },
          {
            title: "Section 4: Pricing & Services",
            body: <p>Prices and services may change anytime without notice.</p>,
          },
          {
            title: "Section 5: Products",
            body: <p>Product display may vary across screens.</p>,
          },
          {
            title: "Section 6: Third Party",
            body: <p>We are not responsible for third-party services.</p>,
          },
          {
            title: "Section 7: Billing",
            body: <p>We may refuse suspicious or bulk orders.</p>,
          },
          {
            title: "Section 8: Personal Info",
            body: <p>Your data is handled under our privacy policy.</p>,
          },
          {
            title: "Section 9: Errors",
            body: <p>We may correct errors anytime.</p>,
          },
          {
            title: "Section 10: Prohibited Use",
            body: (
              <ul className="list-disc pl-5 space-y-1 text-gray-600">
                <li>Illegal activity</li>
                <li>Fake information</li>
                <li>Harassment</li>
                <li>Malware uploads</li>
              </ul>
            ),
          },
          {
            title: "Section 11: Indemnification",
            body: <p>You agree to protect us from legal claims.</p>,
          },
          {
            title: "Section 12: Termination",
            body: <p>Access can be terminated on violation.</p>,
          },
          {
            title: "Section 13: Agreement",
            body: <p>This is the complete agreement.</p>,
          },
          {
            title: "Section 14: Contact",
            body: (
              <p>
                Contact us at{" "}
                <span className="text-[#dd3333] font-semibold">
                  support@ambeji.in
                </span>
              </p>
            ),
          },
        ].map((sec, i) => (
          <div
            key={i}
            className="border border-gray-200 p-8 rounded-2xl hover:shadow-lg transition"
          >
            <h2 className="font-semibold text-[#dd3333] mb-3 text-base">
              {sec.title}
            </h2>
            <div className="text-gray-600">{sec.body}</div>
          </div>
        ))}

      </section>

      {/* ================= CTA ================= */}
      <section className="bg-[#111] text-white py-16 text-center px-6">
        <h2 className="text-2xl font-bold mb-4">
          Need Help?
        </h2>

        <p className="text-gray-400 text-sm mb-6">
          Contact our support team for any questions.
        </p>

        <a
          href="mailto:support@ambeji.in"
          className="inline-block px-8 py-3 bg-[#dd3333] text-white text-sm font-semibold rounded-full hover:bg-[#bb2222] transition"
        >
          Contact Support
        </a>
      </section>

    </div>
  );
};

export default Terms;