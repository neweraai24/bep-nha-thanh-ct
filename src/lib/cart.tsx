"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { DISHES, type Dish } from "./data";

type CartMap = Record<string, number>;

type CartCtx = {
  cart: CartMap;
  count: number;
  total: number;
  items: { dish: Dish; qty: number }[];
  ready: boolean;
  add: (id: string, n?: number) => void;
  setQty: (id: string, qty: number) => void;
  clear: () => void;
};

const KEY = "bnt-cart";
const Ctx = createContext<CartCtx | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartMap>({});
  const [ready, setReady] = useState(false);

  // Đọc giỏ đã lưu sau khi mount để tránh lệch HTML giữa server và client.
  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setCart(JSON.parse(raw));
    } catch {}
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(KEY, JSON.stringify(cart));
    } catch {}
  }, [cart, ready]);

  const add = useCallback((id: string, n = 1) => setCart((c) => ({ ...c, [id]: (c[id] || 0) + n })), []);
  const setQty = useCallback(
    (id: string, qty: number) =>
      setCart((c) => {
        const next = { ...c };
        if (qty > 0) next[id] = qty;
        else delete next[id];
        return next;
      }),
    [],
  );
  const clear = useCallback(() => setCart({}), []);

  const value = useMemo<CartCtx>(() => {
    const items = DISHES.filter((d) => cart[d.id] > 0).map((dish) => ({ dish, qty: cart[dish.id] }));
    return {
      cart,
      ready,
      items,
      count: items.reduce((a, i) => a + i.qty, 0),
      total: items.reduce((a, i) => a + i.qty * i.dish.price, 0),
      add,
      setQty,
      clear,
    };
  }, [cart, ready, add, setQty, clear]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useCart() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useCart phải nằm trong CartProvider");
  return v;
}
