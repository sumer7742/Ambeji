import React, { useState } from "react";

const Shipping: React.FC = () => {
  const [open, setOpen] = useState<number | null>(0);

  const sections = [
    {
      title: "Shipping Overview",
      content:
        "Shipping timelines depend on sellers, product availability, and delivery location. Check product page for exact delivery estimates.",
    },
    {
      title: "Delivery Timeline",
      content:
        "Delivery may vary due to holidays or courier delays. Sundays and public holidays are excluded from business days.",
    },
    {
      title: "Estimated Delivery",
      content:
        "Delivery depends on seller location, product availability, and your delivery address. Enter pincode for exact timeline.",
    },
    {
      title: "Serviceability",
      content:
        "Delivery availability depends on courier partners, seller preferences, and legal restrictions.",
    },
    {
      title: "Cash on Delivery",
      content:
        "CoD depends on location and order value. Enter your pincode to check availability.",
    },
    {
      title: "Returns & Pickup",
      content:
        "Contact support to initiate return. Pickup will be arranged where possible.",
    },
    {
      title: "Missing Delivery",
      content:
        "If order is marked delivered but not received, report within 7 days.",
    },
    {
      title: "International Shipping",
      content:
        "Currently, delivery is available only within India.",
    },
  ];

  return (
    <div className="bg-white text-gray-900 min-h-screen font-sans">

      {/* HEADER */}
      <section className="bg-black text-white py-16 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold">
          Shipping & Delivery
        </h1>
        <p className="mt-3 text-gray-300">
          Fast, reliable & transparent delivery experience
        </p>
      </section>

      {/* PRINT BUTTON */}
      <div className="max-w-6xl mx-auto px-6 mt-6 flex justify-end">
        <button
          onClick={() => window.print()}
          className="border border-[#dd3333] text-[#dd3333] px-5 py-2 rounded-full hover:bg-[#dd3333] hover:text-white transition"
        >
          Print Policy
        </button>
      </div>

      {/* QUICK HIGHLIGHTS */}
      <section className="max-w-6xl mx-auto px-6 py-10 grid md:grid-cols-3 gap-6">
        {[
          { title: "Fast Dispatch", desc: "Orders shipped quickly" },
          { title: "Pan India Delivery", desc: "We deliver across India" },
          { title: "Secure Packaging", desc: "Safe & damage-free delivery" },
        ].map((item, i) => (
          <div
            key={i}
            className="border border-gray-200 rounded-2xl p-6 text-center hover:shadow-lg transition"
          >
            <h3 className="font-semibold text-lg">{item.title}</h3>
            <p className="text-sm text-gray-500 mt-2">{item.desc}</p>
          </div>
        ))}
      </section>

      {/* ACCORDION */}
      <section className="max-w-5xl mx-auto px-6 py-6 space-y-4">
        {sections.map((sec, i) => (
          <div key={i} className="border border-gray-200 rounded-xl">
            
            <button
              onClick={() => setOpen(open === i ? null : i)}
              className="w-full flex justify-between items-center px-6 py-4 font-semibold text-left hover:bg-gray-50"
            >
              {sec.title}
              <span className="text-[#dd3333] text-xl">
                {open === i ? "−" : "+"}
              </span>
            </button>

            {open === i && (
              <div className="px-6 pb-4 text-sm text-gray-600">
                {sec.content}
              </div>
            )}
          </div>
        ))}
      </section>

      {/* DELIVERY STEPS */}
      <section className="bg-gray-50 py-14">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-2xl font-bold mb-8 text-center">
            How Delivery Works
          </h2>

          <div className="space-y-6">
            {[
              "Order Placed",
              "Order Packed",
              "Shipped",
              "Out for Delivery",
              "Delivered",
            ].map((step, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="w-8 h-8 flex items-center justify-center rounded-full bg-[#dd3333] text-white text-sm">
                  {i + 1}
                </div>
                <p className="text-gray-700">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRODUCT TAGS */}
      <section className="max-w-6xl mx-auto px-6 py-14">
        <h2 className="text-2xl font-bold mb-8 text-center">
          Product Availability
        </h2>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {[
            "In Stock",
            "Available",
            "Preorder",
            "Out of Stock",
            "Imported",
            "Back Soon",
            "Temporarily Unavailable",
            "Discontinued",
          ].map((tag, i) => (
            <div
              key={i}
              className="border border-gray-200 rounded-xl p-4 text-center hover:border-[#dd3333] transition"
            >
              {tag}
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#dd3333] text-white text-center py-14">
        <h2 className="text-3xl font-bold">
          Have Questions About Delivery?
        </h2>
        <p className="mt-2 opacity-90">
          Our support team is here to help you anytime
        </p>

        <button className="mt-6 bg-white text-[#dd3333] px-8 py-3 rounded-full font-semibold hover:scale-105 transition">
          Contact Support
        </button>
      </section>

    </div>
  );
};

export default Shipping;