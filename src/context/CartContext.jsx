import { createContext, useContext, useEffect, useMemo, useState } from "react";

const LS = "cart_v1";
const Ctx = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try { return JSON.parse(localStorage.getItem(LS)) || []; } catch { return []; }
  });

  useEffect(() => {
    localStorage.setItem(LS, JSON.stringify(items));
  }, [items]);

  function addItem(prod, qty = 1) {
    const q = Math.max(1, Number(qty) || 1);
    setItems(prev => {
      const next = [...prev];
      const i = next.findIndex(x => x.id === prod.id);
      if (i > -1) next[i] = { ...next[i], qty: (next[i].qty || 0) + q };
      else next.push({ id: prod.id, title: prod.title, price: prod.price, qty: q });
      return next;
    });
  }

  function setQty(id, qty) {
    const q = Math.max(1, Number(qty) || 1);
    setItems(prev => prev.map(it => it.id === id ? { ...it, qty: q } : it));
  }

  function removeItem(id) {
    setItems(prev => prev.filter(it => it.id !== id));
  }

  const count = useMemo(() => items.reduce((s, it) => s + (it.qty || 0), 0), [items]);
  const total = useMemo(() => items.reduce((s, it) => s + (it.qty || 0) * (it.price || 0), 0), [items]);

  const value = { items, addItem, setQty, removeItem, count, total };
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export const useCart = () => useContext(Ctx);
