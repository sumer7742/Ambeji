import { Loader } from "lucide-react";
import React from "react";

interface LoadingProps {
  isNotFixed?: boolean;
  h?: string;
}

const LoadingOverlay: React.FC<LoadingProps> = ({ isNotFixed = false, h }) => {
  React.useEffect(() => {
    if (!isNotFixed) window.scrollTo(0, 0);
  }, [isNotFixed]);

  return (
    <div
      className={`${
        !isNotFixed ? "fixed inset-0" : "inset-0"
      } ${h ?? ""} flex items-center justify-center bg-white/60 backdrop-blur-sm z-[70] w-full `}
    >
      <div className="flex flex-col items-center justify-center space-y-4">
        <div className="relative">
          <Loader className="w-12 h-12 text-orange-500 animate-spin" />
          <div className="absolute inset-0 rounded-full border-4 border-orange-300 opacity-20 animate-ping"></div>
        </div>
        <p className="text-gray-700 font-medium animate-pulse">
          Loading, please wait...
        </p>
      </div>
    </div>
  );
};

export default LoadingOverlay;
