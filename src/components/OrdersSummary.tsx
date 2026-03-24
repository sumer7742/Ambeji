// src/components/OrdersSummary.tsx
import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import PaginationSelector from "../constant/PaginationSelecctor";
import { usePagination } from "../hooks/usePagination";
import { useOrders } from "../hooks/useOrder";
import { Loader } from "lucide-react";

const OrdersSummary: React.FC = () => {
  const { pageNumber, pageSizeValue, handlePageChange, handlePageSizeChange } = usePagination();
  const { data, isLoading, isError } = useOrders(pageNumber, pageSizeValue);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string[]>([]);

  const toggleStatus = (status: string) => {
    setStatusFilter((prev) =>
      prev.includes(status)
        ? prev.filter((s) => s !== status)
        : [...prev, status]
    );
  };

  // ✅ filtering logic
  const filteredOrders = useMemo(() => {
    if (!data?.results) return [];
    return data.results.filter((order) => {
      const matchesStatus =
        statusFilter.length === 0 || statusFilter.includes(order.orderStatus);
      const matchesSearch =
        search.trim() === "" ||
        order.transaction_id?.toLowerCase().includes(search.toLowerCase()) ||
        order.items?.some((item: any) =>
          item.name?.toLowerCase().includes(search.toLowerCase())
        );
      return matchesStatus && matchesSearch;
    });
  }, [data?.results, statusFilter, search]);

  if (isLoading)
    return (
      <div className="flex justify-center items-center min-h-screen text-blue-600">
        <Loader className="animate-spin mr-2" /> Loading orders...
      </div>
    );

  if (isError)
    return (
      <p className="text-center text-red-500 mt-10">
        Failed to load orders. Try again later.
      </p>
    );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-4 md:p-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar Filters */}
          <aside className="w-full md:w-64">
            <div className="sticky top-20 bg-white p-4 rounded shadow">
              <h3 className="font-semibold mb-3 text-gray-700">Filters</h3>
              <div className="mb-4">
                <p className="font-medium mb-2 text-gray-800">
                  ORDER STATUS
                </p>
                {["Delivered", "Pending", "Cancelled"].map((status) => (
                  <label
                    key={status}
                    className="block cursor-pointer select-none text-gray-700 hover:text-blue-600 transition-colors"
                  >
                    <input
                      type="checkbox"
                      className="mr-2 accent-blue-600"
                      checked={statusFilter.includes(status)}
                      onChange={() => toggleStatus(status)}
                    />
                    {status}
                  </label>
                ))}
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            {/* Search Bar */}
            <div className="mb-4">
              <input
                type="text"
                placeholder="Search by product or transaction ID..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-300 focus:outline-none"
              />
            </div>

            {/* Orders List */}
            <div className="space-y-4">
              {filteredOrders.length === 0 ? (
                <p className="text-center text-gray-500">
                  No matching orders found.
                </p>
              ) : (
                filteredOrders.map((order: any) => {
                  const firstItem = order.items?.[0] || order.item;
                  const itemCount = Array.isArray(order.items)
                    ? order.items.reduce(
                        (sum: number, i: any) => sum + (i.quantity || 0),
                        0
                      )
                    : (order.item as any)?.quantity || 0;

                  const orderId = encodeURIComponent(order._id);
                  const itemId = firstItem ? encodeURIComponent(firstItem._id) : "";
                  const viewDetailsHref =
                    firstItem && itemId
                      ? `/order-details?order_id=${orderId}&item_id=${itemId}`
                      : null;

                  // 🎨 status badge colors
                  const statusColor =
                    order.orderStatus === "Delivered"
                      ? "bg-green-100 text-green-700"
                      : order.orderStatus === "Pending"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-red-100 text-red-700";

                  return (
                    <div
                      key={order._id}
                      className="bg-white p-4 rounded shadow hover:shadow-md border border-gray-200 hover:border-blue-300 transition-all duration-200"
                    >
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                        <div className="flex items-center gap-3">
                          {firstItem && (
                            <img
                              src={firstItem.image || "/placeholder.png"}
                              alt={firstItem.name || "Product"}
                              className="w-14 h-14 object-cover rounded"
                            />
                          )}
                          <div>
                            <p className="font-semibold text-gray-900">
                              {firstItem?.name || "Unnamed Product"}
                            </p>
                            <p className="text-sm text-gray-600">
                              Items: {itemCount}
                            </p>
                            <p className="text-sm text-gray-500">
                              Transaction:{" "}
                              <span className="text-blue-600 font-mono">
                                {order.transaction_id}
                              </span>
                            </p>
                          </div>
                        </div>

                        <div className="flex flex-col sm:flex-row items-center gap-3">
                          {/* Status badge */}
                          <span
                            className={`px-3 py-1 text-sm font-medium rounded-full ${statusColor}`}
                          >
                            {order.orderStatus}
                          </span>

                          {viewDetailsHref && (
                            <Link
                              to={viewDetailsHref}
                              className="px-4 py-2 text-sm font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors whitespace-nowrap"
                            >
                              View Details
                            </Link>
                          )}
                        </div>
                      </div>

                      <div className="text-right mt-2">
                        <p className="font-bold text-lg text-gray-900">
                          ₹{order.totalAmount.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            <PaginationSelector
              currentPage={pageNumber}
              handlePageChange={handlePageChange}
              pageSize={pageSizeValue}
              handlePageSizeChange={handlePageSizeChange}
              totalCount={data?.pagination.total || 0}
            />
          </main>
        </div>
      </div>
    </div>
  );
};

export default OrdersSummary;
