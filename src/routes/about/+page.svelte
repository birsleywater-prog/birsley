<script lang="ts">
    import SEOHead from "$lib/components/SEOHead.svelte";
    import { env } from "$env/dynamic/public";
    const { PUBLIC_APP_NAME } = env;
    import type { PageData } from "./$types";
    export let data: PageData;
    $: about = data.aboutSettings;
</script>

<SEOHead
    title="About {PUBLIC_APP_NAME} | West Bengal's First Automated Water Plant"
    description="Learn about {PUBLIC_APP_NAME} — West Bengal's pioneer automated packaged drinking water plant with 12+ years of industry experience and Fassai certified products."
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
                    About {PUBLIC_APP_NAME}
                </p>
                <h1
                    class="font-heading font-extrabold text-4xl md:text-5xl mb-6 leading-tight"
                >
                    {about.about_hero_title}
                </h1>
                <p class="text-brand-100 text-lg leading-relaxed">
                    {about.about_hero_description}
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
                        class="h-80 bg-gradient-to-br from-water-light via-brand-100 to-brand-200 rounded-3xl flex items-center justify-center overflow-hidden"
                    >
                        {#if about.about_image}
                            <img
                                src={about.about_image}
                                alt="Automated Plant"
                                class="w-full h-full object-cover"
                            />
                        {:else}
                            <div class="text-center">
                                <div class="text-8xl mb-4">🏭</div>
                                <p class="text-brand-700 font-semibold">
                                    Automated Plant
                                </p>
                            </div>
                        {/if}
                    </div>
                </div>
                <div class="aos">
                    <p
                        class="text-xs font-semibold tracking-widest text-brand-500 uppercase mb-3"
                    >
                        Our Story
                    </p>
                    <h2 class="section-heading mb-6">
                        {about.about_story_title}
                    </h2>
                    <p class="text-gray-500 leading-relaxed mb-4">
                        {about.about_story_content_1}
                    </p>
                    <p class="text-gray-500 leading-relaxed mb-6">
                        {about.about_story_content_2}
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
                {#each [["12+", "Years Experience"], ["6+", "Product Sizes"], ["100%", "Fassai Certified"], ["24/7", "Working Hours"]] as [num, label]}
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
                {#each [{ icon: "🔬", title: "Triple-Stage Purification", desc: "Our water undergoes RO, UV, and UF treatment to ensure absolute purity and safety." }, { icon: "🏅", title: "Fassai Certified", desc: "We comply fully with the Food Safety and Standards Authority of India for packaged drinking water quality." }, { icon: "♻️", title: "Eco-Friendly Packaging", desc: "All our bottles use food-grade recyclable PET material — safe for you and the environment." }] as practice}
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
        <!-- Licensing section -->
        <section class="py-20 bg-gray-50/50">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="text-center mb-14 aos">
                    <p
                        class="text-xs font-semibold tracking-widest text-brand-500 uppercase mb-3"
                    >
                        Trust & Quality
                    </p>
                    <h2 class="section-heading">Licensing & Certifications</h2>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {#each [{ icon: "🏅", title: "Fassai Certified", subtitle: "Food Safety", desc: "Strictly compliant with the Food Safety and Standards Authority of India for packaged drinking water quality and safety." }, { icon: "🛡️", title: "FSSAI Licensed", subtitle: "Food Safety", desc: "Fully licensed by the Food Safety and Standards Authority of India, ensuring absolute hygiene and health standards." }, { icon: "⚙️", title: "Automated Plant", subtitle: "Technology", desc: "Operating West Bengal's first fully automated plant with 24/7 quality monitoring and zero manual handling." }] as cert, i}
                        <div
                            class="aos bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:border-brand-100 transition-all duration-300 group"
                            style="transition-delay: {i * 100}ms"
                        >
                            <div class="flex items-center gap-4 mb-6">
                                <div
                                    class="w-14 h-14 rounded-2xl bg-brand-50 flex items-center justify-center text-3xl group-hover:scale-110 transition-transform duration-300"
                                >
                                    {cert.icon}
                                </div>
                                <div>
                                    <div
                                        class="text-xs font-bold text-brand-500 uppercase tracking-wider"
                                    >
                                        {cert.subtitle}
                                    </div>
                                    <h3
                                        class="font-heading font-extrabold text-gray-900 text-xl"
                                    >
                                        {cert.title}
                                    </h3>
                                </div>
                            </div>
                            <p class="text-gray-500 text-sm leading-relaxed">
                                {cert.desc}
                            </p>
                        </div>
                    {/each}
                </div>
            </div>
        </section>
    </section>
</div>
