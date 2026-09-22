import { useEffect, useRef, useState } from "react";
import { ArrowRight, ExternalLink, Loader2, Wallet } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { formatPrice, useLang } from "@/i18n/LanguageContext";
import { loadWhopCheckout } from "@/lib/whopCheckout";
import { buyLink, onBuyClick } from "@/lib/buy";
import { site } from "@/data/site";
import type { Product } from "@/data/products";

type Props = { product: Product; withPrice?: boolean; className?: string };

/**
 * Opens Whop's checkout inside the site. If the embed cannot render — the
 * script is blocked, the plan has no embed — the same dialog offers the
 * hosted checkout instead, so the sale is never lost to a blank box.
 */
const BuyButton = ({ product, withPrice = false, className = "" }: Props) => {
  const { t, L, lang } = useLang();
  const [open, setOpen] = useState(false);
  const [embedFailed, setEmbedFailed] = useState(false);
  const [embedReady, setEmbedReady] = useState(false);
  /** Whether Whop resolved a wallet for this device: unknown → yes → no. */
  const [wallet, setWallet] = useState<"pending" | "ready" | "none">("pending");
  const mountRef = useRef<HTMLDivElement | null>(null);
  const walletRef = useRef<HTMLDivElement | null>(null);

  const isFree = product.price === 0;
  const hostedUrl = buyLink(product, lang);
  const label = isFree ? t("product.getFree") : t("product.buyNow");

  useEffect(() => {
    if (!open || !product.planId) return;

    let cancelled = false;
    setEmbedFailed(false);
    setEmbedReady(false);

    loadWhopCheckout().catch(() => {
      if (!cancelled) setEmbedFailed(true);
    });

    // Watch for the checkout appearing, so the loading line disappears the
    // moment it does; if nothing appears the visitor gets the hosted link
    // rather than an empty frame.
    const poll = window.setInterval(() => {
      if (cancelled) return;
      if (mountRef.current?.childElementCount) {
        setEmbedReady(true);
        window.clearInterval(poll);
      }
    }, 250);

    const timer = window.setTimeout(() => {
      if (!cancelled && !mountRef.current?.childElementCount) setEmbedFailed(true);
    }, 6000);

    return () => {
      cancelled = true;
      window.clearInterval(poll);
      window.clearTimeout(timer);
    };
  }, [open, product.planId]);

  /**
   * Apple Pay and Google Pay come from Whop's own express element, which the
   * checkout script registers as <whop-express-checkout-button>. Mounting it
   * here keeps the wallet sheet on this site rather than sending the buyer to
   * whop.com. The element reports which wallet — if any — this device offers,
   * and the block stays collapsed unless one actually rendered.
   * زر المحافظ من Whop نفسه، يعمل داخل الموقع دون مغادرته.
   */
  useEffect(() => {
    if (!open || !product.planId) return;

    const host = walletRef.current;
    if (!host) return;

    setWallet("pending");
    loadWhopCheckout().catch(() => setWallet("none"));

    const el = document.createElement("whop-express-checkout-button");
    el.setAttribute("plan-id", product.planId);
    el.setAttribute("return-url", window.location.href);
    el.setAttribute("theme", "light");
    el.style.display = "block";

    const onResolved = (event: Event) => {
      const rendered = (event as CustomEvent<{ rendered?: string }>).detail?.rendered;
      setWallet(rendered && rendered !== "none" ? "ready" : "none");
    };
    el.addEventListener("express-method-resolved", onResolved);
    host.replaceChildren(el);

    // An older checkout script would never define the element, so stop
    // reserving room for it rather than leaving a gap above the card form.
    const giveUp = window.setTimeout(
      () => setWallet((state) => (state === "pending" ? "none" : state)),
      5000,
    );

    return () => {
      window.clearTimeout(giveUp);
      el.removeEventListener("express-method-resolved", onResolved);
      host.replaceChildren();
    };
  }, [open, product.planId]);

  // No plan id configured — behave exactly as before, a plain outbound link.
  if (!product.planId) {
    return (
      <a
        href={hostedUrl}
        target="_blank"
        rel="noreferrer noopener"
        onClick={() => onBuyClick(product)}
        className={`btn-gold ${className}`}
      >
        {withPrice && !isFree ? `${label} · ${formatPrice(product.price, lang, site.currency.symbol)}` : label}
        <ArrowRight className="h-4 w-4 flip-rtl" />
      </a>
    );
  }

  return (
    <>
      <button
        type="button"
        onClick={() => {
          onBuyClick(product);
          setOpen(true);
        }}
        className={`btn-gold ${className}`}
      >
        {withPrice && !isFree ? `${label} · ${formatPrice(product.price, lang, site.currency.symbol)}` : label}
        <ArrowRight className="h-4 w-4 flip-rtl" />
      </button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-h-[92vh] w-[calc(100vw-24px)] max-w-lg overflow-y-auto border-gold/30 bg-ivory p-0 sm:w-full">
          <DialogHeader className="border-b border-gold/20 px-6 py-4 text-start">
            <DialogTitle className="pe-8 font-display text-lg text-navy-700">{L(product.title)}</DialogTitle>
          </DialogHeader>

          <div className="px-4 py-4">
            {!embedFailed ? (
              <>
                {/* Clipped rather than display:none while the wallet is still
                    resolving, so Whop's frame keeps a real width to measure
                    itself against and the card form below does not jump. */}
                <div className={wallet === "ready" ? "" : "max-h-0 overflow-hidden opacity-0"}>
                  <p className="mb-2 flex items-center justify-center gap-1.5 text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                    <Wallet className="h-3.5 w-3.5 text-gold-600" />
                    {t("checkout.express")}
                  </p>
                  <div ref={walletRef} />
                  <div className="my-4 flex items-center gap-3">
                    <span className="h-px flex-1 bg-border" />
                    <span className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                      {t("checkout.orCard")}
                    </span>
                    <span className="h-px flex-1 bg-border" />
                  </div>
                </div>

                <div
                  ref={mountRef}
                  data-whop-checkout-plan-id={product.planId}
                  data-whop-checkout-theme="light"
                  className="min-h-[420px]"
                />
                {!embedReady && (
                  <p className="mt-3 flex items-center justify-center gap-2 text-[12px] text-muted-foreground">
                    <Loader2 className="h-3.5 w-3.5 animate-spin text-gold" />
                    {t("checkout.loading")}
                  </p>
                )}

                {/* The hosted page carries methods the embed leaves out. */}
                <a
                  href={hostedUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="mt-4 flex items-center justify-center gap-1.5 border-t border-border pt-4 text-[12px] text-muted-foreground underline underline-offset-4 transition-colors hover:text-gold-600"
                >
                  {t("checkout.moreMethods")}
                  <ExternalLink className="h-3 w-3" />
                </a>
              </>
            ) : (
              <div className="py-10 text-center">
                <p className="text-[14px] leading-relaxed text-navy-800/85">{t("checkout.embedFailed")}</p>
                <a
                  href={hostedUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="btn-gold mt-6 w-full"
                  onClick={() => setOpen(false)}
                >
                  {t("checkout.openHosted")}
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default BuyButton;
