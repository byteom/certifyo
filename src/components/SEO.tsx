import Head from 'next/head';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string[];
  canonicalUrl?: string;
  ogImage?: string;
  ogType?: string;
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  twitterCard?: string;
  twitterSite?: string;
  twitterCreator?: string;
  jsonLd?: any;
}

export default function SEO({
  title,
  description,
  keywords = [
    'certification',
    'online exams',
    'professional development',
    'learning platform',
    'skills verification',
    'DSA',
    'coding challenges',
    'internships'
  ],
  canonicalUrl = 'https://certifyo.tech',
  ogImage = 'https://certifyo.tech/certifyoLogo.PNG',
  ogType = 'website',
  author = 'Certifyo',
  publishedTime,
  modifiedTime = new Date().toISOString(),
  twitterCard = 'summary_large_image',
  twitterSite = '@certifyo',
  twitterCreator = '@certifyo',
  jsonLd
}: SEOProps) {
  const siteTitle = `${title} | Certifyo - Professional Certification Platform`;
  
  const defaultJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Certifyo',
    url: canonicalUrl,
    description,
    author: {
      '@type': 'Organization',
      name: 'Certifyo',
      logo: {
        '@type': 'ImageObject',
        url: 'https://certifyo.tech/certifyoLogo.PNG'
      }
    },
    publisher: {
      '@type': 'Organization',
      name: 'Certifyo',
      logo: {
        '@type': 'ImageObject',
        url: 'https://certifyo.tech/certifyoLogo.PNG'
      }
    }
  };

  return (
    <Head>
      {/* Basic Meta */}
      <title>{siteTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords.join(', ')} />
      <meta name="author" content={author} />
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph */}
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content="Certifyo" />
      {publishedTime && <meta property="article:published_time" content={publishedTime} />}
      <meta property="article:modified_time" content={modifiedTime} />
      <meta property="og:locale" content="en_US" />

      {/* Twitter Card */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:site" content={twitterSite} />
      <meta name="twitter:title" content={siteTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* Mobile Meta */}
      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
      <meta name="theme-color" content="#4F46E5" />

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd || defaultJsonLd),
        }}
      />

      {/* Preconnect */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

      {/* Alternate Language */}
      <link rel="alternate" href="https://certifyo.tech" hrefLang="x-default" />
      <link rel="alternate" href="https://certifyo.tech" hrefLang="en" />
    </Head>
  );
}
