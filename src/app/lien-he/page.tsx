import type { Metadata } from "next";
import { Clock, MapPin, Navigation, Phone } from "lucide-react";
import { Button, Sticker } from "@/components/ui";
import { STORE } from "@/lib/data";

export const metadata: Metadata = { title: "Liên hệ & tìm cửa hàng" };

// Toạ độ ước lượng cho Số 5 Võ Oanh — cần kiểm tra lại trước khi chạy thật.
const LAT = 10.8018, LON = 106.7151;
const MAP = `https://www.openstreetmap.org/export/embed.html?bbox=${LON - 0.006}%2C${LAT - 0.004}%2C${LON + 0.006}%2C${LAT + 0.004}&layer=mapnik&marker=${LAT}%2C${LON}`;

export default function ContactPage() {
  return (
    <section id="cua-hang" className="wrap scroll-mt-28 pt-10 pb-20 md:pt-16">
      <div className="mb-10 flex flex-col items-start gap-4">
        <Sticker color="xoai">Ghé Bếp</Sticker>
        <h1 className="display display-l">Tìm Bếp Nhà <span className="text-ot-chin">Thanh</span></h1>
        <p className="max-w-[640px] text-lg text-socola-2 text-pretty">Bếp mở cửa buổi sáng để nấu và giao trước giờ trưa. Bạn gọi hoặc ghé trực tiếp đều được.</p>
      </div>
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
        <div className="min-h-[360px] overflow-hidden rounded-sheet border-2 border-socola bg-kem-lom md:min-h-[460px]">
          <iframe title="Bản đồ Bếp Nhà Thanh" src={MAP} loading="lazy" className="size-full min-h-[360px] border-0 md:min-h-[460px]" />
        </div>
        <div className="flex flex-col gap-6 rounded-sheet border-2 border-socola bg-xoai p-7 shadow-hard md:p-9">
          <h2 className="display display-m">Ghé Bếp</h2>
          <ul className="flex flex-col gap-4 text-[17px]">
            <li className="flex gap-3"><MapPin className="mt-1 shrink-0" size={20} />{STORE.address}</li>
            <li className="flex gap-3"><Clock className="mt-1 shrink-0" size={20} />Mở cửa {STORE.hours}</li>
            <li className="flex gap-3"><Phone className="mt-1 shrink-0" size={20} /><a href={`tel:${STORE.tel}`} className="font-bold underline underline-offset-4">{STORE.phone}</a></li>
          </ul>
          <div className="mt-auto flex flex-wrap gap-3">
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(STORE.address)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="label inline-flex h-12 items-center gap-2 rounded-btn bg-cta px-5 text-white transition hover:bg-cta-hover"
            >
              <Navigation size={18} />Chỉ đường
            </a>
            <Button href={`tel:${STORE.tel}`} variant="outline" size="md"><Phone size={18} />Gọi Bếp</Button>
          </div>
        </div>
      </div>
    </section>
  );
}
