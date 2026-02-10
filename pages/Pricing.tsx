<script>
    import { onMount } from 'svelte';
    import { Check, Star, Infinity, Zap, Sparkles, ChevronDown, ChevronUp } from 'lucide-svelte';

    let openFaqIndex = null;

    onMount(() => {
        // We add a small delay to give Paddle.js time to load
        setTimeout(() => {
            if (window.Paddle) {
                window.Paddle.Setup({
                    token: 'live_02cff4433d43404f6c17693be17'
                });
            } else {
                console.error("Paddle.js script did not load in time.");
            }
        }, 500);
    });

    const handleCheckout = (priceId) => {
        if (window.Paddle) {
            window.Paddle.Checkout.open({
                items: [{ priceId: priceId, quantity: 1 }]
            });
        } else {
            console.error("Paddle is not available or has not been set up yet.");
        }
    };

    const toggleFaq = (index) => {
        openFaqIndex = openFaqIndex === index ? null : index;
    };

    // All your data (plans, faqs, etc.) goes here
    const subscriptionPlans = [
        { name: 'Free to use', price: '$0', description: 'Perfect for enthusiasts and testing.', features: ['5 Image-to-Text uses/day', 'Unlimited Text-to-Prompt', '2 Flux.1 Schnell Generations', 'Community Support'], cta: 'Start for Free', popular: false, priceId: null },
        { name: 'Standard Monthly', price: '$5.99', description: 'The creative starter kit.', features: ['300 Image-to-Text uses/month', '500 credits for generation', 'Access to all features', 'No Ads', '50% off extra credits', 'Commercial License'], cta: 'Get Standard', popular: false, priceId: 'pri_01kgyzhbtd5t7p9dc75m5nyjav' },
        { name: 'Pro Monthly', price: '$14.99', description: 'For serious AI artists and professionals.', features: ['600 Image-to-Text uses/month', '800 credits for generation', 'Access to all features', 'No Ads', '50% off extra credits', 'Commercial License', 'Priority Processing'], cta: 'Go Pro Now', popular: true, priceId: 'pri_01kgyzkcfpxx2nkkbrbxr4jt07' },
        { name: 'Ultimate Monthly', price: '$29.99', description: 'Maximum power for heavy production.', features: ['Unlimited Image-to-Text uses', '1200 credits for generation', 'Access to all features', 'No Ads', '50% off extra credits', 'Commercial License', 'Dedicated Support'], cta: 'Join Ultimate', popular: false, priceId: 'pri_01kgyzmnem8wh5txxtrg4n7ttp' }
    ];
    const lifetimePlan = { name: 'Lifetime', price: '$19.99', description: 'One-time purchase', features: ['2000 Image-to-Text uses', '5000 credits for image generation', 'Access to all features', 'Commercial License', 'No Ads', '50% off when purchasing image generation credits'], cta: 'Get Lifetime Access', priceId: 'pri_01kgyzqpwvmzbahbs7wvx715tk' };
    const creditPacks = [
        { title: 'Standard Credits Pack', price: '$4.99', priceLabel: 'for subscribers', credits: '500 Credits for Image Generation', features: ['500 credits, valid for 1 month', 'For image generation only', 'Max 500 Flux.1 Schnell Generations', 'Max 25 Nano Banana Generations', 'Max 7 Nano Banana Pro Generations', 'Commercial License', '50% OFF for subscribers'], priceId: 'pri_01kgyzsbmss5qxrfc0wjj9sqwr' },
        { title: 'Pro Credits Pack', price: '$8.99', priceLabel: 'for subscribers', credits: '1000 Credits for Image Generation', features: ['1000 credits, valid for 1 month', 'For image generation only', 'Max 1000 Flux.1 Schnell Generations', 'Max 50 Nano Banana Generations', 'Max 15 Nano Banana Pro Generations', 'Commercial License', '50% OFF for subscribers'], priceId: 'pri_01kgyzt289q0kajzetg99tdtvm' },
        { title: 'Premium Credits Pack', price: '$14.99', priceLabel: 'for subscribers', credits: '2000 Credits for Image Generation', features: ['2000 credits, valid for 1 month', 'For image generation only', 'Max 2000 Flux.1 Schnell Generations', 'Max 100 Nano Banana Generations', 'Max 30 Nano Banana Pro Generations', 'Commercial License', '50% OFF for subscribers'], priceId: 'pri_01kgyztz4zxysx770mkggh35pc' }
    ];
    const faqs = [
        { question: "Which plan should I choose?", answer: "Choose Subscription Plans if you mainly use Image to Prompt or Describe Image features - it provides the best value. Start with the Standard plan if you are not sure about your usage. Image-to-Text Power Pack is perfect if you need extra Image-to-Text uses without monthly renewal. If you only want to generate images, go for an Image Generation Credits Pack." },
        { question: "How are image-to-text uses counted?", answer: "Free users get 5 daily uses. Standard plan users get 300 monthly uses, Pro plan users get 600 monthly uses, and Ultimate plan users enjoy unlimited uses during their subscription." },
        // ... (the rest of your faqs array)
    ];

