import { db } from '$lib/db/index';
import { products } from '$lib/db/schema';
import { eq } from 'drizzle-orm';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
    const product = db.select().from(products).where(eq(products.slug, params.slug)).get();
    if (!product) throw error(404, 'Product not found');

    // Get related products (same category, excluding current)
    const related = product.categoryId
        ? db.select().from(products)
            .where(eq(products.categoryId, product.categoryId))
            .limit(4)
            .all()
            .filter(p => p.id !== product.id)
        : [];

    return { product, related };
};
