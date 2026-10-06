import Link from "next/link";
import { Minus, Plus } from "lucide-react";
import { cn } from "./cn";

/* ---------- Button ---------- */
type Variant = "primary" | "sun" | "outline" | "dark";
type Size = "sm" | "md" | "lg";

const V: Record<Variant, string> = {
  primary: "bg-cta text-white hover:bg-cta-hover active:scale-[.97]",
  sun: "bg-xoai text-socola border-2 border-socola shadow-hard hover:bg-xoai-deep hover:-translate-x-px hover:-translate-y-px active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0_#2B1A12]",
  outline:
    "bg-transparent text-socola border-2 border-socola shadow-hard hover:bg-socola/[.06] hover:-translate-x-px hover:-translate-y-px active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0_#2B1A12]",
  dark: "bg-la-rung text-kem-gao hover:bg-la-rung-deep",
};
const S: Record<Size, string> = { sm: "h-9 px-3.5", md: "h-12 px-5", lg: "h-14 px-7" };

type ButtonProps = {
  variant?: Variant;
  size?: Size;
  full?: boolean;
  href?: string;
  className?: string;
  children: React.ReactNode;
} & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "className">;

export function Button({ variant = "primary", size = "md", full, href, className, children, ...rest }: ButtonProps) {
  const cls = cn(
    "label inline-flex items-center justify-center gap-2 rounded-btn whitespace-nowrap transition duration-150 ease-out select-none",
    "disabled:cursor-not-allowed disabled:opacity-45",
    V[variant],
    S[size],
    full && "w-full",
    className,
  );
  if (href) {
    return (
      <Link href={href} className={cls}>
        {children}
      </Link>
    );
  }
  return (
    <button type="button" className={cls} {...rest}>
      {children}
    </button>
  );
}

/* ---------- Sticker (Patrick Hand, poster) ---------- */
const STICKER: Record<string, string> = {
  xoai: "bg-xoai",
  cai: "bg-cai-non",
  dua: "bg-nuoc-dua",
  thanhlong: "bg-thanh-long",
  white: "bg-white",
};
export function Sticker({ color = "xoai", rotate = -3, children, className }: { color?: keyof typeof STICKER; rotate?: number; children: React.ReactNode; className?: string }) {
  return (
    <span
      className={cn("inline-block rounded-full border-2 border-socola px-3.5 py-1 font-hand text-[18px] leading-tight whitespace-nowrap text-socola shadow-hard", STICKER[color], className)}
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      {children}
    </span>
  );
}

/* ---------- Chip ---------- */
export function Chip({ selected, onClick, children, icon }: { selected?: boolean; onClick?: () => void; children: React.ReactNode; icon?: React.ReactNode }) {
  return (
    <button
      type="button"
      aria-pressed={!!selected}
      onClick={onClick}
      className={cn(
        "inline-flex h-10 items-center gap-1.5 rounded-full border-2 border-socola px-4 text-sm font-semibold whitespace-nowrap transition-colors duration-150",
        selected ? "bg-socola text-kem-gao" : "bg-white text-socola shadow-hard-sm",
      )}
    >
      {icon}
      {children}
    </button>
  );
}

/* ---------- QuantityStepper ---------- */
export function QuantityStepper({ value, onChange, min = 0, size = "md" }: { value: number; onChange: (v: number) => void; min?: number; size?: "sm" | "md" }) {
  const b = size === "sm" ? "size-8" : "size-11";
  return (
    <div className="inline-flex items-center gap-1 rounded-full border-[1.5px] border-hairline bg-white p-1">
      <button type="button" aria-label="Bớt một" disabled={value <= min} onClick={() => onChange(value - 1)} className={cn(b, "grid place-items-center rounded-full hover:bg-kem-lom disabled:opacity-40")}>
        <Minus size={16} />
      </button>
      <span className="num min-w-7 text-center text-[15px]" aria-live="polite">{value}</span>
      <button type="button" aria-label="Thêm một" onClick={() => onChange(value + 1)} className={cn(b, "grid place-items-center rounded-full hover:bg-kem-lom")}>
        <Plus size={16} />
      </button>
    </div>
  );
}

/* ---------- Field (input có nhãn + lỗi) ---------- */
export function Field({ label, error, className, children }: { label: string; error?: string; className?: string; children: React.ReactNode }) {
  return (
    <label className={cn("flex flex-col gap-1.5", className)}>
      <span className="text-[13px] font-semibold">{label}</span>
      {children}
      {error && (
        <span role="alert" className="flex items-center gap-1.5 text-[13px] font-medium text-danger">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><circle cx="12" cy="12" r="10" /><path d="M12 8v4M12 16h.01" /></svg>
          {error}
        </span>
      )}
    </label>
  );
}
export const inputCls = (err?: boolean) =>
  cn(
    "h-12 w-full rounded-btn bg-white px-3.5 text-[15px] text-socola outline-none ring-[1.5px] transition-shadow focus:ring-2 focus:ring-khoai-mon",
    err ? "ring-2 ring-danger" : "ring-hairline",
  );

/* ---------- MacroCard ---------- */
const MC = {
  protein: { label: "Protein", bg: "bg-protein-bg", color: "#EC5E9C" },
  carb: { label: "Carb", bg: "bg-carb-bg", color: "#9FD356" },
  fat: { label: "Fat", bg: "bg-fat-bg", color: "#E8542A" },
} as const;
export function MacroCard({ macro, grams, pct }: { macro: keyof typeof MC; grams: number; pct: number }) {
  const m = MC[macro];
  return (
    <div className={cn("flex flex-col gap-1 rounded-card p-4", m.bg)}>
      <span className="flex items-center gap-2 text-[13px] font-semibold">
        <span className="size-2.5 rounded-full" style={{ background: m.color }} aria-hidden="true" />
        {m.label}
      </span>
      <span className="num text-2xl">{grams}g</span>
      <span className="text-xs font-medium text-socola-2">{pct}% năng lượng</span>
    </div>
  );
}
