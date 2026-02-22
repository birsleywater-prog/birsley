<script lang="ts">
    import type { PageData } from "./$types";
    import { invalidateAll } from "$app/navigation";
    export let data: PageData;

    let editing: any = null;
    let showModal = false;

    async function deleteBanner(id: number) {
        if (!confirm("Are you sure?")) return;
        const res = await fetch(`/api/homepage/${id}`, { method: "DELETE" }); // reusing homepage API conceptually or we can add specific banner delete
        if (res.ok) invalidateAll();
    }

    async function save() {
        const res = await fetch("/api/homepage", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(editing),
        });
        if (res.ok) {
            showModal = false;
            editing = null;
            invalidateAll();
        }
    }

    function startNew() {
        editing = {
            title: "",
            subtitle: "",
            ctaText: "Enquire Now",
            ctaLink: "/contact",
            isActive: true,
            sortOrder: data.banners.length + 1,
        };
        showModal = true;
    }
</script>

<div class="space-y-6">
    <div class="flex items-center justify-between">
        <h2 class="text-2xl font-heading font-extrabold text-gray-900">
            Hero Banners
        </h2>
        <button on:click={startNew} class="btn-primary text-sm"
            >Add Banner</button
        >
    </div>

    <div class="grid grid-cols-1 gap-6">
        {#each data.banners as banner}
            <div
                class="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-center justify-between group"
            >
                <div class="flex gap-6 items-center">
                    <div
                        class="w-24 h-16 rounded-xl bg-gray-50 flex items-center justify-center text-2xl border border-gray-100"
                    >
                        🖼️
                    </div>
                    <div>
                        <h3 class="font-heading font-bold text-gray-900">
                            {banner.title}
                        </h3>
                        <p class="text-xs text-gray-500">{banner.subtitle}</p>
                        <div class="mt-2 flex gap-2">
                            <span
                                class="text-[10px] font-bold px-2 py-0.5 rounded {banner.isActive
                                    ? 'bg-green-50 text-green-600'
                                    : 'bg-gray-100 text-gray-400'} uppercase"
                            >
                                {banner.isActive ? "Active" : "Hidden"}
                            </span>
                            <span
                                class="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-50 text-brand-600 uppercase"
                                >Order: {banner.sortOrder}</span
                            >
                        </div>
                    </div>
                </div>
                <div class="flex gap-4">
                    <button
                        on:click={() => {
                            editing = { ...banner };
                            showModal = true;
                        }}
                        class="text-sm font-bold text-brand-600">Edit</button
                    >
                    <button
                        on:click={() => deleteBanner(banner.id)}
                        class="text-sm font-bold text-red-500">Delete</button
                    >
                </div>
            </div>
        {/each}
    </div>
</div>

{#if showModal}
    <div
        class="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
    >
        <div
            class="bg-white rounded-3xl w-full max-w-xl shadow-2xl p-8 max-h-[90vh] overflow-y-auto"
        >
            <h3 class="font-heading font-bold text-xl mb-6">Banner Editor</h3>
            <!-- Form fields... simplified for brevity, title/subtitle/cta/sort -->
            <div class="space-y-4">
                <div>
                    <label class="label" for="ban-title">Title</label>
                    <input
                        id="ban-title"
                        type="text"
                        bind:value={editing.title}
                        placeholder="Title"
                        class="w-full px-4 py-3 rounded-xl border border-gray-100 bg-gray-50 text-sm"
                    />
                </div>
                <div>
                    <label class="label" for="ban-subtitle">Subtitle</label>
                    <input
                        id="ban-subtitle"
                        type="text"
                        bind:value={editing.subtitle}
                        placeholder="Subtitle"
                        class="w-full px-4 py-3 rounded-xl border border-gray-100 bg-gray-50 text-sm"
                    />
                </div>
                <div class="grid grid-cols-2 gap-4">
                    <div>
                        <label class="label" for="ban-cta-text">CTA Text</label>
                        <input
                            id="ban-cta-text"
                            type="text"
                            bind:value={editing.ctaText}
                            placeholder="CTA Text"
                            class="w-full px-4 py-3 rounded-xl border border-gray-100 bg-gray-50 text-sm"
                        />
                    </div>
                    <div>
                        <label class="label" for="ban-cta-link">CTA Link</label>
                        <input
                            id="ban-cta-link"
                            type="text"
                            bind:value={editing.ctaLink}
                            placeholder="CTA Link"
                            class="w-full px-4 py-3 rounded-xl border border-gray-100 bg-gray-50 text-sm"
                        />
                    </div>
                </div>
                <div class="flex items-center gap-2">
                    <input
                        id="ban-active"
                        type="checkbox"
                        bind:checked={editing.isActive}
                    />
                    <label for="ban-active" class="text-sm">Is Active</label>
                </div>
            </div>
            <div class="mt-8 flex justify-end gap-3">
                <button on:click={() => (showModal = false)} class="btn-ghost"
                    >Cancel</button
                >
                <button on:click={save} class="btn-primary">Save Banner</button>
            </div>
        </div>
    </div>
{/if}
