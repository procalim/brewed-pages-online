import type { Localized } from "@/i18n/LanguageContext";
import { brandImages } from "./site";

export type Product = {
  id: number;
  slug: string;
  title: Localized;
  subtitle: Localized;
  description: Localized;
  features: Localized[];
  image: string;
  gallery: string[];
  price: number;
  compareAt?: number;
  badge?: "bestseller" | "bundle" | "new";
  category: "codex" | "masterclass" | "bundle";
  rating: number;
  reviews: number;
  featured?: boolean;
  /** CSS object-position for the cover crop — keeps the dish in frame. */
  focus?: string;
  /** Whop checkout link for this product. Falls back to site.checkout.url. */
  checkoutUrl?: string;
};

/**
 * Catalogue · الكتالوج
 * Prices, titles and copy are all edited here — the whole storefront reads
 * from this one array. أسعار المنتجات وأوصافها تُعدَّل من هنا فقط.
 */
export const products: Product[] = [
  {
    id: 1,
    slug: "the-edible-codex",
    title: { ar: "ذا إديبل كودكس — النسخة الكاملة", en: "The Edible Codex — Complete Edition" },
    subtitle: { ar: "٢٦٠ وصفة منسّقة + ١٠٠ وصفة سريعة هدية", en: "260 curated recipes + 100 quick meals free" },
    description: {
      ar: "المجلّد الرقمي الكامل: ٢٦٠ وصفة مقسّمة على تسعة فصول، من المقبلات الباردة إلى اللحوم والمأكولات البحرية والصلصات وفنّ التنسيق. كل وصفة مصوّرة بالطبق النهائي، ومشروحة بمقادير مزدوجة بالجرام والكوب، مع ملاحظات المطبخ التي عادة لا تُكتب في الكتب.",
      en: "The complete digital volume: 260 recipes across nine chapters, from cold starters through meats, seafood, sauces and the art of plating. Every recipe is photographed as a finished plate and written with dual measurements in grams and cups, alongside the kitchen notes books usually leave out.",
    },
    features: [
      { ar: "٢٦٠ وصفة مع صورة نهائية لكل طبق", en: "260 recipes, each with a finished plate photo" },
      { ar: "فصل هدية: ١٠٠ وصفة سريعة خلال ٢٠ دقيقة", en: "Bonus chapter: 100 quick meals in 20 minutes" },
      { ar: "مقادير بالجرام والكوب معاً", en: "Dual measurements — grams and cups" },
      { ar: "قوائم تسوّق أسبوعية قابلة للطباعة", en: "Printable weekly shopping lists" },
      { ar: "صيغة PDF و EPUB · عربي وإنجليزي", en: "PDF and EPUB · Arabic and English" },
      { ar: "تحديثات مجانية مدى الحياة", en: "Free lifetime updates" },
    ],
    image: brandImages.codexCover,
    gallery: [brandImages.codexCover, brandImages.chefShrimp, brandImages.chefDuck, brandImages.chefBeef],
    price: 9.99,
    compareAt: 19.99,
    badge: "bestseller",
    category: "codex",
    rating: 4.9,
    reviews: 812,
    focus: "center 60%",
    /** ضع رابط هذا المنتج على Whop هنا · this product's Whop link */
    checkoutUrl: "",
    featured: true,
  },
  {
    id: 2,
    slug: "signature-plating-masterclass",
    title: { ar: "ماستر كلاس التنسيق الاحترافي", en: "Signature Plating Masterclass" },
    subtitle: { ar: "من طبق منزلي إلى طبق مطعم", en: "From home plate to restaurant plate" },
    description: {
      ar: "دليل مصوّر بالكامل لفنّ تنسيق الطبق: قواعد التوزيع، خطوط الصلصة، ارتفاع المكوّنات، توازن الألوان، واختيار الطبق نفسه. ستتعلّم كيف تُصمّم الطبق ذهنياً قبل أن تشعل النار.",
      en: "A fully illustrated guide to plating: placement rules, sauce lines, ingredient height, colour balance and choosing the plate itself. You learn to design the dish in your head before the heat goes on.",
    },
    features: [
      { ar: "١٢ تمريناً عملياً مع صور قبل/بعد", en: "12 practical drills with before/after frames" },
      { ar: "قوالب توزيع جاهزة لأي طبق", en: "Ready-made composition templates for any plate" },
      { ar: "دليل تصوير الطعام بالجوال", en: "Phone food-photography guide" },
    ],
    image: brandImages.chefShrimp,
    gallery: [brandImages.chefShrimp, brandImages.chefDuck, brandImages.chefBeef],
    price: 7.99,
    compareAt: 14.99,
    category: "masterclass",
    rating: 4.8,
    reviews: 341,
    focus: "center 75%",
    featured: true,
  },
  {
    id: 3,
    slug: "the-sauce-lab",
    title: { ar: "مختبر الصلصات", en: "The Sauce Lab" },
    subtitle: { ar: "٦٠ صلصة ملوّنة بقواعد ثابتة", en: "60 colour sauces, one repeatable method" },
    description: {
      ar: "الصلصة هي الفرق بين طبق جيّد وطبق يُذكر. ستّون صلصة — البنجر، الكركم، الأعشاب، الفلفل المشوي، البلسمك المركّز — بنِسَب مضبوطة وطرق حفظ ومدد صلاحية واضحة.",
      en: "Sauce is the difference between a good plate and a memorable one. Sixty sauces — beetroot, turmeric, herb, roasted pepper, reduced balsamic — with exact ratios, storage methods and honest shelf lives.",
    },
    features: [
      { ar: "٦٠ وصفة صلصة بنِسَب دقيقة", en: "60 sauce recipes with precise ratios" },
      { ar: "جدول ألوان ومطابقة مع الأطباق", en: "Colour chart matched to dishes" },
      { ar: "طرق الحفظ ومدد الصلاحية", en: "Storage methods and shelf lives" },
    ],
    image: brandImages.chefDuck,
    gallery: [brandImages.chefDuck, brandImages.chefShrimp],
    price: 5.99,
    compareAt: 11.99,
    badge: "new",
    category: "masterclass",
    rating: 4.9,
    reviews: 208,
    focus: "center 75%",
  },
  {
    id: 4,
    slug: "meat-and-fire",
    title: { ar: "اللحم والنار", en: "Meat & Fire" },
    subtitle: { ar: "درجات الاستواء والراحة والتقطيع", en: "Doneness, resting and the cut" },
    description: {
      ar: "كل ما يتعلّق بالبروتين: اختيار القطعة، التتبيل، حرارة السطح، قياس الاستواء بالدرجة، مدّة الراحة، واتجاه التقطيع. مع جداول حرارة لكل نوع لحم.",
      en: "Everything protein: choosing the cut, seasoning, surface heat, measuring doneness by degree, rest times and slicing against the grain — with temperature tables for every meat.",
    },
    features: [
      { ar: "جداول حرارة لكل نوع لحم", en: "Temperature tables for every meat" },
      { ar: "٣٥ وصفة لحوم ودواجن", en: "35 meat and poultry recipes" },
      { ar: "دليل أخطاء الشواء الشائعة", en: "Common searing mistakes, diagnosed" },
    ],
    image: brandImages.chefBeef,
    gallery: [brandImages.chefBeef, brandImages.chefDuck],
    price: 6.99,
    compareAt: 12.99,
    category: "masterclass",
    rating: 4.7,
    reviews: 176,
    focus: "center 75%",
  },
  {
    id: 5,
    slug: "chefs-table-bundle",
    title: { ar: "باقة طاولة الشيف", en: "The Chef's Table Bundle" },
    subtitle: { ar: "الإصدارات الأربعة في حزمة واحدة", en: "All four editions in one package" },
    description: {
      ar: "الكوديكس الكامل مع ماستر كلاس التنسيق ومختبر الصلصات واللحم والنار — المكتبة كاملة بسعر واحد، مع أولوية الحصول على كل إصدار قادم مجاناً.",
      en: "The complete Codex together with the Plating Masterclass, the Sauce Lab and Meat & Fire — the entire library at one price, plus every future edition free.",
    },
    features: [
      { ar: "الإصدارات الأربعة كاملة", en: "All four complete editions" },
      { ar: "كل إصدار قادم مجاناً", en: "Every future edition included free" },
      { ar: "توفير أكثر من ٦٠٪", en: "Save more than 60%" },
      { ar: "دعم مباشر عبر واتساب", en: "Direct WhatsApp support" },
    ],
    image: brandImages.chefPortrait,
    gallery: [brandImages.chefPortrait, brandImages.codexCover, brandImages.chefShrimp],
    price: 19.99,
    compareAt: 30.96,
    badge: "bundle",
    category: "bundle",
    rating: 5.0,
    reviews: 129,
    focus: "center 20%",
    featured: true,
  },
];

