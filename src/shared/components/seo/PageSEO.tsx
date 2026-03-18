import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";

const SITE_NAME = "Zommie";
const SITE_URL  = import.meta.env.VITE_SITE_URL ?? "https://zommie.asia";
const OG_IMAGE  = `${SITE_URL}/og-image.png`;

interface Props {
  /** Page title — appended with "| Zommie". Omit for homepage. */
  title?: string;
  description?: string;
  /** Absolute path, e.g. "/login". Defaults to current origin. */
  canonical?: string;
  ogImage?: string;
  /** Prevents indexing — use for auth pages and all protected pages. */
  noIndex?: boolean;
  /** Pass a JSON-LD schema object to inject structured data. */
  jsonLd?: object | object[];
}

export function PageSEO({
  title,
  description,
  canonical,
  ogImage = OG_IMAGE,
  noIndex = false,
  jsonLd,
}: Props) {
  const { i18n } = useTranslation();

  const fullTitle = title ? `${title} | ${SITE_NAME}` : `${SITE_NAME} — Find a Match for Your Pet 🐾`;
  const canonicalUrl = canonical ? `${SITE_URL}${canonical}` : SITE_URL;
  const ogLocale = i18n.language === "vi" ? "vi_VN" : "en_US";

  return (
    <Helmet>
      {/* Language */}
      <html lang={i18n.language} />

      {/* Core */}
      <title>{fullTitle}</title>
      {description && <meta name="description" content={description} />}
      <meta name="robots" content={noIndex ? "noindex, nofollow" : "index, follow"} />
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph */}
      <meta property="og:title"       content={fullTitle} />
      <meta property="og:url"         content={canonicalUrl} />
      <meta property="og:image"       content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name"   content={SITE_NAME} />
      <meta property="og:type"        content="website" />
      <meta property="og:locale"      content={ogLocale} />
      {description && <meta property="og:description" content={description} />}

      {/* Twitter Card */}
      <meta name="twitter:card"        content="summary_large_image" />
      <meta name="twitter:title"       content={fullTitle} />
      <meta name="twitter:image"       content={ogImage} />
      {description && <meta name="twitter:description" content={description} />}

      {/* hrefLang — single-domain bilingual */}
      {!noIndex && (
        <>
          <link rel="alternate" hrefLang="en"        href={canonicalUrl} />
          <link rel="alternate" hrefLang="vi"        href={canonicalUrl} />
          <link rel="alternate" hrefLang="x-default" href={canonicalUrl} />
        </>
      )}

      {/* JSON-LD structured data */}
      {jsonLd && (
        <script type="application/ld+json">
          {JSON.stringify(Array.isArray(jsonLd) ? { "@context": "https://schema.org", "@graph": jsonLd } : jsonLd)}
        </script>
      )}
    </Helmet>
  );
}
