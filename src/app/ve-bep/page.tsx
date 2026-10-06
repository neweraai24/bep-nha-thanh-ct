import type { Metadata } from "next";
import Image from "next/image";
import { ArrowRight, ChartPie, ShieldCheck, Sprout } from "lucide-react";
import { Button, Sticker } from "@/components/ui";

export const metadata: Metadata = { title: "Nguồn rau của Bếp Nhà Thanh" };

const STEPS = [
  ["5:00", "Hái", "Rau muống, cải, xà lách hái tại vườn đối tác khi còn sương.", "bg-cai-non text-socola"],
  ["8:00", "Sơ chế", "Nhặt, rửa ba lần nước, để ráo. Thịt cá đã ướp từ tối hôm trước.", "bg-xoai text-socola"],
  ["10:00", "Nấu", "Gạo lứt nấu nồi gang, gà cá nướng ngay trước khi đóng hộp.", "bg-nuoc-dua text-nuoc-dua-ink"],
  ["11:30", "Giao", "Shipper của Bếp mang bowl tới tận bàn, sốt để riêng.", "bg-fat-bg text-socola"],
] as const;

const PROMISES = [
  [ShieldCheck, "Không chất bảo quản", "Nấu và giao trong ngày, nên Bếp không cần thêm gì để giữ món qua đêm."],
  [ChartPie, "Ghi rõ macro từng món", "Mỗi bowl có kcal, Protein, Carb, Fat tính theo khẩu phần thật, cân trước khi đóng hộp."],
  [Sprout, "Rau có nguồn gốc", "Biết tên vườn, ngày hái. Hỏi Bếp lô rau hôm nay đến từ đâu, Bếp trả lời được."],
] as const;

export default function SourcePage() {
  return (
    <>
      <section className="relative mt-4 flex h-[420px] items-end overflow-hidden md:h-[520px]">
        <Image src="/images/bnt-img-09.jpg" alt="Người nông dân đội nón lá ôm giỏ rau vừa hái trong vườn" fill priority sizes="100vw" className="object-cover" />
        <span className="absolute inset-x-0 bottom-0 h-3/5 bg-gradient-to-t from-socola/80 to-socola/0" />
        <Image src="/logo/bnt-mark-lightink.png" alt="" width={56} height={56} className="absolute top-6 left-4 w-14 md:left-8" />
        <div className="wrap relative w-full pb-8 md:pb-12">
          <h1 className="display display-xl max-w-[900px] text-kem-gao">Từ vườn đến bát trong 24 giờ</h1>
        </div>
      </section>

      <section className="wrap py-16 md:py-24">
        <div className="mb-10 flex flex-col items-start gap-4">
          <Sticker color="cai">Chọn tươi</Sticker>
          <h2 className="display display-l">Một buổi sáng của Bếp</h2>
        </div>
        <ol className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {STEPS.map(([t, l, d, tone]) => (
            <li key={t} className="flex flex-col gap-4">
              <div className={`flex h-36 flex-col justify-between rounded-card border-2 border-socola p-5 shadow-hard ${tone}`}>
                <span className="display display-m">{t}</span>
                <span className="label">{l}</span>
              </div>
              <p className="text-socola-2 text-pretty">{d}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="border-t-2 border-socola bg-la-rung py-16 md:py-24">
        <div className="wrap">
          <h2 className="display display-l mb-12 text-cai-non">Ba điều Bếp giữ mỗi ngày</h2>
          <div className="grid gap-10 md:grid-cols-3">
            {PROMISES.map(([Icon, t, d]) => (
              <div key={t} className="flex flex-col gap-3 text-kem-gao">
                <Icon size={32} className="text-cai-non" aria-hidden="true" />
                <h3 className="text-xl font-bold">{t}</h3>
                <p className="text-[#E2D6C6] text-pretty">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="wrap grid items-center gap-8 py-16 md:grid-cols-2 md:gap-14 md:py-24">
        <div className="relative aspect-[4/3] overflow-hidden rounded-sheet border-2 border-socola">
          <Image src="/images/bnt-img-01.jpg" alt="Mâm bowl và gỏi cuốn của Bếp Nhà Thanh" fill sizes="(min-width:768px) 50vw, 100vw" className="object-cover" />
        </div>
        <div className="flex flex-col items-start gap-5">
          <Sticker color="white">Chuyện của Bếp</Sticker>
          <h2 className="display display-m">Bắt đầu từ một nồi cơm gạo lứt</h2>
          <p className="text-[17px] leading-relaxed text-socola-2 text-pretty">
            Bếp Nhà Thanh nấu cơm trưa cho dân văn phòng muốn ăn có rau, có đạm, ăn xong vẫn làm việc tỉnh táo, không phải ăn kiêng khổ sở.
          </p>
          <p className="text-[17px] leading-relaxed text-socola-2 text-pretty">
            Cách làm giữ nguyên từ ngày đầu: rau mua sáng nay, gạo lứt nấu trong ngày, mỗi món ghi rõ con số. Bạn ăn gì, Bếp nói thật.
          </p>
          <Button href="/thuc-don" variant="sun">Xem thực đơn tuần này <ArrowRight size={18} /></Button>
        </div>
      </section>
    </>
  );
}
