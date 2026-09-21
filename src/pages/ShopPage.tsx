import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Search, SlidersHorizontal } from "lucide-react";
import Seo from "@/components/Seo";
import ProductCard from "@/components/ProductCard";
import TrustStrip from "@/components/TrustStrip";
import { useLang } from "@/i18n/LanguageContext";
import { categories, products } from "@/data/products";
import { brandImages } from "@/data/site";

type Sort = "featured" | "asc" | "desc";

const ShopPage = () => {
  const { t, L } = useLang();
  const [params, setParams] = useSearchParams();
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<Sort>("featured");
  const [filtersOpen, setFiltersOpen] = useState(false);

  const category = params.get("category") ?? "all";

  const setCategory = (value: string) => {
    const next = new URLSearchParams(params);
    if (value === "all") next.delete("category");
    else next.set("category", value);
    setParams(next);
  };

  const visible = useMemo(() => {
    const term = query.trim().toLowerCase();
    const list = products.filter((product) => {
      if (category !== "all" && product.category !== category) return false;
      if (!term) return true;
      return [product.title.ar, product.title.en, product.subtitle.ar, product.subtitle.en]
        .join(" ")
        .toLowerCase()
        .includes(term);
    });

    if (sort === "asc") return [...list].sort((a, b) => a.price - b.price);
    if (sort === "desc") return [...list].sort((a, b) => b.price - a.price);
    return [...list].sort((a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured)));
  }, [category, query, sort]);

  return (
    <>
      <Seo title={t("shop.title")} description={t("shop.subtitle")} />

      {/* Page header */}
      <section className="texture-navy relative overflow-hidden">
        <img
          src={brandImages.chefDuck}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover opacity-20"
        />
        <div className="container-luxe relative z-10 py-16 text-center md:py-20">
          <span className="eyebrow">{t("shop.eyebrow")}</span>
          <h1 className="mt-5 font-display text-4xl text-ivory md:text-5xl">{t("shop.title")}</h1>
          <p className="mx-auto mt-4 max-w-xl text-[15px] leading-relaxed text-ivory/70">{t("shop.subtitle")}</p>
        </div>
      </section>

      <TrustStrip />

      <section className="section container-luxe">
        {/* Toolbar */}
        <div className="mb-10 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative w-full lg:max-w-sm">
            <Search className="pointer-events-none absolute top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground start-4" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t("shop.searchPlaceholder")}
              aria-label={t("nav.search")}
              className="field-luxe ps-11"
            />
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setFiltersOpen((v) => !v)}
              aria-expanded={filtersOpen}
              className="inline-flex items-center gap-2 rounded-sm border border-border px-4 py-3 text-[12px] font-semibold uppercase tracking-[0.12em] text-navy-700 lg:hidden"
            >
              <SlidersHorizontal className="h-4 w-4" />
              {t("shop.filters")}
            </button>

            <label className="flex items-center gap-2 text-[12px] uppercase tracking-[0.12em] text-muted-foreground">
              {t("shop.sort")}
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as Sort)}
                className="rounded-sm border border-border bg-white px-3 py-2.5 text-[13px] normal-case tracking-normal text-navy-700 outline-none focus:border-gold"
              >
                <option value="featured">{t("shop.sort.featured")}</option>
                <option value="asc">{t("shop.sort.priceAsc")}</option>
                <option value="desc">{t("shop.sort.priceDesc")}</option>
              </select>
            </label>
          </div>
        </div>

        {/* Category pills */}
        <div className={`mb-10 flex-wrap gap-2.5 ${filtersOpen ? "flex" : "hidden lg:flex"}`}>
          {categories.map((cat) => {
            const active = category === cat.value;
            return (
              <button
                key={cat.value}
                type="button"
                onClick={() => setCategory(cat.value)}
                className={`rounded-sm border px-5 py-2.5 text-[12px] font-semibold uppercase tracking-[0.12em] transition-all duration-300 ${
                  active
                    ? "border-gold bg-gold-gradient text-ink"
                    : "border-border text-navy-700 hover:border-gold hover:text-gold-600"
                }`}
              >
                {L(cat.label)}
              </button>
            );
          })}
        </div>

        <p className="mb-6 text-[12px] uppercase tracking-[0.12em] text-muted-foreground">
          {visible.length} {visible.length === 1 ? t("shop.result") : t("shop.results")}
        </p>

        {visible.length > 0 ? (
          <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {visible.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="rounded-sm border border-dashed border-gold/40 py-20 text-center">
            <p className="text-muted-foreground">{t("shop.empty")}</p>
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setCategory("all");
              }}
              className="mt-4 text-[12px] font-semibold uppercase tracking-[0.14em] text-gold-600 underline underline-offset-4"
            >
              {t("shop.clear")}
            </button>
          </div>
        )}
      </section>
    </>
  );
};

export default ShopPage;
