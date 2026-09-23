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
  /** What the clip teaches, written out so the watch page carries its own
      substance rather than just a player. نقاط التقنية على صفحة المقطع. */
  notes: { ar: string[]; en: string[] };
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
    notes: {
      ar: [
        "الجبنة تتسرّب لأنها تذوب قبل أن تتماسك القشرة حولها.",
        "التجميد ٣٠ دقيقة يؤخّر الذوبان حتى تجهز القشرة أولاً.",
        "الزيت يجب أن يكون ساخناً بما يكفي ليُثبّت القشرة في ثوانٍ، لا أن يسخّن الجبنة ببطء.",
      ],
      en: [
        "Cheese leaks because it melts before the crust around it has set.",
        "Thirty minutes in the freezer delays the melt long enough for the crust to form first.",
        "The oil has to be hot enough to set that crust in seconds, rather than slowly warming the cheese.",
      ],
    },
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
    notes: {
      ar: [
        "الورقة يجب أن تكون ناشفة تماماً — أي رطوبة تتحوّل إلى بخار فتسلق بدل أن تنتفخ.",
        "١٩٠ درجة هي الحدّ: الزيت الأبرد يتشرّب في العجينة بدل أن ينفخها.",
        "ثانيتان وتخرج — الزيادة تُلوّنها وتُكسبها مرارة.",
      ],
      en: [
        "The sheet has to be bone-dry — any moisture turns to steam and boils it instead of puffing it.",
        "190°C is the threshold: cooler oil soaks into the sheet rather than inflating it.",
        "Two seconds and it comes out — longer and it colours and turns bitter.",
      ],
    },
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
    notes: {
      ar: [
        "فوق ٦٥ درجة يتخثّر بروتين البيض فينفصل الصوص — لا علاقة للأمر بسرعة الخفق.",
        "لا تضع الوعاء على النار مباشرة؛ ماء دافئ تحته يكفي تماماً.",
        "إن انفصل، أضف ملعقة ماء دافئ واخفق من جديد — يعود غالباً.",
      ],
      en: [
        "Above 65°C the egg protein sets and the sauce breaks — it has nothing to do with how fast you whisk.",
        "Never put the bowl over direct heat; a pan of warm water underneath is enough.",
        "If it does split, whisk in a spoonful of warm water and rebuild it — it usually comes back.",
      ],
    },
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
    notes: {
      ar: [
        "الأرز البارد ينضغط إلى كتلة متماسكة، والدافئ يتلطّخ ولا يحفظ شكله.",
        "اضغط، ثم برّد، ثم قطّع — عندها تبقى الحواف حادّة.",
        "القلي على حرارة عالية ولوقت قصير: قشرة مقرمشة وقلب طري.",
      ],
      en: [
        "Cold rice presses into a block that holds; warm rice smears and loses its shape.",
        "Press, chill, then cut — that order is what keeps the edges square.",
        "Fry hot and brief: a crisp shell with the inside still soft.",
      ],
    },
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

export const getVideo = (slug?: string) => videos.find((video) => video.slug === slug);
