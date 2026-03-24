import React, { useEffect, useState } from "react";
import type { Filters } from "../common/types/types";
import { useFilter } from "../hooks/useFilter";
import FilterSidebarShimmer from "./shimmer/FilterSidebarShimmer";

export type SortOptionLabel = "relevance" | "lowToHigh" | "highToLow";

interface FilterSidebarProps {
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
  isMobile?: boolean;
  category?: string;
  subcategory?: string;
  brand?: string;
  slug?: string;
  handleClose?: () => void;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({
  filters,
  setFilters,
  isMobile = false,
  category,
  subcategory,
  brand,
  handleClose,
  slug,
}) => {
  const [openCategories, setOpenCategories] = useState<Record<string, boolean>>({});
  const { data, isLoading } = useFilter({ category, subcategory, brand, slug });

  useEffect(() => setFilters({}), [brand]);

  const toggleCategory = (key: string) =>
    setOpenCategories((prev) => ({ ...prev, [key]: !prev[key] }));

  const toggleFilter = (queryName: string, value?: string | number) => {
    if (!value) return;
    setFilters((prev) => {
      const currentValues = prev[queryName] || [];
      const updated = currentValues.includes(value)
        ? currentValues.filter((v) => v !== value)
        : [...currentValues, value];
      return { ...prev, [queryName]: updated };
    });
    handleClose?.()
  };

  if (isLoading) {
    return (
      <div className="p-3 max-h-[80vh] w-64 bg-white rounded-lg shadow-md">
        <FilterSidebarShimmer />
      </div>
    );
  }
  return (
    <div className={`p-3 space-y-2 ${!isMobile ? "border-b border-gray-200" : ""} max-h-[80vh] w-64 overflow-y-auto custom-scroll bg-white rounded-lg shadow-md`}>
      {!isMobile && <h2 className="text-md font-semibold mb-2 border-b pb-1 text-gray-800">Filters</h2>}

      {data?.results?.length ? (
        data.results.map((filter) => (
          <Dropdown
            key={filter.queryName}
            label={capitalize(filter.name)}
            queryName={filter.queryName}
            items={filter.value || []}
            open={openCategories[filter.queryName] || false}
            onToggle={() => toggleCategory(filter.queryName)}
            filters={filters}
            onFilterToggle={toggleFilter}
          />
        ))
      ) : (
        <p className="text-sm text-gray-500 italic">No filters available.</p>
      )}
    </div>
  );
};

const Dropdown: React.FC<{
  label: string;
  queryName: string;
  items: { _id?: string; name?: string }[];
  open: boolean;
  onToggle: () => void;
  filters: Filters;
  onFilterToggle: (queryName: string, value: string | number | undefined) => void;
}> = ({ label, queryName, items, open, onToggle, filters, onFilterToggle }) => (
  <div className="mb-2">
    <div
      className="flex justify-between items-center font-medium mb-1 px-2 py-1 border rounded-md cursor-pointer hover:bg-gray-100"
      onClick={onToggle}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onToggle(); } }}
    >
      {label}
      <span className="material-symbols-outlined text-sm">{open ? "expand_more" : "arrow_forward_ios"}</span>
    </div>
    {open && (
      <div className="pl-3 max-h-40 overflow-auto custom-scroll">
        {items.map((item) => {
          const id = item._id || item.name || "";
          const checked = filters[queryName]?.includes(id) || false;
          return (
            <label key={id} className="flex items-center mb-1 cursor-pointer text-sm">
              <input
                type="checkbox"
                className="mr-2"
                checked={checked}
                onChange={() => onFilterToggle(queryName, id)}
              />
              {item.name}
            </label>
          );
        })}
      </div>
    )}
  </div>
);

const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

export default FilterSidebar;

// ---------------- SortOptions ----------------

interface SortOptionsProps {
  close?: () => void;
  sort: SortOptionLabel;
  setSort: React.Dispatch<React.SetStateAction<SortOptionLabel>>;
}

export const SortOptions: React.FC<SortOptionsProps> = ({ close, sort, setSort }) => {
  const options: { label: string; value: SortOptionLabel }[] = [
    { label: "Relevance", value: "relevance" },
    { label: "Price: Low to High", value: "lowToHigh" },
    { label: "Price: High to Low", value: "highToLow" },
  ];

  return (
    <div className="p-3 space-y-2 w-64 bg-white rounded-lg shadow-md">
      <h2 className="text-md font-semibold mb-2 border-b pb-1 text-gray-800">Sort</h2>
      {options.map((opt) => (
        <button
          key={opt.value}
          onClick={() => { setSort(opt.value); close?.(); }}
          className={`w-full px-3 py-1 text-left rounded-md text-sm ${sort === opt.value ? "bg-red-100 text-red-800" : "hover:bg-gray-100"}`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
};
