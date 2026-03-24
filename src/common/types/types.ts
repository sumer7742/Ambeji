import type { SubCategory } from "../../hooks/useProduct";
export interface Pagination {
  total: number;
  pageNumber: number;
  totalPages: number;
  pageSize: number;
  next: boolean;
  previous: boolean;
}
export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  pageNumber: number;
  pageSize: number;
}
export interface BaseEntity {
  _id: string;
  name: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  slug: string;
  __v: number;
}
export interface productRatings {
  average: number;
  count: number;
};
export type Category = BaseEntity;
export type Brand = BaseEntity;
export interface ApiResponse {
  success: boolean;
  results: any;
  pagination: Pagination;
}
export interface IVariant {
  _id: string;
  product_id: string;
  color: string;
  colorCode: string;
  images: string[];
  isActive: boolean;
  size: Size | null;
  createdAt?: string;
  updatedAt?: string;
}
export interface IProduct {
  _id: string;
  name: string;
  category: Category;
  brand: Brand;
  subCategory: SubCategory;
  variant: IVariant | null;
  ratings: productRatings;
  isInWishlist: boolean;
  description?: string;
  images?: string[];
  isActive?: boolean;
  slug?: string;
  added_by: {
    isAssured: boolean;
    shopName: string;
  }
}
export interface ProductApiResponse {
  success: boolean;
  results: IProduct[];
  pagination: Pagination;
}

export interface ProductParams {
  Category?: string;
  SubCategory?: string;
  _id?: string;
}
export interface AddressData {
  _id?: string;
  name: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone: string;
}
export interface RatingData {
  productId?: string;
  rating: number;
  comment?: string;
  title?: string;
  images?: FileList | null;
}
// One single rating entry
export interface RatingItem {
  _id: string;
  productId: string;
  userId: string;
  title?: string;
  description?: string;
  rating: number;
  comment?: string;
  images?: string[];
  likes?: number;
  likes_by?: string[];
  createdAt?: string;
  updatedAt?: string;
  user?: {
    _id?: string;
    name?: string;
    email?: string;
  };
}

// The API usually returns a wrapper object
export interface RatingResponse {
  ratings: RatingItem[];
  pagination?: {
    total: number;
    pageNumber: number;
    totalPages: number;
    pageSize: number;
  };
}
export type UpdateRatingPayload = {
  ratingId: string;
  productId: string; // ✅ added
  data: {
    rating?: number;
    title?: string;
    description?: string;
    images?: string[];
  };
};

export interface Attribute {
  name: string;
  value: string | string[]; // backend can send string or array
}

export interface Carousel {
  _id: string;
  title: string;
  description?: string;
  imageUrl: string;
  link?: string;
  mobileImage: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  image: string;
}

export interface ManufacturingInfo {
  genericName?: string;
  countryOfOrigin?: string;
  manufacturer?: { name?: string; address?: string; contact?: string };
  importer?: { name?: string; address?: string; contact?: string };
  packer?: { name?: string; address?: string; contact?: string };
}

export interface User {
  id: string;
  fullName: string;
  email: string;
  mobile: string;
  token: string;
  profileImage: string;
};
// src/types.ts
// -------- ORDER TYPES --------
export type Size = {
  _id: string
  size?: string;
  sizeName?: string;
  original_price: number;
  sell_price: number;
  highlights: string[]
}

export interface ShippingAddress {
  name: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone?: string;
}
export interface Order {
  _id: string;
  user: string;
  items: OrderItem[];
  totalAmount: number;
  totalDiscount?: number;
  paymentStatus: string;
  orderStatus: string;
  paymentCompleted: string | null;
  shippingAddress: ShippingAddress;
  transaction_id: string;
  paymentMethod: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  InvoiceApplicable: boolean;
  activity: Activity[];
  payer_details?: {
    utr?: string;
    method?: string;
    upi_id?: string;
    contact?: string;
    email?: string;
    payer_account_type?: string;
  };
  hsncode?: string;
  paymentRef?: string;
}
export interface Activity {
  _id: string;
  activityName: string;
  order_id: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
export interface OrderItem {
  product: string;
  vendor_id: string;
  name: string;
  color: string;
  size: Size;
  quantity: number;
  price: number;
  discount?: number;
  total: number;
  invoiceNo: string;
  image: string;
  _id: string;
   hsn?: string;
    taxableValue?: number;

