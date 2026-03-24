import { useForm } from "react-hook-form";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Ambeji } from "../assets";
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

  const { register, handleSubmit, formState: { errors } } =
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
    <div className="min-h-screen bg-[#fff5f5] flex justify-center items-center px-4">
      
      {/* Card */}
      <div className="w-full max-w-4xl bg-white shadow-xl rounded-2xl overflow-hidden flex flex-col md:flex-row">

        {/* LEFT */}
        <div className="md:w-2/5 w-full bg-[#dd3333] text-white p-8 flex flex-col justify-between">
          <div>
            <img src={Ambeji} alt="logo" className="w-32 mb-6" />
            <h1 className="text-2xl font-semibold mb-3">Forgot Password</h1>
            <p className="text-sm opacity-90">
              Reset your password securely using OTP verification.
            </p>
          </div>
          <p className="text-xs opacity-80">© {new Date().getFullYear()}</p>
        </div>

        {/* RIGHT */}
        <div className="md:w-3/5 w-full px-8 py-10">

          <form
            onSubmit={handleSubmit(submitted ? onResetPassword : onSendOtp)}
            className="space-y-5"
          >

            {/* Toggle */}
            <div className="flex bg-gray-100 rounded-xl overflow-hidden">
              <button
                type="button"
                onClick={() => setMethod("mobile")}
                disabled={submitted}
                className={`flex-1 py-2 text-sm font-medium transition ${
                  method === "mobile"
                    ? "bg-[#dd3333] text-white"
                    : "text-gray-600"
                }`}
              >
                Phone
              </button>

              <button
                type="button"
                onClick={() => setMethod("email")}
                disabled={submitted}
                className={`flex-1 py-2 text-sm font-medium transition ${
                  method === "email"
                    ? "bg-[#dd3333] text-white"
                    : "text-gray-600"
                }`}
              >
                Email
              </button>
            </div>

            {/* Input */}
            {method === "mobile" ? (
              <div>
                <input
                  type="text"
                  {...register("mobile", { required: "Mobile required" })}
                  placeholder="Enter mobile number"
                  disabled={submitted}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm
                             focus:ring-2 focus:ring-[#dd3333] focus:outline-none"
                />
                {errors.mobile && <p className="text-red-500 text-sm">{errors.mobile.message}</p>}
              </div>
            ) : (
              <div>
                <input
                  type="email"
                  {...register("email", { required: "Email required" })}
                  placeholder="Enter email"
                  disabled={submitted}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm
                             focus:ring-2 focus:ring-[#dd3333] focus:outline-none"
                />
                {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
              </div>
            )}

            {/* OTP + Password */}
            {submitted && (
              <>
                <input
                  type="text"
                  {...register("otp", { required: "OTP required" })}
                  placeholder="Enter OTP"
                  className="input-style"
                />

                <input
                  type="password"
                  {...register("newPassword")}
                  placeholder="New Password"
                  className="input-style"
                />

                <input
                  type="password"
                  {...register("confirmPassword")}
                  placeholder="Confirm Password"
                  className="input-style"
                />
              </>
            )}

            {/* Button */}
            <button
              type="submit"
              disabled={isSendingOtp || isResettingPassword}
              className="w-full bg-[#dd3333] text-white py-3 rounded-xl font-medium
                         hover:bg-[#b82a2a] transition"
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

          {/* Back */}
          <div className="text-center mt-6">
            <Link
              to="/login"
              className="text-[#dd3333] text-sm font-medium hover:underline"
            >
              ← Back to Login
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Forget;