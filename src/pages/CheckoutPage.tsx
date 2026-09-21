import { useState } from "react";
import { Link } from "react-router-dom";
import { CheckCircle2, Lock, MessageCircle, ShoppingBag } from "lucide-react";
import Seo from "@/components/Seo";
import { formatPrice, useLang } from "@/i18n/LanguageContext";
import { useCart } from "@/context/CartContext";
import { site, whatsappLink } from "@/data/site";

const CheckoutPage = () => {
  const { t, L, lang } = useLang();
  const { items, subtotal, discount, total, clear } = useCart();
  const [orderId, setOrderId] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", email: "", phone: "", country: "", notes: "" });

  const update = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((prev) => ({ ...prev, [key]: e.target.value }));

  const orderLines = items
    .map(({ product, qty }) => `• ${L(product.title)} × ${qty}`)
    .join("\n");

  const placeOrder = (e: React.FormEvent) => {
    e.preventDefault();
    // Demo flow: no payment gateway is wired up yet, so the order is
    // acknowledged locally. Connect Stripe / Tap / Shopify here.
    // تدفّق تجريبي: اربط بوابة الدفع هنا.
    setOrderId(`EC-${Date.now().toString().slice(-6)}`);
    clear();
    window.scrollTo({ top: 0 });
  };

  if (orderId) {
    return (
      <section className="section container-luxe">
        <Seo title={t("checkout.success.title")} description={t("checkout.success.body")} />
        <div className="mx-auto max-w-lg rounded-sm border border-gold/30 bg-ivory p-10 text-center shadow-luxe">
          <CheckCircle2 className="mx-auto h-12 w-12 text-gold" />
          <h1 className="mt-6 font-display text-2xl text-navy-700">{t("checkout.success.title")}</h1>
          <p className="mt-3 text-[14px] leading-relaxed text-muted-foreground">{t("checkout.success.body")}</p>
          <p className="mt-4 font-display text-xl tracking-[0.1em] text-gold-600" dir="ltr">
            {orderId}
          </p>
          <Link to="/shop" className="btn-navy mt-8">
            {t("cart.continue")}
          </Link>
        </div>
      </section>
    );
  }

  if (items.length === 0) {
    return (
      <section className="section container-luxe">
        <Seo title={t("checkout.title")} description={t("cart.empty")} />
        <div className="mx-auto max-w-lg rounded-sm border border-dashed border-gold/40 py-20 text-center">
          <ShoppingBag className="mx-auto h-9 w-9 text-gold" />
          <p className="mt-5 text-muted-foreground">{t("cart.empty")}</p>
          <Link to="/shop" className="btn-navy mt-7">
            {t("cart.emptyCta")}
          </Link>
        </div>
      </section>
    );
  }

  return (
    <>
      <Seo title={t("checkout.title")} description={t("checkout.summary")} />

      <section className="section container-luxe">
        <h1 className="font-display text-3xl text-navy-700 md:text-4xl">{t("checkout.title")}</h1>

        <div className="mt-10 grid gap-10 lg:grid-cols-[1.4fr_1fr]">
          <form onSubmit={placeOrder} className="rounded-sm border border-gold/25 bg-white p-7 shadow-luxe md:p-9">
            <h2 className="text-[11px] font-semibold uppercase tracking-luxe text-gold">{t("checkout.contact")}</h2>

            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <label className="block">
                <span className="mb-2 block text-[12px] text-muted-foreground">{t("checkout.fullName")}</span>
                <input required value={form.name} onChange={update("name")} className="field-luxe" />
              </label>
              <label className="block">
                <span className="mb-2 block text-[12px] text-muted-foreground">{t("checkout.email")}</span>
                <input required type="email" value={form.email} onChange={update("email")} className="field-luxe" />
              </label>
              <label className="block">
                <span className="mb-2 block text-[12px] text-muted-foreground">{t("checkout.phone")}</span>
                <input required type="tel" dir="ltr" value={form.phone} onChange={update("phone")} className="field-luxe" />
              </label>
              <label className="block">
                <span className="mb-2 block text-[12px] text-muted-foreground">{t("checkout.country")}</span>
                <input required value={form.country} onChange={update("country")} className="field-luxe" />
              </label>
            </div>

            <label className="mt-5 block">
              <span className="mb-2 block text-[12px] text-muted-foreground">{t("checkout.notes")}</span>
              <textarea rows={4} value={form.notes} onChange={update("notes")} className="field-luxe resize-none" />
            </label>

            <button type="submit" className="btn-gold mt-7 w-full">
              <Lock className="h-4 w-4" />
              {t("checkout.place")} · {formatPrice(total, lang, site.currency.symbol)}
            </button>

            <a
              href={whatsappLink(
                `${lang === "ar" ? "طلب جديد" : "New order"} · ${site.brand.name}\n${orderLines}\n${t("cart.total")}: ${formatPrice(total, lang, site.currency.symbol)}`,
              )}
              target="_blank"
              rel="noreferrer noopener"
              className="btn-outline-gold mt-3 w-full text-navy-700 hover:text-ink"
            >
              <MessageCircle className="h-4 w-4" />
              {t("checkout.whatsapp")}
            </a>

            <p className="mt-5 rounded-sm border border-dashed border-gold/40 bg-ivory p-4 text-[12px] leading-relaxed text-muted-foreground">
              {t("checkout.demoNote")}
            </p>
          </form>

          {/* Summary */}
          <aside className="h-fit rounded-sm border border-gold/25 bg-ivory p-7 lg:sticky lg:top-28">
            <h2 className="font-display text-xl text-navy-700">{t("checkout.summary")}</h2>

            <ul className="mt-6 space-y-4 border-b border-border pb-6">
              {items.map(({ product, qty }) => (
                <li key={product.slug} className="flex gap-4">
                  <img
                    src={product.image}
                    alt={L(product.title)}
                    loading="lazy"
                    className="h-20 w-16 rounded-sm object-cover"
                  />
                  <div className="flex flex-1 flex-col">
                    <span className="font-display text-[15px] leading-snug text-navy-700">{L(product.title)}</span>
                    <span className="mt-1 text-[12px] text-muted-foreground">× {qty}</span>
                    <span className="mt-auto text-[14px] text-navy-700">
                      {formatPrice(product.price * qty, lang, site.currency.symbol)}
                    </span>
                  </div>
                </li>
              ))}
            </ul>

            <dl className="mt-6 space-y-3 text-sm">
              <div className="flex justify-between text-muted-foreground">
                <dt>{t("cart.subtotal")}</dt>
                <dd>{formatPrice(subtotal, lang, site.currency.symbol)}</dd>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-gold-600">
                  <dt>{t("cart.discount")}</dt>
                  <dd>− {formatPrice(discount, lang, site.currency.symbol)}</dd>
                </div>
              )}
              <div className="flex justify-between border-t border-border pt-4 font-display text-xl text-navy-700">
                <dt>{t("cart.total")}</dt>
                <dd>{formatPrice(total, lang, site.currency.symbol)}</dd>
              </div>
            </dl>

            <p className="mt-5 flex items-center gap-2 text-[11px] text-muted-foreground">
              <Lock className="h-3.5 w-3.5 text-gold" />
              {t("product.secure")}
            </p>
          </aside>
        </div>
      </section>
    </>
  );
};

export default CheckoutPage;
