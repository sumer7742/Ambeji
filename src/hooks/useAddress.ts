import type { AddressData, Pagination } from "../common/types/types";
import apiClient from "../constant/apiclient";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// API calls
const fetchAddress = async (params: {
  pageNumber: number;
  pageSize: number;
}) => {
  const res = await apiClient.get("/get-address", { params });
  return res.data;
};

const fetchAddressById = async (_id: string) => {
  const res = await apiClient.get(`/get-address/${_id}`);
  return res.data;
};

const createAddress = async (data: AddressData) => {
  const res = await apiClient.post("/create-address", data);
  return res.data;
};

const updateAddress = async (_id: string, data: Partial<AddressData>) => {
  const res = await apiClient.put(`/update-address/${_id}`, data); // ✅ fixed
  return res.data;
};

const deleteAddress = async (_id: string) => {
  const res = await apiClient.delete(`/delete-address/${_id}`); // ✅ fixed
  return res.data;
};


// -------------------- HOOKS --------------------

// GET ALL ADDRESSES
interface AddressResponse {
  results: AddressData[];
  pagination: Pagination;
}

export const useAddress = ({ pageNumber = 1, pageSize = 10 } = {}) => {
  const params = { pageNumber, pageSize };
  return useQuery<AddressResponse, Error>({
    queryKey: ["address", params],
    queryFn: () => fetchAddress(params),
  });
};

// GET SINGLE ADDRESS
export const useAddresses = (_id: string) => {
  return useQuery<AddressData, Error>({
    queryKey: ["address", _id],
    queryFn: () => fetchAddressById(_id),
    enabled: !!_id,
  });
};

// CREATE ADDRESS
export const useCreateAddress = () => {
  const queryClient = useQueryClient();
  return useMutation<AddressData, Error, AddressData>({
    mutationFn: createAddress,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["address"], exact: false }),
  });
};

// UPDATE ADDRESS
export const useUpdateAddress = () => {
  const queryClient = useQueryClient();
  return useMutation<
    AddressData,
    Error,
    { _id: string; data: Partial<AddressData> }
  >({
    mutationFn: ({ _id, data }) => updateAddress(_id, data),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["address"], exact: false }),
  });
};

// DELETE ADDRESS
export const useDeleteAddress = () => {
  const queryClient = useQueryClient();
  return useMutation<void, Error, string>({
    mutationFn: deleteAddress,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["address"], exact: false }),
  });
};
export const useUpdateProfile = () => {
  return useMutation({
    mutationFn: async (formData: FormData) => {
      const res = await apiClient.put("/update-profile", formData, {});
      return res.data;
    },
  });
};
