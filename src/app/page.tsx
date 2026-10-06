import Image from "next/image";
import { ArrowRight, Clock, Bike, ChartPie, Leaf, Sprout, Wheat, Drumstick, Droplets, MapPin, Star } from "lucide-react";
import { Button, Sticker } from "@/components/ui";
import { MenuPlate } from "@/components/MenuPlate";
import { Doodle } from "@/components/Doodle";
import { DISHES } from "@/lib/data";

const INGREDIENTS = [
  ["Bơ", "/images/bnt-img-10.jpg"],
  ["Cà rốt", "/images/bnt-img-11.jpg"],
  ["Bắp", "/images/bnt-img-13.jpg"],
  ["Cà chua", "/images/bnt-img-14.jpg"],
  ["Rau muống", "/images/bnt-img-15.jpg"],
] as const;

const BENEFITS = [
  { icon: Sprout, t: "Rau hái lúc 5 giờ sáng", d: "Rau muống, cải, xà lách từ vườn đối tác, tới bếp trước khi nấu." },
  { icon: Wheat, t: "Gạo lứt nấu trong ngày", d: "Ngâm từ tối hôm trước, nấu nồi gang lúc 6 giờ, không để qua đêm." },
  { icon: Drumstick, t: "Đạm nạc, ướp tối trước", d: "Ức gà, cá, đậu hũ — ướp sả ớt, nướng ngay trước giờ giao." },
  { icon: Droplets, t: "Ít dầu, sốt để riêng", d: "Bạn tự rưới sốt theo khẩu vị. Mỗi món ghi rõ kcal và macro." },
];

const STRIP = [
  { icon: Clock, label: "Gạo lứt nấu lúc 6 giờ sáng" },
  { icon: Bike, label: "Giao trước 12 giờ trưa" },
  { icon: ChartPie, label: "Ghi rõ kcal, Protein, Carb, Fat" },
  { icon: Leaf, label: "Rau mua từ chợ mỗi sáng" },
];

const REVIEWS = [
  { tone: "bg-thanh-long text-socola", q: "Trưa nào cũng có rau, khỏi nghĩ ăn gì", r: -1.5 },
  { tone: "bg-cai-non text-socola", q: "Cơm gạo lứt mềm, không khô như mình sợ", r: 1 },
  { tone: "bg-nuoc-dua text-nuoc-dua-ink", q: "Ghi rõ kcal nên mình tính bữa tối dễ hơn", r: -1 },
  { tone: "bg-xoai text-socola", q: "Giao đúng 11:45, hộp còn ấm", r: 1.5 },
];

