import { json } from '@sveltejs/kit';
import { db } from '$lib/db/index';
import { orders } from '$lib/db/schema';
import { eq } from 'drizzle-orm';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async () => {
    return json(db.select().from(orders).orderBy(orders.createdAt).all());
};
export const POST: RequestHandler = async ({ request }) => {
    const body = await request.json();
    const result = db.insert(orders).values(body).returning().get();
    return json(result, { status: 201 });
};
