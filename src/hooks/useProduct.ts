// src/hooks/useProducts.ts
import { useQuery } from "@tanstack/react-query";
import apiClient from "../constant/apiclient";
import type { ProductApiResponse, ProductParams, } from "../common/types/types";
export interface Category {
  _id: string;
  name: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  slug: string;
  __v: number;
  image: string;
}

export interface Brand {
  _id: string;
  name: string;
  category: string;
  slug: string;
  description: string;
  isActive: boolean;
  image: string;
  __v: number;
  createdAt: string;
  updatedAt: string;
}

export interface SubCategory {
  _id: string;
  name: string;
  slug: string;
  category: string;
  description: string;
  isActive: boolean;
  __v: number;
  createdAt: string;
  updatedAt: string;
}

export interface Ratings {
  average: number;
  count: number;
}

export interface Manufacturer {
  name: string;
  address: string;
  contact: string;
}

export interface Importer {
  name: string;
  address: string;
  contact: string;
}

export interface Packer {
  name: string;
  address: string;
  contact: string;
}

export interface ManufacturingInfo {
  genericName: string;
  countryOfOrigin: string;
  manufacturer: Manufacturer;
  importer: Importer;
  packer: Packer;
}

export interface Attribute {
  name: string;
  value: string;
}

export interface Size {
  sizeName: string;
  size: string;
  stock: number;
  sku: string;
  original_price: number;
  sell_price: number;
  isActive: boolean;
  highlights: string[];
  attributes: Attribute[];
  _id: string;
}

export interface ProductVariant {
  _id: string;
  product_id: string;
  color: string;
  colorCode: string;
  sizes: Size[];
  images: string[];
  isActive: boolean;
  __v: number;
  createdAt: string;
  updatedAt: string;
}
export interface AddedBy {
  _id: string;
  shopName: string;
}
export interface ProductDetails {
  success: boolean;
  message: string;
  _id: string;
  name: string;
  category: Category;
  brand: Brand;
  subCategory: SubCategory;
  ratings: Ratings;
  offers: any[];
  reviewsCount: number;
  description: string;
  images: string[];
  isWishlist: boolean;
  isActive: boolean;
  manufacturingInfo: ManufacturingInfo;
  attributes: any[];
  createdAt: string;
  updatedAt: string;
  slug: string;
  isInWishlist: boolean;
  __v: number;
  productVariant: ProductVariant[];
  added_by: AddedBy;
}

// Fetch multiple products
const fetchProducts = async (
  params?: ProductParams
): Promise<ProductApiResponse> => {
  const { data } = await apiClient.get<ProductApiResponse>("/get-product", {
    params,
  });
  return data;
};
// Fetch single product
const fetchProduct = async (_id: string): Promise<ProductDetails> => {
  const { data } = await apiClient.get<ProductDetails>(`/product-details/${_id}`);
  return data;
};
interface productQuery {
  category?: string,
  subcategory?: string,
  brand?: string,
  sort?: string;
  _id?: string
  pageSize: number;
  pageNumber: number
  slug?: string;
  exclude?: string,
  size?: string[],
  colour?: string[],
  productType?: "popular" | 'trending' | "recent_look" | "suggestion";
  offer?: string;
}
export const useProducts = (
  { category, subcategory, brand, _id, pageSize = 10, pageNumber = 1, sort, slug, exclude, size = [], colour = [], productType, offer }: productQuery
) => {
  const params: productQuery = {
    pageSize,
    pageNumber,
    ...(category && { category: category }),
    ...(subcategory && { subcategory: subcategory }),
    ...(brand && { brand }),
    ...(_id && { _id }),
    ...(sort && { sort }),
    ...(slug && { slug }),
    ...(exclude && { exclude }),
    ...(size.length > 0 && { size }),
    ...(colour.length > 0 && { colour }),
    ...(productType && { productType }),
    ...(offer && { offer }),
  };
  return useQuery<ProductApiResponse, Error>({
    queryKey: [
      "products",
      category ?? "",
      subcategory ?? "",
      brand ?? "",
      pageNumber,
      pageSize,
      sort ?? "",
      slug ?? "",
      exclude ?? "",
      productType ?? "",
      offer ?? "",
      size.join(","),
      colour.join(","),
    ],
    queryFn: () => fetchProducts(params),

    enabled: true,
    // keepPreviousData: true,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });

};

export const useProductDetail = (_id: string) => {
  return useQuery<ProductDetails, Error>({
    queryKey: ["product", _id],
    queryFn: () => fetchProduct(_id),
    enabled: !!_id,
    staleTime: 1000 * 60 * 5,
  });
};
