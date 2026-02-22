import { redirect } from '@sveltejs/kit';
import type { Handle } from '@sveltejs/kit';

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'bizaree@admin2024';

export const handle: Handle = async ({ event, resolve }) => {
    const { pathname } = event.url;

    // Protect all admin routes except /admin/login
    if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
        const session = event.cookies.get('admin_session');
        if (session !== 'authenticated') {
            throw redirect(303, '/admin/login');
        }
    }

    // Handle admin login check
    if (pathname === '/admin/login' && event.request.method === 'POST') {
        // Handled by the page action
    }

    // Expose ADMIN_PASSWORD to server-side forms
    event.locals.adminPassword = ADMIN_PASSWORD;

    return resolve(event);
};
