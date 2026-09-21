import { Download, Headphones, RotateCcw, ShieldCheck } from "lucide-react";
import { useLang } from "@/i18n/LanguageContext";

const TrustStrip = () => {
  const { t } = useLang();
  const items = [
    { Icon: Download, label: t("trust.instant") },
    { Icon: ShieldCheck, label: t("trust.secure") },
    { Icon: RotateCcw, label: t("trust.refund") },
    { Icon: Headphones, label: t("trust.support") },
  ];

  return (
    <div className="border-y border-gold/20 bg-white">
      <div className="container-luxe grid grid-cols-2 divide-gold/15 md:grid-cols-4 md:divide-x rtl:md:divide-x-reverse">
        {items.map(({ Icon, label }) => (
          <div key={label} className="flex items-center justify-center gap-3 px-4 py-6">
            <Icon className="h-5 w-5 shrink-0 text-gold" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-navy-700">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrustStrip;
