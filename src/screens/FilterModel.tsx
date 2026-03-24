import React, { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import FilterSidebar from "../components/FilterSidebar";
import type { Filters } from "../common/types/types";
interface FilterModelProps {
  show: boolean;
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
  handleClose: () => void
  category?: string;
  subcategory?: string;
  brand?: string;
  slug?: string;
}
const FilterModel: React.FC<FilterModelProps> = ({
  show,
  filters,
  setFilters,
  handleClose,
  category, subcategory, brand, slug
}) => {
  return (
    <Transition appear show={show} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-50"
        onClose={handleClose}
      >
        {/* Overlay */}
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        {/* Slide-in Panel */}
        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <Transition.Child
              as={Fragment}
              enter="ease-in-out duration-300"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="ease-in-out duration-200"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <Dialog.Panel className="pointer-events-auto absolute right-0 top-0 h-full w-80 bg-white shadow-xl overflow-y-auto flex flex-col">
                {/* Header */}
                <div className="flex justify-between items-center p-4 border-b">
                  <h2 className="text-lg font-semibold">Filters</h2>
                  <button
                    onClick={handleClose}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    ✕
                  </button>
                </div>

                {/* Filter Sidebar */}
                <div className="flex-1 p-4">
                  <FilterSidebar
                    filters={filters}
                    setFilters={setFilters}
                    category={category} subcategory={subcategory}
                    handleClose={handleClose}
                    brand={brand}
                    slug={slug}
                    isMobile={true}
                  />
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default FilterModel;
