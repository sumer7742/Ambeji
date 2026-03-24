import React, { Fragment, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import type { RatingData } from "../common/types/types";
import PageHeadline from "./PageHeadline";
import { useAddRatingAction } from "../hooks/useRatingAction";
import { handleApiHookResponse } from "../common/utils/queryToast";
import { safeCallback } from "../utils/SafeCallBack";
import { useUploadImages } from "../hooks/useUploadRatingImages";
import toast from "react-hot-toast";
interface RatingModalProps {
  show: boolean;
  handleClose: () => void;
  isAdd?: boolean;
  productId?: string;
  refetch?: () => void;
}
const stars = [1, 2, 3, 4, 5];
const RatingModal: React.FC<RatingModalProps> = ({
  handleClose,
  isAdd = true,
  show,
  productId,
  refetch,
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<RatingData>({
    defaultValues: {
      rating: 5,
      comment: "",
      productId: productId ?? undefined,
      title: "",
      images: null,
    },
  });
  useEffect(() => {
    if (productId) {
      setValue("productId", productId);
    }
  }, [productId, setValue]);
  const currentRating = watch("rating") ?? 5;
  const addRating = useAddRatingAction();
  const uploadImages = useUploadImages();
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);
  const fileRef = useRef<HTMLInputElement | null>(null);
  const handleFiles = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []).filter((f) =>
      f.type.startsWith("image/")
    );
    const MAX = 6;
    const MAX_MB = 5;
    const remaining = Math.max(0, MAX - selectedFiles.length);
    const picked = files.slice(0, remaining).filter((f) => f.size <= MAX_MB * 1024 * 1024);
    if (!picked.length) {
      if (fileRef.current) fileRef.current.value = "";
      return;
    }
    const formData = new FormData();
    picked.forEach(e => {
      formData.append("images", e)
    });
 try {
    const res = await uploadImages.mutateAsync(formData);
    if (res?.data) {
      const imageUrls: string[] = res.data.map((e: { url: string }) => e.url);
      setSelectedFiles((prev) => [...prev, ...imageUrls]);
      toast.success("Images uploaded successfully 👍");
    }
  } catch (error: any) {
    console.error("Upload error:", error);
    const apiError =
      uploadImages.error?.response?.data?.message || error?.response?.data?.message || error?.message || "Failed to upload images. Please try again.";
    toast.error(apiError);
  } finally {
    if (fileRef.current) fileRef.current.value = "";
  }
};
  const removeImageAt = (idx: number) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== idx));
  };
  const onSubmit: SubmitHandler<RatingData> = async (formData) => {
    addRating.mutate({
      productId: formData.productId!,
      rating: formData.rating,
      title: formData.title ?? undefined,
      description: formData.comment ?? undefined,
      images: selectedFiles,
    }, handleApiHookResponse(safeCallback(refetch), handleClose));
  };
  const isUploading = uploadImages.isPending;
  const isSaving = addRating.isPending;
  const isBusy = isUploading || isSaving;
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
              <Dialog.Panel className="w-full max-w-lg transform overflow-hidden rounded-2xl bg-white p-6 shadow-xl transition-all border border-gray-200">
                <PageHeadline title={isAdd ? "Add Rating" : "Edit Rating"} />
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Rating *
                    </label>
                    <div className="flex items-center gap-2">
                      {stars.map((s) => (
                        <button
                          key={s}
                          type="button"
                          onClick={() => setValue("rating", s)}
                          className={`p-2 rounded-md transition ${(currentRating ?? 0) >= s
                            ? "bg-yellow-400 text-white"
                            : "bg-gray-100 text-gray-600"
                            }`}
                          aria-label={`${s} star`}
                          disabled={isBusy}
                        >
                          ★
                        </button>
                      ))}
                    </div>
                    {errors.rating?.message && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.rating?.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Comment
                    </label>
                    <textarea
                      placeholder="Write an optional comment..."
                      {...register("comment")}
                      className="mt-1 block w-full rounded-lg border border-gray-300 shadow-sm p-3 focus:ring-indigo-500 focus:border-indigo-500"
                      rows={4}
                      disabled={isBusy}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Title (optional)
                    </label>
                    <input
                      {...register("title")}
                      type="text"
                      placeholder="Short title (e.g. 'Great quality')"
                      className="mt-1 block w-full rounded-lg border border-gray-300 shadow-sm p-3 focus:ring-indigo-500 focus:border-indigo-500"
                      disabled={isBusy}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Images (optional)
                    </label>
                    <input
                      ref={fileRef}
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleFiles}
                      className="block"
                      disabled={isBusy}
                    />
                    {isUploading && (
                      <p className="text-xs text-gray-500 mt-2">Uploading…</p>
                    )}
                    {selectedFiles.length > 0 && (
                      <div className="mt-4 grid grid-cols-3 gap-3">
                        {selectedFiles.map((src, idx) => (
                          <div
                            key={`${src}-${idx}`}
                            className="relative group rounded-lg overflow-hidden border border-gray-200"
                          >
                            <img
                              src={src}
                              alt={`Selected ${idx + 1}`}
                              className="h-24 w-full object-cover"
                            />
                            <button
                              type="button"
                              onClick={() => removeImageAt(idx)}
                              className="absolute top-1 right-1 h-6 w-6 flex items-center justify-center rounded-full bg-black/70 text-white text-sm opacity-90 group-hover:opacity-100"
                              aria-label={`Remove image ${idx + 1}`}
                              disabled={isBusy}
                              title="Remove"
                            >
                              ×
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  <input type="hidden" {...register("productId")} />
                  <div className="flex justify-end space-x-3 mt-4">
                    <button
                      type="button"
                      onClick={handleClose}
                      className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition"
                      disabled={isBusy}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
                      disabled={isBusy}
                    >
                      {isSaving ? "Saving..." : isAdd ? "Submit" : "Save"}
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
export default RatingModal;