  // ✅ Optional tax fields
  GST?: Tax;
  CGST?: Tax;
  SGST?: Tax;
  IGST?: Tax;
  VAT?: Tax;
  SERVICE_TAX?: Tax;
  CESS?: Tax;

  sellerDetails: SellerDetails;
}

export interface orderSize {
  size: string;
  sizeName: string;
  original_price: number;
  sell_price: number;
}

export interface Tax {
  rate: number;
  amount: number;
  _id?: string;
}

export interface SellerDetails {
  _id?: string;

  shopName?: string;

  pan_number?: string;
  pan_name?: string;
  gst_number?: string;

  signature?: string;

  // Business address (used for "Sold By")
  business_building_number?: string;
  business_landMark?: string;
  business_city?: string;
  business_state?: string;
  business_pincode?: string;

  // Pickup address (used later if needed)
  pickup_building_number?: string;
  pickup_street?: string;
  pickup_landmark?: string;
  pickup_city?: string;
  pickup_state?: string;
  pickup_pincode?: string;
}
export interface OrderResponse {
  success: boolean;
  message: string;
  results: Order[];
  pagination: Pagination;
}
export interface UseOrderStatusResponse {
  result?: Order;
}
export interface Filters {
  [key: string]: (string | number)[];
}
export interface ProductProps {
  category?: string;
  subcategory?: string;
  title?: string;
  horizontal?: boolean;
  brand?: string;
  showFilters?: boolean;
  isFullDetail?: boolean;
  exclude?: string;
  productType?: "popular" | 'trending' | "recent_look" | "suggestion";
}
export interface IUploadFile {
  originalName: string;
  url: string;
  size: number;
}

export interface IUploadResponse {
  data: IUploadFile[];
}
export interface UploadError {
  message?: string;
  status?: number;
  response?: {
    data?: { message?: string };
    status?: number;
  };
}
// ---------- User Gallery Types ----------
export interface IUserGallery {
  _id: string;
  title: string;
  images: string[];
  description?: string;
  added_by: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface IUserGalleryPagination {
  total: number;
  pageNumber: number;
  totalPages: number;
  pageSize: number;
  next: boolean;
  previous: boolean;
}

export interface IUserGalleryListResponse {
  success: boolean;
  results: IUserGallery[];
  pagination: IUserGalleryPagination;
}







// ---------- WISHLIST TYPES ----------
export interface WishlistItem {
  _id: string;
  userId: string;
  productId: IProduct; // product object returned from backend
  createdAt: string;
  updatedAt: string;
  __v?: number;
}

export interface WishlistResponse {
  success: boolean;
  message: string;
  data: WishlistItem[];
}
export interface ContactFormValues {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
  website?: string;
};



export interface Coupon {
  id: string;
  code: string;
  value: number;
  expiresAt: string;
  used: boolean;
}

export interface CoinWallet {
  balance: number;
  coupons: Coupon[];
}


export interface EliteCoinResponse {
  elite_coins: number;
  lock_elite_coins: number;
  unique_code: string;
  cvv?: string;
  exp_month?: string;
  exp_year?: string;
  fullName?: string;
}

export interface BuyCoinPayload {
  amount: number;
  method: string;
}


export interface EliteCoinTransaction {
  paymentMethod?: string;
  _id: string;
  transaction_id: string;
  order_id: string;
  type: "CREDIT" | "DEBIT";
  status: "INITIATED" | "SUCCESS" | "FAILED";
  coins: number;
  previous_balance: number;
  current_balance: number;
  remark: string;
  createdAt: string;
}