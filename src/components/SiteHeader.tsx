"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, Menu, Phone, ShoppingBag, X } from "lucide-react";
import { useCart } from "@/lib/cart";
import { STORE, num, vnd } from "@/lib/data";
import { Button, QuantityStepper } from "./ui";
import { cn } from "./cn";

const LEFT = [
  ["Thực đơn", "/thuc-don"],
  ["Nhiều đạm", "/thuc-don?filter=protein"],
  ["Thuần chay", "/thuc-don?filter=vegan"],
] as const;
const RIGHT = [
  ["Về Bếp", "/ve-bep"],
  ["Liên hệ", "/lien-he"],
] as const;
const ALL = [["Thực đơn", "/thuc-don"], ["Về Bếp", "/ve-bep"], ["Liên hệ", "/lien-he"], ["Giỏ hàng", "/thanh-toan"]] as const;

function NavLink({ href, children, active }: { href: string; children: React.ReactNode; active: boolean }) {
  return (
    <Link href={href} aria-current={active ? "page" : undefined} className={cn("label py-1.5 whitespace-nowrap text-socola hover:shadow-[inset_0_-2px_0_#2B1A12]", active && "shadow-[inset_0_-2px_0_#2B1A12]")}>
      {children}
    </Link>
  );
}

const iconBtn =
  "relative grid size-10 md:size-11 shrink-0 place-items-center rounded-full border-2 border-socola bg-white text-socola transition hover:-translate-x-px hover:-translate-y-px hover:shadow-hard";

function MiniCart({ onClose }: { onClose: () => void }) {
  const { items, total, setQty } = useCart();
  return (
    <div role="dialog" aria-label="Giỏ hàng" className="fixed inset-x-3 top-[76px] z-40 flex flex-col gap-3.5 rounded-card border-2 border-socola bg-white p-4 shadow-hard md:absolute md:inset-x-auto md:top-[calc(100%+14px)] md:right-0 md:w-[360px]">
      <div className="flex items-center justify-between">
        <b className="text-lg">Giỏ của bạn</b>
        <button aria-label="Đóng giỏ" onClick={onClose} className="grid size-9 place-items-center rounded-full hover:bg-kem-lom"><X size={18} /></button>
      </div>
      {items.length ? (
        <>
          <ul className="flex max-h-[300px] flex-col gap-3 overflow-auto">
            {items.map(({ dish, qty }) => (
              <li key={dish.id} className="flex items-center gap-3">
                <span className="size-12 shrink-0 overflow-hidden rounded-full bg-kem-lom">
                  <Image src={dish.image} alt="" width={96} height={54} className="size-full scale-[1.12] object-cover" />
                </span>
                <div className="flex min-w-0 flex-1 flex-col">
                  <b className="text-sm leading-snug font-semibold">{dish.name}</b>
                  <span className="text-xs text-socola-2 tabular-nums">{num(dish.kcal)} kcal · {vnd(dish.price)}</span>
                </div>
                <QuantityStepper size="sm" value={qty} onChange={(q) => setQty(dish.id, q)} />
              </li>
            ))}
          </ul>
          <div className="flex items-baseline justify-between border-t border-hairline pt-3 text-sm">
            <span>Tạm tính</span>
            <b className="num text-xl">{vnd(total)}</b>
          </div>
          <Button href="/thanh-toan" full>Xem giỏ <ArrowRight size={18} /></Button>
        </>
      ) : (
        <div className="flex flex-col items-center gap-2.5 px-2 py-3 text-center text-sm text-socola-2">
          <ShoppingBag size={28} />
          <span>Giỏ còn trống. Chọn một bowl cho trưa nay nhé.</span>
          <Button href="/thuc-don" variant="outline" size="sm">Xem thực đơn</Button>
        </div>
      )}
    </div>
  );
}

