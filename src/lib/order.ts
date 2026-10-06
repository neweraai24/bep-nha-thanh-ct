export type OrderItem = { id: string; name: string; image: string; price: number; kcal: number; p: number; c: number; f: number; qty: number };
export type Order = { code: string; slot: string; ship: number; discount: number; items: OrderItem[] };

const KEY = "bnt-last-order";

export function saveLastOrder(o: Order) {
  try {
    sessionStorage.setItem(KEY, JSON.stringify(o));
  } catch {}
}

export function loadLastOrder(): Order | null {
  try {
    const o = JSON.parse(sessionStorage.getItem(KEY) || "null");
    return o && Array.isArray(o.items) && o.items.length ? o : null;
  } catch {
    return null;
  }
}
