import React, { useState } from "react";

const Refund: React.FC = () => {
  const [open, setOpen] = useState<number | null>(0);

  const sections = [
    {
      title: "Cancellation Policy",
      content: (
        <>
          <p>Orders can be cancelled before dispatch. Once shipped, cancellation is not allowed.</p>
          <p>Cancellation timelines may vary by product category.</p>
          <p>If seller cancels, full refund will be issued.</p>
        </>
      ),
    },
    {
      title: "Hyperlocal Cancellation",
      content: (
        <>
          <p>Minutes delivery orders are non-cancellable except:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Delay in delivery</li>
            <li>Order not picked</li>
            <li>Seller cancelled</li>
          </ul>
        </>
      ),
    },
    {
      title: "Returns Policy",
      content: (
        <>
          <p>Returns depend on seller policy.</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Damaged product</li>
            <li>Wrong item</li>
            <li>Manufacturing defect</li>
          </ul>
        </>
      ),
    },
    {
      title: "Return Process",
      content: (
        <>
          <p>Raise return within <b>24 hours</b> of delivery.</p>
          <p className="text-[#dd3333] font-semibold">
            Clearance items are not refundable.
          </p>
        </>
      ),
    },
    {
      title: "How to Raise Return",
      content: (
        <>
          <p>Email issue with proof to:</p>
          <p className="font-semibold">support@ambeji.in</p>
          <p>Pickup in 2–3 days → Refund in 2–3 days.</p>
        </>
      ),
    },
    {
      title: "Important Conditions",
      content: (
        <>
          <ul className="list-disc pl-5 space-y-1">
            <li>Original packaging required</li>
            <li>Unused condition</li>
            <li>No cancellation after confirmation</li>
          </ul>
        </>
      ),
    },
  ];

  return (
    <div className="bg-white text-gray-900 min-h-screen font-sans">

      {/* HEADER */}
      <section className="bg-black text-white py-16 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold">
          Returns & Refunds
        </h1>
        <p className="mt-3 text-gray-300">
          Simple & transparent policies for your peace of mind
        </p>
      </section>

      {/* PRINT BUTTON */}
      <div className="max-w-5xl mx-auto px-6 mt-6 flex justify-end">
        <button
          onClick={() => window.print()}
          className="border border-[#dd3333] text-[#dd3333] px-5 py-2 rounded-full hover:bg-[#dd3333] hover:text-white transition"
        >
          Print Policy
        </button>
      </div>

      {/* ACCORDION SECTION */}
      <section className="max-w-5xl mx-auto px-6 py-12 space-y-4">
        {sections.map((sec, i) => (
          <div
            key={i}
            className="border border-gray-200 rounded-xl overflow-hidden"
          >
            {/* Title */}
            <button
              onClick={() => setOpen(open === i ? null : i)}
              className="w-full flex justify-between items-center px-6 py-4 text-left font-semibold text-lg hover:bg-gray-50 transition"
            >
              <span>{sec.title}</span>
              <span className="text-[#dd3333]">
                {open === i ? "−" : "+"}
              </span>
            </button>

            {/* Content */}
            {open === i && (
              <div className="px-6 pb-4 text-gray-600 text-sm space-y-2">
                {sec.content}
              </div>
            )}
          </div>
        ))}
      </section>

      {/* TIMELINE STYLE */}
      <section className="bg-gray-50 py-14">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-2xl font-bold mb-8 text-center">
            Return Timeline
          </h2>

          <div className="space-y-6">
            {[
              "Request Return",
              "Pickup Scheduled",
              "Product Inspection",
              "Refund Processed",
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

      {/* CTA */}
      <section className="bg-[#dd3333] text-white text-center py-14">
        <h2 className="text-3xl font-bold">
          Need Help With Your Order?
        </h2>
        <p className="mt-2 opacity-90">
          Our support team is always ready to assist you
        </p>

        <button className="mt-6 bg-white text-[#dd3333] px-8 py-3 rounded-full font-semibold hover:scale-105 transition">
          Contact Support
        </button>
      </section>

    </div>
  );
};

export default Refund;