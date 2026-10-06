export type DishTag = "protein" | "vegan" | "light";

export type Dish = {
  id: string;
  name: string;
  image: string;
  desc: string;
  kcal: number;
  p: number;
  c: number;
  f: number;
  price: number;
  weight: number;
  fiber: number;
  tags: DishTag[];
  ingredients: [string, string][];
  allergens: string[];
};

/** Món có ảnh thật trong bộ tài sản. Thêm món mới: thêm một mục vào đây và ảnh vào public/images. */
export const DISHES: Dish[] = [
  {
    id: "ga-quinoa",
    name: "Bowl gà quinoa bơ",
    image: "/images/bnt-img-02.jpg",
    desc: "Ức gà áp chảo, quinoa, bơ sáp, đậu nành edamame, bắp cải tím. Sốt mè rưới riêng.",
    kcal: 496, p: 40, c: 48, f: 16, price: 89000, weight: 420, fiber: 11,
    tags: ["protein"],
    ingredients: [["Ức gà áp chảo", "120g"], ["Quinoa", "90g"], ["Bơ sáp", "50g"], ["Đậu edamame", "50g"], ["Bắp cải tím", "40g"], ["Sốt mè (riêng)", "25g"]],
    allergens: ["Mè", "Đậu nành"],
  },
  {
    id: "ca-hoi-gao-lut",
    name: "Bowl cá hồi gạo lứt",
    image: "/images/bnt-img-03.jpg",
    desc: "Cá hồi áp chảo da giòn, gạo lứt, trứng lòng đào, rong biển, cà rốt ngâm, dưa leo.",
    kcal: 482, p: 34, c: 46, f: 18, price: 119000, weight: 400, fiber: 6,
    tags: ["protein"],
    ingredients: [["Cá hồi áp chảo", "110g"], ["Gạo lứt", "100g"], ["Trứng lòng đào", "1 quả"], ["Rong biển", "40g"], ["Cà rốt ngâm, dưa leo", "60g"]],
    allergens: ["Cá", "Trứng", "Đậu nành"],
  },
  {
    id: "dau-hu-rau-cu",
    name: "Bowl đậu hũ rau củ",
    image: "/images/bnt-img-04.jpg",
    desc: "Đậu hũ non chiên giòn, bí đỏ nướng, bông cải, đậu gà, rau xanh, sốt đậu phộng.",
    kcal: 406, p: 22, c: 48, f: 14, price: 75000, weight: 410, fiber: 12,
    tags: ["vegan", "light"],
    ingredients: [["Đậu hũ non chiên", "120g"], ["Bí đỏ nướng", "80g"], ["Bông cải xanh", "70g"], ["Đậu gà", "50g"], ["Rau xanh trộn", "40g"], ["Sốt đậu phộng (riêng)", "25g"]],
    allergens: ["Đậu nành", "Đậu phộng"],
  },
  {
    id: "bun-ga-nuong-sa",
    name: "Bún gà nướng sả",
    image: "/images/bnt-img-05.jpg",
    desc: "Gà ướp sả nướng, bún tươi, rau hái sáng, dưa leo, đồ chua, đậu phộng rang. Nước mắm pha để riêng.",
    kcal: 522, p: 38, c: 61, f: 14, price: 89000, weight: 430, fiber: 5,
    tags: ["protein"],
    ingredients: [["Gà ướp sả nướng", "120g"], ["Bún tươi", "150g"], ["Rau thơm, xà lách", "60g"], ["Dưa leo, đồ chua", "50g"], ["Đậu phộng rang", "10g"], ["Nước mắm pha (riêng)", "40ml"]],
    allergens: ["Đậu phộng", "Cá (nước mắm)"],
  },
];

export const FILTERS: { key: "all" | DishTag; label: string }[] = [
  { key: "all", label: "Tất cả" },
  { key: "protein", label: "Nhiều đạm" },
  { key: "vegan", label: "Thuần chay" },
  { key: "light", label: "Dưới 450 kcal" },
];

export const getDish = (id: string) => DISHES.find((d) => d.id === id);

export const STORE = {
  address: "Số 5 Võ Oanh, Bình Thạnh, TP. Hồ Chí Minh",
  short: "Số 5 Võ Oanh, Bình Thạnh",
  phone: "0939 729 955",
  tel: "0939729955",
  hours: "8:00 – 12:00",
};

export const SHIP_FEE = 19000;
export const SLOTS = ["11:00 – 11:30", "11:30 – 12:00", "12:00 – 12:30"];

export const vnd = (n: number) => String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, ".") + "đ";
export const num = (n: number) => String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
