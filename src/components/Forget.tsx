import { useForm } from "react-hook-form";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { unibcompLogo3 } from "../assets";
import { useRequestOtp, useVerifyUser } from "../hooks/useUser";
import { handleQueryToast } from "../common/utils/queryToast";
import toast from "react-hot-toast";

interface ForgetPasswordForm {
  email?: string;
  mobile?: string;
  otp?: string;
  newPassword?: string;
  confirmPassword?: string;
}

const Forget: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [method, setMethod] = useState<"mobile" | "email">("mobile");
  const [userId, setUserId] = useState<string>("");
  const navigate = useNavigate();

  const { register, handleSubmit, watch, formState: { errors } } =
    useForm<ForgetPasswordForm>();

  const { mutate: sendOtp, isPending: isSendingOtp } = useRequestOtp();
  const { mutate: resetPassword, isPending: isResettingPassword } =
    useVerifyUser();

  const onSendOtp = (data: ForgetPasswordForm) => {
    const payload = method === "mobile" ? { mobile: data.mobile } : { email: data.email };
    sendOtp(payload, {
      ...handleQueryToast({
        onSuccess: (res: any) => {
          setUserId(res.data.id);
          setSubmitted(true);
        },
      }),
    });
  };

  const onResetPassword = (data: ForgetPasswordForm) => {
    if (!data.otp || !data.newPassword || !data.confirmPassword) {
      toast.error("All fields are required");
      return;
    }
    if (data.newPassword !== data.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    resetPassword(
      {
        id: userId,
        otp: data.otp,
        password: data.newPassword,
        confirmPassword: data.confirmPassword,
      },
      {
        ...handleQueryToast({
          onSuccess: () => navigate("/login"),
        }),
      }
    );
  };

  return (
    <div className="h-screen bg-gray-100 flex justify-center items-center "style={{ height: "84vh" }}>
      {/* Main Card */}
      <div className="w-full max-w-4xl bg-white shadow-lg flex md:flex-row  flex-col overflow-hidden mt-2" style={{ height: "80vh" }}>
        
        {/* Left Panel: Branding & Info */}
        <div className="md:w-2/5 w-full bg-[#2874F0] text-white p-8 flex flex-col justify-between">
          <div>
            <img src={unibcompLogo3} alt="Unibcomp" className="w-36 mb-6" />
            <h1 className="text-2xl font-semibold mb-3">Forgot Password</h1>
            <p className="text-sm leading-relaxed opacity-90">
              Choose a method to reset your password. Enter your details and we'll send you an OTP for verification.
            </p>
          </div>
          <p className="text-xs opacity-80">© {new Date().getFullYear()} Unibcomp</p>
        </div>

        {/* Right Panel: Form */}
        <div className="md:w-3/5 w-full px-10  flex flex-col justify-center pb-24">
          <form
            onSubmit={handleSubmit(submitted ? onResetPassword : onSendOtp)}
            className="space-y-5"
          >
            {/* Toggle Method: Phone / Email */}
            <div className="flex justify-center mb-6">
              <button
                type="button"
                onClick={() => setMethod("mobile")}
                disabled={submitted}
                className={`px-6 py-3 rounded-l-xl border ${method === "mobile" ? "text-blue-600 bg-gray-100 " : "text-gray-600"} ${submitted ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                Phone
              </button>
              <button
                type="button"
                onClick={() => setMethod("email")}
                disabled={submitted}
                className={`px-6 py-3 rounded-r-xl border ${method === "email" ? "text-blue-600 bg-gray-100 " : " text-gray-600"} ${submitted ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                Email
              </button>
            </div>

            {/* Mobile / Email Input */}
            {method === "mobile" ? (
              <div>
                <input
                  type="text"
                  {...register("mobile", {
                    required: "Mobile number is required",
                    minLength: { value: 10, message: "Mobile must be 10 digits" },
                    maxLength: { value: 10, message: "Mobile must be 10 digits" },
                  })}
                  placeholder="Mobile Number"
                  className={`w-full border-b border-gray-300 py-2.5 text-sm
                           focus:outline-none focus:border-[#2874F0] ${submitted ? "bg-gray-100 cursor-not-allowed" : ""}`}
                  disabled={submitted}
                />
                {errors.mobile && <p className="text-sm text-red-500">{errors.mobile.message}</p>}
              </div>
            ) : (
              <div>
                <input
                  type="email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Za-z][A-Za-z0-9._%+-]*@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
                      message: "Email must start with a letter and be valid.",
                    },
                  })}
                  placeholder="Email Address"
                  className={`w-full border-b border-gray-300 py-2.5 text-sm
                           focus:outline-none focus:border-[#2874F0] ${submitted ? "bg-gray-100 cursor-not-allowed" : ""}`}
                  disabled={submitted}
                  
                />
                {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
              </div>
            )}

            {/* OTP + Password (for submitted state) */}
            {submitted && (
              <>
                <input
                  type="text"
                  maxLength={6}
                  inputMode="numeric"
                  {...register("otp", { required: "OTP is required" })}
                  placeholder="Enter OTP"
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                />
                {errors.otp && <p className="text-sm text-red-500">{errors.otp.message}</p>}

                <input
                  type="password"
                  {...register("newPassword", { required: "New password is required" })}
                  placeholder="New Password"
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                />
                {errors.newPassword && <p className="text-sm text-red-500">{errors.newPassword.message}</p>}

                <input
                  type="password"
                  {...register("confirmPassword", {
                    required: "Confirm password is required",
                    validate: (value) => value === watch("newPassword") || "Passwords do not match",
                  })}
                  placeholder="Confirm Password"
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                />
                {errors.confirmPassword && <p className="text-sm text-red-500">{errors.confirmPassword.message}</p>}
              </>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-[#FB641B] text-white py-2.5
                         text-sm font-semibold rounded-sm
                         hover:opacity-90 transition
                         disabled:opacity-60"
              disabled={isSendingOtp || isResettingPassword}
            >
              {submitted
                ? isResettingPassword
                  ? "Resetting..."
                  : "Reset Password"
                : isSendingOtp
                  ? "Sending..."
                  : "Send OTP"}
            </button>
          </form>

          {/* Back to Login */}
          <div className="text-center mt-6">
            <Link
              to="/login"
              className="inline-flex items-center text-blue-600 font-medium text-sm hover:text-blue-800 hover:underline transition"
            >
              <span className="mr-1">←</span> Back to Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Forget;