export const categories: { value: Product["category"] | "all"; label: Localized }[] = [
  { value: "all", label: { ar: "كل الإصدارات", en: "All editions" } },
  { value: "codex", label: { ar: "الكوديكس", en: "The Codex" } },
  { value: "masterclass", label: { ar: "ماستر كلاس", en: "Masterclasses" } },
  { value: "bundle", label: { ar: "الباقات", en: "Bundles" } },
];

export const getProduct = (slug?: string) => products.find((p) => p.slug === slug);

/**
 * PLACEHOLDER REVIEWS — replace with your real customer reviews before going live.
 * تقييمات نموذجية — استبدلها بتقييمات عملائك الحقيقيين قبل النشر.
 */
export const testimonials: { name: Localized; role: Localized; quote: Localized; rating: number }[] = [
  {
    name: { ar: "ل. الحربي", en: "L. Alharbi" },
    role: { ar: "طاهية منزلية", en: "Home cook" },
    quote: {
      ar: "أول مرة يخرج مني طبق يشبه صور المطاعم. فصل الصلصات وحده يستحق السعر.",
      en: "First time a plate of mine actually looked like the restaurant photos. The sauce chapter alone is worth the price.",
    },
    rating: 5,
  },
  {
    name: { ar: "م. عبد الله", en: "M. Abdullah" },
    role: { ar: "صاحب مقهى", en: "Café owner" },
    quote: {
      ar: "استخدمت قوالب التنسيق في قائمتنا الجديدة، وارتفعت صور الزبائن على إنستغرام بشكل ملحوظ.",
      en: "I used the plating templates for our new menu and customer photos on Instagram jumped noticeably.",
    },
    rating: 5,
  },
  {
    name: { ar: "S. Moreau", en: "S. Moreau" },
    role: { ar: "هاوي طهي", en: "Weekend cook" },
    quote: {
      ar: "المقادير مضبوطة فعلاً. جرّبت أربع وصفات ونجحت كلها من المرة الأولى.",
      en: "The ratios are genuinely dialled in. Four recipes, all of them worked first try.",
    },
    rating: 5,
  },
  {
    name: { ar: "ن. القحطاني", en: "N. Alqahtani" },
    role: { ar: "مصوّرة طعام", en: "Food photographer" },
    quote: {
      ar: "دليل التصوير بالجوال غيّر طريقة عملي بالكامل — إضاءة واحدة وخلفية داكنة وانتهى الأمر.",
      en: "The phone-photography guide changed how I shoot — one light, a dark backdrop, done.",
    },
    rating: 5,
  },
  {
    name: { ar: "R. Silva", en: "R. Silva" },
    role: { ar: "شيف مساعد", en: "Sous chef" },
    quote: {
      ar: "أعطيت النسخة لفريقي كمرجع تدريب. الخطوات قصيرة وواضحة ولا تحتاج شرحاً إضافياً.",
      en: "I handed it to my team as a training reference. The steps are short, clear and need no extra explaining.",
    },
    rating: 5,
  },
  {
    name: { ar: "ه. إبراهيم", en: "H. Ibrahim" },
    role: { ar: "أمّ وربة منزل", en: "Parent of three" },
    quote: {
      ar: "فصل الوصفات السريعة أنقذ أسبوعي. عشاء كامل في عشرين دقيقة وبمكوّنات موجودة أصلاً.",
      en: "The quick-meals chapter saved my week. Full dinner in twenty minutes from what I already had.",
    },
    rating: 5,
  },
];

