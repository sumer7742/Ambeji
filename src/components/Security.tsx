import React from "react";

const Security: React.FC = () => {
  const sections = [
    {
      title: "Data Protection",
      desc: "We use advanced encryption and secure systems to protect your personal information and ensure complete privacy.",
    },
    {
      title: "Secure Transactions",
      desc: "All payments are processed through trusted and secure gateways to ensure safe and seamless transactions.",
    },
    {
      title: "Continuous Monitoring",
      desc: "Our platform is regularly monitored and updated to prevent security threats and ensure a safe shopping experience.",
    },
  ];

  return (
    <div className="bg-white text-black">

      {/* HERO */}
      <section className="py-20 px-6 text-center border-b">
        <h1 className="text-4xl md:text-5xl font-semibold tracking-wide">
          Security
        </h1>
        <p className="mt-4 text-gray-500 max-w-xl mx-auto text-sm md:text-base">
          Your safety is our priority. We ensure a secure and trusted shopping experience.
        </p>
      </section>

      {/* CONTENT */}
      <section className="max-w-5xl mx-auto px-6 py-16 space-y-12">

        {sections.map((item, index) => (
          <div key={index} className="border-b pb-6">
            <h2 className="text-xl md:text-2xl font-medium mb-2 tracking-wide">
              {item.title}
            </h2>
            <p className="text-gray-500 text-sm md:text-base leading-relaxed max-w-2xl">
              {item.desc}
            </p>
          </div>
        ))}

      </section>

     

    </div>
  );
};

export default Security;