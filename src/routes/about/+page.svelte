<script lang="ts">
    import SEOHead from "$lib/components/SEOHead.svelte";
</script>

<SEOHead
    title="About Bizaree | West Bengal's First Automated Water Plant"
    description="Learn about Bizaree — West Bengal's pioneer automated packaged drinking water plant with 25+ years of industry experience and BIS certified products."
    url="/about"
/>

<div class="pb-20">
    <!-- Hero -->
    <div class="bg-gradient-to-br from-brand-900 to-brand-700 py-24 text-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="max-w-2xl">
                <p
                    class="text-xs font-semibold tracking-widest text-brand-200 uppercase mb-4"
                >
                    About Bizaree
                </p>
                <h1
                    class="font-heading font-extrabold text-4xl md:text-5xl mb-6 leading-tight"
                >
                    West Bengal's First Automated Water Plant
                </h1>
                <p class="text-brand-100 text-lg leading-relaxed">
                    We are committed to providing the best packaged drinking
                    water with industry experience of more than 25 years.
                </p>
            </div>
        </div>
    </div>

    <!-- Our story -->
    <section class="py-20">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <div class="aos-left">
                    <div
                        class="h-80 bg-gradient-to-br from-water-light via-brand-100 to-brand-200 rounded-3xl flex items-center justify-center"
                    >
                        <div class="text-center">
                            <div class="text-8xl mb-4">🏭</div>
                            <p class="text-brand-700 font-semibold">
                                Automated Plant
                            </p>
                        </div>
                    </div>
                </div>
                <div class="aos">
                    <p
                        class="text-xs font-semibold tracking-widest text-brand-500 uppercase mb-3"
                    >
                        Our Story
                    </p>
                    <h2 class="section-heading mb-6">
                        Pure Water, Pure Commitment
                    </h2>
                    <p class="text-gray-500 leading-relaxed mb-4">
                        Bizaree was founded with a singular mission — to bring
                        the highest quality packaged drinking water to homes and
                        businesses across West Bengal. As the state's first
                        fully automated water plant, we combine advanced
                        technology with rigorous quality control.
                    </p>
                    <p class="text-gray-500 leading-relaxed mb-6">
                        With over 25 years of industry experience, our team
                        understands the importance of pure, safe drinking water.
                        Every bottle that leaves our facility undergoes
                        triple-stage purification and strict quality checks.
                    </p>
                    <a href="/contact" class="btn-primary">Get in Touch</a>
                </div>
            </div>
        </div>
    </section>

    <!-- Stats -->
    <section class="py-16 bg-gray-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                {#each [["25+", "Years Experience"], ["6+", "Product Sizes"], ["100%", "BIS Certified"], ["24/7", "Working Hours"]] as [num, label]}
                    <div class="aos">
                        <div
                            class="text-4xl font-extrabold font-heading text-brand-600 mb-2"
                        >
                            {num}
                        </div>
                        <div class="text-sm text-gray-500">{label}</div>
                    </div>
                {/each}
            </div>
        </div>
    </section>

    <!-- Practices section -->
    <section class="py-20">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center mb-14 aos">
                <p
                    class="text-xs font-semibold tracking-widest text-brand-500 uppercase mb-3"
                >
                    Our Practices
                </p>
                <h2 class="section-heading">Quality at Every Step</h2>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                {#each [{ icon: "🔬", title: "Triple-Stage Purification", desc: "Our water undergoes RO, UV, and UF treatment to ensure absolute purity and safety." }, { icon: "🏅", title: "BIS IS 14543 Certified", desc: "We comply fully with the Bureau of Indian Standards for packaged drinking water quality." }, { icon: "♻️", title: "Eco-Friendly Packaging", desc: "All our bottles use food-grade recyclable PET material — safe for you and the environment." }] as practice}
                    <div
                        class="aos p-8 rounded-2xl border border-gray-100 hover:shadow-lg transition-all"
                    >
                        <div class="text-4xl mb-4">{practice.icon}</div>
                        <h3 class="font-heading font-bold text-gray-900 mb-2">
                            {practice.title}
                        </h3>
                        <p class="text-sm text-gray-500 leading-relaxed">
                            {practice.desc}
                        </p>
                    </div>
                {/each}
            </div>
        </div>
    </section>
</div>
