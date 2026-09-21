import { Link } from "react-router-dom";
import { useLang } from "@/i18n/LanguageContext";
import { site } from "@/data/site";

/** Gold monogram + wordmark. `tone` picks the wordmark colour for light/dark bars. */
const Logo = ({ tone = "dark", compact = false }: { tone?: "dark" | "light"; compact?: boolean }) => {
  const { lang } = useLang();
  const wordmark = tone === "light" ? "text-ivory" : "text-navy-700";

  return (
    <Link to="/" className="group flex items-center gap-3" aria-label={site.brand.name}>
      <span className="relative grid h-11 w-11 shrink-0 place-items-center">
        <svg viewBox="0 0 48 48" className="absolute inset-0 h-full w-full" aria-hidden="true">
          <defs>
            <linearGradient id="logo-gold" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#9A7B1F" />
              <stop offset="45%" stopColor="#F2D98A" />
              <stop offset="100%" stopColor="#C9A227" />
            </linearGradient>
          </defs>
          <rect x="1" y="1" width="46" height="46" rx="3" fill="#0B1B33" />
          <rect
            x="3.5"
            y="3.5"
            width="41"
            height="41"
            rx="2"
            fill="none"
            stroke="url(#logo-gold)"
            strokeWidth="1.1"
            className="transition-opacity duration-300 group-hover:opacity-80"
          />
        </svg>
        <span className="relative font-display text-[15px] font-semibold tracking-[0.06em] text-gold-200">EC</span>
      </span>

      {!compact && (
        <span className="flex flex-col leading-none">
          <span className={`whitespace-nowrap font-display text-[15px] font-semibold tracking-tight sm:text-[17px] ${wordmark}`}>
            The <span className="gold-text">Edible</span> Codex
          </span>
          <span className="mt-1 hidden whitespace-nowrap text-[9px] font-sans font-medium uppercase tracking-luxe text-gold/80 sm:block">
            {lang === "ar" ? site.brand.taglineAr : site.brand.taglineEn}
          </span>
        </span>
      )}
    </Link>
  );
};

export default Logo;
