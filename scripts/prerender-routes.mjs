/**
 * Writes a real index.html at every address the app serves.
 *
 * GitHub Pages has no SPA rewrite: for a path with no file behind it, it
 * serves 404.html — with an HTTP 404. A visitor saw the page render and
 * noticed nothing, but every crawler was told the page does not exist, and
 * Google refused to index anything but the home page. Giving each route its
 * own file turns that into a 200, and lets each one carry its own title,
 * description and canonical for crawlers that do not run JavaScript.
 *
 * صفحات جيت هب لا تعرف مسارات التطبيق، فكانت تُعيد 404 لكل صفحة داخلية —
 * يراها الزائر سليمة بينما يراها جوجل غير موجودة. هذا الملف يكتب صفحة
 * حقيقية لكل عنوان.
 */
import fs from "node:fs";
import path from "node:path";
import { origin, pageTitle, root, routes } from "./routes.mjs";

const dist = path.join(root, "dist");
const template = fs.readFileSync(path.join(dist, "index.html"), "utf8");

/**
 * The picture a page should show when it is shared or listed in a result.
 *
 * Every pre-rendered page was shipping the home page's logo, written as the
 * relative "./brand/logo-square.jpg" — which on /recipes/<slug>/ resolves to
 * /recipes/<slug>/brand/... and 404s. With nothing usable declared, Google
 * picked whatever image it liked off the rendered page, which is why recipes
 * came up in search under a neighbouring recipe's photograph.
 * كل صفحة كانت تعلن صورة الشعار بمسار نسبي مكسور، فكان جوجل يختار صورة
 * عشوائية من الصفحة — ولهذا ظهرت وصفات بصور وصفات أخرى.
 */
const assets = fs.existsSync(path.join(dist, "assets")) ? fs.readdirSync(path.join(dist, "assets")) : [];

const hashed = (slug) => {
  const hit = assets.find((f) => new RegExp(`^${slug}-[A-Za-z0-9_-]+\\.jpg$`).test(f));
  return hit ? `/assets/${hit}` : null;
};

const PRODUCT_IMAGE = {
  "the-edible-codex": "/brand/book/cover.jpg",
  "the-five-sauces": "/brand/chef-shrimp-rainbow.jpg",
};

const imageFor = (route) => {
  const [, section, slug] = route.path.split("/");
  if (section === "recipes" && slug) return hashed(slug);
  if (section === "videos" && slug) return hashed(slug);
  if (section === "shop" && slug) return PRODUCT_IMAGE[slug] ?? null;
  return null;
};

const escape = (value) =>
  value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/** Swaps in this route's own metadata, leaving the rest of the document alone. */
const render = (route) => {
  const url = `${origin}${route.path}`;
  const title = escape(pageTitle(route));
  const description = escape(route.description);
  const image = origin + (imageFor(route) ?? "/brand/logo-square.jpg");

  return template
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${title}</title>`)
    .replace(
      /<meta\s+name="description"[\s\S]*?\/>/,
      `<meta name="description" content="${description}" />`,
    )
    .replace(
      /<meta property="og:title" content="[^"]*" \/>/,
      `<meta property="og:title" content="${title}" />`,
    )
    .replace(
      /<meta\s+property="og:description"[\s\S]*?\/>/,
      `<meta property="og:description" content="${description}" />`,
    )
    .replace(
      /<meta property="og:image" content="[^"]*" \/>/,
      `<meta property="og:image" content="${image}" />`,
    )
    .replace(
      /<meta name="twitter:image" content="[^"]*" \/>/,
      `<meta name="twitter:image" content="${image}" />`,
    )
    .replace(
      "</head>",
      `  <link rel="canonical" href="${url}" />\n    <meta property="og:url" content="${url}" />\n  </head>`,
    );
};

let written = 0;
for (const route of routes) {
  const target =
    route.path === "/" ? path.join(dist, "index.html") : path.join(dist, route.path, "index.html");
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, render(route));
  written += 1;
}

// Kept for any address not in the list — a mistyped URL still lands in the app.
fs.writeFileSync(path.join(dist, "404.html"), template);

console.log(`prerender: ${written} routes written under dist/`);
