import { breadcrumbList } from "@/lib/breadcrumbs";
import { site } from "@/data/site";

/**
 * The structured data each page hands to search engines.
 *
 * It lived inside the page components, which meant it existed only after
 * React ran. Google renders JavaScript, but it renders it late and not
 * always — so a recipe could sit indexed for weeks with no photograph and
 * a borrowed description. These builders are plain functions of their
 * arguments, so the build step can write the same markup straight into the
 * HTML and the page can keep using it unchanged.
 *
 * كانت البيانات المنظَّمة تُضاف بالجافاسكربت بعد التحميل، فلا يراها جوجل
 * إلا متأخراً. صارت دوالّ خالصة يستدعيها البناء ويكتبها في الصفحة نفسها.
 */

export type Trail = { name: string; path: string }[];

/**
 * "35 min" reads fine on the page, but schema.org wants ISO 8601 — Google
 * drops a totalTime it cannot parse, and the cooking time is half the reason
 * a recipe result gets clicked.
 * الوقت يُكتب بصيغة ISO وإلا تجاهله جوجل.
 */
/**
 * The tags are written for the filter row, but they carry two things Google
 * asks a recipe for by name. Only the words below count — a tag like "Viral"
 * or "Quick" is neither a course nor a cuisine, and guessing one would be
 * worse than leaving the field out.
 * الوسوم تحمل نوع الطبق ومطبخه؛ نأخذ المعروف منها فقط ولا نخمّن الباقي.
 */
const COURSES = new Set(["Appetizer", "Salad", "Dessert", "Drinks", "Coffee", "Bread",
                         "Sides", "Sandwich", "Dinner", "Pasta", "Sauce"]);
const CUISINES = new Set(["Middle Eastern", "Mexican", "Italian", "Korean", "Japanese",
                          "Thai", "French", "Chinese", "Indian", "Greek", "American"]);

const isoDuration = (time: string) => {
  const match = time.match(/^(\d+)\s*(min|h)$/i);
  if (!match) return time;
  const value = Number(match[1]);
  return match[2].toLowerCase() === "h" ? `PT${value}H` : `PT${value}M`;
};

const graph = (trail: Trail, entity: Record<string, unknown>) => ({
  "@context": "https://schema.org",
  "@graph": [breadcrumbList(trail), entity],
});

export const recipeGraph = (args: {
  trail: Trail;
  name: string;
  description: string;
  /** Site-relative path, or null when the recipe has no photograph. */
  photo: string | null;
  lang: string;
  serves: string;
  time: string;
  tags: string[];
  ingredients: string[];
  steps: string[];
}) =>
  graph(args.trail, {
    "@type": "Recipe",
    name: args.name,
    description: args.description,
    ...(args.photo ? { image: `${site.url}${args.photo}` } : {}),
    author: { "@type": "Person", name: site.brand.chefEn, url: `${site.url}/about` },
    inLanguage: args.lang,
    recipeYield: args.serves,
    totalTime: isoDuration(args.time),
    keywords: args.tags.join(", "),
    ...(args.tags.find((tag) => COURSES.has(tag))
      ? { recipeCategory: args.tags.find((tag) => COURSES.has(tag)) }
      : {}),
    ...(args.tags.find((tag) => CUISINES.has(tag))
      ? { recipeCuisine: args.tags.find((tag) => CUISINES.has(tag)) }
      : {}),
    recipeIngredient: args.ingredients,
    recipeInstructions: args.steps.map((step, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      text: step,
    })),
    isPartOf: { "@type": "Book", name: site.brand.name },
  });

export const productGraph = (args: {
  trail: Trail;
  name: string;
  description: string;
  image: string;
  slug: string;
  price: number;
}) =>
  graph(args.trail, {
    "@type": "Product",
    name: args.name,
    description: args.description,
    image: `${site.url}${args.image}`,
    brand: { "@type": "Brand", name: site.brand.name },
    // No aggregateRating here: the reviews on the site are still
    // placeholders, and publishing invented ratings as structured data would
    // mislead shoppers and breach Google's guidelines. Add it once real
    // reviews exist.
    offers: {
      "@type": "Offer",
      url: `${site.url}/shop/${args.slug}`,
      price: args.price,
      priceCurrency: site.currency.code,
      availability: "https://schema.org/InStock",
      itemCondition: "https://schema.org/NewCondition",
    },
  });

export const videoGraph = (args: {
  trail: Trail;
  name: string;
  description: string;
  thumbnail: string;
  clip: string;
  duration: number;
  lang: string;
}) =>
  graph(args.trail, {
    "@type": "VideoObject",
    name: args.name,
    description: args.description,
    thumbnailUrl: `${site.url}${args.thumbnail}`,
    contentUrl: `${site.url}${args.clip}`,
    uploadDate: "2026-09-22T00:00:00+03:00",
    duration: `PT${args.duration}S`,
    inLanguage: args.lang,
    publisher: { "@type": "Organization", name: site.brand.name },
  });
