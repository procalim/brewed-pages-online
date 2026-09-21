/**
 * Whop embedded checkout · الدفع المدمج
 *
 * Whop's loader turns any element carrying `data-whop-checkout-plan-id`
 * into an inline checkout, so the buyer pays without leaving the site.
 * The script is fetched once per visit, and every caller shares the same
 * promise — a failure here is never fatal: the caller falls back to the
 * hosted checkout link.
 */

const SRC = "https://js.whop.com/static/checkout/loader.js";

let loading: Promise<void> | null = null;

export const loadWhopCheckout = (): Promise<void> => {
  if (loading) return loading;

  loading = new Promise((resolve, reject) => {
    if (typeof document === "undefined") {
      reject(new Error("no document"));
      return;
    }

    const existing = document.querySelector<HTMLScriptElement>(`script[src="${SRC}"]`);
    if (existing) {
      if (existing.dataset.loaded === "true") resolve();
      else {
        existing.addEventListener("load", () => resolve(), { once: true });
        existing.addEventListener("error", () => reject(new Error("whop checkout failed")), { once: true });
      }
      return;
    }

    const script = document.createElement("script");
    script.src = SRC;
    script.async = true;
    script.defer = true;
    script.addEventListener("load", () => {
      script.dataset.loaded = "true";
      resolve();
    });
    script.addEventListener("error", () => reject(new Error("whop checkout failed")));
    document.head.appendChild(script);
  });

  return loading;
};
