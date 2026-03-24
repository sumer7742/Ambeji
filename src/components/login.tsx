import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";


import { useLoginUser, type LoginPayload } from "../hooks/useUser";
import { handleQueryToast } from "../common/utils/queryToast";
import { useUser } from "../constant/UserProvider";

const Login: React.FC = () => {
  const { register, handleSubmit, formState } = useForm<LoginPayload>({
    mode: "onSubmit",
  });
  const { errors } = formState;

  const navigate = useNavigate();
  const loginMutation = useLoginUser();
  const { login } = useUser();

  const [showPassword, setShowPassword] = useState(false);
  const [googleLoading] = useState(false);

  const onSubmit = (formData: LoginPayload) => {
    const { onSuccess, onError } = handleQueryToast({
      onSuccess: (res: any) => {
        const loggedIn = login(res);
        if (loggedIn) {
          localStorage.removeItem("cart");
          navigate("/");
        }
      },
    });

    loginMutation.mutate({ data: formData }, { onSuccess, onError });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 via-white to-red-100 px-4">

      {/* ================= CARD ================= */}
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden grid md:grid-cols-2">

        {/* ================= LEFT SIDE ================= */}
        <div className="hidden md:flex flex-col justify-between p-10 bg-gradient-to-br from-[#DD3333] to-red-500 text-white">
          <div>
            <img   src="https://ambeji.com/wp-content/uploads/2021/09/logo-ambeji-l-e1757655211871.png" alt="logo" className="w-40 mb-6" />
            <h1 className="text-3xl font-bold mb-3">
              Welcome Back 👋
            </h1>
            <p className="text-sm text-white/90">
              Login to access your orders, wishlist, and personalized recommendations.
            </p>
          </div>

          <p className="text-xs text-white/80">
            © {new Date().getFullYear()} Ambeji
          </p>
        </div>

        {/* ================= RIGHT SIDE ================= */}
        <div className="p-8 sm:p-10 flex flex-col justify-center">

          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Login to Your Account
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

            {/* Email */}
            <div>
              <input
                type="email"
                placeholder="Email or Mobile Number"
                {...register("email", { required: "Email is required" })}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 text-sm
                           focus:outline-none focus:ring-2 focus:ring-[#DD3333]"
              />
              {errors.email && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                {...register("password", {
                  required: "Password is required",
                })}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 text-sm
                           focus:outline-none focus:ring-2 focus:ring-[#DD3333]"
              />

              <button
                type="button"
                onClick={() => setShowPassword((p) => !p)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-[#DD3333]"
              >
                {showPassword ? "HIDE" : "SHOW"}
              </button>

              {errors.password && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Forgot */}
            <div className="text-right">
              <Link
                to="/forget"
                className="text-xs text-[#DD3333] font-medium"
              >
                Forgot Password?
              </Link>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={loginMutation.isPending}
              className="w-full bg-[#DD3333] text-white py-3 rounded-xl text-sm font-semibold
                         hover:bg-red-600 transition shadow-md disabled:opacity-60"
            >
              {loginMutation.isPending ? "Logging in..." : "Login"}
            </button>
          </form>

          {/* OR */}
          <div className="text-center text-xs text-gray-400 my-4">OR</div>

          {/* Google */}
          <button
            disabled={googleLoading}
            className="w-full flex items-center justify-center gap-3
                       border border-gray-300 py-3 rounded-xl text-sm font-medium
                       hover:bg-gray-50 transition"
          >
            <FcGoogle className="text-lg" />
            Continue with Google
          </button>

          {/* Signup */}
          <div className="text-center mt-6">
            <Link
              to="/signup"
              className="text-sm text-[#DD3333] font-semibold"
            >
              New user? Create an account
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

export default Login;