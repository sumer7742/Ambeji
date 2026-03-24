import { useEffect, useState } from "react";

export const useCartLocal = () => {
  const [cart, setCart] = useState<{ id: string; quantity: number }[]>(() => {
    return JSON.parse(localStorage.getItem("cart") || "[]");
  });

  useEffect(() => {
    const handleStorage = () => {
      const updated = JSON.parse(localStorage.getItem("cart") || "[]");
      setCart(updated);
    };

    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  return { cart, setCart };
};