</script>

<div class="pt-24 pb-16 px-4 max-w-7xl mx-auto min-h-screen">
    <div class="text-center mb-16">
        <h1 class="text-5xl font-black mb-4 text-charcoal dark:text-offwhite">Choose Your Power</h1>
        <p class="text-slate-600 dark:text-slate-400 text-lg">Flexible plans that grow with your creative journey.</p>
    </div>

    <!-- Subscription Plans Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {#each subscriptionPlans as plan}
            {@const isProMonthly = plan.name === 'Pro Monthly'}
            <div 
              class={`relative flex flex-col p-8 rounded-[32px] transition-all h-full shadow-lg
                ${isProMonthly 
                  ? 'bg-[#482C72] text-white scale-105 z-10 ring-4 ring-[#482C72]/20' 
                  : (plan.popular 
                    ? 'bg-accent/5 ring-2 ring-accent scale-105 z-10' 
                    : 'bg-white dark:bg-charcoal-lighter border border-black/5 dark:border-white/5 hover:border-accent')}
              `}
            >
              {#if plan.popular}
                <div class={`absolute -top-4 left-1/2 -translate-x-1/2 bg-white ${isProMonthly ? 'text-[#482C72]' : 'text-accent'} text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full flex items-center gap-1 shadow-lg border border-accent/20`}>
                  <Star size={12} fill="currentColor" /> Most Popular
                </div>
              {/if}
              
              <div class="mb-8">
                <h3 class={`text-xl font-black mb-1 ${isProMonthly ? 'text-white' : 'text-charcoal dark:text-offwhite'}`}>{plan.name}</h3>
                <div class="flex items-baseline gap-1 mb-2">
                  <span class={`text-4xl font-black ${isProMonthly ? 'text-white' : 'text-charcoal dark:text-offwhite'}`}>{plan.price}</span>
                  <span class={`${isProMonthly ? 'text-purple-200' : 'text-slate-500'} text-sm`}>/ month</span>
                </div>
                <p class={`text-sm leading-relaxed ${isProMonthly ? 'text-purple-100' : 'text-slate-600 dark:text-slate-400'}`}>
                  {plan.description}
                </p>
              </div>
              <ul class="space-y-4 mb-8 flex-1">
                {#each plan.features as feature}
                  <li class="flex items-start gap-3 text-sm">
                    <Check size={18} class={isProMonthly ? 'text-purple-300' : 'text-accent'} />
                    <span class={isProMonthly ? 'text-purple-50' : 'text-slate-700 dark:text-slate-300'}>{feature}</span>
                  </li>
                {/each}
              </ul>
              <button 
                on:click={() => plan.priceId && handleCheckout(plan.priceId)}
                class="purchase-button w-full"
              >
                {plan.cta}
              </button>
            </div>
        {/each}
    </div>

    <!-- Lifetime Plan -->
    <div 
        class="rounded-[40px] p-8 md:p-12 mb-24 transition-all flex flex-col lg:flex-row items-center gap-12 shadow-2xl text-black border-2 border-yellow-400/20"
        style="background: linear-gradient(135deg, #F0C42E, #C48E00);"
    >
        <div class="lg:w-1/4 text-center lg:text-left">
          <div class="inline-flex items-center gap-2 text-black/80 font-black uppercase tracking-widest text-[10px] mb-4">
             <Infinity size={14} /> {lifetimePlan.description}
          </div>
          <h3 class="text-3xl font-black text-black mb-2">{lifetimePlan.name}</h3>
          <div class="flex items-baseline justify-center lg:justify-start gap-1">
            <span class="text-5xl font-black text-black">{lifetimePlan.price}</span>
          </div>
          <p class="text-black/70 text-sm mt-4 italic font-bold">
            Forever access. No recurring fees.
          </p>
        </div>
        <div class="lg:w-1/2 flex-grow">
          <ul class="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-4">
            {#each lifetimePlan.features as feature}
              <li class="flex items-start gap-3 text-sm text-black font-bold">
                <Check size={18} class="text-black shrink-0 mt-0.5" />
                <span>{feature}</span>
              </li>
            {/each}
          </ul>
        </div>
        <div class="lg:w-1/4 w-full text-center">
          <button 
            on:click={() => handleCheckout(lifetimePlan.priceId)}
            class="purchase-button w-full !bg-black !text-white hover:!bg-black/90"
          >
            {lifetimePlan.cta}
          </button>
        </div>
    </div>

    <!-- Credit Packs -->
    <section class="mb-24">
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-4xl font-black text-charcoal dark:text-offwhite mb-2">Credit Packs</h2>
          <p class="text-slate-600 dark:text-slate-400">One-time purchase for extra image generation credits.</p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {#each creditPacks as pack}
            <div class="bg-white dark:bg-charcoal-lighter border border-black/5 dark:border-white/5 rounded-[32px] p-8 flex flex-col hover:border-accent transition-all shadow-xl active:scale-[0.98]">
              <div class="flex items-center gap-4 mb-6">
                <div class="w-12 h-12 bg-accent/10 rounded-2xl flex items-center justify-center shrink-0 shadow-inner">
                  <Zap size={24} class="text-accent" />
                </div>
                <div>
                  <h3 class="text-lg font-black text-charcoal dark:text-white">{pack.title}</h3>
                  <div class="flex items-baseline gap-1">
                    <span class="text-2xl font-black text-charcoal dark:text-white">{pack.price}</span>
                    <span class="text-[10px] text-slate-500 uppercase font-black tracking-wider">{pack.priceLabel}</span>
                  </div>
                </div>
              </div>
              <div class="mb-6 p-4 bg-slate-50 dark:bg-charcoal/50 rounded-2xl border border-black/5">
                <p class="text-sm font-black text-accent flex items-center gap-2">
                   <Sparkles size={14} /> {pack.credits}
                </p>
              </div>
              <ul class="space-y-4 mb-8 flex-1">
                {#each pack.features as feature}
                  <li class="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-400 font-medium">
                    <Check size={16} class="text-accent shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                {/each}
              </ul>
              <button 
                on:click={() => handleCheckout(pack.priceId)}
                class="purchase-button w-full"
              >
                Buy Credits
              </button>
            </div>
          {/each}
        </div>
    </section>

    <!-- FAQ Section -->
    <section class="mt-24 max-w-4xl mx-auto pb-16">
        <div class="text-center mb-12">
            <h2 class="text-4xl font-black text-charcoal dark:text-offwhite mb-4 tracking-tight">Frequently asked questions</h2>
            <p class="text-slate-600 dark:text-slate-400 text-lg font-medium">Do you have any questions? We have got you covered.</p>
        </div>
        <div class="space-y-4">
            {#each faqs as faq, index}
                <div class="bg-white dark:bg-charcoal-lighter border border-black/5 dark:border-white/10 rounded-[24px] overflow-hidden transition-all duration-300 hover:border-accent shadow-md">
                    <button on:click={() => toggleFaq(index)} class="w-full p-6 flex items-center justify-between text-left transition-colors hover:bg-slate-50 dark:hover:bg-charcoal/40">
                        <span class="text-lg font-black text-charcoal dark:text-offwhite">{faq.question}</span>
                        <span class="text-accent shrink-0 ml-4 transition-transform duration-300">
                            {#if openFaqIndex === index}
                                <ChevronUp size={24} />
                            {:else}
                                <ChevronDown size={24} />
                            {/if}
                        </span>
                    </button>

                    <div class={`transition-all duration-300 ease-in-out overflow-hidden ${openFaqIndex === index ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
                        <div class="p-6 pt-0 text-slate-600 dark:text-slate-400 leading-relaxed text-base border-t border-black/5 dark:border-white/5 bg-slate-50 dark:bg-charcoal/20 font-medium">
                            {faq.answer}
                        </div>
                    </div>
                </div>
            {/each}
        </div>
    </section>
</div>
