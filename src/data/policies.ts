import type { Localized } from "@/i18n/LanguageContext";

export type Policy = {
  slug: "privacy" | "terms" | "refund";
  title: Localized;
  updated: string;
  sections: { heading: Localized; body: Localized }[];
};

/**
 * Store policies · سياسات المتجر
 * Plain, honest starting text. Have a lawyer review before you launch
 * in a regulated market. نصّ مبدئي — راجعه قانونياً قبل الإطلاق.
 */
export const policies: Policy[] = [
  {
    slug: "privacy",
    title: { ar: "سياسة الخصوصية", en: "Privacy Policy" },
    updated: "2026-09-01",
    sections: [
      {
        heading: { ar: "ما الذي نجمعه", en: "What we collect" },
        body: {
          ar: "نجمع الاسم والبريد الإلكتروني ورقم الجوال عند إتمام الطلب، إضافة إلى بيانات تصفّح أساسية مثل الصفحات التي زرتها. لا نخزّن بيانات بطاقتك البنكية على خوادمنا إطلاقاً.",
          en: "We collect your name, email address and phone number when you place an order, plus basic browsing data such as the pages you visited. Your card details are never stored on our servers.",
        },
      },
      {
        heading: { ar: "لماذا نستخدمها", en: "Why we use it" },
        body: {
          ar: "نستخدم بياناتك لتسليم الطلب، وإرسال روابط التحميل والتحديثات، والرد على استفساراتك. إن اشتركت في القائمة البريدية نرسل لك وصفات وعروضاً، ويمكنك إلغاء الاشتراك في أي وقت بنقرة واحدة.",
          en: "We use your data to deliver your order, send download links and updates, and answer your questions. If you subscribe to the list we also send recipes and offers — one click unsubscribes you at any time.",
        },
      },
      {
        heading: { ar: "مشاركة البيانات", en: "Sharing" },
        body: {
          ar: "لا نبيع بياناتك ولا نؤجّرها. نشاركها فقط مع مزوّدي الخدمة الضروريين لتشغيل المتجر: بوابة الدفع، وخدمة البريد، واستضافة الملفات.",
          en: "We do not sell or rent your data. We share it only with the service providers required to run the store: the payment gateway, the email service and file hosting.",
        },
      },
      {
        heading: { ar: "حقوقك", en: "Your rights" },
        body: {
          ar: "يمكنك طلب نسخة من بياناتك أو حذفها بالكامل في أي وقت عبر مراسلتنا، وسننفّذ الطلب خلال ثلاثين يوماً.",
          en: "You can request a copy of your data, or ask us to delete it entirely, at any time by writing to us. We action such requests within thirty days.",
        },
      },
    ],
  },
  {
    slug: "terms",
    title: { ar: "الشروط والأحكام", en: "Terms of Service" },
    updated: "2026-09-01",
    sections: [
      {
        heading: { ar: "الترخيص الشخصي", en: "Personal licence" },
        body: {
          ar: "شراء أي إصدار يمنحك ترخيصاً شخصياً غير حصري لاستخدامه وطباعته لنفسك. لا يشمل الترخيص إعادة البيع أو التوزيع أو المشاركة العامة للملف.",
          en: "Buying an edition grants you a personal, non-exclusive licence to use and print it for yourself. The licence does not cover resale, distribution or publicly sharing the file.",
        },
      },
      {
        heading: { ar: "الاستخدام التجاري", en: "Commercial use" },
        body: {
          ar: "استخدام الوصفات في مطعم أو مقهى أو أي نشاط تجاري يتطلّب ترخيصاً تجارياً منفصلاً — راسلنا وسنرسل لك التفاصيل.",
          en: "Using the recipes in a restaurant, café or any commercial operation requires a separate commercial licence — write to us for details.",
        },
      },
      {
        heading: { ar: "الأسعار والتوفّر", en: "Pricing and availability" },
        body: {
          ar: "الأسعار المعروضة بالدولار الأمريكي وقد تتغيّر دون إشعار مسبق. العروض المحدودة سارية حتى التاريخ المعلن عنها أو حتى نفاد الكمية.",
          en: "Prices are shown in US dollars and may change without prior notice. Limited offers run until the stated date or while stock lasts.",
        },
      },
      {
        heading: { ar: "المسؤولية", en: "Liability" },
        body: {
          ar: "الوصفات مقدَّمة للاستخدام المنزلي. أنت مسؤول عن سلامة الغذاء والتعامل مع الحساسية الغذائية والتحقّق من مكوّنات ما تطبخه.",
          en: "The recipes are provided for home use. You remain responsible for food safety, allergy management and checking the ingredients of what you cook.",
        },
      },
    ],
  },
  {
    slug: "refund",
    title: { ar: "سياسة الاسترداد", en: "Refund Policy" },
    updated: "2026-09-01",
    sections: [
      {
        heading: { ar: "ضمان ٣٠ يوماً", en: "30-day guarantee" },
        body: {
          ar: "إذا لم يقنعك الإصدار خلال ثلاثين يوماً من الشراء، راسلنا من البريد الذي استخدمته في الطلب وسنعيد المبلغ كاملاً دون أسئلة.",
          en: "If an edition doesn't convince you within thirty days of purchase, email us from the address you ordered with and we refund in full, no questions asked.",
        },
      },
      {
        heading: { ar: "مدّة المعالجة", en: "Processing time" },
        body: {
          ar: "تتم الموافقة على الطلب خلال يومي عمل، ويصل المبلغ إلى حسابك خلال ٥ إلى ١٠ أيام عمل حسب البنك.",
          en: "Requests are approved within two business days, and the money reaches your account in 5–10 business days depending on your bank.",
        },
      },
      {
        heading: { ar: "الباقات", en: "Bundles" },
        body: {
          ar: "تُسترد الباقات كوحدة واحدة ولا يمكن استرداد جزء منها، لأن سعرها مبني على الحزمة كاملة.",
          en: "Bundles are refunded as a single unit and cannot be partially refunded, since their price is built on the complete package.",
        },
      },
    ],
  },
];

export const getPolicy = (slug?: string) => policies.find((p) => p.slug === slug);
