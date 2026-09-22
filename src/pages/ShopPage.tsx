import Seo from "@/components/Seo";
import ProductCard from "@/components/ProductCard";
import TrustStrip from "@/components/TrustStrip";
import { useLang } from "@/i18n/LanguageContext";
import { products } from "@/data/products";
import { brandImages } from "@/data/site";

const ShopPage = () => {
  const { t } = useLang();

  return (
    <>
      <Seo title={t("seo.shop.title")} description={t("seo.shop.desc")} />

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

      {/* Two products — a grid needs no search, filters or sorting. */}
      <section className="section container-luxe">
        <div className="mx-auto grid max-w-4xl gap-7 sm:grid-cols-2">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </>
  );
};

export default ShopPage;
