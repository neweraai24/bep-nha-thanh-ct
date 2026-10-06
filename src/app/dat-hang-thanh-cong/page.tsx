"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Check } from "lucide-react";
import { MacroRing } from "@/components/MacroRing";
import { Button } from "@/components/ui";
import { loadLastOrder, type Order } from "@/lib/order";
import { num, vnd } from "@/lib/data";

export default function OrderSuccess() {
  const [o, setO] = useState<Order | null | undefined>(undefined);
  useEffect(() => setO(loadLastOrder()), []);

  if (o === undefined) return <div className="min-h-[60vh]" />;
  if (o === null) {
    return (
      <section className="wrap flex min-h-[60vh] flex-col items-center justify-center gap-5 text-center">
        <h1 className="display display-m">Chưa có đơn nào</h1>
        <p className="text-socola-2">Chọn một bowl cho bữa trưa, Bếp nấu ngay.</p>
        <Button href="/thuc-don" size="lg">Xem thực đơn</Button>
      </section>
    );
  }

  const sum = (k: "kcal" | "p" | "c" | "f") => o.items.reduce((a, i) => a + i[k] * i.qty, 0);
  const total = o.items.reduce((a, i) => a + i.price * i.qty, 0) + o.ship - o.discount;

  return (
    <section className="mx-auto flex max-w-[560px] flex-col items-center gap-7 px-4 py-14 text-center md:py-20">
      <MacroRing size={160} protein={sum("p")} carb={sum("c")} fat={sum("f")}>
        <Check size={40} className="text-leaf-ink" strokeWidth={3} aria-label="Đã đặt" />
      </MacroRing>
      <div className="flex flex-col gap-3">
        <h1 className="display display-m">Đơn đã vào bếp!</h1>
        <p className="text-[17px]">Bếp sẽ giao trong khung {o.slot}. Mã đơn <b>#{o.code}</b>.</p>
      </div>

      <div className="flex w-full flex-col gap-4 rounded-card border-2 border-socola bg-white p-5 text-left shadow-hard md:p-6">
        {o.items.map((i) => (
          <div key={i.id} className="flex items-center gap-3">
            <span className="size-12 shrink-0 overflow-hidden rounded-full bg-kem-lom">
              <Image src={i.image} alt="" width={96} height={54} className="size-full scale-[1.12] object-cover" />
            </span>
            <div className="flex min-w-0 flex-1 flex-col">
              <b className="font-semibold">{i.qty} × {i.name}</b>
              <span className="text-[13px] text-socola-2 tabular-nums">{num(i.kcal * i.qty)} kcal</span>
            </div>
            <b className="num">{vnd(i.price * i.qty)}</b>
          </div>
        ))}
        <div className="flex flex-col gap-1.5 rounded-btn bg-kem-lom p-3.5 text-sm">
          <div className="flex justify-between"><span>Tổng dinh dưỡng</span><b className="num">{num(sum("kcal"))} kcal</b></div>
          <span className="text-socola-2">Protein {sum("p")}g · Carb {sum("c")}g · Fat {sum("f")}g</span>
        </div>
        <div className="flex justify-between text-sm"><span>Phí giao</span><span className="num">{vnd(o.ship)}</span></div>
        {o.discount > 0 && <div className="flex justify-between text-sm text-la-rung"><span>Giảm giá</span><span className="num">−{vnd(o.discount)}</span></div>}
        <div className="flex items-baseline justify-between border-t border-hairline pt-3"><span className="font-semibold">Tổng tiền</span><b className="num text-2xl">{vnd(total)}</b></div>
      </div>

      <Button href="/thuc-don" size="lg">Đặt thêm món</Button>
      <Link href="/" className="text-sm font-semibold text-socola-2 underline underline-offset-4">Về trang chủ</Link>
    </section>
  );
}
