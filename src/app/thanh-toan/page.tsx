import type { Metadata } from "next";
import { CheckoutClient } from "./CheckoutClient";

export const metadata: Metadata = { title: "Giỏ hàng & thanh toán" };

export default function Page() {
  return <CheckoutClient />;
}
