<script lang="ts">
    import type { PageData } from "./$types";
    import { invalidateAll } from "$app/navigation";

    export let data: PageData;

    let currentFilter: "all" | "pending" | "dispatched" | "fulfilled" | "spam" =
        "all";

    $: filteredOrders =
        currentFilter === "all"
            ? data.orders
            : data.orders.filter((o) => o.status === currentFilter);

    async function updateStatus(id: number, status: string) {
        if (!confirm(`Mark this order as ${status}?`)) return;

        try {
            const res = await fetch("/api/orders", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id, status }),
            });

            if (res.ok) {
                await invalidateAll();
            } else {
                alert("Failed to update status");
            }
        } catch (err) {
            console.error(err);
            alert("Error updating status");
        }
    }

    const filters = [
        { id: "all", label: "All Orders" },
        { id: "pending", label: "Pending" },
        { id: "dispatched", label: "Dispatched" },
        { id: "fulfilled", label: "Fulfilled" },
        { id: "spam", label: "Spam" },
    ] as const;
</script>

<div class="space-y-6">
    <div
        class="flex flex-col md:flex-row md:items-center justify-between gap-4"
    >
        <h2 class="text-2xl font-heading font-extrabold text-gray-900">
            Orders / Enquiries
        </h2>

        <div class="flex p-1 bg-gray-100 rounded-xl w-fit">
            {#each filters as filter}
                <button
                    class="px-4 py-1.5 text-xs font-bold rounded-lg transition-all {currentFilter ===
                    filter.id
                        ? 'bg-white text-brand-600 shadow-sm'
                        : 'text-gray-500 hover:text-gray-700'}"
                    on:click={() => (currentFilter = filter.id)}
                >
                    {filter.label}
                    <span class="ml-1 opacity-50">
                        ({filter.id === "all"
                            ? data.orders.length
                            : data.orders.filter((o) => o.status === filter.id)
                                  .length})
                    </span>
                </button>
            {/each}
        </div>
    </div>

    <div
        class="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-x-auto"
    >
        <table class="w-full text-left">
            <thead>
                <tr
                    class="bg-gray-50 text-[10px] font-bold text-gray-400 uppercase tracking-widest"
                >
                    <th class="px-6 py-4">Customer</th>
                    <th class="px-6 py-4">Contact</th>
                    <th class="px-6 py-4">Items</th>
                    <th class="px-6 py-4">Amount</th>
                    <th class="px-6 py-4 text-center">Actions</th>
                </tr>
            </thead>
            <tbody class="divide-y divide-gray-50">
                {#each filteredOrders as order}
                    <tr class="hover:bg-gray-50 transition-colors">
                        <td class="px-6 py-4">
                            <div class="flex items-center gap-2">
                                <div
                                    class="text-sm font-semibold text-gray-900"
                                >
                                    {order.customerName}
                                </div>
                                <span
                                    class="px-1.5 py-0.5 rounded text-[8px] font-bold uppercase {order.status ===
                                    'fulfilled'
                                        ? 'bg-green-50 text-green-600'
                                        : order.status === 'dispatched'
                                          ? 'bg-blue-50 text-blue-600'
                                          : order.status === 'spam'
                                            ? 'bg-gray-100 text-gray-500'
                                            : 'bg-orange-50 text-orange-600'}"
                                >
                                    {order.status}
                                </span>
                            </div>
                            <div class="text-[10px] text-gray-400">
                                {order.createdAt
                                    ? new Date(
                                          order.createdAt,
                                      ).toLocaleDateString("en-IN", {
                                          day: "numeric",
                                          month: "short",
                                          year: "numeric",
                                          hour: "2-digit",
                                          minute: "2-digit",
                                      })
                                    : "Recently"}
                            </div>
                        </td>
                        <td class="px-6 py-4 text-xs">
                            <div class="text-gray-700">{order.email}</div>
                            <div class="text-gray-400">{order.phone ?? ""}</div>
                        </td>
                        <td class="px-6 py-4 text-xs text-gray-500">
                            <div class="space-y-1">
                                {#each JSON.parse(order.itemsJson) as item}
                                    <div class="flex items-center gap-1.5">
                                        <span
                                            class="font-semibold text-gray-700"
                                            >{item.name}</span
                                        >
                                        {#if item.volume}
                                            <span
                                                class="text-[10px] text-gray-400"
                                                >({item.volume})</span
                                            >
                                        {/if}
                                        <span class="text-brand-600 font-bold"
                                            >x{item.quantity}</span
                                        >
                                    </div>
                                {/each}
                            </div>
                        </td>
                        <td class="px-6 py-4 text-sm font-bold text-gray-900">
                            ₹{(order.total ?? 0).toFixed(0)}
                        </td>
                        <td class="px-6 py-4">
                            <div class="flex items-center justify-center gap-2">
                                {#if order.status === "pending"}
                                    <button
                                        on:click={() =>
                                            updateStatus(
                                                order.id,
                                                "dispatched",
                                            )}
                                        class="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                        title="Mark as Dispatched"
                                    >
                                        🚚
                                    </button>
                                {/if}
                                {#if order.status !== "fulfilled"}
                                    <button
                                        on:click={() =>
                                            updateStatus(order.id, "fulfilled")}
                                        class="p-1.5 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                                        title="Mark as Fulfilled"
                                    >
                                        ✅
                                    </button>
                                {/if}
                                {#if order.status !== "spam"}
                                    <button
                                        on:click={() =>
                                            updateStatus(order.id, "spam")}
                                        class="p-1.5 text-gray-400 hover:bg-gray-100 rounded-lg transition-colors"
                                        title="Mark as Spam"
                                    >
                                        🚫
                                    </button>
                                {/if}
                                {#if order.status !== "pending"}
                                    <button
                                        on:click={() =>
                                            updateStatus(order.id, "pending")}
                                        class="p-1.5 text-orange-600 hover:bg-orange-50 rounded-lg transition-colors"
                                        title="Mark as Pending"
                                    >
                                        ⏳
                                    </button>
                                {/if}
                            </div>
                        </td>
                    </tr>
                {:else}
                    <tr>
                        <td colspan="5" class="px-6 py-12 text-center">
                            <div class="text-gray-400 text-sm">
                                No {currentFilter !== "all"
                                    ? currentFilter
                                    : ""} orders found.
                            </div>
                        </td>
                    </tr>
                {/each}
            </tbody>
        </table>
    </div>
</div>
