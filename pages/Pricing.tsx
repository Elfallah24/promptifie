import { onMount } from 'svelte';

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
    }, 500); // 500 milliseconds delay
});

import React, { useState } from 'react';
import { Check, Star, Infinity, Zap, Sparkles, ChevronDown, ChevronUp } from 'lucide-react';

declare global {
  interface Window {
    Paddle: any;
  }
}

const Pricing: React.FC = () => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const handleCheckout = (priceId: string) => {
    if (window.Paddle) {
      window.Paddle.Checkout.open({
        items: [{ priceId: priceId, quantity: 1 }]
      });
    } else {
      console.error("Paddle not loaded");
    }
  };

  const subscriptionPlans = [
    {
      name: 'Free to use',
      price: '$0',
      description: 'Perfect for enthusiasts and testing.',
      features: [
        '5 Image-to-Text uses/day',
        'Unlimited Text-to-Prompt',
        '2 Flux.1 Schnell Generations',
        'Community Support'
      ],
      cta: 'Start for Free',
      popular: false,
      priceId: null
    },
    {
      name: 'Standard Monthly',
      price: '$5.99',
      description: 'The creative starter kit.',
      features: [
        '300 Image-to-Text uses/month',
        '500 credits for generation',
        'Access to all features',
        'No Ads',
        '50% off extra credits',
        'Commercial License'
      ],
      cta: 'Get Standard',
      popular: false,
      priceId: 'pri_01kgyzhbtd5t7p9dc75m5nyjav'
    },
    {
      name: 'Pro Monthly',
      price: '$14.99',
      description: 'For serious AI artists and professionals.',
      features: [
        '600 Image-to-Text uses/month',
        '800 credits for generation',
        'Access to all features',
        'No Ads',
        '50% off extra credits',
        'Commercial License',
        'Priority Processing'
      ],
      cta: 'Go Pro Now',
      popular: true,
      priceId: 'pri_01kgyzkcfpxx2nkkbrbxr4jt07'
    },
    {
      name: 'Ultimate Monthly',
      price: '$29.99',
      description: 'Maximum power for heavy production.',
      features: [
        'Unlimited Image-to-Text uses',
        '1200 credits for generation',
        'Access to all features',
        'No Ads',
        '50% off extra credits',
        'Commercial License',
        'Dedicated Support'
      ],
      cta: 'Join Ultimate',
      popular: false,
      priceId: 'pri_01kgyzmnem8wh5txxtrg4n7ttp'
    }
  ];

  const lifetimePlan = {
    name: 'Lifetime',
    price: '$19.99',
    description: 'One-time purchase',
    features: [
      '2000 Image-to-Text uses',
      '5000 credits for image generation',
      'Access to all features',
      'Commercial License',
      'No Ads',
      '50% off when purchasing image generation credits'
    ],
    cta: 'Get Lifetime Access',
    priceId: 'pri_01kgyzqpwvmzbahbs7wvx715tk'
  };

  const creditPacks = [
    {
      title: 'Standard Credits Pack',
      price: '$4.99',
      priceLabel: 'for subscribers',
      credits: '500 Credits for Image Generation',
      features: [
        '500 credits, valid for 1 month',
        'For image generation only',
        'Max 500 Flux.1 Schnell Generations',
        'Max 25 Nano Banana Generations',
        'Max 7 Nano Banana Pro Generations',
        'Commercial License',
        '50% OFF for subscribers'
      ],
      priceId: 'pri_01kgyzsbmss5qxrfc0wjj9sqwr'
    },
    {
      title: 'Pro Credits Pack',
      price: '$8.99',
      priceLabel: 'for subscribers',
      credits: '1000 Credits for Image Generation',
      features: [
        '1000 credits, valid for 1 month',
        'For image generation only',
        'Max 1000 Flux.1 Schnell Generations',
        'Max 50 Nano Banana Generations',
        'Max 15 Nano Banana Pro Generations',
        'Commercial License',
        '50% OFF for subscribers'
      ],
      priceId: 'pri_01kgyzt289q0kajzetg99tdtvm'
    },
    {
      title: 'Premium Credits Pack',
      price: '$14.99',
      priceLabel: 'for subscribers',
      credits: '2000 Credits for Image Generation',
      features: [
        '2000 credits, valid for 1 month',
        'For image generation only',
        'Max 2000 Flux.1 Schnell Generations',
        'Max 100 Nano Banana Generations',
        'Max 30 Nano Banana Pro Generations',
        'Commercial License',
        '50% OFF for subscribers'
      ],
      priceId: 'pri_01kgyztz4zxysx770mkggh35pc'
    }
  ];

  const faqs = [
    {
      question: "Which plan should I choose?",
      answer: "Choose Subscription Plans if you mainly use Image to Prompt or Describe Image features - it provides the best value. Start with the Standard plan if you are not sure about your usage. Image-to-Text Power Pack is perfect if you need extra Image-to-Text uses without monthly renewal. If you only want to generate images, go for an Image Generation Credits Pack."
    },
    {
      question: "How are image-to-text uses counted?",
      answer: "Free users get 5 daily uses. Standard plan users get 300 monthly uses, Pro plan users get 600 monthly uses, and Ultimate plan users enjoy unlimited uses during their subscription."
    },
    {
      question: "What happens when I run out of image-to-text uses?",
      answer: "Free users can subscribe or buy a Power Pack. Standard and Pro users can upgrade their plan, purchase a Power Pack at a 50% discount, or use the 5 free daily uses."
    },
    {
      question: "How can I check my subscription status and credits?",
      answer: "You can see your subscription and credits in the 'My Subscription' page. Tap on your avatar, and you will see the menu with all the details."
    },
    {
      question: "How do I cancel my subscription?",
      answer: "You can cancel in the 'My Subscription' page. Tap the 'Manage' button next to your current subscription to find the cancel button. Your cancellation will take effect at the end of your current billing period."
    },
    {
      question: "How do I change my subscription plan?",
      answer: "Go to the 'My Subscription' page and click 'Manage' to see available plans. Upgrades take effect immediately, while downgrades start from your next billing cycle."
    },
    {
      question: "What is the difference between a Power Pack and a Subscription?",
      answer: "Image-to-Text Power Pack is a one-time purchase for extra uses. A Subscription is a recurring monthly or yearly plan that includes feature access and bonus credits, and it automatically renews."
    },
    {
      question: "What is the difference between a Credits Pack and a Subscription?",
      answer: "A Credits Pack is a one-time purchase to generate images. A Subscription is a recurring plan that includes both feature access and bonus credits, and it automatically renews."
    },
    {
      question: "Which of my uses are consumed first?",
      answer: "The system will always prioritize using the credits or uses that expire first to maximize your benefit. For example, daily uses that reset at midnight will be used before a Power Pack that expires in 72 hours."
    },
    {
      question: "Do I need a subscription to buy a Credits Pack?",
      answer: "No, you can buy a credits pack without a subscription. They are separate from your subscription."
    },
    {
      question: "Do credits or Power Packs expire?",
      answer: "Yes. Image-to-Text Power Packs expire 72 hours after purchase. Credits from a one-time purchase last for 3 months. Bonus credits from a subscription last for the duration of your subscription period."
    },
    {
      question: "What is your refund policy?",
      answer: "Generally, we do not offer refunds. However, if you have issues like fraud or have not used the functions, please contact our support, and we will do our best to find a solution. See our Refund Policy for more details."
    },
    {
      question: "Is my payment information secure?",
      answer: "Yes. We use a trusted third-party payment processor (like Stripe or Paddle) that ensures the security of your payment information. We do not store your payment information on our servers."
    },
    {
      question: "Do you support NSFW content?",
      answer: "No, we do not generate or support the generation of NSFW content. Please do not use our services for any purpose that violates our terms of service."
    },
    {
      question: "Do you have an API?",
      answer: "We are currently testing our API integration service. You can visit our developer API page to learn more."
    },
    {
      question: "What if I can't pay with the available methods?",
      answer: "We understand not everyone has access to traditional payment methods. Please contact us to discuss alternative payment arrangements. We're committed to making our service accessible and will work with you to find a solution."
    }
  ];

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <div className="pt-24 pb-16 px-4 max-w-7xl mx-auto min-h-screen">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-black mb-4 text-charcoal dark:text-offwhite">Choose Your Power</h1>
        <p className="text-slate-600 dark:text-slate-400 text-lg">Flexible plans that grow with your creative journey.</p>
      </div>

      {/* Subscription Plans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {subscriptionPlans.map((plan) => {
          const isProMonthly = plan.name === 'Pro Monthly';
          
          return (
            <div 
              key={plan.name}
              className={`relative flex flex-col p-8 rounded-[32px] transition-all h-full shadow-lg
                ${isProMonthly 
                  ? 'bg-[#482C72] text-white scale-105 z-10 ring-4 ring-[#482C72]/20' 
                  : (plan.popular 
                    ? 'bg-accent/5 ring-2 ring-accent scale-105 z-10' 
                    : 'bg-white dark:bg-charcoal-lighter border border-black/5 dark:border-white/5 hover:border-accent')}
              `}
            >
              {plan.popular && (
                <div className={`absolute -top-4 left-1/2 -translate-x-1/2 bg-white ${isProMonthly ? 'text-[#482C72]' : 'text-accent'} text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full flex items-center gap-1 shadow-lg border border-accent/20`}>
                  <Star size={12} fill="currentColor" /> Most Popular
                </div>
              )}
              
              <div className="mb-8">
                <h3 className={`text-xl font-black mb-1 ${isProMonthly ? 'text-white' : 'text-charcoal dark:text-offwhite'}`}>{plan.name}</h3>
                <div className="flex items-baseline gap-1 mb-2">
                  <span className={`text-4xl font-black ${isProMonthly ? 'text-white' : 'text-charcoal dark:text-offwhite'}`}>{plan.price}</span>
                  <span className={`${isProMonthly ? 'text-purple-200' : 'text-slate-500'} text-sm`}>/ month</span>
                </div>
                <p className={`text-sm leading-relaxed ${isProMonthly ? 'text-purple-100' : 'text-slate-600 dark:text-slate-400'}`}>
                  {plan.description}
                </p>
              </div>

              <ul className="space-y-4 mb-8 flex-1">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm">
                    <Check size={18} className={isProMonthly ? 'text-purple-300' : 'text-accent'} />
                    <span className={isProMonthly ? 'text-purple-50' : 'text-slate-700 dark:text-slate-300'}>{feature}</span>
                  </li>
                ))}
              </ul>

              <button 
                onClick={() => plan.priceId && handleCheckout(plan.priceId)}
                className="purchase-button w-full"
              >
                {plan.cta}
              </button>
            </div>
          );
        })}
      </div>

      {/* Lifetime Plan */}
      <div 
        className="rounded-[40px] p-8 md:p-12 mb-24 transition-all flex flex-col lg:flex-row items-center gap-12 shadow-2xl text-black border-2 border-yellow-400/20"
        style={{ background: 'linear-gradient(135deg, #F0C42E, #C48E00)' }}
      >
        <div className="lg:w-1/4 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 text-black/80 font-black uppercase tracking-widest text-[10px] mb-4">
             <Infinity size={14} /> {lifetimePlan.description}
          </div>
          <h3 className="text-3xl font-black text-black mb-2">{lifetimePlan.name}</h3>
          <div className="flex items-baseline justify-center lg:justify-start gap-1">
            <span className="text-5xl font-black text-black">{lifetimePlan.price}</span>
          </div>
          <p className="text-black/70 text-sm mt-4 italic font-bold">
            Forever access. No recurring fees.
          </p>
        </div>

        <div className="lg:w-1/2 flex-grow">
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-4">
            {lifetimePlan.features.map((feature) => (
              <li key={feature} className="flex items-start gap-3 text-sm text-black font-bold">
                <Check size={18} className="text-black shrink-0 mt-0.5" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:w-1/4 w-full text-center">
          <button 
            onClick={() => handleCheckout(lifetimePlan.priceId)}
            className="purchase-button w-full !bg-black !text-white hover:!bg-black/90"
          >
            {lifetimePlan.cta}
          </button>
        </div>
      </div>

      {/* Credit Packs */}
      <section className="mb-24">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-black text-charcoal dark:text-offwhite mb-2">Credit Packs</h2>
          <p className="text-slate-600 dark:text-slate-400">One-time purchase for extra image generation credits.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {creditPacks.map((pack, idx) => (
            <div key={idx} className="bg-white dark:bg-charcoal-lighter border border-black/5 dark:border-white/5 rounded-[32px] p-8 flex flex-col hover:border-accent transition-all shadow-xl active:scale-[0.98]">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-accent/10 rounded-2xl flex items-center justify-center shrink-0 shadow-inner">
                  <Zap size={24} className="text-accent" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-charcoal dark:text-white">{pack.title}</h3>
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-black text-charcoal dark:text-white">{pack.price}</span>
                    <span className="text-[10px] text-slate-500 uppercase font-black tracking-wider">{pack.priceLabel}</span>
                  </div>
                </div>
              </div>

              <div className="mb-6 p-4 bg-slate-50 dark:bg-charcoal/50 rounded-2xl border border-black/5">
                <p className="text-sm font-black text-accent flex items-center gap-2">
                   <Sparkles size={14} /> {pack.credits}
                </p>
              </div>

              <ul className="space-y-4 mb-8 flex-1">
                {pack.features.map((feature, fIdx) => (
                  <li key={fIdx} className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-400 font-medium">
                    <Check size={16} className="text-accent shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <button 
                onClick={() => handleCheckout(pack.priceId)}
                className="purchase-button w-full"
              >
                Buy Credits
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="mt-24 max-w-4xl mx-auto pb-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-black text-charcoal dark:text-offwhite mb-4 tracking-tight">Frequently asked questions</h2>
          <p className="text-slate-600 dark:text-slate-400 text-lg font-medium">Do you have any questions? We have got you covered.</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className="bg-white dark:bg-charcoal-lighter border border-black/5 dark:border-white/10 rounded-[24px] overflow-hidden transition-all duration-300 hover:border-accent shadow-md"
            >
              <button
                onClick={() => toggleFaq(index)}
                className="w-full p-6 flex items-center justify-between text-left transition-colors hover:bg-slate-50 dark:hover:bg-charcoal/40"
              >
                <span className="text-lg font-black text-charcoal dark:text-offwhite">{faq.question}</span>
                <span className="text-accent shrink-0 ml-4 transition-transform duration-300">
                  {openFaqIndex === index ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
                </span>
              </button>
              
              <div 
                className={`transition-all duration-300 ease-in-out overflow-hidden ${
                  openFaqIndex === index ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="p-6 pt-0 text-slate-600 dark:text-slate-400 leading-relaxed text-base border-t border-black/5 dark:border-white/5 bg-slate-50 dark:bg-charcoal/20 font-medium">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Pricing;
