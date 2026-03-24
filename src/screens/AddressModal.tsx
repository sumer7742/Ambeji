// src/components/AddressModal.tsx
import React, { Fragment, useMemo } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useForm, type SubmitHandler } from "react-hook-form";
import type { AddressData } from "../common/types/types";
import { useCreateAddress } from "../hooks/useAddress";
import { usePincode } from "../hooks/usePincode";
import PageHeadline from "./PageHeadline";
import ButtonBar from "./ButtonBar";
import toast from "react-hot-toast";

interface AddressModalProps {
  show: boolean;
  handleClose: () => void;
  isAdd: boolean;
  data?: AddressData | null;
  refetch?: () => void;
}

const AddressModal: React.FC<AddressModalProps> = ({
  show,
  handleClose,
  isAdd,
  data,
  refetch,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<AddressData>({
    defaultValues: data || {},
  });
  const postalCode = watch("postalCode");
  const { data: pincodeList } = usePincode(postalCode || "");
  const pincodeData = useMemo(() => {
    return pincodeList?.[0]?.PostOffice?.[0];
  }, [pincodeList]);
  const createAddressMutation = useCreateAddress();
  const onSubmit: SubmitHandler<AddressData> = (formData) => {
    if (isAdd) {
      createAddressMutation.mutate(formData, {
        onSuccess: () => {
          toast.success("Address added successfully");
          refetch?.();
          reset();
          handleClose();
        },
        onError: () => {
          toast.error("Failed to add address");
        },
      });
    } else {
    }
  };

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
          <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white p-6 shadow-xl transition-all border border-gray-200">
                <PageHeadline
                  title={isAdd ? "Add New Address" : "Edit Address"}
                  component={
                    <ButtonBar
                      buttons={[
                        {
                          label: "X",
                          onClick: handleClose,
                          colorClass: "bg-red-500",
                        },
                      ]}
                    />
                  }
                />

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-h-[60vh] overflow-y-auto">
                  {/* Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Full Name *</label>
                    <input
                      type="text"
                      placeholder="Enter full name"
                      {...register("name", { required: "Name is required" })}
                      className={`mt-1 block w-full rounded-lg border border-gray-300 shadow-sm p-3 focus:ring-indigo-500 focus:border-indigo-500 ${errors.name ? "border-red-500" : ""}`}
                    />
                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Phone *</label>
                    <input
                      type="text"
                      placeholder="Phone number"
                      {...register("phone", { required: "Phone is required" })}
                      onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                        e.target.value = e.target.value.replace(/[^0-9]/g, "").slice(0, 10);
                      }}
                      className={`mt-1 block w-full rounded-lg border border-gray-300 shadow-sm p-3 focus:ring-indigo-500 focus:border-indigo-500 ${errors.phone ? "border-red-500" : ""}`}
                    />
                    {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
                  </div>
                  {/* Address Lines */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Address Line 1 *</label>
                    <input
                      type="text"
                      placeholder="Street address"
                      {...register("addressLine1", { required: "Address Line 1 is required" })}
                      className={`mt-1 block w-full rounded-lg border border-gray-300 shadow-sm p-3 focus:ring-indigo-500 focus:border-indigo-500 ${errors.addressLine1 ? "border-red-500" : ""}`}
                    />
                    {errors.addressLine1 && <p className="text-red-500 text-sm mt-1">{errors.addressLine1.message}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Address Line 2</label>
                    <input
                      type="text"
                      placeholder="Apartment, suite, etc. (optional)"
                      {...register("addressLine2")}
                      className="mt-1 block w-full rounded-lg border border-gray-300 shadow-sm p-3 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>

                  {/* Postal, City, State, Country */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Postal Code *</label>
                      <input
                        type="text"
                        placeholder="ZIP / Postal Code"
                        {...register("postalCode", { required: "Postal Code is required" })}
                        className={`mt-1 block w-full rounded-lg border border-gray-300 shadow-sm p-3 focus:ring-indigo-500 focus:border-indigo-500 ${errors.postalCode ? "border-red-500" : ""}`}
                        onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                          e.target.value = e.target.value.replace(/[^0-9]/g, "").slice(0, 6);
                        }}
                      />
                      {errors.postalCode && <p className="text-red-500 text-sm mt-1">{errors.postalCode.message}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">City *</label>
                      <input
                        type="text"
                        placeholder="City"
                        defaultValue={pincodeData?.District || ""}
                        readOnly={true}
                        {...register("city", { required: "City is required" })}
                        className={`mt-1 block w-full rounded-lg border border-gray-300 shadow-sm p-3 bg-gray-100 ${errors.city ? "border-red-500" : ""}`}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">State *</label>
                      <input
                        type="text"
                        placeholder="State"
                        defaultValue={pincodeData?.State || ""}
                        readOnly={true}
                        {...register("state", { required: "State is required" })}
                        className={`mt-1 block w-full rounded-lg border border-gray-300 shadow-sm p-3 bg-gray-100 ${errors.state ? "border-red-500" : ""}`}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">Country *</label>
                      <input
                        type="text"
                        placeholder="Country"
                        defaultValue={pincodeData?.Country || ""}
                        readOnly={true}
                        {...register("country", { required: "Country is required" })}
                        className={`mt-1 block w-full rounded-lg border border-gray-300 shadow-sm p-3 bg-gray-100 ${errors.country ? "border-red-500" : ""}`}
                      />
                    </div>
                  </div>



                  {/* Buttons */}
                  <div className="flex justify-end space-x-3 mt-6">
                    <button
                      type="button"
                      onClick={handleClose}
                      className="px-5 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
                      disabled={createAddressMutation.isPending}
                    >
                      Save
                    </button>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default AddressModal;
