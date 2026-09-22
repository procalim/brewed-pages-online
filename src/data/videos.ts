import type { Localized } from "@/i18n/LanguageContext";

/**
 * Short technique clips from the kitchen — the ones that open the home page.
 *
 * Each carries a title written the way people search ("why does fried cheese
 * leak", "how hot for hollandaise") rather than a caption, so the clip can
 * earn a video result of its own in Google. The poster is the frame the
 * visitor sees before pressing play, and the one Google shows as a thumbnail.
 * عناوين مكتوبة بصيغة ما يبحث عنه الناس، لا مجرّد وصف للمقطع.
 */
export type SiteVideo = {
  slug: string;
  title: Localized;
  description: Localized;
  /** Seconds — needed for the VideoObject duration. */
  duration: number;
};

export const videos: SiteVideo[] = [
  {
    slug: "fried-cheese",
    title: {
      ar: "لماذا تتسرّب الجبنة عند القلي — والحل في ٣٠ دقيقة",
      en: "Why Fried Cheese Leaks — and the 30-Minute Fix",
    },
    description: {
      ar: "سرّ الجبنة المقلية التي تبقى متماسكة: جمّدها ٣٠ دقيقة قبل أن تلمس الزيت. من فصل المقبلات الساخنة في ذا إديبل كودكس.",
      en: "The secret to fried cheese that holds its shape: freeze it for 30 minutes before it touches the oil. From the hot starters chapter of The Edible Codex.",
    },
    duration: 20,
  },
  {
    slug: "one-second-chips",
    title: {
      ar: "شيبس مقرمش في ثانية واحدة — ١٩٠ درجة وورقة ناشفة",
      en: "Crispy Chips in One Second — 190°C and a Bone-Dry Sheet",
    },
    description: {
      ar: "رقائق تنتفخ وتقرمش خلال ثانيتين: زيت على ١٩٠ درجة وعجينة ورقية ناشفة تماماً. تقنية مطاعم مشروحة خطوة بخطوة.",
      en: "Crisps that puff and set in two seconds: oil at 190°C and a sheet dried out completely. A restaurant technique, broken down step by step.",
    },
    duration: 15,
  },
  {
    slug: "hollandaise-heat",
    title: {
      ar: "الهولنديز ينفصل فوق ٦٥ درجة — إليك الحرارة الصحيحة",
      en: "Hollandaise Splits Above 65°C — Here Is the Right Heat",
    },
    description: {
      ar: "لماذا ينفصل صوص الهولنديز وكيف تتفاداه، مع طريقة تنسيق الصوص على الطبق كما في المطاعم. من فصل الصلصات.",
      en: "Why hollandaise splits, how to keep it from splitting, and how to plate the sauce the way restaurants do. From the sauces chapter.",
    },
    duration: 13,
  },
  {
    slug: "crispy-rice-press",
    title: {
      ar: "الأرز المقرمش: اضغطه بارداً — سرّ قوام المطاعم",
      en: "Crispy Rice: Press It Cold — The Restaurant Texture Secret",
    },
    description: {
      ar: "برج التونة والأرز المقرمش: القاعدة الوحيدة أن تضغط الأرز وهو بارد. تنسيق وصلصات بأسلوب الفاين دايننغ.",
      en: "The crispy rice and tuna tower: the one rule is to press the rice while it is cold. Fine-dining plating and sauces.",
    },
    duration: 13,
  },
];

const clipUrls = import.meta.glob("../assets/videos/*.mp4", {
  eager: true,
  query: "?url",
  import: "default",
}) as Record<string, string>;

const posterUrls = import.meta.glob("../assets/videos/*.jpg", {
  eager: true,
  query: "?url",
  import: "default",
}) as Record<string, string>;

const bySlug = (urls: Record<string, string>, ext: string) =>
  Object.fromEntries(
    Object.entries(urls).map(([path, url]) => [path.split("/").pop()!.replace(ext, ""), url]),
  );

const clipBySlug = bySlug(clipUrls, ".mp4");
const posterBySlug = bySlug(posterUrls, ".jpg");

export const videoClip = (video: SiteVideo) => clipBySlug[video.slug] ?? "";
export const videoPoster = (video: SiteVideo) => posterBySlug[video.slug] ?? "";
