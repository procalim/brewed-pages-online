/**
 * Whop pixel bridge · جسر بكسل Whop
 *
 * The snippet in index.html installs `window.whop` and fires the first
 * "page" event itself. This app is a single-page app: navigating to
 * another page never reloads the document, so without the code below Whop
 * would only ever record one page view per visit. Every in-app navigation
 * is reported here instead.
 *
 * كود Whop في index.html يسجّل أول زيارة بنفسه، وهذا الملف يسجّل كل انتقال
 * بعدها داخل الموقع (لأن الموقع لا يعيد تحميل الصفحة عند التنقّل).
 */

type TrackFn = (...args: unknown[]) => void;
type WhopPixel = { track: TrackFn };

const getPixel = (): WhopPixel | null => {
  if (typeof window === "undefined") return null;
  const whop = (window as unknown as { whop?: unknown }).whop;

  // Whop's snippet installs an object carrying track()/setScope()/scope().
  if (whop && typeof whop === "object" && typeof (whop as WhopPixel).track === "function") {
    return whop as WhopPixel;
  }
  // Some pixel builds install a bare queue function instead.
  if (typeof whop === "function") {
    const fn = whop as TrackFn;
    return { track: (...args: unknown[]) => fn(...args) };
  }
  return null;
};

/** True once the snippet has run. */
export const hasPixel = () => getPixel() !== null;

/** Whop's page-view event, as fired by the snippet itself on first load. */
export const trackPageView = () => {
  const pixel = getPixel();
  if (!pixel) return;
  try {
    pixel.track("page");
  } catch {
    /* analytics must never break the page */
  }
};

/**
 * Custom event fired when a visitor is handed over to Whop checkout, so the
 * funnel joins up. It is optional — delete the calls to it, or rename the
 * event, if Whop's docs specify a different name for this step.
 * حدث اختياري عند تحويل الزائر إلى صفحة الدفع.
 */
export const trackCheckoutStart = (productSlug: string, price: number) => {
  const pixel = getPixel();
  if (!pixel) return;
  try {
    pixel.track("checkout_start", { product: productSlug, value: price });
  } catch {
    /* analytics must never break the page */
  }
};
