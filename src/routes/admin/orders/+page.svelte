<script lang="ts">
    import type { PageData } from "./$types";
    export let data: PageData;
</script>

<div class="space-y-6">
    <h2 class="text-2xl font-heading font-extrabold text-gray-900">
        Orders / Enquiries
    </h2>

    <div
        class="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden"
    >
        <table class="w-full text-left">
            <thead>
                <tr
                    class="bg-gray-50 text-[10px] font-bold text-gray-400 uppercase tracking-widest"
                >
                    <th class="px-6 py-4">Customer</th>
                    <th class="px-6 py-4">Contact</th>
                    <th class="px-6 py-4">Items</th>
                    <th class="px-6 py-4">Total</th>
                    <th class="px-6 py-4">Status</th>
                </tr>
            </thead>
            <tbody class="divide-y divide-gray-50">
                {#each data.orders as order}
                    <tr class="hover:bg-gray-50 transition-colors">
                        <td class="px-6 py-4">
                            <div class="text-sm font-semibold text-gray-900">
                                {order.customerName}
                            </div>
                            <div class="text-[10px] text-gray-400">
                                {order.createdAt}
                            </div>
                        </td>
                        <td class="px-6 py-4 text-xs">
                            <div class="text-gray-700">{order.email}</div>
                            <div class="text-gray-400">{order.phone ?? ""}</div>
                        </td>
                        <td class="px-6 py-4 text-xs text-gray-500">
                            <div
                                class="max-w-[150px] truncate"
                                title={order.itemsJson}
                            >
                                Items list...
                            </div>
                        </td>
                        <td class="px-6 py-4 text-sm font-bold text-gray-900"
                            >₹{(order.total ?? 0).toFixed(0)}</td
                        >
                        <td class="px-6 py-4">
                            <span
                                class="inline-flex px-2 py-0.5 rounded text-[10px] font-bold bg-orange-50 text-orange-600 uppercase"
                            >
                                {order.status}
                            </span>
                        </td>
                    </tr>
                {/each}
            </tbody>
        </table>
    </div>
</div>
