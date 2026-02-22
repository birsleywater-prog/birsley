<script lang="ts">
    import { page } from "$app/stores";
</script>

<div class="min-h-screen bg-gray-50 flex">
    <!-- Admin Sidebar -->
    <aside
        class="w-64 bg-white border-r border-gray-100 flex flex-col hidden md:flex"
    >
        <div class="p-6">
            <div class="flex items-center gap-3">
                <span class="text-2xl">💧</span>
                <span
                    class="font-heading font-bold text-xl tracking-tight text-gray-900"
                    >Bizaree Admin</span
                >
            </div>
        </div>

        <nav class="flex-1 px-4 space-y-1 mt-4">
            {#each [{ label: "Dashboard", path: "/admin", icon: "📊" }, { label: "Products", path: "/admin/products", icon: "🛒" }, { label: "Categories", path: "/admin/categories", icon: "📁" }, { label: "Banners", path: "/admin/banners", icon: "🖼️" }, { label: "Blog Posts", path: "/admin/blog", icon: "📰" }, { label: "Orders", path: "/admin/orders", icon: "📦" }, { label: "Contact Leades", path: "/admin/contacts", icon: "✉️" }] as item}
                <a
                    href={item.path}
                    class="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors {$page
                        .url.pathname === item.path
                        ? 'bg-brand-50 text-brand-600'
                        : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'}"
                >
                    <span>{item.icon}</span>
                    {item.label}
                </a>
            {/each}
        </nav>

        <div class="p-4 border-t border-gray-50">
            <form action="/admin/logout" method="POST">
                <button
                    type="submit"
                    class="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 transition-colors text-left"
                >
                    <span>🚪</span>
                    Logout
                </button>
            </form>
        </div>
    </aside>

    <!-- Main Content -->
    <div class="flex-1 flex flex-col min-w-0">
        <!-- Header -->
        <header
            class="h-16 bg-white border-b border-gray-100 flex items-center justify-between px-8"
        >
            <h2 class="font-heading font-bold text-gray-900">
                Manage {$page.url.pathname
                    .split("/")
                    .pop()
                    ?.replace(/^\w/, (c) => c.toUpperCase()) || "Dashboard"}
            </h2>
            <div class="flex items-center gap-4">
                <div class="text-right">
                    <div class="text-xs font-semibold text-gray-900">
                        Administrator
                    </div>
                    <div class="text-[10px] text-gray-400">Online</div>
                </div>
                <div
                    class="w-8 h-8 rounded-full bg-brand-100 flex items-center justify-center text-xs font-bold text-brand-600"
                >
                    A
                </div>
            </div>
        </header>

        <main class="flex-1 overflow-y-auto p-8">
            <slot />
        </main>
    </div>
</div>