function SecHead({ sticker, color, children, center }: { sticker: string; color: "cai" | "white"; children: React.ReactNode; center?: boolean }) {
  return (
    <div className={`mb-8 flex flex-col gap-4 md:mb-12 ${center ? "items-center text-center" : "items-start"}`}>
      <Sticker color={color}>{sticker}</Sticker>
      <h2 className="display display-l">{children}</h2>
    </div>
  );
}

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="wrap mt-4 grid gap-4 md:mt-6 md:gap-6 lg:grid-cols-2">
        <div className="relative order-2 h-[360px] overflow-hidden rounded-sheet border-2 border-socola bg-kem-lom lg:order-none lg:h-[640px]">
          <Image src="/images/bnt-img-01.jpg" alt="Mâm bowl, salad và gỏi cuốn nhiều màu trên bàn gỗ" fill priority sizes="(min-width:1041px) 50vw, 100vw" className="object-cover" />
          <span className="absolute top-5 left-5 z-[2] inline-flex items-center gap-1.5 rounded-full border-2 border-socola bg-white px-3.5 py-1.5 text-base shadow-hard-sm">
            <b>4.8</b>
            <Star size={16} className="fill-xoai-deep text-xoai-deep" aria-hidden="true" />
          </span>
        </div>
        <div className="relative flex flex-col items-start justify-center gap-5 overflow-hidden rounded-sheet border-2 border-socola bg-nuoc-dua p-6 pb-28 text-nuoc-dua-ink md:gap-6 md:p-10 md:pb-32 xl:p-14">
          <Doodle className="pointer-events-none absolute -right-2.5 -bottom-2.5 size-[150px] text-nuoc-dua-ink/35 md:size-[240px]" />
          <Image src="/logo/bnt-mark-darkink.png" alt="" width={56} height={56} className="relative w-14" />
          <h1 className="display display-xl relative">Cơm nhà xanh mỗi ngày</h1>
          <p className="relative max-w-[440px] text-base leading-relaxed text-pretty md:text-lg">
            Bếp Nhà Thanh nấu gạo lứt lúc 6 giờ sáng, giao bowl tới bàn làm việc của bạn trước 12 giờ.
          </p>
          <Button href="/thuc-don" size="lg" className="relative">
            Đặt bowl hôm nay <ArrowRight size={20} />
          </Button>
        </div>
      </section>

      {/* Nguyên liệu */}
      <section aria-label="Nguyên liệu" className="wrap scrollbar-none mt-10 flex snap-x gap-3 overflow-x-auto pb-1 md:mt-14 md:grid md:grid-cols-5 md:gap-5 md:overflow-visible">
        {INGREDIENTS.map(([name, src]) => (
          <div key={name} className="flex w-[104px] shrink-0 snap-start flex-col items-center gap-3 md:w-auto">
            <div className="aspect-square w-full overflow-hidden rounded-card border-[1.5px] border-hairline bg-white p-2.5 md:p-5">
              <Image src={src} alt="" width={400} height={400} className="size-full scale-[1.45] object-cover" />
            </div>
            <h3 className="text-[15px] font-semibold md:text-lg">{name}</h3>
          </div>
        ))}
      </section>

      {/* Nuôi dưỡng từ đất */}
      <section id="dinh-duong" className="wrap py-16 md:py-26">
        <SecHead sticker="Sống xanh" color="cai" center>
          Nuôi dưỡng cơ thể bằng <br /><span className="text-ot-chin">rau hái sáng</span>
        </SecHead>
        <div className="grid items-center gap-8 md:grid-cols-2 md:gap-12 lg:grid-cols-[1fr_1.15fr_1fr]">
          {[BENEFITS.slice(0, 2), null, BENEFITS.slice(2)].map((col, i) =>
            col ? (
              <div key={i} className={`flex flex-col gap-7 md:gap-12 ${i === 0 ? "order-2 lg:order-none" : "order-3 lg:order-none"}`}>
                {col.map(({ icon: Icon, t, d }) => (
                  <div key={t} className="flex flex-col gap-2.5">
                    <Icon size={24} className="text-cta" aria-hidden="true" />
                    <h3 className="text-lg font-semibold">{t}</h3>
                    <p className="max-w-[320px] text-socola-2 text-pretty">{d}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div key={i} className="relative order-1 h-[340px] overflow-hidden rounded-t-sheet bg-kem-lom md:col-span-2 md:h-[420px] lg:order-none lg:col-span-1 lg:h-[540px]">
                <Image src="/images/bnt-img-09.jpg" alt="Người nông dân đội nón lá ôm giỏ rau vừa hái" fill sizes="(min-width:1041px) 40vw, 100vw" className="object-cover" />
                <span className="pointer-events-none absolute inset-x-0 bottom-0 h-[38%] bg-gradient-to-b from-kem-gao/0 to-kem-gao" />
              </div>
            ),
          )}
        </div>
      </section>

      {/* Băng Lá Rừng */}
      <section className="border-t-2 border-socola bg-la-rung py-16 md:py-24">
        <div className="wrap flex flex-col items-center gap-8 text-center">
          <h2 className="display display-l max-w-[900px] text-cai-non">Bowl đủ đạm, đủ xơ, đủ năng lượng</h2>
          <div className="flex flex-wrap justify-center gap-4">
            <Button href="/thuc-don?filter=protein" variant="sun" size="lg">Xem công thức</Button>
            <Button href="/thuc-don" size="lg">Đặt món</Button>
          </div>
        </div>
      </section>

      {/* BenefitStrip */}
      <section className="border-y-2 border-socola bg-cai-non" aria-label="Lợi ích">
        <ul className="wrap scrollbar-none flex justify-between gap-8 overflow-x-auto py-5.5">
          {STRIP.map(({ icon: Icon, label }) => (
            <li key={label} className="flex shrink-0 items-center gap-3 text-[15px] font-semibold whitespace-nowrap">
              <Icon size={24} aria-hidden="true" />
              {label}
            </li>
          ))}
        </ul>
      </section>

      {/* Bowl trưa nay */}
      <section className="bg-socola py-16 md:py-24">
        <div className="wrap">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-6 md:mb-12">
            <h2 className="display display-l text-kem-gao">Bowl trưa nay</h2>
            <Button href="/thuc-don" variant="sun">Cả thực đơn <ArrowRight size={18} /></Button>
          </div>
          <div className="scrollbar-none -mx-4 flex snap-x justify-start gap-5 overflow-x-auto px-4 pb-2 md:mx-0 md:justify-between md:gap-8 md:px-0">
            {DISHES.map((d) => (
              <MenuPlate key={d.id} dish={d} size={260} onDark className="shrink-0 snap-start" />
            ))}
          </div>
        </div>
      </section>

      {/* Khách nói */}
      <section className="wrap py-16 md:py-26">
        <SecHead sticker="Khách nói" color="white">
          Khách nói gì về Bếp Nhà <span className="text-ot-chin">Thanh</span>
        </SecHead>
        <div className="scrollbar-none -mx-4 flex snap-x gap-4 overflow-x-auto px-4 pt-2 pb-3 md:mx-0 md:grid md:grid-cols-2 md:gap-6 md:overflow-visible md:px-0 xl:grid-cols-4">
          {REVIEWS.map(({ tone, q, r }) => (
            <figure key={q} className={`flex min-h-[280px] w-[280px] shrink-0 snap-start flex-col justify-between gap-5 rounded-card border-2 border-socola p-7 shadow-hard md:w-auto ${tone}`} style={{ transform: `rotate(${r}deg)` }}>
              <blockquote className="display m-0 text-[28px] leading-[1.1] text-pretty">“{q}”</blockquote>
              <figcaption className="flex flex-col gap-0.5">
                <b className="text-[15px]">Khách hàng mẫu</b>
                <span className="text-[13px] font-medium">Nội dung giữ chỗ</span>
                <span className="label mt-2 self-start rounded-full bg-white/70 px-2 py-0.5 text-[11px] text-socola">Nội dung mẫu</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* CTA cuối */}
      <section className="relative overflow-hidden border-t-2 border-socola bg-xoai py-16 md:py-26">
        <Doodle className="pointer-events-none absolute -top-2.5 -left-2.5 size-[150px] text-socola/20 md:size-[240px]" />
        <Doodle className="pointer-events-none absolute -right-2.5 -bottom-2.5 size-[150px] rotate-180 text-socola/20 md:size-[240px]" />
        <div className="wrap relative flex flex-col items-center gap-7 text-center">
          <h2 className="display display-m max-w-[640px]">Bữa trưa lành mạnh, giao trước 12 giờ</h2>
          <div className="flex flex-wrap justify-center gap-4">
            <Button href="/thuc-don" size="lg">Đặt món</Button>
            <Button href="/lien-he#cua-hang" variant="outline" size="lg"><MapPin size={20} />Tìm cửa hàng</Button>
          </div>
        </div>
      </section>
    </>
  );
}
