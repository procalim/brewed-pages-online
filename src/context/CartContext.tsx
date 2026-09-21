import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { products, promoCodes, type Product } from "@/data/products";

const STORAGE_KEY = "codex.cart";

export type CartLine = { slug: string; qty: number };

type CartValue = {
  lines: CartLine[];
  items: { product: Product; qty: number }[];
  count: number;
  subtotal: number;
  discount: number;
  total: number;
  promo: string | null;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  add: (slug: string, qty?: number) => void;
  setQty: (slug: string, qty: number) => void;
  remove: (slug: string) => void;
  clear: () => void;
  /** Returns true when the code was recognised. */
  applyPromo: (code: string) => boolean;
  clearPromo: () => void;
};

const CartContext = createContext<CartValue | null>(null);

const readStored = (): CartLine[] => {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as CartLine[];
    return Array.isArray(parsed)
      ? parsed.filter((l) => typeof l?.slug === "string" && Number.isFinite(l?.qty) && l.qty > 0)
      : [];
  } catch {
    return [];
  }
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [lines, setLines] = useState<CartLine[]>(readStored);
  const [promo, setPromo] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
    } catch {
      /* storage may be unavailable — the cart still works for this session */
    }
  }, [lines]);

  const add = useCallback((slug: string, qty = 1) => {
    setLines((prev) => {
      const existing = prev.find((l) => l.slug === slug);
      if (existing) return prev.map((l) => (l.slug === slug ? { ...l, qty: l.qty + qty } : l));
      return [...prev, { slug, qty }];
    });
    setIsOpen(true);
  }, []);

  const setQty = useCallback((slug: string, qty: number) => {
    setLines((prev) =>
      qty <= 0 ? prev.filter((l) => l.slug !== slug) : prev.map((l) => (l.slug === slug ? { ...l, qty } : l)),
    );
  }, []);

  const remove = useCallback((slug: string) => setLines((prev) => prev.filter((l) => l.slug !== slug)), []);

  const clear = useCallback(() => {
    setLines([]);
    setPromo(null);
  }, []);

  const applyPromo = useCallback((code: string) => {
    const key = code.trim().toUpperCase();
    if (promoCodes[key]) {
      setPromo(key);
      return true;
    }
    return false;
  }, []);

  const value = useMemo<CartValue>(() => {
    const items = lines
      .map((line) => {
        const product = products.find((p) => p.slug === line.slug);
        return product ? { product, qty: line.qty } : null;
      })
      .filter((i): i is { product: Product; qty: number } => i !== null);

    const subtotal = items.reduce((sum, i) => sum + i.product.price * i.qty, 0);
    const rate = promo ? promoCodes[promo] ?? 0 : 0;
    const discount = Math.round(subtotal * rate * 100) / 100;

    return {
      lines,
      items,
      count: items.reduce((sum, i) => sum + i.qty, 0),
      subtotal,
      discount,
      total: Math.max(subtotal - discount, 0),
      promo,
      isOpen,
      openCart: () => setIsOpen(true),
      closeCart: () => setIsOpen(false),
      add,
      setQty,
      remove,
      clear,
      applyPromo,
      clearPromo: () => setPromo(null),
    };
  }, [lines, promo, isOpen, add, setQty, remove, clear, applyPromo]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = (): CartValue => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
};
