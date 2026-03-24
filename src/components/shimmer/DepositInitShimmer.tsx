import React, { useEffect, useState } from "react";
import {
  Loader2,
  ShieldCheck,
  Lock,
  AlertTriangle,
  CheckCircle2,
  Timer,
} from "lucide-react";

const DepositInitShimmer: React.FC = () => {
  const [seconds, setSeconds] = useState(20);

useEffect(() => {
  const timer = setInterval(() => {
    setSeconds((prev) => {
      if (prev === 1) {
        return 10;
      }
      return prev > 0 ? prev - 1 : 0;
    });
  }, 1000);

  return () => clearInterval(timer);
}, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-gray-100 z-50 px-4">

      <div className="w-full max-w-md bg-white/90 backdrop-blur-xl shadow-2xl rounded-2xl border border-gray-200 overflow-hidden">

        {/* 🔴 TOP DON'T REFRESH BAR */}
        <div className="bg-gradient-to-r from-red-600 to-red-500 text-white text-center py-3 px-4">
          <div className="flex items-center justify-center gap-2 text-sm font-semibold">
            <AlertTriangle className="w-4 h-4" />
            DO NOT REFRESH THIS PAGE
          </div>
          <p className="text-xs mt-1 opacity-90">
            कृपया इस पेज को रिफ्रेश या बंद न करें
          </p>
        </div>

        <div className="p-8">

          {/* Countdown Section */}
          <div className="flex items-center justify-center gap-2 mb-6">
            <Timer className="text-blue-600 w-5 h-5" />
            <span className="text-sm font-medium text-gray-600">
              Redirecting in
            </span>
            <span className="text-lg font-bold text-blue-600">
              {seconds}s
            </span>
          </div>

          {/* Secure Header */}
          <div className="flex flex-col items-center text-center space-y-3">
            <div className="bg-green-100 p-3 rounded-full">
              <ShieldCheck className="text-green-600 w-8 h-8" />
            </div>

            <h2 className="text-xl font-semibold text-gray-800">
              Secure Payment Processing
            </h2>

            <p className="text-sm text-gray-500">
              Connecting to Payment Gateway...
            </p>

            <p className="text-xs text-gray-500 font-medium">
              आपको सुरक्षित रूप से पेमेंट गेटवे से जोड़ा जा रहा है।
            </p>
          </div>

          {/* Progress Steps */}
          <div className="mt-8 space-y-4">

            <div className="flex items-center gap-3">
              <CheckCircle2 className="text-green-500 w-5 h-5" />
              <span className="text-sm text-gray-700">
                Transaction Initialized
              </span>
            </div>

            <div className="flex items-center gap-3">
              <Loader2 className="text-blue-500 w-5 h-5 animate-spin" />
              <span className="text-sm text-gray-700">
                Redirecting to Secure Gateway...
              </span>
            </div>

            <div className="flex items-center gap-3 opacity-50">
              <Lock className="w-5 h-5" />
              <span className="text-sm">
                Awaiting Bank Confirmation
              </span>
            </div>

          </div>

          {/* Divider */}
          <div className="my-6 border-t border-gray-200"></div>

          {/* Footer */}
          <p className="text-[11px] text-center text-gray-400">
            🔒 256-bit SSL Secured Transaction
          </p>

        </div>
      </div>
    </div>
  );
};

export default DepositInitShimmer;