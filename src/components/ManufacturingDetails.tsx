// src/components/ManufacturingDetails.tsx
import React, { useState } from "react";
import type { Attribute, ManufacturingInfo } from "../common/types/types";

type SpecsProps = {
  manufacturingInfo?: ManufacturingInfo | null;
  attributes?: Attribute[] | null;
  className?: string;
};
const Row: React.FC<{ label: string; value?: React.ReactNode }> = ({ label, value }) => (
  <div className="grid grid-cols-2 gap-2 py-1 border-b border-gray-100 last:border-b-0">
    <div className="text-sm font-medium text-gray-600">{label}</div>
    <div className="text-sm text-gray-900 break-words">{value ?? "—"}</div>
  </div>
);

const ManufacturingDetails: React.FC<SpecsProps> = ({ manufacturingInfo, attributes = [], className = "" }) => {
  const [open, setOpen] = useState(true);

  const renderAttributes = () => {
    if (!attributes || attributes.length === 0) return null;
    return attributes.map((attr) => {
      const val = Array.isArray(attr.value) ? attr.value.join(", ") : String(attr.value);
      return <Row key={attr.name} label={attr.name} value={val} />;
    });
  };

  return (
    <div className={`mt-4 rounded-lg bg-white border border-gray-200 shadow-sm overflow-hidden ${className}`}>
      <button
        type="button"
        onClick={() => setOpen((s) => !s)}
        aria-expanded={open}
        className="w-full px-4 py-2 flex items-center justify-between text-left bg-gray-50 hover:bg-gray-100 focus:outline-none transition-all duration-200"
      >
        <h3 className="text-md font-semibold text-gray-800">Manufacturing Details</h3>
        <span className="text-gray-600">{open ? "▾" : "▸"}</span>
      </button>
      {open && (
        <div className="px-4 py-3">
          {manufacturingInfo ? (
            <div className="bg-white p-2">
              <Row label="Generic Name" value={manufacturingInfo.genericName} />
              <Row label="Country of Origin" value={manufacturingInfo.countryOfOrigin} />
              <Row
                label="Manufacturer"
                value={
                  manufacturingInfo.manufacturer
                    ? `${manufacturingInfo.manufacturer.name}${manufacturingInfo.manufacturer.address ? `, ${manufacturingInfo.manufacturer.address}` : ""}${manufacturingInfo.manufacturer.contact ? ` (${manufacturingInfo.manufacturer.contact})` : ""}`
                    : "—"
                }
              />
              {manufacturingInfo.importer && (
                <Row
                  label="Importer"
                  value={`${manufacturingInfo.importer.name}${manufacturingInfo.importer.address ? `, ${manufacturingInfo.importer.address}` : ""}${manufacturingInfo.importer.contact ? ` (${manufacturingInfo.importer.contact})` : ""}`}
                />
              )}
              {manufacturingInfo.packer && (
                <Row
                  label="Packer"
                  value={`${manufacturingInfo.packer.name}${manufacturingInfo.packer.address ? `, ${manufacturingInfo.packer.address}` : ""}${manufacturingInfo.packer.contact ? ` (${manufacturingInfo.packer.contact})` : ""}`}
                />
              )}
            </div>
          ) : null}
          {attributes && attributes.length > 0 && (
            <div className="mt-4">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Technical Specifications</h4>
              <div className="bg-white p-2">
                {renderAttributes()}
              </div>
            </div>
          )}
          {!manufacturingInfo && (!attributes || attributes.length === 0) && (
            <div className="text-sm text-gray-500 text-center py-2">No specifications available for this product.</div>
          )}
        </div>
      )}
    </div>
  );
};

export default ManufacturingDetails;