import toast from "react-hot-toast";
import type { AddressData } from "../../common/types/types";
import LoadingOverlay from "../../components/Loading";
import { useAddress } from "../../hooks/useAddress";
import useModal from "../../hooks/useModal";
import AddressModal from "../AddressModal";
import ButtonBar from "../ButtonBar";
import PageHeadline from "../PageHeadline";

interface StepAddressProps {
  selectedAddress: AddressData | null;
  setSelectedAddress: (id: AddressData) => void;
  onContinue: () => void;
}

export const StepAddress: React.FC<StepAddressProps> = ({
  selectedAddress,
  setSelectedAddress,
  onContinue,
}) => {
  const { data, isLoading, error, refetch } = useAddress({
    pageNumber: 1,
    pageSize: 10,
  });

  const { openModal, closeModal, isModalOpen } = useModal();

  return (
    <div className="bg-[#fafafa] min-h-screen py-8 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-md p-6 space-y-6">

        {/* HEADER */}
        <PageHeadline
          title="Select Delivery Address"
          component={
            <ButtonBar
              buttons={[
                {
                  label: "+ Add New",
                  onClick: () => openModal({ isAddress: true }),
                  colorClass: "bg-[#dd3333] hover:bg-red-700 text-white",
                },
              ]}
            />
          }
        />

        {/* MODAL */}
        <AddressModal
          show={isModalOpen?.isAddress || false}
          handleClose={() => closeModal({ isAddress: false })}
          isAdd={true}
          refetch={refetch}
        />

        {/* LOADING */}
        {isLoading && <LoadingOverlay />}
        {error && <p className="text-red-500">Failed to load addresses</p>}

        {/* ADDRESS LIST */}
        {data?.results?.length ? (
          <div className="space-y-4 max-h-[55vh] overflow-y-auto pr-2">

            {data.results.map((addr) => {
              const isSelected = selectedAddress?._id === addr._id;

              return (
                <div
                  key={addr._id}
                  onClick={() => addr._id && setSelectedAddress(addr)}
                  className={`relative border rounded-2xl p-5 cursor-pointer transition 
                    ${
                      isSelected
                        ? "border-[#dd3333] bg-[#fff5f5] shadow-md"
                        : "border-gray-200 hover:border-[#dd3333] hover:shadow-sm"
                    }`}
                >
                  {/* TOP RIGHT ACTIONS */}
                  <div className="absolute top-3 right-3 flex gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                      className="p-1.5 rounded-full hover:bg-gray-100 text-gray-500 hover:text-[#dd3333]"
                    >
                      <span className="material-symbols-outlined text-sm">
                        edit
                      </span>
                    </button>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toast.success(`Deleted address: ${addr.name}`);
                      }}
                      className="p-1.5 rounded-full hover:bg-gray-100 text-gray-500 hover:text-red-600"
                    >
                      <span className="material-symbols-outlined text-sm">
                        delete
                      </span>
                    </button>
                  </div>

                

                  {/* CONTENT */}
                  <div className="space-y-1">
                    <p className="font-semibold text-gray-800">
                      {addr.name}
                    </p>

                    <p className="text-sm text-gray-600">
                      {addr.addressLine1}
                    </p>

                    {addr.addressLine2 && (
                      <p className="text-sm text-gray-600">
                        {addr.addressLine2}
                      </p>
                    )}

                    <p className="text-sm text-gray-600">
                      {addr.city}, {addr.state} - {addr.postalCode}
                    </p>

                    <p className="text-sm text-gray-600">
                      {addr.country}
                    </p>

                    <p className="text-sm font-medium text-gray-800">
                      📞 {addr.phone}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center text-gray-500 py-10">
            No saved addresses
          </div>
        )}

        {/* CONTINUE BUTTON */}
        <button
          onClick={onContinue}
          disabled={!selectedAddress}
          className="w-full py-3 rounded-full bg-[#dd3333] hover:bg-red-700 text-white font-semibold transition disabled:opacity-50"
        >
          Continue to Payment →
        </button>
      </div>
    </div>
  );
};