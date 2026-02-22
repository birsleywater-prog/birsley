import { db } from '$lib/db/index';
import { categories, products } from '$lib/db/schema';
import { eq } from 'drizzle-orm';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
    const allCategories = db.select().from(categories).all();
    return { categories: allCategories };
};
