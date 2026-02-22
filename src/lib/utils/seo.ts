export interface SEOConfig {
    title: string;
    description: string;
    image?: string;
    url?: string;
    type?: 'website' | 'article' | 'product';
    keywords?: string;
    noindex?: boolean;
}

const SITE_NAME = 'Bizaree Water';
const SITE_URL = 'https://bizaree.in';
const DEFAULT_IMAGE = '/images/og-default.jpg';

export function buildSEO(config: SEOConfig) {
    const title = config.title.includes(SITE_NAME)
        ? config.title
        : `${config.title} | ${SITE_NAME}`;
    const description = config.description;
    const image = config.image || DEFAULT_IMAGE;
    const url = config.url ? `${SITE_URL}${config.url}` : SITE_URL;
    const type = config.type || 'website';

    return { title, description, image, url, type, keywords: config.keywords };
}

export function buildProductJsonLd(product: {
    name: string;
    description?: string | null;
    image?: string | null;
    price?: number | null;
    slug: string;
}) {
    return {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: product.name,
        description: product.description,
        image: product.image ? `${SITE_URL}${product.image}` : undefined,
        url: `${SITE_URL}/products/${product.slug}`,
        brand: {
            '@type': 'Brand',
            name: SITE_NAME
        },
        offers: product.price
            ? {
                '@type': 'Offer',
                price: product.price,
                priceCurrency: 'INR',
                availability: 'https://schema.org/InStock',
                url: `${SITE_URL}/products/${product.slug}`
            }
            : undefined
    };
}

export const organizationJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/images/logo.png`,
    contactPoint: {
        '@type': 'ContactPoint',
        telephone: '+91-9748887899',
        contactType: 'customer service',
        availableLanguage: ['English', 'Hindi', 'Bengali']
    },
    sameAs: [
        'https://www.facebook.com/share/7QhKgNDS4nxnS2vU',
        'https://www.instagram.com/bizareewater/',
        'https://www.youtube.com/channel/UCW4uj0kb61H2nKQP7H-FZCw'
    ]
};

export function buildBlogJsonLd(post: {
    title: string;
    excerpt?: string | null;
    image?: string | null;
    slug: string;
    publishedAt?: string | null;
}) {
    return {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: post.title,
        description: post.excerpt,
        image: post.image ? `${SITE_URL}${post.image}` : undefined,
        url: `${SITE_URL}/blog/${post.slug}`,
        datePublished: post.publishedAt,
        author: {
            '@type': 'Organization',
            name: SITE_NAME
        },
        publisher: {
            '@type': 'Organization',
            name: SITE_NAME,
            logo: {
                '@type': 'ImageObject',
                url: `${SITE_URL}/images/logo.png`
            }
        }
    };
}
