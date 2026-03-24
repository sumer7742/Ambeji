import { useNavigate, Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";
import toast from "react-hot-toast";
// import { unibcompLogo3 } from "../assets";
import {
  useRegisterUser,
  useVerifyUser,
  type RegisterPayload,
  type VerifyPayload,
} from "../hooks/useUser";
import { useForm } from "react-hook-form";

type FormValues = {
  fullName: string;
  email?: string;
  mobile?: string;
  otp?: string;
  password?: string;
  confirmPassword?: string;
};

const Signup: React.FC = () => {
  const navigate = useNavigate();

  const [step2, setStep2] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<FormValues>();

  const registerUser = useRegisterUser();
  const verifyUser = useVerifyUser();

  /* ---------------- STEP 1 ---------------- */
  const handleStep1 = (data: RegisterPayload) => {
    if (!data.email && !data.mobile) {
      setError("email", { message: "Email or Mobile is required" });
      setError("mobile", { message: "Email or Mobile is required" });
      return;
    }

    clearErrors(["email", "mobile"]);

    registerUser.mutate(
      { data },
      {
        onSuccess: (res: any) => {
          toast.success(res?.message || "OTP sent successfully!");
          setUserId(res?.result?.id || null);
          setStep2(true);
        },
        onError: (err: any) => {
          toast.error(
            err?.response?.data?.message || "Registration failed"
          );
        },
      }
    );
  };

  /* ---------------- STEP 2 ---------------- */
  const handleStep2 = async (data: FormValues) => {
    if (!userId) {
      toast.error("User not found");
      return;
    }

    if (data.password !== data.confirmPassword) {
      setError("confirmPassword", {
        message: "Passwords do not match",
      });
      return;
    }

    const payload: VerifyPayload = {
      id: userId,
      otp: data.otp!,
      password: data.password!,
      confirmPassword: data.confirmPassword!,
    };

    try {
      const res = await verifyUser.mutateAsync(payload);
      toast.success(res?.message || "Account created!");
      navigate("/login");
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Verification failed");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-red-100 flex items-center justify-center px-4">
      <div className="w-full max-w-5xl bg-white shadow-2xl rounded-2xl overflow-hidden flex flex-col md:flex-row">

        {/* LEFT SIDE */}
        <div className="md:w-2/5 w-full bg-[#dd3333] text-white p-10 flex flex-col justify-between">
          <div>
            <img src="https://ambeji.com/wp-content/uploads/2021/09/logo-ambeji-l-e1757655211871.png" className="w-36 mb-6" />
            <h1 className="text-3xl font-bold mb-3">
              {step2 ? "Verify OTP 🔐" : "Create Account 🚀"}
            </h1>
            <p className="text-sm opacity-90">
              {step2
                ? "Enter OTP and set your password"
                : "Join Ambeji and start your journey"}
            </p>
          </div>

          <p className="text-xs opacity-80">
            © {new Date().getFullYear()} Ambeji
          </p>
        </div>

        {/* RIGHT SIDE */}
        <div className="md:w-3/5 w-full px-10 py-10 flex flex-col justify-center">
          <form
            onSubmit={handleSubmit(step2 ? handleStep2 : handleStep1)}
            className="space-y-5"
          >
            {/* Full Name */}
            <div>
              <input
                type="text"
                placeholder="Full Name"
                {...register("fullName", { required: "Name is required" })}
                disabled={step2}
                className="w-full border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#dd3333]"
              />
              {errors.fullName && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.fullName.message}
                </p>
              )}
            </div>

            {/* Mobile */}
            <input
              type="text"
              placeholder="Mobile Number"
              {...register("mobile")}
              disabled={step2}
              className="w-full border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#dd3333]"
            />

            {/* Email */}
            <input
              type="email"
              placeholder="Email Address"
              {...register("email")}
              disabled={step2}
              className="w-full border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#dd3333]"
            />

            {/* STEP 2 */}
            {step2 && (
              <>
                {/* OTP */}
                <input
                  type="text"
                  placeholder="Enter OTP"
                  {...register("otp", { required: "OTP is required" })}
                  className="w-full border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#dd3333]"
                />
                {errors.otp && (
                  <p className="text-xs text-red-500">
                    {errors.otp.message}
                  </p>
                )}

                {/* Password */}
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    {...register("password", {
                      required: "Password required",
                    })}
                    className="w-full border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#dd3333]"
                  />
                </div>

                {/* Confirm Password */}
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                  {...register("confirmPassword", {
                    required: "Confirm password required",
                  })}
                  className="w-full border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#dd3333]"
                />

                {errors.confirmPassword && (
                  <p className="text-xs text-red-500">
                    {errors.confirmPassword.message}
                  </p>
                )}

                {/* Show Password Toggle */}
                <button
                  type="button"
                  onClick={() => setShowPassword((p) => !p)}
                  className="text-xs text-[#dd3333] font-semibold"
                >
                  {showPassword ? "Hide Password" : "Show Password"}
                </button>
              </>
            )}

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-[#dd3333] text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition"
            >
              {step2 ? "Verify & Create Account" : "Send OTP"}
            </button>
          </form>

          {/* Divider */}
          <div className="text-center text-xs text-gray-400 my-5">OR</div>

          {/* Google */}
          <button className="w-full flex items-center justify-center gap-3 border py-3 rounded-lg hover:bg-gray-50">
            <FcGoogle />
            Continue with Google
          </button>

          {/* Login */}
          <div className="text-center mt-6">
            <p className="text-sm text-gray-600">Already have an account?</p>
            <Link
              to="/login"
              className="text-[#dd3333] font-semibold"
            >
              Login →
            </Link>
          </div>

          {/* Back */}
          <div className="text-center mt-3">
            <Link to="/" className="text-xs text-gray-500 underline">
              ← Back to Store
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;