export function SiteHeader() {
  const path = usePathname();
  const { count } = useCart();
  const [mini, setMini] = useState(false);
  const [drawer, setDrawer] = useState(false);
  const cartRef = useRef<HTMLDivElement>(null);

  // Đóng mọi lớp phủ khi đổi trang.
  useEffect(() => {
    setMini(false);
    setDrawer(false);
  }, [path]);

  useEffect(() => {
    document.body.style.overflow = drawer ? "hidden" : "";
  }, [drawer]);

  useEffect(() => {
    if (!mini) return;
    const down = (e: MouseEvent) => {
      if (cartRef.current && !cartRef.current.contains(e.target as Node)) setMini(false);
    };
    const key = (e: KeyboardEvent) => e.key === "Escape" && setMini(false);
    document.addEventListener("mousedown", down);
    document.addEventListener("keydown", key);
    return () => {
      document.removeEventListener("mousedown", down);
      document.removeEventListener("keydown", key);
    };
  }, [mini]);

  const isActive = (href: string) => !href.includes("?") && (href === "/" ? path === "/" : path.startsWith(href));

  return (
    <div className="sticky top-0 z-30 mx-auto max-w-[1376px] px-3 pt-3 md:px-8 md:pt-4">
      <header className="grid grid-cols-[auto_1fr_auto] items-center gap-2 rounded-card border-2 border-socola bg-xoai py-1.5 pr-2 pl-2 shadow-hard md:py-2.5 md:pr-3 lg:grid-cols-[1fr_auto_1fr] lg:gap-6 lg:pl-7">
        <nav aria-label="Menu chính" className="hidden gap-7 lg:flex">
          {LEFT.map(([t, h]) => <NavLink key={t} href={h} active={isActive(h)}>{t}</NavLink>)}
        </nav>
        <button aria-label="Mở menu" onClick={() => setDrawer(true)} className={cn(iconBtn, "lg:hidden")}><Menu size={22} /></button>

        <Link href="/" aria-label="Bếp Nhà Thanh — Trang chủ" className="flex justify-start lg:justify-center">
          <Image src="/logo/bnt-logo-darkink.png" alt="Bếp Nhà Thanh" width={160} height={56} priority className="h-10 w-auto md:h-14" />
        </Link>

        <div className="flex items-center justify-end gap-3 lg:gap-7">
          <nav aria-label="Menu phụ" className="hidden gap-7 lg:flex">
            {RIGHT.map(([t, h]) => <NavLink key={t} href={h} active={isActive(h)}>{t}</NavLink>)}
          </nav>
          <div ref={cartRef} className="relative">
            <button className={iconBtn} aria-label={`Giỏ hàng, ${count} món`} aria-expanded={mini} onClick={() => setMini((m) => !m)}>
              <ShoppingBag size={20} />
              {count > 0 && <span className="absolute -top-1.5 -right-1.5 box-content h-5 min-w-5 rounded-full border-2 border-xoai bg-cta px-[5px] text-[11px] leading-5 font-bold text-white tabular-nums">{count}</span>}
            </button>
            {mini && <MiniCart onClose={() => setMini(false)} />}
          </div>
          <Button href="/thuc-don" variant="outline" size="sm" className="hidden md:inline-flex">Đặt món</Button>
        </div>
      </header>

      <div className={cn("fixed inset-0 z-[100]", drawer ? "pointer-events-auto" : "pointer-events-none")} aria-hidden={!drawer}>
        <div onClick={() => setDrawer(false)} className={cn("absolute inset-0 bg-socola/45 transition-opacity duration-200", drawer ? "opacity-100" : "opacity-0")} />
        <aside role="dialog" aria-label="Menu" className={cn("absolute inset-y-0 left-0 flex w-[min(340px,86vw)] flex-col rounded-r-sheet border-r-2 border-socola bg-xoai px-4 pt-4 pb-6 transition-transform duration-300 ease-out", drawer ? "translate-x-0" : "-translate-x-[102%]")}>
          <div className="flex items-center justify-between pb-4 pl-2">
            <Image src="/logo/bnt-logo-darkink.png" alt="Bếp Nhà Thanh" width={130} height={44} className="h-11 w-auto" />
            <button aria-label="Đóng menu" onClick={() => setDrawer(false)} className={iconBtn}><X size={22} /></button>
          </div>
          <nav className="flex flex-1 flex-col overflow-auto">
            {ALL.map(([t, h]) => (
              <Link key={t} href={h} className={cn("flex min-h-14 items-center justify-between border-b-2 border-socola/15 px-2 font-display text-[28px] uppercase", isActive(h) ? "text-cta" : "text-socola")}>
                <span>{t}</span><ArrowRight size={20} />
              </Link>
            ))}
          </nav>
          <div className="flex flex-col gap-3.5 pt-4">
            <Button href="/thuc-don" size="lg" full>Đặt món</Button>
            <a href={`tel:${STORE.tel}`} className="flex items-center justify-center gap-2 text-sm font-semibold"><Phone size={18} />{STORE.phone} · {STORE.hours}</a>
          </div>
        </aside>
      </div>
    </div>
  );
}
