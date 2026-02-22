import { db } from '$lib/db/index';
import { products, categories, orders, blogPosts, contacts } from '$lib/db/schema';
import { count } from 'drizzle-orm';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
    const [productCount] = await db.select({ value: count() }).from(products);
    const [categoryCount] = await db.select({ value: count() }).from(categories);
    const [orderCount] = await db.select({ value: count() }).from(orders);
    const [blogCount] = await db.select({ value: count() }).from(blogPosts);

    const recentOrders = await db.select().from(orders).orderBy(orders.createdAt).limit(5);
    const recentContacts = await db.select().from(contacts).orderBy(contacts.createdAt).limit(5);

    return {
        stats: {
            products: productCount.value,
            categories: categoryCount.value,
            orders: orderCount.value,
            blog: blogCount.value
        },
        recentOrders,
        recentContacts
    };
};
