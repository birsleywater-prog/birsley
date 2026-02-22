import { db } from '$lib/db/index';
import { orders } from '$lib/db/schema';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
    const all = await db.select().from(orders).orderBy(orders.createdAt);
    return { orders: all };
};
