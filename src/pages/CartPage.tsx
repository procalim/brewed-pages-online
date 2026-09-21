import { useState } from "react";
import { Link } from "react-router-dom";
import { Minus, Plus, ShoppingBag, Tag, Trash2 } from "lucide-react";
import Seo from "@/components/Seo";
import { formatPrice, useLang } from "@/i18n/LanguageContext";
import { useCart } from "@/context/CartContext";
import { site } from "@/data/site";

const CartPage = () => {
  const { t, L, lang } = useLang();
  const { items, subtotal, discount, total, setQty, remove, applyPromo, promo, count } = useCart();
  const [code, setCode] = useState("");
  const [promoError, setPromoError] = useState(false);

  const onApply = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError(!applyPromo(code));
    setCode("");
  };

  return (
    <>
      <Seo title={t("cart.title")} description={t("cart.title")} />

      <section className="section container-luxe">
        <h1 className="font-display text-3xl text-navy-700 md:text-4xl">
          {t("cart.title")}
          <span className="ms-3 text-base font-normal text-muted-foreground">
            ({count} {count === 1 ? t("cart.item") : t("cart.items")})
          </span>
        </h1>

        {items.length === 0 ? (
          <div className="mt-12 rounded-sm border border-dashed border-gold/40 py-24 text-center">
            <ShoppingBag className="mx-auto h-9 w-9 text-gold" />
            <p className="mt-5 text-muted-foreground">{t("cart.empty")}</p>
            <Link to="/shop" className="btn-navy mt-7">
              {t("cart.emptyCta")}
            </Link>
          </div>
        ) : (
          <div className="mt-10 grid gap-10 lg:grid-cols-[1.6fr_1fr]">
            {/* Lines */}
            <ul className="divide-y divide-border border-y border-border">
              {items.map(({ product, qty }) => (
                <li key={product.slug} className="flex gap-5 py-6">
                  <Link to={`/shop/${product.slug}`} className="shrink-0">
                    <img
                      src={product.image}
                      alt={L(product.title)}
                      loading="lazy"
                      className="h-32 w-24 rounded-sm object-cover sm:h-36 sm:w-28"
                    />
                  </Link>

                  <div className="flex flex-1 flex-col">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <Link
                          to={`/shop/${product.slug}`}
                          className="font-display text-lg text-navy-700 hover:text-gold-600"
                        >
                          {L(product.title)}
                        </Link>
                        <p className="mt-1 text-[13px] text-muted-foreground">{L(product.subtitle)}</p>
                        <p className="mt-2 text-[11px] uppercase tracking-[0.14em] text-gold-600">
                          {t("product.instant")}
                        </p>
                      </div>
                      <span className="font-display text-lg text-navy-700">
                        {formatPrice(product.price * qty, lang, site.currency.symbol)}
                      </span>
                    </div>

                    <div className="mt-auto flex items-center gap-4 pt-4">
                      <div className="flex items-center rounded-sm border border-border">
                        <button
                          type="button"
                          onClick={() => setQty(product.slug, qty - 1)}
                          aria-label="−"
                          className="grid h-10 w-10 place-items-center text-navy-700 hover:bg-secondary"
                        >
                          <Minus className="h-3.5 w-3.5" />
                        </button>
                        <span className="w-10 text-center text-sm tabular-nums">{qty}</span>
                        <button
                          type="button"
                          onClick={() => setQty(product.slug, qty + 1)}
                          aria-label="+"
                          className="grid h-10 w-10 place-items-center text-navy-700 hover:bg-secondary"
                        >
                          <Plus className="h-3.5 w-3.5" />
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => remove(product.slug)}
                        className="flex items-center gap-1.5 text-[12px] uppercase tracking-[0.12em] text-muted-foreground hover:text-destructive"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                        {t("cart.remove")}
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            {/* Summary */}
            <aside className="h-fit rounded-sm border border-gold/25 bg-ivory p-7 lg:sticky lg:top-28">
              <h2 className="font-display text-xl text-navy-700">{t("checkout.summary")}</h2>

              <form onSubmit={onApply} className="mt-6">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="pointer-events-none absolute top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground start-3.5" />
                    <input
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                      placeholder={t("cart.promo")}
                      aria-label={t("cart.promo")}
                      className="field-luxe ps-10 py-2.5 text-[13px]"
                    />
                  </div>
                  <button
                    type="submit"
                    className="rounded-sm border border-navy bg-navy px-5 text-[12px] font-semibold uppercase tracking-[0.12em] text-ivory hover:bg-navy-700"
                  >
                    {t("cart.apply")}
                  </button>
                </div>
                {promo && <p className="mt-2 text-[12px] text-gold-600">{t("cart.promoApplied")}: {promo}</p>}
                {promoError && <p className="mt-2 text-[12px] text-destructive">{t("cart.promoInvalid")}</p>}
              </form>

              <dl className="mt-7 space-y-3 text-sm">
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

              <p className="mt-4 text-[11px] text-muted-foreground">{t("cart.note")}</p>

              <Link to="/checkout" className="btn-gold mt-6 w-full">
                {t("cart.checkout")}
              </Link>
              <Link
                to="/shop"
                className="mt-3 block py-2 text-center text-[12px] uppercase tracking-[0.14em] text-muted-foreground hover:text-navy-700"
              >
                {t("cart.continue")}
              </Link>
            </aside>
          </div>
        )}
      </section>
    </>
  );
};

export default CartPage;
