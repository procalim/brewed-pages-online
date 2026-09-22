import { useState } from "react";
import { Clock, Mail, MapPin, MessageCircle, Phone, Send } from "lucide-react";
import Seo from "@/components/Seo";
import { useLang } from "@/i18n/LanguageContext";
import { site, whatsappLink } from "@/data/site";
import { toast } from "@/hooks/use-toast";

const ContactPage = () => {
  const { t, lang } = useLang();
  const [sending, setSending] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  const update = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((prev) => ({ ...prev, [key]: e.target.value }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    // No backend yet — the message is handed to the visitor's mail client.
    // لا يوجد خادم بعد — تُفتح رسالة بريد جاهزة للإرسال.
    const body = `${form.name} · ${form.email}\n\n${form.message}`;
    window.location.href = site.contact.email
      ? `mailto:${site.contact.email}?subject=${encodeURIComponent(form.subject || site.brand.name)}&body=${encodeURIComponent(body)}`
      : whatsappLink(`${form.subject || site.brand.name}\n${body}`);
    window.setTimeout(() => {
      setSending(false);
      toast({ title: t("contact.form.success") });
      setForm({ name: "", email: "", subject: "", message: "" });
    }, 600);
  };

  type ContactRow = { Icon: typeof Mail; label: string; value: string; href?: string };

  const details: ContactRow[] = [
    // The email row only exists when an address is configured.
    ...(site.contact.email
      ? [{ Icon: Mail, label: t("contact.email"), value: site.contact.email, href: `mailto:${site.contact.email}` }]
      : []),
    {
      Icon: Phone,
      label: t("contact.phone"),
      value: site.contact.phoneDisplay,
      href: `tel:${site.contact.phoneDisplay.replace(/\s/g, "")}`,
    },
    { Icon: MapPin, label: t("contact.location"), value: lang === "ar" ? site.contact.cityAr : site.contact.cityEn },
    { Icon: Clock, label: t("contact.hours"), value: lang === "ar" ? site.contact.hoursAr : site.contact.hoursEn },
  ];

  return (
    <>
      <Seo title={t("seo.contact.title")} description={t("seo.contact.desc")} />

      <section className="texture-navy">
        <div className="container-luxe py-16 text-center md:py-20">
          <span className="eyebrow">{t("contact.eyebrow")}</span>
          <h1 className="mt-5 font-display text-4xl text-ivory md:text-5xl">{t("contact.title")}</h1>
          <p className="mx-auto mt-4 max-w-xl text-[15px] text-ivory/70">{t("contact.subtitle")}</p>
        </div>
      </section>

      <section className="section container-luxe">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
          {/* Details */}
          <div>
            <ul className="space-y-6">
              {details.map(({ Icon, label, value, href }) => (
                <li key={label} className="flex items-start gap-4">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-sm bg-navy text-gold">
                    <Icon className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                      {label}
                    </p>
                    {href ? (
                      <a href={href} dir="ltr" className="mt-1 block text-[15px] text-navy-700 hover:text-gold-600">
                        {value}
                      </a>
                    ) : (
                      <p className="mt-1 text-[15px] text-navy-700">{value}</p>
                    )}
                  </div>
                </li>
              ))}
            </ul>

            <a
              href={whatsappLink(lang === "ar" ? "مرحباً، أحتاج مساعدة" : "Hello, I need some help")}
              target="_blank"
              rel="noreferrer noopener"
              className="btn-gold mt-10 w-full"
            >
              <MessageCircle className="h-4 w-4" />
              {t("contact.whatsapp")}
            </a>
          </div>

          {/* Form */}
          <form onSubmit={submit} className="rounded-sm border border-gold/25 bg-white p-7 shadow-luxe md:p-10">
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="block">
                <span className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                  {t("contact.form.name")}
                </span>
                <input required value={form.name} onChange={update("name")} className="field-luxe" />
              </label>

              <label className="block">
                <span className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                  {t("contact.form.email")}
                </span>
                <input required type="email" value={form.email} onChange={update("email")} className="field-luxe" />
              </label>
            </div>

            <label className="mt-5 block">
              <span className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                {t("contact.form.subject")}
              </span>
              <input value={form.subject} onChange={update("subject")} className="field-luxe" />
            </label>

            <label className="mt-5 block">
              <span className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                {t("contact.form.message")}
              </span>
              <textarea required rows={6} value={form.message} onChange={update("message")} className="field-luxe resize-none" />
            </label>

            <button type="submit" disabled={sending} className="btn-gold mt-7 w-full disabled:opacity-60">
              <Send className="h-4 w-4 flip-rtl" />
              {sending ? t("contact.form.sending") : t("contact.form.send")}
            </button>
          </form>
        </div>
      </section>
    </>
  );
};

export default ContactPage;
