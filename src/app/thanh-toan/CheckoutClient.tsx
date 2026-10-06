"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ArrowLeft, Banknote, Clock, Landmark, MapPin, Phone, Wallet } from "lucide-react";
import { MacroRing } from "@/components/MacroRing";
import { Button, Chip, Field, QuantityStepper, inputCls } from "@/components/ui";
import { cn } from "@/components/cn";
import { useCart } from "@/lib/cart";
import { SHIP_FEE, SLOTS, num, vnd } from "@/lib/data";
import { saveLastOrder } from "@/lib/order";

const PAY = [
  ["cash", Banknote, "Tiền mặt", "Trả khi nhận bowl"],
  ["bank", Landmark, "Chuyển khoản", "Quét QR sau khi đặt"],
  ["wallet", Wallet, "Ví điện tử", "MoMo, ZaloPay, VNPay"],
] as const;

type Form = { name: string; phone: string; address: string; slot: string };

function validate(v: Form) {
  const e: Partial<Record<keyof Form, string>> = {};
  if (!v.name.trim()) e.name = "Bạn điền tên người nhận nhé.";
  const d = v.phone.replace(/\D/g, "");
  if (d.length !== 10 || d[0] !== "0") e.phone = "Số điện thoại cần đủ 10 số, bắt đầu bằng 0.";
  if (v.address.trim().length < 8) e.address = "Bếp cần số nhà, tên đường và quận để giao.";
  if (!v.slot) e.slot = "Chọn một khung giờ giao.";
  return e;
}

function Block({ title, aside, children }: { title: string; aside?: React.ReactNode; children: React.ReactNode }) {
  return (
    <section className="flex flex-col gap-5 rounded-card border-[1.5px] border-hairline bg-white p-5 md:p-7">
      <div className="flex items-baseline justify-between">
        <h2 className="text-2xl font-bold">{title}</h2>
        {aside}
      </div>
      {children}
    </section>
  );
}

