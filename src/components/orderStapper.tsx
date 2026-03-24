import React from "react";
import type { Activity } from "../common/types/types";

export const OrderStatus = {
  Placed: "Placed",
  Pending: "Pending",
  Processing: "Processing",
  Shipped: "Shipped",
  OutForDelivery: "Out for Delivery",
  Delivered: "Delivered",
  Cancelled: "Cancelled",
  Returned: "Returned",
  Failed: "Failed",
  Refunded: "Refunded",
} as const;

export type OrderStatus = (typeof OrderStatus)[keyof typeof OrderStatus];

type Step = {
  key: OrderStatus;
  label: string;
  shortLabel?: string;
};

type Props = {
  currentStatus?: OrderStatus | string;
  timestamps?: Record<string, string | undefined>;
  activity?: Activity[];
  size?: "normal" | "small";
};

const MAIN_FLOW: Step[] = [
  { key: OrderStatus.Placed, label: "Order Confirmed", shortLabel: "Confirmed" },
  { key: OrderStatus.Shipped, label: "Shipped", shortLabel: "Shipped" },
  { key: OrderStatus.OutForDelivery, label: "Out For Delivery", shortLabel: "Out for Del." },
  { key: OrderStatus.Delivered, label: "Delivered", shortLabel: "Delivered" },
];

const FLOW_KEYS = MAIN_FLOW.map((s) => s.key);

function normalizeToFlowKey(name: string): OrderStatus | undefined {
  const n = name.trim().toLowerCase();
  if (["placed", "order placed", "order confirmed", "confirmed"].includes(n)) return OrderStatus.Placed;
  if (["shipped", "dispatch", "dispatched"].includes(n)) return OrderStatus.Shipped;
  if (["out for delivery", "out-for-delivery", "out_for_delivery"].includes(n)) return OrderStatus.OutForDelivery;
  if (["delivered", "delivered successfully"].includes(n)) return OrderStatus.Delivered;
  return undefined;
}

const OrderStepper: React.FC<Props> = ({
  currentStatus = OrderStatus.Placed,
  timestamps = {},
  size = "normal",
  activity = [],
}) => {
  const stepActivityMap: Partial<Record<OrderStatus, Activity>> = {};
  for (const a of activity) {
    const key = normalizeToFlowKey(a.activityName || "");
    if (!key) continue;
    const prev = stepActivityMap[key];
    const prevDate = prev?.updatedAt ? new Date(prev.updatedAt) : prev?.createdAt ? new Date(prev.createdAt) : undefined;
    const curDate = a.updatedAt ? new Date(a.updatedAt) : a.createdAt ? new Date(a.createdAt) : undefined;
    if (!prev || (curDate && prevDate && curDate > prevDate) || (curDate && !prevDate)) {
      stepActivityMap[key] = a;
    }
  }

  const normalizedStatus =
    normalizeToFlowKey(String(currentStatus)) ??
    (FLOW_KEYS.includes(currentStatus as OrderStatus) ? (currentStatus as OrderStatus) : undefined);

  let currentIndex = normalizedStatus ? FLOW_KEYS.indexOf(normalizedStatus) : -1;
  if (currentIndex === -1) {
    const indexes = Object.keys(stepActivityMap)
      .map((k) => FLOW_KEYS.indexOf(k as OrderStatus))
      .filter((i) => i >= 0);
    currentIndex = indexes.length ? Math.max(...indexes) : 0;
  }

  const circleSize =
    size === "small"
      ? "max-[640px]:w-4 max-[640px]:h-4 sm:w-6 sm:h-6"
      : "max-[640px]:w-5 max-[640px]:h-5 sm:w-8 sm:h-8";

  return (
    <div className="flex items-start w-full select-none py-2">
      {MAIN_FLOW.map((step, idx) => {
        const reached = idx <= currentIndex;
        const active = idx === currentIndex;
        const a = stepActivityMap[step.key];
        const tsFromProp = timestamps[step.key];
        const resolvedTs = a?.updatedAt || a?.createdAt || tsFromProp;

        return (
          <div key={step.key} className="flex-1 flex flex-col items-center relative max-[640px]:px-1">
            <div className="flex items-center w-full relative">
              {idx !== 0 && (
                <div
                  className={`
                    flex-1 -mr-2 sm:-mr-4
                    ${reached ? "bg-blue-500" : "bg-gray-200"}
                    max-[640px]:h-[3px] sm:h-1
                  `}
                />
              )}
              <div
                aria-current={active ? "step" : undefined}
                className={`rounded-full border-2 ${circleSize} flex items-center justify-center z-10 transition-all
                  ${reached ? "bg-blue-600 border-blue-600 text-white" : "bg-white border-gray-300 text-gray-300"}
                  ${active ? "ring-2 sm:ring-4 ring-blue-100" : ""}
                `}
                title={step.label}
              >
                {reached && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="max-[640px]:h-3 max-[640px]:w-3 sm:h-4 sm:w-4"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 00-1.414-1.414L8 11.172 4.707 7.879a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l8-8z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </div>

              {idx !== MAIN_FLOW.length - 1 && (
                <div
                  className={`
                    flex-1 -ml-2 sm:-ml-4
                    ${idx < currentIndex ? "bg-blue-500" : "bg-gray-200"}
                    max-[640px]:h-[3px] sm:h-1
                  `}
                />
              )}
            </div>

            {/* label + info */}
            <div className="mt-2 text-center flex flex-col items-center w-full">
              <div
                className={`
                  max-[640px]:text-[10px] sm:text-sm
                  max-[640px]:leading-3 sm:leading-5
                  max-[640px]:whitespace-normal sm:whitespace-nowrap
                  break-words min-w-0
                  ${
                    reached
                      ? "text-gray-800 font-semibold"
                      : active
                      ? "text-blue-800 font-semibold"
                      : "text-gray-400"
                  }
                `}
              >
                <span className="sm:hidden">{step.shortLabel ?? step.label}</span>
                <span className="hidden sm:inline">{step.label}</span>
              </div>

              {(resolvedTs || a?.description) && (
                <div className="mt-1 w-full max-[640px]:max-w-[90px] sm:max-w-[160px] rounded-md border border-gray-200 bg-gray-50 px-1.5 py-0.5 text-center overflow-hidden">
                  {resolvedTs && (
                    <span className="block max-[640px]:text-[9px] sm:text-[10px] text-gray-500 truncate">
                      {resolvedTs}
                    </span>
                  )}
                  {a?.description && (
                    <span className="block max-[640px]:text-[9px] sm:text-[10px] text-gray-700 font-medium truncate">
                      {a.description}
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default OrderStepper;
