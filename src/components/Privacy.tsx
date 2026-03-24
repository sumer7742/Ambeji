import React from "react";

const Privacy: React.FC = () => {
  const sections = [
    {
      title: "Information We Collect",
      desc: "We collect personal details like name, contact, delivery address, and browsing behavior to improve your shopping experience.",
    },
    {
      title: "How We Use Your Data",
      desc: "Your data helps us process orders, personalize recommendations, improve services, and communicate updates.",
    },
    {
      title: "Sharing of Information",
      desc: "We only share data with trusted partners like delivery services and payment gateways. We never sell your data.",
    },
    {
      title: "Cookies & Tracking",
      desc: "We use cookies to enhance browsing, remember preferences, and analyze website performance.",
    },
    {
      title: "Data Security",
      desc: "We use industry-standard security measures to protect your personal information.",
    },
    {
      title: "Your Rights",
      desc: "You can request access, correction, or deletion of your personal data anytime.",
    },
  ];

  return (
    <div className="bg-white text-black">

      {/* HERO */}
      <section className="py-20 px-6 text-center border-b">
        <h1 className="text-4xl md:text-5xl font-bold tracking-wide">
          Privacy Policy
        </h1>
        <p className="mt-4 text-gray-500 max-w-xl mx-auto text-sm md:text-base">
          Your privacy matters to us. Learn how we handle your personal data.
        </p>
      </section>

      {/* CONTENT GRID */}
      <section className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-10">
        {sections.map((item, index) => (
          <div
            key={index}
            className="group border-b pb-6 hover:opacity-80 transition"
          >
            <h2 className="text-xl font-semibold mb-2 tracking-wide">
              {item.title}
            </h2>
            <p className="text-gray-500 text-sm leading-relaxed">
              {item.desc}
            </p>
          </div>
        ))}
      </section>

      {/* FULL WIDTH BANNER */}
      <section className="bg-black text-white py-16 px-6 text-center">
        <h2 className="text-2xl md:text-3xl font-semibold">
          Your Data. Your Control.
        </h2>
        <p className="mt-3 text-gray-300 text-sm max-w-xl mx-auto">
          You can request your data, update it, or delete it anytime by contacting us.
        </p>
        <a
          href="mailto:privacy@yourstore.com"
          className="inline-block mt-6 border border-white px-6 py-3 text-sm hover:bg-white hover:text-black transition"
        >
          Contact Us
        </a>
      </section>

     
    </div>
  );
};

export default Privacy;