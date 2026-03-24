// src/screens/ImagePreviewModal.tsx
import React, { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";

type Props = {
  show: boolean;
  onClose: () => void;
  imageUrl?: string | null;
};

const ImagePreviewModal: React.FC<Props> = ({ show, onClose, imageUrl }) => {
  return (
    <Transition appear show={show} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel className="relative max-w-3xl w-full rounded-lg bg-black overflow-hidden">
              {imageUrl ? (
                <img src={imageUrl} alt="Preview" className="w-full h-auto object-contain" />
              ) : (
                <div className="p-8 text-center text-white">No image found</div>
              )}
              <button
                onClick={onClose}
                className="absolute top-3 right-3 text-white text-lg bg-black/60 rounded-full px-3 py-1 hover:bg-black/80 transition"
              >
                ✕
              </button>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default ImagePreviewModal;
