import Image from "next/image";
import Link from "next/link";
import { STORE } from "@/lib/data";

function Col({ title, items }: { title: string; items: [string, string][] }) {
  return (
    <div className="flex flex-col gap-2.5 text-[15px]">
      <b className="label text-cai-non">{title}</b>
      {items.map(([l, h]) => (
        <Link key={l} href={h} className="text-kem-gao hover:text-xoai">{l}</Link>
      ))}
    </div>
  );
}

export function SiteFooter() {
  return (
    <footer className="bg-la-rung pt-16 pb-8 text-kem-gao">
      <div className="wrap grid grid-cols-2 gap-7 xl:grid-cols-[1.4fr_1fr_1fr_1fr_1fr] xl:gap-10">
        <div className="col-span-2 flex flex-col gap-4 xl:col-span-1">
          <Image src="/logo/bnt-logo-lightink.png" alt="Bếp Nhà Thanh" width={260} height={72} className="h-[72px] w-auto self-start" />
          <span>Bếp: {STORE.address}</span>
        </div>
        <Col title="Đặt món" items={[["Thực đơn", "/thuc-don"], ["Giỏ hàng", "/thanh-toan"]]} />
        <Col title="Bếp" items={[["Về Bếp", "/ve-bep"], ["Nguồn rau", "/ve-bep"], ["Tìm cửa hàng", "/lien-he#cua-hang"]]} />
        <Col title="Hỗ trợ" items={[["Liên hệ", "/lien-he"]]} />
        <div className="flex flex-col gap-2.5 text-[15px]">
          <b className="label text-cai-non">Giờ mở cửa</b>
          <span>{STORE.hours}</span>
          <a href={`tel:${STORE.tel}`} className="mt-2 hover:text-xoai">{STORE.phone}</a>
        </div>
      </div>
      <div className="wrap mt-12 border-t border-kem-gao/20 pt-5 text-[13px] opacity-75">© 2026 Bếp Nhà Thanh</div>
    </footer>
  );
}
