"use client";

import { Check, Plus } from "lucide-react";
import { useCart } from "@/lib/cart";
import { Button } from "./ui";

export function AddToCart({ id }: { id: string }) {
  const { cart, add } = useCart();
  const n = cart[id] || 0;
  return (
    <Button size="sm" onClick={() => add(id)}>
      {n ? <Check size={16} /> : <Plus size={16} />}
      {n ? `Thêm · ${n}` : "Thêm"}
    </Button>
  );
}
