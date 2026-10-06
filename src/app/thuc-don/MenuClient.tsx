"use client";

import { useState } from "react";
import { ArrowRight, ShoppingBag } from "lucide-react";
import { Button, Chip, Sticker } from "@/components/ui";
import { MenuPlate } from "@/components/MenuPlate";
import { AddToCart } from "@/components/AddToCart";
import { useCart } from "@/lib/cart";
import { DISHES, FILTERS, vnd } from "@/lib/data";

export function MenuClient({ initial }: { initial: string }) {
  const [f, setF] = useState(initial);
  const { count, total } = useCart();
  const list = DISHES.filter((d) => f === "all" || d.tags.includes(f as never));

  return (
    <>
      <section className="wrap pt-10 pb-28 md:pt-16">
        <div className="mb-7 flex flex-col items-start gap-4">
          <Sticker color="cai">Chọn tươi</Sticker>
          <h1 className="display display-l">Thực đơn tuần này</h1>
        </div>
        <div role="group" aria-label="Lọc món" className="scrollbar-none -mx-4 mb-10 flex gap-2.5 overflow-x-auto px-4 pb-2 md:mx-0 md:flex-wrap md:px-0">
          {FILTERS.map(({ key, label }) => (
            <Chip key={key} selected={f === key} onClick={() => setF(key)}>{label}</Chip>
          ))}
        </div>
        {list.length ? (
          <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 md:gap-y-14 xl:grid-cols-4">
            {list.map((d) => (
              <MenuPlate key={d.id} dish={d} size={240} className="[&_svg]:max-w-full">
                <AddToCart id={d.id} />
              </MenuPlate>
            ))}
          </div>
        ) : (
          <p className="py-16 text-center text-socola-2">Tuần này Bếp chưa có món khớp lọc này.</p>
        )}
      </section>

      <div
        aria-hidden={!count}
        className={`fixed inset-x-3 bottom-3 z-30 mx-auto flex max-w-[720px] items-center justify-between gap-4 rounded-card border-2 border-socola bg-socola px-5 py-3 text-kem-gao shadow-hard transition duration-300 ease-out md:bottom-6 ${count ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-[140%] opacity-0"}`}
      >
        <span className="flex items-center gap-2.5">
          <ShoppingBag size={22} />
          <b className="num">{count} món · {vnd(total)}</b>
        </span>
        <Button href="/thanh-toan">Xem giỏ <ArrowRight size={18} /></Button>
      </div>
    </>
  );
}
