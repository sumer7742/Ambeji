import React from "react";
import ShopNowSection from "../screens/ShopNowSection";
import { useForm, type FieldError } from "react-hook-form";
import toast from "react-hot-toast";
import type { ContactFormValues } from "../common/types/types";
import apiClient from "../constant/apiclient";

const getErrorMessage = (error?: string | FieldError | null): string | null => {
  if (!error) return null;
  if (typeof error === "string") return error;
  if ("message" in error && typeof error.message === "string") return error.message;
  return null;
};

const ContactUs: React.FC = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>();

  const onSubmit = async (values: ContactFormValues) => {
    const toastId = toast.loading("Sending message...");
    try {
      const payload = {
        name: values.name.trim(),
        email: values.email.trim(),
        phone: values.phone?.trim() || "",
        subject: values.subject?.trim() || "",
        message: values.message.trim(),
      };
      await apiClient.post("contact", payload);
      toast.dismiss(toastId);
      toast.success("Message sent successfully ❤️");
      reset();
    } catch (err: any) {
      toast.dismiss(toastId);
      toast.error(err?.response?.data?.message || err?.message || "Something went wrong.");
    }
  };

  return (
    <div className="min-h-screen bg-[#fff5f5] font-sans pt-10">

      {/* HERO */}
      <section className="max-w-7xl mx-auto px-6">
        <h1 className="text-5xl sm:text-6xl font-extrabold text-center text-[#dd3333] mb-6">
          Contact Fashion Hub
        </h1>
        <p className="text-center text-gray-600 text-lg sm:text-xl max-w-2xl mx-auto mb-12">
          Need help with your orders, styles, or sizes? We’re here for you.
        </p>

        {/* Grid */}
        <div className="grid lg:grid-cols-2 gap-12">

          {/* Info */}
          <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 space-y-6">
            <h2 className="text-3xl font-bold text-[#dd3333] mb-4">Get in Touch</h2>

            <div className="space-y-4 text-gray-700">
              <div className="flex items-center gap-3">
                <span className="text-2xl">📧</span>
                <a href="mailto:support@fashionhub.com" className="hover:underline">
                  support@ambeji.com
                </a>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-2xl">📞</span>
                <a href="tel:+911234567890" className="hover:underline">
                  +91 12345 67890
                </a>
              </div>

              <div className="flex items-start gap-3">
                <span className="text-2xl">📍</span>
                <p>
                  Gurugram, Haryana – Premium Fashion Store
                </p>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100">
            <h2 className="text-3xl font-bold text-[#dd3333] mb-6">
              Send Message
            </h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <InputField label="Name" register={register("name", { required: "Name is required" })} error={errors.name} />
                <InputField
                  label="Email"
                  type="email"
                  register={register("email", {
                    required: "Email is required",
                    pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Invalid email" }
                  })}
                  error={errors.email}
                />
              </div>

              <InputField
                label="Phone"
                type="tel"
                register={register("phone", {
                  pattern: { value: /^[0-9]{7,15}$/, message: "Invalid phone" }
                })}
                error={errors.phone}
              />

              <InputField label="Subject" register={register("subject")} />

              <TextareaField
                label="Message"
                register={register("message", {
                  required: "Message is required",
                  minLength: { value: 10, message: "At least 10 characters" }
                })}
                error={errors.message}
              />

              <div className="flex gap-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 bg-[#dd3333] hover:bg-[#b82a2a] text-white font-semibold px-6 py-3 rounded-xl shadow transition"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </button>

                <button
                  type="button"
                  onClick={() => reset()}
                  className="flex-1 border border-gray-400 hover:bg-gray-100 px-6 py-3 rounded-xl transition"
                >
                  Reset
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto mt-16 grid md:grid-cols-3 gap-8 px-6">
        {[
          { icon: "🚚", title: "Fast Delivery", desc: "Quick shipping across India." },
          { icon: "👗", title: "Latest Fashion", desc: "Trendy & premium clothing styles." },
          { icon: "💳", title: "Secure Payment", desc: "100% safe checkout process." },
        ].map((item, index) => (
          <div key={index} className="bg-white p-6 rounded-3xl shadow-lg hover:scale-105 transition">
            <div className="text-4xl mb-3">{item.icon}</div>
            <h3 className="text-xl font-bold text-[#dd3333] mb-2">{item.title}</h3>
            <p className="text-gray-600">{item.desc}</p>
          </div>
        ))}
      </section>

      {/* Map */}
      <section className="mt-16 max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-[#dd3333] text-center mb-6">
          Visit Our Store
        </h2>
        <div className="w-full h-[400px] rounded-3xl overflow-hidden shadow-lg border">
          <iframe
            src="https://www.google.com/maps?q=gurugram&output=embed"
            width="100%"
            height="100%"
            loading="lazy"
            className="border-0"
            title="Location"
          />
        </div>
      </section>

      <ShopNowSection />
    </div>
  );
};

export default ContactUs;

/* INPUT */
const InputField = ({ label, type = "text", register, error }: any) => (
  <div className="relative">
    <input
      type={type}
      {...register}
      placeholder=" "
      className={`peer w-full h-14 px-4 border rounded-xl focus:outline-none focus:border-[#dd3333] ${error ? "border-red-400" : "border-gray-300"}`}
    />
    <label className="absolute left-4 top-4 text-gray-400 transition-all peer-focus:-top-3 peer-focus:text-sm bg-white px-1">
      {label}
    </label>
    {error && <p className="text-xs text-red-500 mt-1">{getErrorMessage(error)}</p>}
  </div>
);

/* TEXTAREA */
const TextareaField = ({ label, register, error }: any) => (
  <div className="relative">
    <textarea
      {...register}
      rows={4}
      placeholder=" "
      className={`peer w-full px-4 py-4 border rounded-xl focus:outline-none focus:border-[#dd3333] ${error ? "border-red-400" : "border-gray-300"}`}
    />
    <label className="absolute left-4 top-4 text-gray-400 transition-all peer-focus:-top-3 peer-focus:text-sm bg-white px-1">
      {label}
    </label>
    {error && <p className="text-xs text-red-500 mt-1">{getErrorMessage(error)}</p>}
  </div>
);