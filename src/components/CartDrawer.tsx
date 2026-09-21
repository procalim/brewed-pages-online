import { Link } from "react-router-dom";
import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useCart } from "@/context/CartContext";
import { formatPrice, useLang } from "@/i18n/LanguageContext";
import { site } from "@/data/site";

const CartDrawer = () => {
  const { isOpen, closeCart, items, subtotal, discount, total, setQty, remove, count } = useCart();
  const { t, L, lang, isRTL } = useLang();

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && closeCart()}>
      <SheetContent
        side={isRTL ? "left" : "right"}
        className="flex w-full flex-col border-gold/20 bg-ivory p-0 sm:max-w-md"
      >
        <SheetHeader className="border-b border-gold/20 px-6 py-5 text-start">
          <SheetTitle className="flex items-center gap-3 font-display text-xl text-navy-700">
            <ShoppingBag className="h-5 w-5 text-gold" />
            {t("cart.title")}
            <span className="text-sm font-normal text-muted-foreground">
              ({count} {count === 1 ? t("cart.item") : t("cart.items")})
            </span>
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-5 px-6 text-center">
            <div className="grid h-16 w-16 place-items-center rounded-full border border-gold/30">
              <ShoppingBag className="h-6 w-6 text-gold" />
            </div>
            <p className="text-sm text-muted-foreground">{t("cart.empty")}</p>
            <Link to="/shop" onClick={closeCart} className="btn-navy">
              {t("cart.emptyCta")}
            </Link>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-6 py-5">
              <ul className="space-y-5">
                {items.map(({ product, qty }) => (
                  <li key={product.slug} className="flex gap-4 border-b border-border pb-5 last:border-0">
                    <Link to={`/shop/${product.slug}`} onClick={closeCart} className="shrink-0">
                      <img
                        src={product.image}
                        alt={L(product.title)}
                        className="h-24 w-20 rounded-sm object-cover"
                        loading="lazy"
                      />
                    </Link>

                    <div className="flex flex-1 flex-col">
                      <div className="flex items-start justify-between gap-2">
                        <Link
                          to={`/shop/${product.slug}`}
                          onClick={closeCart}
                          className="font-display text-sm leading-snug text-navy-700 hover:text-gold-600"
                        >
                          {L(product.title)}
                        </Link>
                        <button
                          type="button"
                          onClick={() => remove(product.slug)}
                          aria-label={t("cart.remove")}
                          className="text-muted-foreground transition-colors hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>

                      <span className="mt-1 text-[11px] uppercase tracking-[0.14em] text-gold-600">
                        {t("product.instant")}
                      </span>

                      <div className="mt-auto flex items-center justify-between pt-3">
                        <div className="flex items-center rounded-sm border border-border">
                          <button
                            type="button"
                            onClick={() => setQty(product.slug, qty - 1)}
                            aria-label="−"
                            className="grid h-8 w-8 place-items-center text-navy-700 hover:bg-secondary"
                          >
                            <Minus className="h-3.5 w-3.5" />
                          </button>
                          <span className="w-8 text-center text-sm tabular-nums">{qty}</span>
                          <button
                            type="button"
                            onClick={() => setQty(product.slug, qty + 1)}
                            aria-label="+"
                            className="grid h-8 w-8 place-items-center text-navy-700 hover:bg-secondary"
                          >
                            <Plus className="h-3.5 w-3.5" />
                          </button>
                        </div>
                        <span className="font-display text-base text-navy-700">
                          {formatPrice(product.price * qty, lang, site.currency.symbol)}
                        </span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-t border-gold/20 bg-white px-6 py-5">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-muted-foreground">
                  <span>{t("cart.subtotal")}</span>
                  <span>{formatPrice(subtotal, lang, site.currency.symbol)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-gold-600">
                    <span>{t("cart.discount")}</span>
                    <span>− {formatPrice(discount, lang, site.currency.symbol)}</span>
                  </div>
                )}
                <div className="flex justify-between border-t border-border pt-3 font-display text-lg text-navy-700">
                  <span>{t("cart.total")}</span>
                  <span>{formatPrice(total, lang, site.currency.symbol)}</span>
                </div>
              </div>

              <p className="mt-3 text-[11px] text-muted-foreground">{t("cart.note")}</p>

              <Link to="/checkout" onClick={closeCart} className="btn-gold mt-4 w-full">
                {t("cart.checkout")}
              </Link>
              <button
                type="button"
                onClick={closeCart}
                className="mt-2 w-full py-2 text-[12px] uppercase tracking-[0.14em] text-muted-foreground transition-colors hover:text-navy-700"
              >
                <X className="me-1 inline h-3.5 w-3.5" />
                {t("cart.continue")}
              </button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default CartDrawer;
