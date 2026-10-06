import type { Metadata, Viewport } from "next";
import "./globals.css";
import { CartProvider } from "@/lib/cart";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: { default: "Bếp Nhà Thanh — Cơm nhà xanh mỗi ngày", template: "%s — Bếp Nhà Thanh" },
  description:
    "Bếp Nhà Thanh nấu gạo lứt lúc 6 giờ sáng, giao bowl healthy tới bàn làm việc của bạn trước 12 giờ. Mỗi món ghi rõ kcal, Protein, Carb, Fat.",
  icons: { icon: "/logo/bnt-mark-darkink.png" },
};

export const viewport: Viewport = { themeColor: "#FFD447" };

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="vi">
      <body>
        <CartProvider>
          <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[200] focus:rounded-btn focus:bg-white focus:px-4 focus:py-2">
            Bỏ qua tới nội dung
          </a>
          <SiteHeader />
          <main id="main">{children}</main>
          <SiteFooter />
        </CartProvider>
      </body>
    </html>
  );
}
