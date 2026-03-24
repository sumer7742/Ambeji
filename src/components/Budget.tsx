import React from "react";
import { useBudgetItems } from "../hooks/useBudgetItem";

const Budget: React.FC = () => {
  const { data, isLoading, isError, error } = useBudgetItems();

  if (isLoading) {
    return <p className="text-center">Loading budget items...</p>;
  }

  if (isError) {
    return (
      <p className="text-center text-red-500">
        Error: {(error as Error).message}
      </p>
    );
  }

  return (
    <div className="my-10 px-4 max-w-7xl mx-auto">
      <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6">
        Budget Buys
      </h2>

      {/* ✅ Grid instead of long horizontal scroll */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {data?.map((item: any) => (
          <div
            key={item._id}
            className="rounded-xl overflow-hidden shadow-md hover:shadow-xl 
                       hover:-translate-y-1 transition-all duration-300"
          >
            <img
              src={item.img}
              alt={item.name}
              className="w-600 h-56 sm:h-64 object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Budget;
