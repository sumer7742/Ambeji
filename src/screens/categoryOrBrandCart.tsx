// src/pages/MetaPage.tsx
import React from "react";
import { Link } from "react-router-dom";
import { useBrands, useCategories } from "../hooks/useCategoryOrBrand";
const MetaPage: React.FC = () => {
  const {
    data: categoryData,
    isLoading: catLoading,
    error: catError,
  } = useCategories();
  const {
    data: brandData,
    isLoading: brandLoading,
    error: brandError,
  } = useBrands();
  return (
    <div className="p-6 space-y-12">
      {/* Categories Section */}
      <section>
        {/* <PageHeadline title={"Categories"} /> */}
        {catLoading && <p className="text-gray-500">Loading categories...</p>}
        {!catLoading && !catError && (categoryData?.results?.length ?? 0) > 1 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
            {categoryData?.results?.map((category: any) => (
              <MetaCard
                key={category._id}
                id={category._id}
                name={category.name}
                image={category.image}
                type="category"
              />
            ))}
          </div>
        )}
      </section>

      {/* Brands Section */}
      <section>
        {/* <PageHeadline title={"Brand"} /> */}
        {brandLoading && <p className="text-gray-500">Loading brands...</p>}
        {!brandLoading && !brandError && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
            {brandData?.results?.map((brand: any) => (
              <MetaCard
                key={brand._id}
                id={brand._id}
                name={brand.name}
                image={brand.image}
                type="brand"
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default MetaPage;

interface MetaCardProps {
  id: string;
  name: string;
  image?: string;
  type: "category" | "brand"; // to handle route
}

interface MetaCardProps {
  id: string;
  name: string;
  image?: string;
  type: "category" | "brand";
}

const MetaCard: React.FC<MetaCardProps> = ({ id, name, image, type }) => {
  const path =
    type === "brand"
      ? `/product?brand=${id}`
      : `/product?category=${id}`;

  return (
    <Link
      to={path}
      className="flex flex-col items-center space-y-2 transition hover:opacity-90"
    >
      <div className="w-24 h-24">
        {image ? (
          <img
            src={image}
            alt={name}
            loading="lazy"
            className="w-full h-full object-contain rounded-full border border-gray-200"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-500 text-sm bg-gray-200 rounded-full">
            No Image
          </div>
        )}
      </div>

      <h3 className="text-sm sm:text-base font-medium text-gray-800 text-center truncate max-w-[80px]">
        {name}
      </h3>
    </Link>
  );
};

