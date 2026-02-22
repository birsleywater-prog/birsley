import { env } from '$env/dynamic/private';

export const GET = async () => {
    const siteUrl = env.SITE_URL || 'https://bizaree.in';

    const robots = `User-agent: *
Allow: /

# Disallow admin routes
Disallow: /admin
Disallow: /admin/*

# Sitemap
Sitemap: ${siteUrl}/sitemap.xml
`;

    return new Response(robots, {
        headers: {
            'Content-Type': 'text/plain',
            'Cache-Control': 'public, max-age=3600'
        }
    });
};
