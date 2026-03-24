import React from "react";
import { useCardActionFunction, useCart, type CartProduct } from "../hooks/useCart";
import { useNavigate } from "react-router-dom";
import LoadingOverlay from "./Loading";
import NotDataFound from "../screens/NotDataFound";

const CartPage: React.FC = () => {
  const navigate = useNavigate();
  const { data, isLoading, refetch } = useCart({
    type: "through_cart",
  });

  const { handleIncrease, handleDecrease, handleRemove, isPending } =
    useCardActionFunction(refetch);

  if (isLoading) return <LoadingOverlay />;

  if (!data || data.results.length === 0) {
    return (
      <NotDataFound
        name="Cart"
        message="Your cart is empty."
        iconName="shopping_cart_off"
        className="p-6"
      />
    );
  }

  return (
    <div className="bg-[#fafafa] min-h-screen p-4 md:p-8 flex flex-col lg:flex-row gap-8">
      
      {/* LEFT */}
      <div className="flex-1 space-y-6">
        {isPending && <LoadingOverlay />}

        {data.results.map((item) => {
          const product = item.product_id as CartProduct;

          const discountPercent = Math.round(
            ((product.total_original_price - product.total_sell_price) /
              product.total_original_price) *
              100
          );

          return (
            <div
              key={item._id}
              className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition p-5 flex flex-col md:flex-row gap-6"
            >
              {/* IMAGE */}
              <div
                onClick={() => navigate(`/product/detail/${product._id}`)}
                className="cursor-pointer flex justify-center"
              >
                <img
                  src={product.images || "https://via.placeholder.com/150"}
                  alt={product.name}
                  className="w-32 h-32 object-cover rounded-xl hover:scale-105 transition"
                />
              </div>

              {/* DETAILS */}
              <div className="flex-1 flex flex-col justify-between">
                
                <div>
                  <h2 className="font-semibold text-lg text-gray-800 hover:text-[#dd3333] cursor-pointer">
                    {product.name}
                  </h2>

                  <p className="text-sm text-gray-500 mt-1">
                    Brand: {product.brand || "Ambeji"}
                  </p>

                  <p className={`text-sm mt-1 ${product.inStock ? "text-green-600" : "text-red-500"}`}>
                    {product.inStock ? "In Stock" : "Out of Stock"}
                  </p>

                  {/* PRICE */}
                  <div className="mt-3 flex items-center gap-3">
                    <span className="text-gray-400 line-through text-sm">
                      ₹{product.total_original_price}
                    </span>

                    <span className="text-xl font-bold text-[#dd3333]">
                      ₹{product.total_sell_price}
                    </span>

                    {discountPercent > 0 && (
                      <span className="text-sm bg-[#ffe5e5] text-[#dd3333] px-2 py-0.5 rounded-full">
                        {discountPercent}% OFF
                      </span>
                    )}
                  </div>
                </div>

                {/* ACTIONS */}
                <div className="flex items-center justify-between mt-5 flex-wrap gap-3">

                  {/* QTY */}
                  <div className="flex items-center border rounded-full overflow-hidden">
                    <button
                      onClick={() => handleDecrease(item)}
                      disabled={item.quantity <= 1}
                      className="px-3 py-1 hover:bg-gray-100"
                    >
                      -
                    </button>

                    <span className="px-4">{item.quantity}</span>

                    <button
                      onClick={() => handleIncrease(item)}
                      disabled={item.quantity >= product.stock}
                      className="px-3 py-1 hover:bg-gray-100"
                    >
                      +
                    </button>
                  </div>

                  {/* REMOVE */}
                  <button
                    onClick={() => handleRemove(item)}
                    className="text-sm text-[#dd3333] hover:underline"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* RIGHT - SUMMARY */}
      <div className="w-full lg:w-96 bg-white rounded-2xl shadow-md p-6 h-fit sticky top-6">
        
        <h2 className="text-lg font-semibold mb-4 border-b pb-2">
          Order Summary
        </h2>

        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span>Items ({data.total_carts.total_quantity})</span>
            <span>₹{data.total_carts.total_original_price}</span>
          </div>

          <div className="flex justify-between text-green-600">
            <span>Discount</span>
            <span>
              - ₹
              {data.total_carts.total_original_price -
                data.total_carts.total_sell_price}
            </span>
          </div>

          <div className="flex justify-between font-bold text-lg border-t pt-3">
            <span>Total</span>
            <span className="text-[#dd3333]">
              ₹{data.total_carts.total_sell_price}
            </span>
          </div>
        </div>

        <button
          onClick={() => navigate(`/checkout?type=through_cart`)}
          className="mt-6 w-full bg-[#dd3333] hover:bg-red-700 text-white py-3 rounded-full font-semibold transition"
        >
          Checkout →
        </button>

        <p className="text-xs text-gray-500 mt-3 text-center">
          100% Secure Payments • Easy Returns
        </p>
      </div>
    </div>
  );
};

export default CartPage;