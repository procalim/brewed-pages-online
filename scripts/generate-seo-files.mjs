/**
 * Writes sitemap.xml and robots.txt before the build, from the routes the
 * app actually serves and the products it actually sells — so the two can
 * never drift apart. Change the domain in site.config.json only.
 *
 * يكتب خريطة الموقع وملف robots قبل البناء، اعتماداً على صفحات الموقع
 * ومنتجاته الحقيقية. لتغيير النطاق عدّل site.config.json فقط.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const { url } = JSON.parse(fs.readFileSync(path.join(root, "site.config.json"), "utf8"));
const origin = url.replace(/\/$/, "");

// Product slugs are read straight out of the catalogue.
const productsSource = fs.readFileSync(path.join(root, "src/data/products.ts"), "utf8");
const slugs = [...productsSource.matchAll(/slug:\s*"([^"]+)"/g)].map((m) => m[1]);

const routes = [
  { path: "/", priority: "1.0", changefreq: "weekly" },
  { path: "/shop", priority: "0.9", changefreq: "weekly" },
  ...slugs.map((slug) => ({ path: `/shop/${slug}`, priority: "0.9", changefreq: "weekly" })),
  { path: "/about", priority: "0.6", changefreq: "monthly" },
  { path: "/faq", priority: "0.6", changefreq: "monthly" },
  { path: "/contact", priority: "0.5", changefreq: "monthly" },
  { path: "/policies/privacy", priority: "0.3", changefreq: "yearly" },
  { path: "/policies/terms", priority: "0.3", changefreq: "yearly" },
  { path: "/policies/refund", priority: "0.3", changefreq: "yearly" },
];

const today = new Date().toISOString().slice(0, 10);

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${routes
  .map(
    (route) => `  <url>
    <loc>${origin}${route.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
    <xhtml:link rel="alternate" hreflang="ar" href="${origin}${route.path}" />
    <xhtml:link rel="alternate" hreflang="en" href="${origin}${route.path}" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${origin}${route.path}" />
  </url>`,
  )
  .join("\n")}
</urlset>
`;

const robots = `User-agent: *
Allow: /

Sitemap: ${origin}/sitemap.xml
`;

fs.writeFileSync(path.join(root, "public/sitemap.xml"), sitemap);
fs.writeFileSync(path.join(root, "public/robots.txt"), robots);
console.log(`seo: sitemap with ${routes.length} urls for ${origin}`);
