import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment } from "react";
import { SortOptions, type SortOptionLabel } from "../components/FilterSidebar";
interface SortModelProps {
  show: boolean;
  handleClose: () => void;
  sort: SortOptionLabel;
  setSort: React.Dispatch<React.SetStateAction<SortOptionLabel>>;
}
const SortModel: React.FC<SortModelProps> = ({ show, handleClose, sort, setSort }) => {
  return (
    <Transition appear show={show} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={handleClose}>
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
              <Dialog.Panel className="pointer-events-auto absolute right-0 top-0 h-full w-80 bg-white shadow-xl overflow-y-auto p-4">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-semibold">Sort By</h2>
                  <button onClick={handleClose} className="text-gray-500 hover:text-gray-800">
                    ✕
                  </button>
                </div>
                <SortOptions close={handleClose} sort={sort} setSort={setSort} />
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default SortModel;
