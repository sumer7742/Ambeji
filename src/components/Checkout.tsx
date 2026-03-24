import React, { useState } from "react";
import { StepAddress } from "../screens/Checkout/StepAddress";
import OrderSummary from "../screens/Checkout/OrderSummary";
import LoadingOverlay from "./Loading";
import type { AddressData } from "../common/types/types";
import { useCart } from "../hooks/useCart";
import Stepper from "../screens/Checkout/Stepper";
import { useLocation, useNavigate } from "react-router-dom";
import { StepPayment } from "../screens/Checkout/StepPayment";
import { useCreateOrder } from "../hooks/useOrder";
import toast from "react-hot-toast";

const Checkout: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(location.search);
  const card_id = queryParams.get("cart_id");
  const type = queryParams.get("type") as "through_cart" | "direct";

  const { data, isLoading, refetch } = useCart({
    type: type || "through_cart",
    cart_id: card_id || "",
  });

  const [step, setStep] = useState(1);
  const [selectedAddress, setSelectedAddress] =
    useState<AddressData | null>(null);

  const [_, setPaymentMethod] =
    useState<"razorpay" | "cod">("razorpay");

  const {
    mutate: createOrder,
    isPending: isCreating,
  } = useCreateOrder();

  // ✅ FIX: moved onConfirm logic OUTSIDE JSX + added guard
  const handleConfirmOrder = (orderData: any) => {
    if (isCreating) return; // 🚫 prevent multiple API calls

    createOrder(orderData, {
      onSuccess: (res: any) => {
        const { _id, paymentRes } = res;

        if (paymentRes && paymentRes.url) {
          window.open(paymentRes.url, "_self");
        } else {
          toast.success("Order placed successfully");
          navigate(`/order-status?order_id=${_id}`, {
            replace: true,
          });
        }
      },
    });
  };

  if (isLoading) return <LoadingOverlay />;

  if (!data) return null;

  return (
    <div>
      <Stepper step={step} setStep={setStep} />

      {step === 1 && (
        <StepAddress
          selectedAddress={selectedAddress}
          setSelectedAddress={setSelectedAddress}
          onContinue={() => setStep(2)}
        />
      )}

      {step === 2 && selectedAddress && (
        <OrderSummary
          products={data.results}
          address={selectedAddress}
          subtotal={data.total_carts.total_sell_price}
          discount={
            data.total_carts.total_original_price -
            data.total_carts.total_sell_price
          }
          refetch={refetch}
          onContinue={() => setStep(3)}
        />
      )}

      {step === 3 && selectedAddress && (
        <StepPayment
          productData={data}
          setPaymentMethod={setPaymentMethod}
          onConfirm={handleConfirmOrder}
          isPending={isCreating}
          address={selectedAddress}
        />
      )}
    </div>
  );
};

export default Checkout;
