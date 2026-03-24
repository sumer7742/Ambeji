// src/components/Specifications.tsx
import React, { useMemo, useState } from "react";
import type { Attribute } from "../common/types/types";

type Variant = {
  _id: string;
  sizes?: Array<{
    _id?: string;
    sizeName?: string;
    size?: string;
    attributes?: Attribute[];
  }>;
};

type SpecsProps = {
  attributes?: Attribute[] | null;
  productVariants?: Variant[] | null;
  selectedVariantId?: string | null;
  selectedSizeId?: string | null;
  className?: string;
};

const Row: React.FC<{ label: string; value?: React.ReactNode }> = ({ label, value }) => (
  <div className="grid grid-cols-2 gap-2 py-1 border-b border-gray-100 last:border-b-0">
    <div className="text-sm font-medium text-gray-600">{label}</div>
    <div className="text-sm text-gray-900 break-words">{value ?? "—"}</div>
  </div>
);

const Specifications: React.FC<SpecsProps> = ({
  attributes = [],
  productVariants = [],
  selectedVariantId,
  selectedSizeId,
  className = "",
}) => {
  const [open, setOpen] = useState(true);

  const specs = useMemo(() => {
    const out: { name: string; value: string | string[] }[] = [];

    if (Array.isArray(attributes)) {
      for (const a of attributes) out.push({ name: a.name, value: a.value });
    }

    if (Array.isArray(productVariants) && productVariants.length > 0) {
      const variant = productVariants.find((v) => v._id === selectedVariantId) ?? productVariants[0];
      const size = variant?.sizes?.find((s) => s._id === selectedSizeId) ?? variant?.sizes?.[0];
      if (size && Array.isArray(size.attributes)) {
        for (const a of size.attributes) {
          const existing = out.find((o) => o.name === a.name);
          if (existing) existing.value = a.value;
          else out.push({ name: a.name, value: a.value });
        }
      }
    }

    return out;
  }, [attributes, productVariants, selectedVariantId, selectedSizeId]);

  return (
    <div className={`mt-4 rounded-lg bg-white border border-gray-200 shadow-sm overflow-hidden ${className}`}>
      <button
        type="button"
        onClick={() => setOpen((s) => !s)}
        aria-expanded={open}
        className="w-full px-4 py-2 flex items-center justify-between text-left bg-gray-50 hover:bg-gray-100 focus:outline-none transition-all duration-200"
      >
        <h3 className="text-md font-semibold text-gray-800">Specifications</h3>
        <span className="text-gray-600">{open ? "▾" : "▸"}</span>
      </button>
      {open && (
        <div className="px-4 py-3">
          {specs && specs.length > 0 ? (
            <div className="bg-white p-2">
              {specs.map((attr) => {
                const val = Array.isArray(attr.value) ? attr.value.join(", ") : String(attr.value);
                return <Row key={attr.name} label={attr.name} value={val} />;
              })}
            </div>
          ) : (
            <div className="text-sm text-gray-500 text-center py-2">No specifications available for this product.</div>
          )}
        </div>
      )}
    </div>
  );
};

export default Specifications;