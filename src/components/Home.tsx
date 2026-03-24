import React, { lazy, Suspense } from "react";
import InfiniteModeProductList from "./InfiniteProductPage";
import ProductCardShimmer from "./shimmer/ProductCardShimmer";
const Banner = lazy(() => import("./Banner"));
const ProductList = lazy(() => import("./Product"));
const Testimonial = lazy(() => import("./Testimonimal"));
const Home: React.FC = () => {
  return (
    <div className="flex flex-col w-full min-h-screen bg-white gap-2">
      <Suspense fallback={<div className="h-[280px] bg-gray-100 shimmer rounded-md mx-8" />}>
        <div className="mx-auto sm:px-8 w-full">
    <Banner />
  </div>
      </Suspense>
      <Suspense
  fallback={
    <div className="flex space-x-4 px-8">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="w-[300px]">
          <ProductCardShimmer />
        </div>
      ))}
    </div>
  }
>
  <ProductList horizontal title="Suggest For You" productType="suggestion" />
</Suspense>

      {/* <Suspense fallback={<LoadingOverlay isNotFixed={true} />}>
        <MetaPage />
      </Suspense> */}
      <Suspense
  fallback={
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 px-8">
      {Array.from({ length: 8 }).map((_, i) => (
        <ProductCardShimmer key={i} />
      ))}
    </div>
  }
>
  <InfiniteModeProductList />
</Suspense>

      <Suspense
  fallback={
    <div className="flex space-x-4 px-8">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="w-[300px]">
          <ProductCardShimmer />
        </div>
      ))}
    </div>
  }
>
  <ProductList horizontal title="Recent View" productType="recent_look" />
</Suspense>

      {/* <Suspense fallback={<LoadingOverlay isNotFixed={true} />}>
        <ProductList horizontal title="Products" />
      </Suspense> */}
      <Suspense fallback={<div className="h-[200px] bg-gray-100 shimmer rounded-md mx-8" />}>
  <Testimonial />
</Suspense>

    </div>
  );
};

export default Home;