export function CheckoutClient() {
  const router = useRouter();
  const { items, total: subtotal, setQty, clear, ready } = useCart();
  const [v, setV] = useState<Form>({ name: "", phone: "", address: "", slot: SLOTS[1] });
  const [touched, setTouched] = useState<Partial<Record<keyof Form, boolean>>>({});
  const [pay, setPay] = useState("cash");
  const [code, setCode] = useState("");
  const [codeState, setCodeState] = useState<null | "ok" | "bad">(null);

  const errors = validate(v);
  const show = (k: keyof Form) => (touched[k] ? errors[k] : undefined);
  const set = (k: keyof Form) => (e: React.ChangeEvent<HTMLInputElement>) => setV((s) => ({ ...s, [k]: e.target.value }));
  const blur = (k: keyof Form) => () => setTouched((t) => ({ ...t, [k]: true }));

  const sum = (k: "kcal" | "p" | "c" | "f") => items.reduce((a, i) => a + i.dish[k] * i.qty, 0);
  const discount = codeState === "ok" ? Math.round((subtotal * 0.1) / 1000) * 1000 : 0;
  const ship = items.length ? SHIP_FEE : 0;
  const total = subtotal + ship - discount;

  const submit = () => {
    setTouched({ name: true, phone: true, address: true, slot: true });
    if (Object.keys(errors).length || !items.length) return;
    saveLastOrder({
      code: "M" + String(Math.floor(1000 + Math.random() * 9000)),
      slot: v.slot.replace(/ – /, "–"),
      ship,
      discount,
      items: items.map(({ dish, qty }) => ({ id: dish.id, name: dish.name, image: dish.image, price: dish.price, kcal: dish.kcal, p: dish.p, c: dish.c, f: dish.f, qty })),
    });
    clear();
    router.push("/dat-hang-thanh-cong");
  };

  return (
    <section className="wrap pt-6 pb-20 md:pt-10">
      <Link href="/thuc-don" className="mb-2 inline-flex items-center gap-1.5 text-sm font-semibold text-socola-2 hover:text-socola">
        <ArrowLeft size={18} />Tiếp tục chọn món
      </Link>
      <h1 className="display display-l mb-8 md:mb-10">Giỏ hàng & thanh toán</h1>

      <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_420px] md:gap-8">
        <div className="flex min-w-0 flex-col gap-5">
          <Block title="Món trong giỏ" aside={<span className="text-sm text-socola-2">{items.reduce((a, i) => a + i.qty, 0)} món</span>}>
            {!ready ? null : items.length ? (
              <ul className="flex flex-col gap-4">
                {items.map(({ dish, qty }) => (
                  <li key={dish.id} className="flex flex-wrap items-center gap-x-4 gap-y-3 sm:flex-nowrap">
                    <span className="size-14 shrink-0 overflow-hidden rounded-full bg-kem-lom">
                      <Image src={dish.image} alt="" width={112} height={63} className="size-full scale-[1.12] object-cover" />
                    </span>
                    <div className="flex min-w-0 flex-1 flex-col">
                      <b className="font-semibold">{dish.name}</b>
                      <span className="text-[13px] text-socola-2 tabular-nums">{num(dish.kcal)} kcal · {dish.p}g protein</span>
                    </div>
                    <QuantityStepper size="sm" value={qty} onChange={(q) => setQty(dish.id, q)} />
                    <b className="num w-24 text-right text-cta">{vnd(dish.price * qty)}</b>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-socola-2">
                Giỏ đang trống. <Link href="/thuc-don" className="font-semibold text-cta underline underline-offset-4">Chọn bowl cho bữa trưa</Link>.
              </p>
            )}
          </Block>

          {items.length > 0 && (
            <Block title="Tổng dinh dưỡng đơn này">
              <div className="flex flex-wrap items-center gap-6">
                <MacroRing size={120} protein={sum("p")} carb={sum("c")} fat={sum("f")}>
                  <b className="num text-xl">{num(sum("kcal"))}</b>
                  <span className="text-xs text-socola-2">kcal</span>
                </MacroRing>
                <div className="flex flex-col gap-2.5 text-[15px]">
                  {([["Protein", sum("p"), "#EC5E9C"], ["Carb", sum("c"), "#9FD356"], ["Fat", sum("f"), "#E8542A"]] as const).map(([l, g, c]) => (
                    <span key={l} className="flex items-center gap-2.5">
                      <span className="size-3 rounded-full" style={{ background: c }} aria-hidden="true" />
                      <span className="w-14 font-semibold">{l}</span>
                      <b className="num">{g}g</b>
                    </span>
                  ))}
                  <span className="text-[13px] text-socola-2">Tính theo khẩu phần chuẩn của Bếp, chưa gồm sốt thêm.</span>
                </div>
              </div>
            </Block>
          )}

          <Block title="Giao tới đâu?">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Tên người nhận" error={show("name")}>
                <input className={inputCls(!!show("name"))} autoComplete="name" value={v.name} onChange={set("name")} onBlur={blur("name")} aria-invalid={!!show("name")} />
              </Field>
              <Field label="Số điện thoại" error={show("phone")}>
                <span className="relative block">
                  <Phone size={18} className="pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2 text-socola-2" />
                  <input className={cn(inputCls(!!show("phone")), "pl-10")} inputMode="tel" autoComplete="tel" value={v.phone} onChange={set("phone")} onBlur={blur("phone")} aria-invalid={!!show("phone")} />
                </span>
              </Field>
              <Field label="Địa chỉ" error={show("address")} className="sm:col-span-2">
                <span className="relative block">
                  <MapPin size={18} className="pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2 text-socola-2" />
                  <input className={cn(inputCls(!!show("address")), "pl-10")} placeholder="Số nhà, tên đường, phường, quận" autoComplete="street-address" value={v.address} onChange={set("address")} onBlur={blur("address")} aria-invalid={!!show("address")} />
                </span>
              </Field>
              <div className="flex flex-col gap-2 sm:col-span-2">
                <span className="text-[13px] font-semibold">Khung giờ giao</span>
                <div className="flex flex-wrap gap-2.5">
                  {SLOTS.map((s) => (
                    <Chip key={s} icon={<Clock size={16} />} selected={v.slot === s} onClick={() => setV((x) => ({ ...x, slot: s }))}>{s}</Chip>
                  ))}
                </div>
              </div>
            </div>
          </Block>
        </div>

        <aside className="lg:sticky lg:top-28">
          <div className="flex flex-col gap-4 rounded-card border-2 border-socola bg-white p-5 shadow-hard md:p-6">
            <h2 className="text-2xl font-bold">Tóm tắt đơn</h2>
            <div className="flex justify-between"><span>Tạm tính</span><b className="num">{vnd(subtotal)}</b></div>
            <div className="flex justify-between"><span>Phí giao</span><b className="num">{items.length ? vnd(ship) : "—"}</b></div>
            {discount > 0 && <div className="flex justify-between text-la-rung"><span>Mã BEPNHA10 (−10%)</span><b className="num">−{vnd(discount)}</b></div>}
            <div className="flex items-start gap-2">
              <Field label="Mã giảm giá" error={codeState === "bad" ? "Mã này không dùng được." : undefined} className="flex-1">
                <input className={inputCls(codeState === "bad")} placeholder="Nhập mã" value={code} onChange={(e) => { setCode(e.target.value); setCodeState(null); }} />
              </Field>
              <Button variant="sun" className="mt-[25px]" disabled={!code.trim()} onClick={() => setCodeState(code.trim().toUpperCase() === "BEPNHA10" ? "ok" : "bad")}>Áp dụng</Button>
            </div>
            <div className="flex items-baseline justify-between border-t border-hairline pt-4">
              <span className="font-semibold">Tổng</span>
              <b className="num text-[28px]">{vnd(total)}</b>
            </div>

            <div role="radiogroup" aria-label="Phương thức thanh toán" className="flex flex-col gap-2.5">
              <span className="text-[13px] font-semibold">Thanh toán</span>
              {PAY.map(([k, Icon, l, d]) => (
                <button key={k} type="button" role="radio" aria-checked={pay === k} onClick={() => setPay(k)} className={cn("flex items-center gap-3 rounded-btn border-2 p-3 text-left transition-colors", pay === k ? "border-socola bg-kem-gao" : "border-hairline bg-white")}>
                  <span className="grid size-5 shrink-0 place-items-center rounded-full border-2 border-socola">{pay === k && <span className="size-2.5 rounded-full bg-socola" />}</span>
                  <Icon size={22} aria-hidden="true" />
                  <span className="flex flex-col"><b className="text-[15px]">{l}</b><span className="text-[13px] text-socola-2">{d}</span></span>
                </button>
              ))}
            </div>
            <Button size="lg" full disabled={!items.length} onClick={submit}>Đặt món · {vnd(total)}</Button>
            <span className="text-center text-xs text-socola-2">Bếp nhận đơn tới 10:30 cho bữa trưa hôm nay.</span>
          </div>
        </aside>
      </div>
    </section>
  );
}
