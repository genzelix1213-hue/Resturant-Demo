import React, { useEffect } from 'react';
import { useApp } from '../context/AppContext';

interface SeoHeadProps {
  title?: string;
  description?: string;
}

export const SeoHead: React.FC<SeoHeadProps> = ({ title, description }) => {
  const { config } = useApp();

  const pageTitle = title
    ? `${title} | ${config.name}`
    : `${config.name} | Fine Dining, BBQ & Pakistani Cuisine in ${config.city}`;

  const metaDesc =
    description ||
    `${config.name} - ${config.tagline}. Authentic ${config.cuisine} located at ${config.address}. Order online or reserve a table today.`;

  useEffect(() => {
    document.title = pageTitle;

    // Set meta description
    let metaDescTag = document.querySelector('meta[name="description"]');
    if (!metaDescTag) {
      metaDescTag = document.createElement('meta');
      metaDescTag.setAttribute('name', 'description');
      document.head.appendChild(metaDescTag);
    }
    metaDescTag.setAttribute('content', metaDesc);

    // OpenGraph Title & Description
    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (!ogTitle) {
      ogTitle = document.createElement('meta');
      ogTitle.setAttribute('property', 'og:title');
      document.head.appendChild(ogTitle);
    }
    ogTitle.setAttribute('content', pageTitle);

    let ogDesc = document.querySelector('meta[property="og:description"]');
    if (!ogDesc) {
      ogDesc = document.createElement('meta');
      ogDesc.setAttribute('property', 'og:description');
      document.head.appendChild(ogDesc);
    }
    ogDesc.setAttribute('content', metaDesc);

    // JSON-LD Schema Markup
    const schemaData = {
      "@context": "https://schema.org",
      "@type": "Restaurant",
      "name": config.name,
      "image": "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=1200",
      "telephone": config.phone,
      "email": config.email,
      "address": {
        "@type": "PostalAddress",
        "streetAddress": config.address,
        "addressLocality": config.city,
        "addressCountry": "PK"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 31.5204,
        "longitude": 74.3587
      },
      "url": window.location.origin,
      "servesCuisine": config.cuisine,
      "priceRange": "$$",
      "openingHoursSpecification": [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday"],
          "opens": "12:00",
          "closes": "23:00"
        },
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Friday", "Saturday", "Sunday"],
          "opens": "12:00",
          "closes": "00:30"
        }
      ],
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": config.rating,
        "reviewCount": config.totalReviews
      }
    };

    let scriptTag = document.getElementById('restaurant-schema-json');
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.id = 'restaurant-schema-json';
      scriptTag.setAttribute('type', 'application/ld+json');
      document.head.appendChild(scriptTag);
    }
    scriptTag.textContent = JSON.stringify(schemaData);

  }, [pageTitle, metaDesc, config]);

  return null;
};
