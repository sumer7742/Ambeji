import React from "react";

interface PageHeadlineProps {
  title: string;
  subtitle?: string;
  component?: React.ReactNode; // Accept any renderable content like buttons, links, etc.
}

const PageHeadline: React.FC<PageHeadlineProps> = ({ title, subtitle, component }) => {
  return (
   <div className="px-6 py-2 rounded-t-xl shadow-sm flex items-center justify-between gap-4  lg:flex-nowrap custom-scroll w-full mb-4">
      {/* Left Side */}
      <div className="flex items-center gap-3 min-w-0">
 
        <div className="truncate">
          <h1 className="sm:text-2xl text-sm font-semibold tracking-wide text-black">
            {title}
          </h1>
          {subtitle && <p className="text-sm text-gray-300">{subtitle}</p>}
        </div>
      </div>

      {/* Right Side */}
      {component && (
        <div className="flex justify-end">
          {component}
        </div>
      )}
    </div>
  );
};

export default PageHeadline;
