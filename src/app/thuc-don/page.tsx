import type { Metadata } from "next";
import { MenuClient } from "./MenuClient";
import { FILTERS } from "@/lib/data";

export const metadata: Metadata = { title: "Thực đơn tuần này" };

export default async function MenuPage({ searchParams }: PageProps<"/thuc-don">) {
  const { filter } = await searchParams;
  const q = Array.isArray(filter) ? filter[0] : filter;
  const initial = FILTERS.some((f) => f.key === q) ? (q as string) : "all";
  return <MenuClient initial={initial} />;
}
