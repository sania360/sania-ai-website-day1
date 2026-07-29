import { useEffect } from "react";

interface SEOOptions {
  title: string;
  description: string;
  image?: string;
}

const SITE_NAME = "Sania Ismail | AI, Machine Learning & Data Analytics Solutions";
const SITE_URL = "https://saniaismail.com"; // update once deployed

function setMeta(name: string, content: string, property = false) {
  const attr = property ? "property" : "name";
  let tag = document.querySelector(`meta[${attr}="${name}"]`);
  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute(attr, name);
    document.head.appendChild(tag);
  }
  tag.setAttribute("content", content);
}

function setCanonical(href: string) {
  let link = document.querySelector('link[rel="canonical"]');
  if (!link) {
    link = document.createElement("link");
    link.setAttribute("rel", "canonical");
    document.head.appendChild(link);
  }
  link.setAttribute("href", href);
}

/** Sets document title + description + OpenGraph/Twitter tags + canonical URL for the current page. */
export function useSEO({ title, description, image }: SEOOptions) {
  useEffect(() => {
    const fullTitle = title ? `${title} | ${SITE_NAME}` : SITE_NAME;
    document.title = fullTitle;

    setMeta("description", description);
    setMeta("og:title", fullTitle, true);
    setMeta("og:description", description, true);
    setMeta("og:type", "website", true);
    setMeta("og:url", `${SITE_URL}${window.location.pathname}`, true);
    setMeta("twitter:card", "summary_large_image");
    setMeta("twitter:title", fullTitle);
    setMeta("twitter:description", description);

    if (image) {
      setMeta("og:image", image, true);
      setMeta("twitter:image", image);
    }

    setCanonical(`${SITE_URL}${window.location.pathname}`);
  }, [title, description, image]);
}
