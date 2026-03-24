import React from "react";

const Grievance: React.FC = () => {
  return (
    <div className="bg-white text-black">

      {/* HERO */}
      <section className="py-20 px-6 text-center border-b">
        <h1 className="text-4xl md:text-5xl font-semibold tracking-wide">
          Grievance Policy
        </h1>
        <p className="mt-4 text-gray-500 max-w-xl mx-auto text-sm md:text-base">
          We are committed to resolving your concerns quickly and fairly.
        </p>
      </section>

      {/* CONTENT */}
      <section className="max-w-5xl mx-auto px-6 py-16 space-y-12">

        {/* Intro */}
        <p className="text-gray-600 text-sm md:text-base leading-relaxed max-w-3xl">
          This policy outlines how we handle complaints, concerns, and issues related
          to your shopping experience on our platform.
        </p>

        {/* Sections */}
        <div className="space-y-10">

          <div className="border-b pb-6">
            <h2 className="text-xl md:text-2xl font-medium mb-2 tracking-wide">
              Resolution Process
            </h2>
            <p className="text-gray-500 text-sm leading-relaxed max-w-2xl">
              You can raise concerns regarding orders, payments, or account-related
              issues. Our team carefully reviews each request to ensure a fair resolution.
            </p>
          </div>

          <div className="border-b pb-6">
            <h2 className="text-xl md:text-2xl font-medium mb-2 tracking-wide">
              Response Timeline
            </h2>
            <p className="text-gray-500 text-sm leading-relaxed max-w-2xl">
              We aim to acknowledge your request within 48 hours and resolve it
              within 5–7 business days depending on the complexity.
            </p>
          </div>

          <div className="border-b pb-6">
            <h2 className="text-xl md:text-2xl font-medium mb-2 tracking-wide">
              Contact Support
            </h2>
            <p className="text-gray-500 text-sm leading-relaxed max-w-2xl">
              If your issue is unresolved, you can reach out to our grievance team
              for further assistance.
            </p>

            {/* Contact Block */}
            <div className="mt-4 text-sm text-gray-700 space-y-1">
              <p>Grievance Officer — Your Brand</p>
              <p>support@ambeji.com</p>
              <p>Mon – Fri, 10 AM – 6 PM</p>
            </div>
          </div>

        </div>

      </section>

   
   

     

    </div>
  );
};

export default Grievance;