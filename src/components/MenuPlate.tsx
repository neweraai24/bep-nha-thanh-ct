import Image from "next/image";
import Link from "next/link";
import { MacroRing } from "./MacroRing";
import { cn } from "./cn";
import { num, vnd, type Dish } from "@/lib/data";

/** Đĩa món: ảnh bowl cắt tròn trong vòng Đĩa Macro, tên, kcal · protein, giá. */
export function MenuPlate({ dish, size = 240, onDark, children, className }: { dish: Dish; size?: number; onDark?: boolean; children?: React.ReactNode; className?: string }) {
  return (
    <div className={cn("flex flex-col items-center gap-4 text-center", className)}>
      <Link href={`/thuc-don/${dish.id}`} className="group flex w-full flex-col items-center gap-4 rounded-card">
        <div className="flex w-full justify-center transition-transform duration-300 ease-out group-hover:-rotate-3 group-hover:scale-[1.02]">
          <MacroRing size={size} protein={dish.p} carb={dish.c} fat={dish.f}>
            <Image src={dish.image} alt={dish.name} width={1600} height={893} sizes={`${Math.round(size * 2)}px`} className="size-full object-cover" style={{ objectPosition: "50% 50%", transform: "scale(1.12)" }} />
          </MacroRing>
        </div>
        <div className="flex flex-col gap-1">
          <span className={cn("text-lg font-bold", onDark ? "text-kem-gao" : "text-socola")}>{dish.name}</span>
          <span className={cn("text-[13px] font-medium tabular-nums", onDark ? "text-[#D9C8B6]" : "text-socola-2")}>
            {num(dish.kcal)} kcal · {dish.p}g protein
          </span>
          <span className={cn("num text-xl", onDark ? "text-xoai" : "text-cta")}>{vnd(dish.price)}</span>
        </div>
      </Link>
      {children}
    </div>
  );
}
