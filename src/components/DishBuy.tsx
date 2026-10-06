"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/lib/cart";
import { vnd } from "@/lib/data";
import { Button, QuantityStepper } from "./ui";

export function DishBuy({ id, price }: { id: string; price: number }) {
  const [qty, setQty] = useState(1);
  const { add } = useCart();
  const router = useRouter();
  return (
    <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
      <QuantityStepper value={qty} min={1} onChange={setQty} />
      <Button
        size="lg"
        full
        onClick={() => {
          add(id, qty);
          router.push("/thanh-toan");
        }}
      >
        Thêm vào giỏ · {vnd(price * qty)}
      </Button>
    </div>
  );
}
