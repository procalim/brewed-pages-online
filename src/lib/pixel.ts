/**
 * Whop pixel bridge · جسر بكسل Whop
 *
 * The snippet Whop hands you in "Set up our pixel" goes into index.html.
 * It installs a global queue function; this file only forwards page views
 * to it, because a single-page app changes route without reloading the
 * document — without this, Whop would record one page view per visit.
 *
 * الكود الذي يعطيك إياه Whop يوضع في index.html، وهذا الملف يبلّغه بكل
 * انتقال بين الصفحات لأن الموقع يعمل بتوجيه داخلي دون إعادة تحميل.
 *
 * إن كان اسم الدالة في كود Whop مختلفاً، أضفه إلى القائمة أدناه فقط.
 */

type PixelFn = (...args: unknown[]) => void;

/** Global names Whop's snippet is known to install. */
const GLOBAL_NAMES = ["whopq", "whop", "wpq"] as const;

const getPixel = (): PixelFn | null => {
  if (typeof window === "undefined") return null;
  for (const name of GLOBAL_NAMES) {
    const candidate = (window as unknown as Record<string, unknown>)[name];
    if (typeof candidate === "function") return candidate as PixelFn;
  }
  return null;
};

/** True once the pixel snippet has actually loaded. */
export const hasPixel = () => getPixel() !== null;

export const trackPageView = (path: string) => {
  const pixel = getPixel();
  if (!pixel) return;
  try {
    pixel("track", "page_view", { path });
  } catch {
    /* analytics must never break the page */
  }
};

/** Fire when a visitor is sent to Whop checkout, so the funnel joins up. */
export const trackCheckoutStart = (productSlug: string, price: number) => {
  const pixel = getPixel();
  if (!pixel) return;
  try {
    pixel("track", "begin_checkout", { product: productSlug, value: price });
  } catch {
    /* analytics must never break the page */
  }
};
