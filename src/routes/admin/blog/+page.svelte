<script lang="ts">
    import type { PageData } from "./$types";
    import { invalidateAll } from "$app/navigation";
    export let data: PageData;

    let editing: any = null;
    let showModal = false;

    async function save() {
        // simplified: just a placeholder for the logic as blog CRUD logic is similar to products
        const res = await fetch("/api/blog", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(editing),
        });
        if (res.ok) {
            showModal = false;
            invalidateAll();
        }
    }
</script>

<div class="space-y-6">
    <div class="flex items-center justify-between">
        <h2 class="text-2xl font-heading font-extrabold text-gray-900">
            Blog Posts
        </h2>
        <button
            on:click={() => {
                editing = { title: "", slug: "", excerpt: "", content: "" };
                showModal = true;
            }}
            class="btn-primary text-sm">New Post</button
        >
    </div>

    <div class="grid grid-cols-1 gap-4">
        {#each data.posts as post}
            <div
                class="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between"
            >
                <div>
                    <h3 class="font-heading font-bold text-gray-900">
                        {post.title}
                    </h3>
                    <p class="text-xs text-gray-400">{post.publishedAt}</p>
                </div>
                <div class="flex gap-4">
                    <button class="text-sm font-bold text-brand-600"
                        >Edit</button
                    >
                    <button class="text-sm font-bold text-red-500"
                        >Delete</button
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
            class="bg-white rounded-3xl w-full max-w-2xl shadow-2xl p-8 overflow-y-auto max-h-[90vh]"
        >
            <h3 class="font-heading font-bold text-xl mb-6">Post Editor</h3>
            <!-- Editor UI... title/slug/excerpt/content -->
            <div class="space-y-4">
                <input
                    type="text"
                    bind:value={editing.title}
                    placeholder="Post Title"
                    class="w-full px-4 py-3 rounded-xl border border-gray-100 bg-gray-50"
                />
                <textarea
                    bind:value={editing.content}
                    placeholder="Post content (HTML)..."
                    class="w-full px-4 py-3 rounded-xl border border-gray-100 bg-gray-50 h-64"
                ></textarea>
            </div>
            <div class="mt-8 flex justify-end gap-3">
                <button on:click={() => (showModal = false)} class="btn-ghost"
                    >Cancel</button
                >
                <button on:click={save} class="btn-primary">Save Post</button>
            </div>
        </div>
    </div>
{/if}
