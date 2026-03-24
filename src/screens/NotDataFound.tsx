import React from "react";
import { motion } from "framer-motion";

interface NoDataFoundProps {
  name?: string;
  message?: string;
  iconName?: string;
  className?: string;
}
const NoDataFound: React.FC<NoDataFoundProps> = ({
  name,
  message,
  iconName,
  className = "",
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className={`h-[63vh] w-full flex flex-col items-center justify-center text-gray-400 ${className}`}
    >
      {iconName && (
        <span className="material-symbols-outlined text-[72px] text-gray-400 mb-4">
          {iconName}
        </span>
      )}

      <p className="text-lg font-medium">
        {message || `No ${name ?? "data"} found.`}
      </p>
    </motion.div>
  );
};

export default NoDataFound;