export const faqs: { q: Localized; a: Localized }[] = [
  {
    q: { ar: "كيف أستلم الكتاب بعد الشراء؟", en: "How do I receive the book after buying?" },
    a: {
      ar: "فور إتمام الدفع يصلك بريد إلكتروني يحتوي رابط تحميل مباشر لصيغتي PDF و EPUB. الرابط يبقى فعّالاً مدى الحياة ويمكنك إعادة التحميل في أي وقت.",
      en: "The moment payment completes you receive an email with a direct download link for both PDF and EPUB. The link stays active for life and you can re-download any time.",
    },
  },
  {
    q: { ar: "هل الكتاب بالعربية أم الإنجليزية؟", en: "Is the book in Arabic or English?" },
    a: {
      ar: "النسخة الكاملة تأتي بالنسختين العربية والإنجليزية في ملف واحد، دون رسوم إضافية.",
      en: "The complete edition ships with both the Arabic and the English version in one purchase, at no extra cost.",
    },
  },
  {
    q: { ar: "هل أحتاج معدات مطبخ احترافية؟", en: "Do I need professional kitchen equipment?" },
    a: {
      ar: "لا. كل الوصفات صُمِّمت لمطبخ منزلي عادي: مقلاة، فرن، وخلاط. المعدات الاختيارية مذكورة بوضوح مع بدائل منزلية لكل منها.",
      en: "No. Every recipe is designed for an ordinary home kitchen: a pan, an oven and a blender. Optional equipment is clearly marked with a home substitute for each.",
    },
  },
  {
    q: { ar: "ما سياسة الاسترداد؟", en: "What is the refund policy?" },
    a: {
      ar: "إذا لم يعجبك الإصدار خلال ٣٠ يوماً من الشراء، راسلنا وسنعيد المبلغ كاملاً دون أسئلة.",
      en: "If the edition isn't for you within 30 days of purchase, write to us and we refund in full, no questions asked.",
    },
  },
  {
    q: { ar: "هل يعمل على الجوال والآيباد؟", en: "Does it work on phone and tablet?" },
    a: {
      ar: "نعم. الملف مُحسَّن للقراءة على الجوال واللوح والحاسوب، ويمكن طباعته أيضاً إن فضّلت النسخة الورقية.",
      en: "Yes. The file is optimised for phone, tablet and desktop, and prints cleanly if you prefer paper.",
    },
  },
  {
    q: { ar: "هل يمكنني استخدام الوصفات في مطعمي؟", en: "Can I use the recipes in my restaurant?" },
    a: {
      ar: "الاستخدام التجاري متاح عبر ترخيص خاص — راسلنا وسنرسل لك التفاصيل خلال يوم عمل.",
      en: "Commercial use is available under a separate licence — write to us and we'll send the details within one business day.",
    },
  },
];

/** Working promo codes for the demo cart. أكواد الخصم التجريبية. */
export const promoCodes: Record<string, number> = {
  CODEX20: 0.2,
  CHEF10: 0.1,
};
