import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import { usePincode } from "../hooks/usePincode";

interface LocationModelProps {
  show: boolean;
  handleClose: () => void;
  onApply: (pincode: string) => void;
  currentPincode?: string;
}

const LocationModel: React.FC<LocationModelProps> = ({
  show,
  handleClose,
  onApply,
  currentPincode,
}) => {
  const [tempPincode, setTempPincode] = useState("");
  const { data, isLoading } = usePincode(tempPincode);

  const postOffice = data?.[0]?.PostOffice?.[0];

  useEffect(() => {
    if (currentPincode && show) {
      setTempPincode(currentPincode);
    }
  }, [currentPincode, show]);

  return (
    <Transition appear show={show} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={handleClose}>
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
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
        </Transition.Child>

        {/* Modal */}
        <div className="fixed inset-0 flex items-center justify-center px-4">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-90"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-90"
          >
            <Dialog.Panel className="w-full max-w-md rounded-2xl bg-white shadow-2xl p-6">

              {/* Header */}
              <div className="flex justify-between items-center mb-5">
                <h2 className="text-xl font-bold text-gray-800">
                  Change Location
                </h2>
                <button
                  onClick={handleClose}
                  className="text-gray-400 hover:text-red-500 transition"
                >
                  ✕
                </button>
              </div>

              {/* Current Location */}
              <button
                className="w-full mb-4 flex items-center justify-center gap-2 border border-[#dd3333] text-[#dd3333] py-2.5 rounded-lg hover:bg-red-50 transition font-medium"
                onClick={() => {
                  if (!navigator.geolocation) return;

                  navigator.geolocation.getCurrentPosition(async (pos) => {
                    const { latitude, longitude } = pos.coords;
                    const res = await fetch(
                      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
                    );
                    const json = await res.json();
                    const pin = json?.address?.postcode;

                    if (pin && pin.length === 6) {
                      setTempPincode(pin);
                    }
                  });
                }}
              >
                📍 Detect My Location
              </button>

              {/* Input */}
              <div className="relative">
                <input
                  type="text"
                  maxLength={6}
                  value={tempPincode}
                  onChange={(e) =>
                    setTempPincode(e.target.value.replace(/\D/g, ""))
                  }
                  placeholder="Enter Pincode"
                  className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:border-[#dd3333]"
                />
              </div>

              {/* Loader */}
              {isLoading && (
                <p className="text-sm text-gray-500 mt-2">
                  Checking availability...
                </p>
              )}

              {/* Result */}
              {tempPincode.length === 6 && !isLoading && (
                <div className="mt-4 p-3 rounded-lg border bg-gray-50">
                  <p className="text-sm text-gray-700">
                    {postOffice
                      ? `${postOffice.District}, ${postOffice.State}`
                      : "Invalid pincode"}
                  </p>

                  {postOffice ? (
                    <p className="text-sm text-green-600 font-medium mt-1">
                      ✅ Delivery available
                    </p>
                  ) : (
                    <p className="text-sm text-red-600 font-medium mt-1">
                      ❌ Delivery not available
                    </p>
                  )}
                </div>
              )}

              {/* Buttons */}
              <div className="mt-6 flex justify-end gap-3">
                <button
                  onClick={handleClose}
                  className="px-4 py-2 text-gray-600 hover:text-black"
                >
                  Cancel
                </button>

                <button
                  disabled={!postOffice}
                  onClick={() => {
                    onApply(tempPincode);
                    handleClose();
                  }}
                  className="bg-[#dd3333] text-white px-5 py-2 rounded-lg font-medium hover:opacity-90 disabled:opacity-50"
                >
                  Apply
                </button>
              </div>

            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default LocationModel;