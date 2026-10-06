import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Clock, Refrigerator, Microwave, TriangleAlert } from "lucide-react";
import { MacroRing } from "@/components/MacroRing";
import { MacroCard, Sticker } from "@/components/ui";
import { MenuPlate } from "@/components/MenuPlate";
import { DishBuy } from "@/components/DishBuy";
import { DISHES, getDish, num, vnd } from "@/lib/data";

export function generateStaticParams() {
  return DISHES.map((d) => ({ id: d.id }));
}

export async function generateMetadata({ params }: PageProps<"/thuc-don/[id]">): Promise<Metadata> {
  const d = getDish((await params).id);
  return d ? { title: d.name, description: d.desc } : {};
}

export default async function DishPage({ params }: PageProps<"/thuc-don/[id]">) {
  const d = getDish((await params).id);
  if (!d) notFound();

  const kcalP = d.p * 4, kcalC = d.c * 4, kcalF = d.f * 9;
  const total = kcalP + kcalC + kcalF;
  const pct = (v: number) => Math.round((v / total) * 100);
  const sides = DISHES.filter((x) => x.id !== d.id).slice(0, 3);

  return (
    <>
      <section className="wrap pt-6 md:pt-10">
        <Link href="/thuc-don" className="mb-2 inline-flex items-center gap-1.5 text-sm font-semibold text-socola-2 hover:text-socola">
          <ArrowLeft size={18} />Thực đơn
        </Link>
        <div className="grid items-center gap-8 md:gap-12 md:grid-cols-2">
          <div className="flex justify-center rounded-sheet border-2 border-socola bg-nuoc-dua p-8 md:p-14">
            <MacroRing size={420} protein={d.p} carb={d.c} fat={d.f}>
              <Image src={d.image} alt={d.name} width={1600} height={893} priority sizes="600px" className="size-full scale-[1.12] object-cover" />
            </MacroRing>
          </div>
          <div className="flex flex-col items-start gap-5">
            <div className="flex flex-wrap gap-3">
              {d.tags.includes("protein") && <Sticker color="cai">Nhiều đạm</Sticker>}
              {d.tags.includes("vegan") && <Sticker color="cai">Thuần chay</Sticker>}
              {d.tags.includes("light") && <Sticker color="xoai" rotate={2}>Dưới 450 kcal</Sticker>}
            </div>
            <h1 className="display display-l">{d.name}</h1>
            <p className="max-w-[560px] text-[17px] leading-relaxed text-socola-2 text-pretty">{d.desc}</p>
            <div className="flex items-baseline gap-4">
              <b className="num text-[32px] text-cta">{vnd(d.price)}</b>
              <span className="num text-socola-2">{num(d.kcal)} kcal</span>
            </div>
            <div className="grid w-full grid-cols-3 gap-3">
              <MacroCard macro="protein" grams={d.p} pct={pct(kcalP)} />
              <MacroCard macro="carb" grams={d.c} pct={pct(kcalC)} />
              <MacroCard macro="fat" grams={d.f} pct={pct(kcalF)} />
            </div>
            <p className="flex items-center gap-2 text-sm text-socola-2">
              <TriangleAlert size={16} className="shrink-0" aria-hidden="true" />
              Có chứa: {d.allergens.join(", ")}
            </p>
            <div className="w-full"><DishBuy id={d.id} price={d.price} /></div>
          </div>
        </div>
      </section>

      <section className="wrap mt-14 grid gap-4 md:grid-cols-3 md:gap-6">
        <div className="flex flex-col gap-4 rounded-card border-[1.5px] border-hairline bg-white p-6">
          <h2 className="text-2xl font-bold">Trong hộp có gì</h2>
          <ul className="flex flex-col">
            {d.ingredients.map(([n, q]) => (
              <li key={n} className="flex justify-between gap-4 border-b border-hairline py-2.5 last:border-0">
                <span>{n}</span><b className="num">{q}</b>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col gap-3 rounded-card border-[1.5px] border-hairline bg-white p-6">
          <h2 className="text-2xl font-bold">Dinh dưỡng một phần</h2>
          <span className="text-[13px] text-socola-2">Khối lượng {d.weight}g, gồm cả sốt</span>
          <table className="w-full text-[15px]">
            <tbody>
              {[["Năng lượng", `${num(d.kcal)} kcal`], ["Protein", `${d.p}g`], ["Carb", `${d.c}g`], ["Fat", `${d.f}g`], ["Chất xơ", `${d.fiber}g`]].map(([k, v]) => (
                <tr key={k} className="border-b border-hairline last:border-0">
                  <th scope="row" className="py-2.5 text-left font-normal">{k}</th>
                  <td className="num py-2.5 text-right">{v}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="text-[13px] text-socola-2">Số liệu tính theo khẩu phần chuẩn, sai số khoảng 10%. Không thay lời khuyên của bác sĩ.</p>
        </div>
        <div className="flex flex-col gap-4 rounded-card border-[1.5px] border-hairline bg-white p-6">
          <h2 className="text-2xl font-bold">Ăn và bảo quản</h2>
          <ul className="flex flex-col gap-3.5 text-socola-2">
            <li className="flex gap-3"><Clock size={18} className="mt-0.5 shrink-0" />Ăn ngon nhất trong 2 giờ sau khi nhận.</li>
            <li className="flex gap-3"><Refrigerator size={18} className="mt-0.5 shrink-0" />Để ngăn mát, dùng trong ngày.</li>
            <li className="flex gap-3"><Microwave size={18} className="mt-0.5 shrink-0" />Hâm phần cơm, thịt 60 giây. Rau và sốt để nguội.</li>
          </ul>
        </div>
      </section>

      <section className="wrap py-16 md:py-24">
        <h2 className="display display-m mb-10">Ăn kèm hợp</h2>
        <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3">
          {sides.map((x) => <MenuPlate key={x.id} dish={x} size={200} />)}
        </div>
        <Link href="/thuc-don" className="mt-12 inline-flex items-center gap-2 font-semibold text-cta hover:text-cta-hover">Xem cả thực đơn<ArrowRight size={18} /></Link>
      </section>
    </>
  );
}
