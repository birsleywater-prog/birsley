import { db } from '$lib/db/index';
import { blogPosts } from '$lib/db/schema';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
    const posts = db.select().from(blogPosts).orderBy(blogPosts.publishedAt).all();
    return { posts };
};
