
import { useEffect } from 'react';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  canonical?: string;
  ogImage?: string;
}

export const useSEO = ({ title, description, keywords, canonical, ogImage }: SEOProps) => {
  useEffect(() => {
    // Update title
    document.title = title;

    // Update or create meta tags
    const updateMetaTag = (name: string, content: string, property?: boolean) => {
      const attribute = property ? 'property' : 'name';
      let meta = document.querySelector(`meta[${attribute}="${name}"]`);
      
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute(attribute, name);
        document.head.appendChild(meta);
      }
      
      meta.setAttribute('content', content);
    };

    // Update description
    updateMetaTag('description', description);
    
    // Update keywords if provided
    if (keywords) {
      updateMetaTag('keywords', keywords);
    }

    // Update Open Graph tags
    updateMetaTag('og:title', title, true);
    updateMetaTag('og:description', description, true);
    updateMetaTag('og:url', canonical || window.location.href, true);
    
    if (ogImage) {
      updateMetaTag('og:image', ogImage, true);
    }

    // Update Twitter tags
    updateMetaTag('twitter:title', title, true);
    updateMetaTag('twitter:description', description, true);
    
    if (ogImage) {
      updateMetaTag('twitter:image', ogImage, true);
    }

    // Update canonical URL
    if (canonical) {
      let canonicalLink = document.querySelector('link[rel="canonical"]');
      if (!canonicalLink) {
        canonicalLink = document.createElement('link');
        canonicalLink.setAttribute('rel', 'canonical');
        document.head.appendChild(canonicalLink);
      }
      canonicalLink.setAttribute('href', canonical);
    }

    // Cleanup function
    return () => {
      // Reset to default title when component unmounts
      document.title = 'RHIA Copilot - AI-Powered HR Recruitment Platform';
    };
  }, [title, description, keywords, canonical, ogImage]);
};
