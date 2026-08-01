import { faqItems, services, siteDescription, siteUrl } from '@/content/site';

export function StructuredData() {
  const organization = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${siteUrl}/#organization`,
    name: '9 Muse Customs',
    url: siteUrl,
    logo: `${siteUrl}/Imgs/9muse-logo-badge.png`,
    description: siteDescription,
    areaServed: [
      { '@type': 'State', name: 'New York' },
      { '@type': 'State', name: 'New Jersey' },
      { '@type': 'State', name: 'Pennsylvania' },
      { '@type': 'Country', name: 'United States' },
    ],
  };

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: '9 Muse Customs services',
    itemListElement: services.map((service, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Service',
        name: service.eyebrow,
        description: service.paragraphs.join(' '),
        provider: {
          '@id': `${siteUrl}/#organization`,
        },
        areaServed: ['New York', 'New Jersey', 'Pennsylvania', 'United States'],
        url: `${siteUrl}/#${service.id}`,
      },
    })),
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  return (
    <>
      {[organization, serviceSchema, faqSchema].map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema).replaceAll('<', '\\u003c'),
          }}
        />
      ))}
    </>
  );
}

