import { useEffect } from "react";
import { useLang } from "@/i18n/LanguageContext";
import { site } from "@/data/site";

type SeoProps = { title: string; description: string; image?: string };

const setMeta = (selector: string, attr: "name" | "property", key: string, content: string) => {
  let el = document.head.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
};

/** Keeps <title> and the social meta tags in sync with the active page and language. */
const Seo = ({ title, description, image = `${import.meta.env.BASE_URL}brand/edible-codex-cover.jpg` }: SeoProps) => {
  const { lang } = useLang();
  const brand = lang === "ar" ? site.brand.nameAr : site.brand.name;

  useEffect(() => {
    const full = `${title} | ${brand}`;
    document.title = full;
    setMeta('meta[name="description"]', "name", "description", description);
    setMeta('meta[property="og:title"]', "property", "og:title", full);
    setMeta('meta[property="og:description"]', "property", "og:description", description);
    setMeta('meta[property="og:image"]', "property", "og:image", image);
    setMeta('meta[property="og:locale"]', "property", "og:locale", lang === "ar" ? "ar_SA" : "en_US");
    setMeta('meta[name="twitter:title"]', "name", "twitter:title", full);
    setMeta('meta[name="twitter:description"]', "name", "twitter:description", description);
    setMeta('meta[name="twitter:image"]', "name", "twitter:image", image);
  }, [title, description, image, brand, lang]);

  return null;
};

export default Seo;
