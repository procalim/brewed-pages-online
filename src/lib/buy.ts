import type { Lang } from "@/i18n/dictionary";
import { checkoutUrlFor, whatsappLink } from "@/data/site";
import type { Product } from "@/data/products";
import { trackCheckoutStart } from "./pixel";

/**
 * Where a buy button sends the visitor.
 * Whop when its link is configured; otherwise a ready-written WhatsApp order,
 * so a button is never a dead end while the link is still missing.
 *
 * زر الشراء يفتح صفحة Whop إن كان رابطها موضوعاً، وإلا يفتح رسالة واتساب جاهزة.
 */
export const buyLink = (product: Product, lang: Lang) =>
  checkoutUrlFor(product) ??
  whatsappLink(
    lang === "ar"
      ? `أريد الحصول على: ${product.title.ar}`
      : `I'd like to get: ${product.title.en}`,
  );

/** Report the handoff to the Whop pixel before the new tab opens. */
export const onBuyClick = (product: Product) => trackCheckoutStart(product.slug, product.price);
