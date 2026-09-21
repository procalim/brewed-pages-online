# The Edible Codex — متجر رقمي احترافي / Premium Digital Storefront

موقع متجر إلكتروني كامل بهوية بصرية ذهبية · سوداء · كحلية، ثنائي اللغة (عربي RTL + إنجليزي LTR).
A complete storefront in a gold · black · navy identity, bilingual (Arabic RTL + English LTR).

![identity](public/brand/edible-codex-cover.jpg)

---

## ١. التشغيل محلياً · Running locally

```sh
npm install
npm run dev       # http://localhost:8080
npm run build     # production build → dist/
npm run preview   # preview the production build
npm run lint
```

## ٢. ما الذي تعدّله أولاً · What to edit first

كل المحتوى مجمّع في أربعة ملفات — لا حاجة للدخول في الكود.
All content lives in four files — you never have to dig through components.

| الملف · File | ماذا يحتوي · What it holds |
| --- | --- |
| `src/data/site.ts` | الاسم، اسم الشيف، البريد، الجوال، واتساب، الموقع، الروابط الاجتماعية، العملة |
| `src/data/products.ts` | المنتجات وأسعارها وأوصافها ومميزاتها، التقييمات، الأسئلة الشائعة، أكواد الخصم |
| `src/data/policies.ts` | سياسة الخصوصية، الشروط والأحكام، سياسة الاسترداد |
| `src/i18n/dictionary.ts` | كل نصوص الواجهة بالعربية والإنجليزية في مكان واحد |

> **مهم:** التقييمات في `products.ts` نماذج توضيحية — استبدلها بتقييمات عملائك الحقيقيين قبل النشر.
> **Important:** the reviews in `products.ts` are placeholders — replace them with real customer reviews before launch.

> أرقام الجوال والواتساب في `site.ts` أرقام مؤقتة (`9660000000`) — ضع رقمك الحقيقي قبل الإطلاق.
> The phone/WhatsApp numbers in `site.ts` are placeholders — set your real number before launch.

## ٣. الصور · Brand images

صورك في `public/brand/` وتُستدعى عبر `brandImages` في `src/data/site.ts`:

- `chef-portrait.jpg` — الواجهة الرئيسية وصفحة عن الشيف
- `chef-shrimp-rainbow.jpg`, `chef-duck-cherry.jpg`, `chef-beef-tenderloin.jpg` — المعرض وبطاقات المنتجات
- `edible-codex-cover.jpg` — غلاف الإصدار الرئيسي وصورة المشاركة الاجتماعية

لتبديل أي صورة: ضع ملفاً بنفس الاسم في نفس المجلد.
To swap an image: drop a file with the same name into the same folder.

كل منتج يحمل خاصية `focus` (مثل `"center 75%"`) تحدّد أي جزء من الصورة يبقى في الإطار عند القص — عدّلها إن أضفت صوراً بتكوين مختلف.
Each product carries a `focus` value (e.g. `"center 75%"`) that decides which part of the photo survives the crop — adjust it when you add photos with a different composition.

## ٤. الصفحات · Pages

| المسار · Route | الصفحة · Page |
| --- | --- |
| `/` | الرئيسية: واجهة، مزايا، الإصدار الرئيسي، معرض الأطباق، المنتجات، التقييمات، عرض، أسئلة |
| `/shop` | المتجر مع بحث وتصنيفات وترتيب حسب السعر |
| `/shop/:slug` | صفحة المنتج: معرض صور، كمية، إضافة للسلة، شراء فوري، مواصفات، أسئلة، منتجات مشابهة |
| `/about` · `/faq` · `/contact` | عن الشيف · الأسئلة الشائعة · التواصل (نموذج + واتساب) |
| `/cart` · `/checkout` | السلة (مع كود خصم) · إتمام الطلب |
| `/policies/privacy`، `/policies/terms`، `/policies/refund` | السياسات |

## ٥. السلة والدفع · Cart & payment

- السلة محفوظة في `localStorage` وتبقى بعد إغلاق المتصفح — `src/context/CartContext.tsx`.
- أكواد الخصم العاملة: `CODEX20` (٢٠٪) و `CHEF10` (١٠٪) — عدّلها في `products.ts`.
- **الدفع غير مربوط بعد.** صفحة `/checkout` تسجّل الطلب محلياً وتعطي رقم طلب، مع زر إرسال الطلب عبر واتساب.
  لربط بوابة دفع حقيقية (Stripe / Tap / Shopify Buy Button)، استبدل دالة `placeOrder` في `src/pages/CheckoutPage.tsx`
  باستدعاء البوابة. كل ما تحتاجه (المنتجات، الإجمالي، بيانات العميل) متاح داخل الدالة.
  **Payment is not connected yet.** Replace `placeOrder` in `src/pages/CheckoutPage.tsx` with your gateway call.

## ٦. اللغة والاتجاه · Language & direction

- العربية هي اللغة الافتراضية، والاتجاه `rtl` يُضبط تلقائياً على `<html>`.
- زر التبديل في الشريط العلوي، واختيار الزائر محفوظ في `localStorage`.
- خطوط: Playfair Display + Inter للإنجليزية، Amiri + Tajawal للعربية.
- Arabic is the default; direction, fonts and the whole layout mirror automatically.

## ٧. الهوية البصرية · Design tokens

الألوان معرّفة في `tailwind.config.ts`، والمكوّنات الجاهزة في `src/index.css`:

| Token | Value | استخدام |
| --- | --- | --- |
| `gold` | `#C9A227` | العناصر الأساسية، الأزرار، الحدود |
| `navy` | `#132B52` / `#0B1B33` | الخلفيات الداكنة والنصوص |
| `ink` | `#0A0A0B` | الأسود العميق |
| `ivory` | `#F7F3EA` | الخلفية الفاتحة |

أصناف جاهزة: `.btn-gold` · `.btn-navy` · `.btn-outline-gold` · `.card-luxe` · `.card-dark` · `.eyebrow` · `.gold-text` · `.texture-dark` · `.texture-navy` · `.field-luxe`

## ٨. التقنيات · Stack

Vite · React 18 · TypeScript · Tailwind CSS · shadcn/ui · React Router · lucide-react

## ٩. النشر · Deploy

`npm run build` ثم ارفع مجلد `dist/` إلى أي استضافة ثابتة (Netlify، Vercel، Cloudflare Pages، أو Lovable).
احرص على توجيه كل المسارات إلى `index.html` لأن الموقع يستخدم توجيهاً من طرف العميل.
Configure an SPA fallback to `index.html` — the site uses client-side routing.
