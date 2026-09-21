/**
 * ─────────────────────────────────────────────────────────────
 *  EDIT THIS FILE FIRST  ·  ابدأ بتعديل هذا الملف
 *  Every piece of contact / brand information used across the
 *  site lives here, so you never have to hunt through components.
 *  كل بيانات التواصل والهوية مجمّعة هنا لتعديلها من مكان واحد.
 * ─────────────────────────────────────────────────────────────
 */

export const site = {
  brand: {
    name: "The Edible Codex",
    nameAr: "ذا إديبل كودكس",
    taglineEn: "Modern Culinary Adventures",
    taglineAr: "مغامرات الطهي الحديثة",
    /** Chef / founder name — replace with your own · ضع اسمك هنا */
    chefEn: "Chef Procalim",
    chefAr: "الشيف بروكاليم",
    establishedYear: 2021,
  },

  contact: {
    email: "procalimyoga@gmail.com",
    /** International format, digits only — used to build the WhatsApp link */
    whatsapp: "9660000000",
    phoneDisplay: "+966 00 000 0000",
    cityEn: "Riyadh, Saudi Arabia",
    cityAr: "الرياض، المملكة العربية السعودية",
    hoursEn: "Sun – Thu · 10:00 – 18:00",
    hoursAr: "الأحد – الخميس · ١٠:٠٠ – ١٨:٠٠",
  },

  social: {
    instagram: "https://instagram.com/",
    tiktok: "https://tiktok.com/",
    youtube: "https://youtube.com/",
    x: "https://x.com/",
  },

  /** Currency shown on every price · العملة المعروضة */
  currency: {
    code: "USD",
    symbol: "$",
  },
} as const;

export const whatsappLink = (message: string) =>
  `https://wa.me/${site.contact.whatsapp}?text=${encodeURIComponent(message)}`;

/** Brand images — imported once so paths never drift */
export const brandImages = {
  chefPortrait: "/brand/chef-portrait.jpg",
  chefShrimp: "/brand/chef-shrimp-rainbow.jpg",
  chefDuck: "/brand/chef-duck-cherry.jpg",
  chefBeef: "/brand/chef-beef-tenderloin.jpg",
  codexCover: "/brand/edible-codex-cover.jpg",
} as const;
