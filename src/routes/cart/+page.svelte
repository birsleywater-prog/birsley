<script lang="ts">
    import SEOHead from "$lib/components/SEOHead.svelte";
    import { cart, cartTotal, cartCount } from "$lib/stores/cart";
</script>

<SEOHead
    title="Your Cart | Bizaree Water"
    description="Review your Bizaree water enquiry list before placing your order."
    url="/cart"
/>

<div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pb-20">
    <h1 class="font-heading font-extrabold text-3xl text-gray-900 mb-8">
        Enquiry List
    </h1>

    {#if $cartCount === 0}
        <div
            class="text-center py-20 rounded-2xl bg-gray-50 border border-dashed border-gray-200"
        >
            <div class="text-5xl mb-4">🛒</div>
            <h2 class="font-heading font-bold text-xl text-gray-700 mb-2">
                Your list is empty
            </h2>
            <p class="text-gray-500 mb-6">
                Add products to your enquiry list and we'll get back to you with
                a quote.
            </p>
            <a href="/products" class="btn-primary">Browse Products</a>
        </div>
    {:else}
        <div class="space-y-4 mb-8">
            {#each $cart as item}
                <div
                    class="bg-white rounded-xl border border-gray-100 shadow-sm p-5 flex items-center gap-5"
                >
                    <!-- Product image/icon -->
                    <div
                        class="w-16 h-16 rounded-xl bg-gradient-to-br from-water-light to-brand-100 flex items-center justify-center flex-shrink-0"
                    >
                        {#if item.image}
                            <img
                                src={item.image}
                                alt={item.name}
                                class="w-full h-full object-cover rounded-xl"
                            />
                        {:else}
                            <span class="text-2xl">💧</span>
                        {/if}
                    </div>

                    <div class="flex-1">
                        <h3 class="font-heading font-semibold text-gray-900">
                            {item.name}
                        </h3>
                        <p class="text-sm text-gray-500">
                            {item.volume} · ₹{item.price} each
                        </p>
                    </div>

                    <!-- Quantity controls -->
                    <div class="flex items-center gap-3">
                        <button
                            on:click={() =>
                                cart.updateQuantity(item.id, item.quantity - 1)}
                            class="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:border-brand-400 hover:text-brand-600 transition-colors text-base"
                            >−</button
                        >
                        <span
                            class="w-8 text-center font-semibold text-gray-900"
                            >{item.quantity}</span
                        >
                        <button
                            on:click={() =>
                                cart.updateQuantity(item.id, item.quantity + 1)}
                            class="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:border-brand-400 hover:text-brand-600 transition-colors text-base"
                            >+</button
                        >
                    </div>

                    <!-- Item total -->
                    <div class="w-24 text-right">
                        <span class="font-semibold text-gray-900"
                            >₹{(item.price * item.quantity).toFixed(0)}</span
                        >
                    </div>

                    <!-- Remove -->
                    <button
                        on:click={() => cart.removeItem(item.id)}
                        class="ml-2 p-2 text-gray-400 hover:text-red-500 transition-colors"
                        aria-label="Remove"
                    >
                        <svg
                            class="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            stroke-width="2"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>
                </div>
            {/each}
        </div>

        <!-- Summary -->
        <div class="bg-gray-50 rounded-2xl p-6 space-y-4">
            <div class="flex justify-between text-sm text-gray-500">
                <span>Subtotal ({$cartCount} items)</span>
                <span>₹{$cartTotal.toFixed(0)}</span>
            </div>
            <div class="flex justify-between text-sm text-gray-500">
                <span>Delivery</span>
                <span class="text-green-600 font-medium">To be confirmed</span>
            </div>
            <div
                class="border-t border-gray-200 pt-4 flex justify-between font-bold text-gray-900 text-lg"
            >
                <span>Estimated Total</span>
                <span>₹{$cartTotal.toFixed(0)}</span>
            </div>
        </div>

        <div class="mt-6 flex flex-col sm:flex-row gap-4 justify-end">
            <button on:click={() => cart.clearCart()} class="btn-ghost text-sm"
                >Clear List</button
            >
            <a
                href="/checkout"
                class="btn-primary px-10 py-3.5 text-base justify-center"
                >Proceed to Checkout</a
            >
        </div>
    {/if}
</div>
