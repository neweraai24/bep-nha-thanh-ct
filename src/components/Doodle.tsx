/** Doodle line-art rau củ, nét mảnh, màu theo nền (đậm hơn một chút). */
export function Doodle({ className, stroke = "currentColor" }: { className?: string; stroke?: string }) {
  return (
    <svg viewBox="0 0 240 240" fill="none" stroke={stroke} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      {/* cà rốt */}
      <path d="M150 120c20-10 40 8 30 28l-48 70c-6 8-18 4-16-6l12-82c1-6 6-9 12-10z" />
      <path d="M158 112c-4-16 2-28 16-34M166 114c6-14 18-20 32-18M160 116c-12-8-26-6-34 4" />
      <path d="M140 160l16 6M132 184l14 6" />
      {/* lá */}
      <path d="M40 70c30-30 70-20 80 10-30 24-72 20-80-10z" />
      <path d="M44 74c26 0 54 4 72 8" />
      {/* cà chua */}
      <circle cx="76" cy="178" r="30" />
      <path d="M62 152c6 6 10 8 14 8s8-2 14-8M76 148v10M66 160l10 4 10-4" />
    </svg>
  );
}
