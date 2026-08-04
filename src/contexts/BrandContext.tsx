import React, { createContext, useContext, useState, useCallback, useEffect } from "react";

type Brand = "marca-a" | "marca-b";

interface BrandContextValue {
  brand: Brand;
  setBrand: (brand: Brand) => void;
  toggle: () => void;
}

const BrandContext = createContext<BrandContextValue | undefined>(undefined);

export function BrandProvider({ children }: { children: React.ReactNode }) {
  const [brand, setBrand] = useState<Brand>("marca-a");

  const toggle = useCallback(() => {
    setBrand((b) => (b === "marca-a" ? "marca-b" : "marca-a"));
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (brand === "marca-b") {
      root.classList.add("marca-b");
    } else {
      root.classList.remove("marca-b");
    }
  }, [brand]);

  return (
    <BrandContext.Provider value={{ brand, setBrand, toggle }}>
      {children}
    </BrandContext.Provider>
  );
}

export function useBrand() {
  const ctx = useContext(BrandContext);
  if (!ctx) throw new Error("useBrand must be used within BrandProvider");
  return ctx;
}
