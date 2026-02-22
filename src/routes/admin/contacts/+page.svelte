<script lang="ts">
    import type { PageData } from "./$types";
    export let data: PageData;
</script>

<div class="space-y-6">
    <h2 class="text-2xl font-heading font-extrabold text-gray-900">
        Contact Leads
    </h2>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        {#each data.contacts as lead}
            <div
                class="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4"
            >
                <div class="flex items-center justify-between">
                    <h3 class="font-heading font-bold text-gray-900">
                        {lead.name}
                    </h3>
                    <span class="text-[10px] text-gray-400"
                        >{lead.createdAt}</span
                    >
                </div>
                <div class="text-xs text-gray-500 space-y-1">
                    <p>
                        ✉️ <a
                            href="mailto:{lead.email}"
                            class="text-brand-600 hover:underline"
                            >{lead.email}</a
                        >
                    </p>
                    {#if lead.phone}<p>📞 {lead.phone}</p>{/if}
                </div>
                <div
                    class="p-4 bg-gray-50 rounded-xl text-sm italic text-gray-600 leading-relaxed"
                >
                    "{lead.message}"
                </div>
            </div>
        {/each}
    </div>
</div>
