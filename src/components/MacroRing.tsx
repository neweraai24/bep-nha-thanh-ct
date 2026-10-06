import { cn } from "./cn";

export const MACRO_COLORS = { protein: "#EC5E9C", carb: "#9FD356", fat: "#E8542A" };

type Props = {
  protein?: number;
  carb?: number;
  fat?: number;
  size?: number;
  emptyColor?: string;
  className?: string;
  children?: React.ReactNode;
};

/**
 * Đĩa Macro: ba cung có khe hở, theo chiều kim đồng hồ từ đỉnh — protein, carb, fat.
 * Độ dài cung tỉ lệ theo kcal (P×4, C×4, F×9). Nét ≈ 9% đường kính, khe = 1 lần nét.
 */
export function MacroRing({ protein = 0, carb = 0, fat = 0, size = 160, emptyColor = "#E6D8C5", className, children }: Props) {
  const w = size * 0.09;
  const r = (size - w) / 2;
  const C = 2 * Math.PI * r;
  const c = size / 2;
  let segs: { v: number; color: string }[] = [
    { v: protein * 4, color: MACRO_COLORS.protein },
    { v: carb * 4, color: MACRO_COLORS.carb },
    { v: fat * 9, color: MACRO_COLORS.fat },
  ].filter((s) => s.v > 0);
  const total = segs.reduce((a, s) => a + s.v, 0);
  if (!total) segs = [{ v: 1, color: emptyColor }];
  const den = total || 1;
  const single = segs.length === 1;

  let acc = 0;
  const arcs = segs.map((s, i) => {
    const L = (s.v / den) * C;
    const dash = single ? C : Math.max(L - 2 * w, 0.001);
    const off = single ? 0 : -(acc + w);
    acc += L;
    return (
      <circle
        key={i}
        cx={c}
        cy={c}
        r={r}
        fill="none"
        stroke={s.color}
        strokeWidth={w}
        strokeLinecap={single ? "butt" : "round"}
        strokeDasharray={`${dash} ${C}`}
        strokeDashoffset={off}
        transform={`rotate(-90 ${c} ${c})`}
      />
    );
  });

  return (
    <div className={cn("relative shrink-0", className)} style={{ width: size, maxWidth: "100%", aspectRatio: "1" }}>
      <svg viewBox={`0 0 ${size} ${size}`} className="block size-full" aria-hidden="true">
        {arcs}
      </svg>
      {children && (
        <div
          className="absolute flex flex-col items-center justify-center overflow-hidden rounded-full text-center"
          style={{ inset: `${((w * 1.6) / size) * 100}%` }}
        >
          {children}
        </div>
      )}
    </div>
  );
}
