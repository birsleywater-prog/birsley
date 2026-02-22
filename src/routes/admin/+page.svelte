<script lang="ts">
    import type { PageData } from "./$types";
    export let data: PageData;
</script>

<div class="space-y-8 animate-in fade-in duration-500">
    <!-- Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {#each [{ label: "Total Products", value: data.stats.products, color: "text-blue-600", bg: "bg-blue-50", icon: "🛒" }, { label: "Active Categories", value: data.stats.categories, color: "text-purple-600", bg: "bg-purple-50", icon: "📁" }, { label: "New Orders", value: data.stats.orders, color: "text-green-600", bg: "bg-green-50", icon: "📦" }, { label: "Blog Posts", value: data.stats.blog, color: "text-orange-600", bg: "bg-orange-50", icon: "📰" }] as stat}
            <div
                class="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between"
            >
                <div>
                    <p
                        class="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1"
                    >
                        {stat.label}
                    </p>
                    <p class="text-3xl font-extrabold text-gray-900">
                        {stat.value}
                    </p>
                </div>
                <div
                    class="w-12 h-12 rounded-xl {stat.bg} {stat.color} flex items-center justify-center text-xl"
                >
                    {stat.icon}
                </div>
            </div>
        {/each}
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <!-- Recent Orders -->
        <div
            class="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden"
        >
            <div
                class="p-6 border-b border-gray-50 flex items-center justify-between"
            >
                <h3 class="font-heading font-bold text-gray-900">
                    Recent Order Enquiries
                </h3>
                <a
                    href="/admin/orders"
                    class="text-xs font-semibold text-brand-600 hover:underline"
                    >View All</a
                >
            </div>
            <div class="overflow-x-auto">
                {#if data.recentOrders.length === 0}
                    <div class="p-8 text-center text-gray-400 text-sm italic">
                        No orders yet.
                    </div>
                {:else}
                    <table class="w-full text-left">
                        <thead>
                            <tr
                                class="bg-gray-50 text-[10px] font-bold text-gray-400 uppercase tracking-widest"
                            >
                                <th class="px-6 py-3">Customer</th>
                                <th class="px-6 py-3">Total</th>
                                <th class="px-6 py-3">Status</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-gray-50">
                            {#each data.recentOrders as order}
                                <tr>
                                    <td class="px-6 py-4">
                                        <div
                                            class="text-sm font-semibold text-gray-900"
                                        >
                                            {order.customerName}
                                        </div>
                                        <div class="text-xs text-gray-400">
                                            {order.createdAt}
                                        </div>
                                    </td>
                                    <td class="px-6 py-4 text-sm text-gray-700"
                                        >₹{(order.total ?? 0).toFixed(0)}</td
                                    >
                                    <td class="px-6 py-4">
                                        <span
                                            class="inline-flex px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-orange-50 text-orange-600"
                                        >
                                            {order.status}
                                        </span>
                                    </td>
                                </tr>
                            {/each}
                        </tbody>
                    </table>
                {/if}
            </div>
        </div>

        <!-- Recent Contacts -->
        <div
            class="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden"
        >
            <div
                class="p-6 border-b border-gray-50 flex items-center justify-between"
            >
                <h3 class="font-heading font-bold text-gray-900">
                    Recent Contact Messages
                </h3>
                <a
                    href="/admin/contacts"
                    class="text-xs font-semibold text-brand-600 hover:underline"
                    >View All</a
                >
            </div>
            <div class="p-6 space-y-4">
                {#if data.recentContacts.length === 0}
                    <div class="text-center text-gray-400 text-sm italic">
                        No messages yet.
                    </div>
                {:else}
                    {#each data.recentContacts as contact}
                        <div
                            class="flex gap-4 p-4 rounded-xl bg-gray-50 border border-gray-100"
                        >
                            <div
                                class="w-10 h-10 rounded-full bg-brand-100 flex items-center justify-center text-brand-600 font-bold shrink-0"
                            >
                                {contact.name.charAt(0)}
                            </div>
                            <div>
                                <p
                                    class="text-sm font-semibold text-gray-900 mb-0.5"
                                >
                                    {contact.name}
                                </p>
                                <p
                                    class="text-xs text-gray-500 line-clamp-1 mb-2"
                                >
                                    {contact.message}
                                </p>
                                <div
                                    class="flex items-center gap-2 text-[10px] text-gray-400"
                                >
                                    <span>✉️ {contact.email}</span>
                                    <span>📅 {contact.createdAt}</span>
                                </div>
                            </div>
                        </div>
                    {/each}
                {/if}
            </div>
        </div>
    </div>
</div>
