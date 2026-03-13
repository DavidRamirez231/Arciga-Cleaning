import { useState, useEffect } from 'react';
import { Sparkles, Home, Clock, Shield, Phone, Mail, MapPin, ChevronDown, ChevronLeft, ChevronRight, Star, Check, Leaf, Droplets, Calculator, Users, ArrowRight, ThumbsUp, MessageSquare, Award } from 'lucide-react';
import SlideIn from './SlideIn';

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Outfit:wght@300;400;500;600;700&display=swap');

  :root {
    --teal: #0D9488;
    --teal-light: #5EEAD4;
    --teal-dark: #0F766E;
    --lime: #a3e635;
    --lime-light: #d9f99d;
    --charcoal: #1F2937;
  }

  * { font-family: 'Outfit', sans-serif; }
  .font-serif { font-family: 'DM Serif Display', serif; }

  /* Highlighted keyword (lime marker effect) */
  .highlight {
    background: linear-gradient(180deg, transparent 50%, #a3e63580 50%);
    padding: 0 4px;
  }

  /* Animations */
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-12px); }
  }
  @keyframes float-slow {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-8px); }
  }
  @keyframes pulse-dot {
    0%, 100% { transform: scale(1); opacity: 1; }
    50% { transform: scale(1.5); opacity: 0.5; }
  }
  @keyframes scroll {
    0% { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }
  @keyframes slide-up {
    from { opacity: 0; transform: translateY(40px); filter: blur(6px); }
    to { opacity: 1; transform: translateY(0); filter: blur(0); }
  }
  @keyframes slide-in-left {
    from { opacity: 0; transform: translateX(-60px); filter: blur(8px); }
    to { opacity: 1; transform: translateX(0); filter: blur(0); }
  }

  .animate-float { animation: float 5s ease-in-out infinite; }
  .animate-float-slow { animation: float-slow 7s ease-in-out infinite; }
  .animate-slide-up { animation: slide-up 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards; }

  .animate-scroll-services { animation: scroll 12s linear infinite; }
  .animate-scroll-services:hover { animation-play-state: paused; }
  .animate-scroll { animation: scroll 8s linear infinite; }
  .animate-scroll:hover { animation-play-state: paused; }


  .scrollbar-hide::-webkit-scrollbar { display: none; }

  .btn-glow { transition: all 0.3s ease; }
  .btn-glow:hover { transform: scale(1.05); box-shadow: 0 10px 30px rgba(0,0,0,0.15); }

  .hover-lift { transition: all 0.3s ease; }
  .hover-lift:hover { transform: translateY(-6px); box-shadow: 0 20px 40px rgba(0,0,0,0.08); }

  /* Glassmorphism */
  .glass {
    background: rgba(255,255,255,0.7);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border: 1px solid rgba(255,255,255,0.4);
  }

  .sticky-cta {
    position: fixed; bottom: 0; left: 0; right: 0; z-index: 40;
    transform: translateY(100%); transition: transform 0.3s ease;
  }
  .sticky-cta.visible { transform: translateY(0); }

  .quote-result {
    background: linear-gradient(135deg, #0D9488 0%, #0F766E 100%);
  }

  input[type="range"] {
    -webkit-appearance: none; appearance: none;
    height: 8px; border-radius: 4px; background: #e5e7eb; outline: none;
  }
  input[type="range"]::-webkit-slider-thumb {
    -webkit-appearance: none; appearance: none;
    width: 24px; height: 24px; border-radius: 50%;
    background: #0D9488; cursor: pointer;
    box-shadow: 0 2px 6px rgba(13,148,136,0.4);
  }

  /* Progress bar fill */
  .progress-fill {
    background: linear-gradient(90deg, #0D9488, #5EEAD4);
    transition: width 1.5s cubic-bezier(0.16, 1, 0.3, 1);
  }
`;

export default function ArcigaCleaning() {
  const [activeAccordion, setActiveAccordion] = useState(null);

  const [formStatus, setFormStatus] = useState('idle');
  const [showStickyCta, setShowStickyCta] = useState(false);
  const [formLoadTime] = useState(Date.now());
  const [quoteData, setQuoteData] = useState({ bedrooms: 2, bathrooms: 1, sqft: 1200, serviceType: 'standard' });

  const calculateQuote = () => {
    const baseRates = { standard: 120, deep: 200, moveinout: 250, landscaping: 60, bundle: 280 };
    const base = baseRates[quoteData.serviceType] || 120;
    const total = Math.round((base + quoteData.bedrooms * 25 + quoteData.bathrooms * 20) * (quoteData.sqft > 1500 ? 1.3 : quoteData.sqft > 1000 ? 1.1 : 1));
    return { low: Math.round(total * 0.9), high: Math.round(total * 1.15) };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    // Honeypot: if a bot filled the hidden field, silently fake success
    if (form.elements['_gotcha']?.value) {
      setFormStatus('success');
      return;
    }

    // Timing: if form was submitted in under 3 seconds, it's a bot
    if (Date.now() - formLoadTime < 3000) {
      setFormStatus('success');
      return;
    }

    setFormStatus('submitting');
    try {
      const response = await fetch('https://formspree.io/f/xykzrywq', {
        method: 'POST', body: new FormData(form), headers: { 'Accept': 'application/json' }
      });
      if (response.ok) { setFormStatus('success'); form.reset(); } else { setFormStatus('error'); }
    } catch { setFormStatus('error'); }
  };


  useEffect(() => {
    const handleScroll = () => setShowStickyCta(window.scrollY > 600);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const services = [
    { icon: Home, title: 'Standard Clean', desc: 'Regular maintenance — dusting, vacuuming, mopping, and bathroom sanitization.', price: 'Get a Quote' },
    { icon: Sparkles, title: 'Deep Clean', desc: 'Top-to-bottom deep cleaning. Inside appliances, baseboards, and hard-to-reach spots.', price: 'Get a Quote' },
    { icon: Clock, title: 'Move In/Out', desc: 'Start fresh or get your deposit back. Complete transition cleaning.', price: 'Get a Quote' },
    { icon: Leaf, title: 'Landscaping', desc: 'Professional lawn care, trimming, and yard maintenance for a pristine outdoor space.', price: 'Get a Quote' },
    { icon: Shield, title: 'Deep Clean + Landscaping', desc: 'The ultimate bundle — deep clean inside plus full landscaping outside.', price: 'Best Value' },
  ];

  const testimonials = [
    { name: 'Maria T.', location: 'Belmont Shore', text: 'Finally found a cleaner I can trust! My house has never looked better. So detail-oriented.', rating: 5, avatar: 'https://randomuser.me/api/portraits/women/44.jpg' },
    { name: 'James K.', location: 'Bixby Knolls', text: "We've used Arciga Cleaning for 6 months now. Consistent, reliable, and always on time.", rating: 5, avatar: 'https://randomuser.me/api/portraits/men/32.jpg' },
    { name: 'Sandra M.', location: 'Naples Island', text: 'The deep clean exceeded my expectations. They got stains out I thought were permanent!', rating: 5, avatar: 'https://randomuser.me/api/portraits/women/68.jpg' },
    { name: 'David R.', location: 'Signal Hill', text: 'Best cleaning service in Long Beach. My home feels brand new after every visit.', rating: 5, avatar: 'https://randomuser.me/api/portraits/men/75.jpg' },
    { name: 'Ana P.', location: 'Lakewood', text: 'Affordable and amazing quality. I recommend Arciga to everyone I know!', rating: 5, avatar: 'https://randomuser.me/api/portraits/women/26.jpg' },
  ];

  const cleaners = [
    { name: 'Elena Torres', role: 'House Cleaner', time: '09:00 AM', date: 'March 15', avatar: 'https://randomuser.me/api/portraits/women/65.jpg' },
    { name: 'Sophia Riley', role: 'House Cleaner', time: '10:00 AM', date: 'March 18', avatar: 'https://randomuser.me/api/portraits/women/33.jpg' },
    { name: 'Jenna Porter', role: 'House Cleaner', time: '09:00 AM', date: 'March 20', avatar: 'https://randomuser.me/api/portraits/women/50.jpg' },
  ];

  const faqs = [
    { q: 'What areas do you serve?', a: 'We proudly serve Long Beach and surrounding areas including Belmont Shore, Bixby Knolls, Naples, Signal Hill, Lakewood, Carson, Seal Beach, and Los Alamitos.' },
    { q: 'Do I need to be home during cleaning?', a: "Nope! Many clients give us a key or garage code. We're fully insured and background-checked for your peace of mind." },
    { q: 'What products do you use?', a: 'We use professional-grade cleaning products. Upon request, we also offer eco-friendly, non-toxic alternatives at a small additional cost.' },
    { q: 'How do I pay?', a: 'We accept Venmo, Zelle, and cash. Payment is due upon completion of service.' },
    { q: 'What if I need to reschedule?', a: "Life happens! Just give us 24 hours notice and we'll find a new time that works for you." },
    { q: 'How quickly can I get an appointment?', a: "We can usually schedule within 48 hours. For urgent cleanings, give us a call and we'll do our best for same-day service." },
    { q: 'Do you bring your own supplies?', a: 'Yes! We bring all cleaning supplies and equipment. If you have preferred products, just let us know.' },
  ];

  const serviceAreas = [
    { name: 'Long Beach', highlight: true }, { name: 'Belmont Shore' }, { name: 'Bixby Knolls' },
    { name: 'Naples Island' }, { name: 'Signal Hill' }, { name: 'Lakewood' },
    { name: 'Carson' }, { name: 'Seal Beach' }, { name: 'Los Alamitos' },
    { name: 'Belmont Heights' }, { name: 'California Heights' }, { name: 'Wrigley' },
  ];

  const quote = calculateQuote();

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <style>{styles}</style>

      {/* ── NAV ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="font-serif text-xl text-gray-900">Arciga Cleaning</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-500">
            <a href="#why-us" className="hover:text-gray-900 transition-colors">Why Us</a>
            <a href="#booking" className="hover:text-gray-900 transition-colors">Booking</a>
            <a href="#reviews" className="hover:text-gray-900 transition-colors">Reviews</a>
            <a href="#faq" className="hover:text-gray-900 transition-colors">FAQ</a>
          </div>
          <a href="#book" className="bg-gray-900 hover:bg-gray-800 text-white px-6 py-2.5 rounded-full font-semibold text-sm transition-all hover:scale-105">
            Book Cleaning
          </a>
        </div>
      </nav>

      {/* ── STICKY MOBILE CTA ── */}
      <div className={`sticky-cta md:hidden ${showStickyCta ? 'visible' : ''}`}>
        <div className="bg-white/90 backdrop-blur-xl border-t border-gray-200 shadow-2xl px-4 py-3 flex gap-3">
          <a href="tel:+12134211673" className="flex-1 flex items-center justify-center gap-2 bg-gray-900 text-white py-3 rounded-full font-semibold text-sm">
            <Phone className="w-4 h-4" /> Call Now
          </a>
          <a href="#book" className="flex-1 flex items-center justify-center gap-2 bg-teal-600 text-white py-3 rounded-full font-semibold text-sm">
            Book Cleaning
          </a>
        </div>
      </div>

      {/* ═══════════════════════════════════════
           HERO — centered, editorial style
         ═══════════════════════════════════════ */}
      <section id="hero" className="relative pt-32 pb-16 bg-white overflow-hidden">
        <div className="max-w-5xl mx-auto px-6 text-center">
          {/* Urgency pill */}
          <div className="animate-slide-up opacity-0" style={{ animationDelay: '0.05s', animationFillMode: 'forwards' }}>
            <div className="inline-flex items-center gap-2 bg-gray-900/5 backdrop-blur-md border border-white/20 text-gray-700 px-5 py-2.5 rounded-full text-sm font-semibold mb-8">
              <span className="w-2 h-2 bg-teal-500 rounded-full" style={{ animation: 'pulse-dot 1.5s infinite' }}></span>
              Only 3 spots left this week
            </div>
          </div>

          <h1 className="font-serif text-[clamp(2.5rem,6vw,5.5rem)] text-gray-900 mb-8 leading-[1.1] animate-slide-up opacity-0" style={{ animationDelay: '0.15s', animationFillMode: 'forwards' }}>
            Experience the joy<br />
            of our house<br />
            <span className="highlight">cleaning</span> service
          </h1>

          <p className="text-lg md:text-xl text-gray-500 mb-10 max-w-2xl mx-auto leading-relaxed animate-slide-up opacity-0" style={{ animationDelay: '0.3s', animationFillMode: 'forwards' }}>
            Our professional house cleaning service will leave your home spotless and refreshed. Book now and enjoy a clean, comfortable, stress-free space tailored to your needs.
          </p>

          <div className="animate-slide-up opacity-0" style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}>
            <a href="#book" className="btn-glow inline-flex items-center gap-2 bg-gray-900 hover:bg-gray-800 text-white px-10 py-4 rounded-full font-semibold text-lg">
              Book a Cleaning
            </a>
          </div>

          {/* Star rating */}
          <div className="flex items-center justify-center gap-2 mt-8 animate-slide-up opacity-0" style={{ animationDelay: '0.5s', animationFillMode: 'forwards' }}>
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
              ))}
            </div>
            <span className="text-gray-600 font-semibold">500+ reviews</span>
          </div>
        </div>

        {/* Hero lifestyle image */}
        <div className="max-w-6xl mx-auto px-6 mt-16 animate-slide-up opacity-0" style={{ animationDelay: '0.6s', animationFillMode: 'forwards' }}>
          <div className="rounded-3xl overflow-hidden shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=80"
              alt="Beautiful clean living room"
              className="w-full h-[300px] md:h-[480px] object-cover"
            />
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
           WHY US — with mock UI cards
         ═══════════════════════════════════════ */}
      <section id="why-us" className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <SlideIn className="text-center mb-20">
            <span className="text-teal-600 font-semibold text-sm tracking-widest uppercase">WHY US</span>
            <h2 className="font-serif text-[clamp(2rem,5vw,4rem)] text-gray-900 mt-4">
              Why choose our house<br /><span className="highlight">cleaning</span> & maid service
            </h2>
          </SlideIn>

          {/* Feature 1: Satisfaction Guaranteed + Cleaner Cards (staggered) */}
          <SlideIn stagger staggerGap={0.18} className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="bg-gray-500/5 backdrop-blur-md border border-white/20 rounded-3xl p-10">
              <h3 className="font-serif text-3xl text-gray-900 mb-4">Satisfaction Guaranteed</h3>
              <p className="text-gray-500 leading-relaxed text-lg">
                Experience the ultimate peace of mind with our house cleaning services. We guarantee your satisfaction every step of the way. If you're not completely happy with the results, we'll make it right.
              </p>
            </div>
            <div className="bg-gray-500/5 backdrop-blur-md border border-white/20 rounded-3xl p-10">
              <h4 className="font-serif text-xl text-gray-900 mb-6">Rate your cleaning experience</h4>
              <SlideIn stagger staggerGap={0.12} className="space-y-4">
                {cleaners.map((cleaner, i) => (
                  <div key={i} className="group flex items-center gap-4 bg-white/70 backdrop-blur-md border border-white/20 rounded-xl p-4 shadow-sm hover:bg-teal-600 transition-all duration-300 cursor-pointer">
                    <img src={cleaner.avatar} alt={cleaner.name} className="w-12 h-12 rounded-full object-cover ring-2 ring-transparent group-hover:ring-white/50 transition-all" />
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900 group-hover:text-white transition-colors">{cleaner.name}</p>
                      <p className="text-sm text-gray-400 group-hover:text-teal-100 transition-colors">{cleaner.role}</p>
                    </div>
                    <div className="text-right text-sm text-gray-400 group-hover:text-teal-100 transition-colors">
                      <p>{cleaner.time}</p>
                      <p>{cleaner.date}</p>
                    </div>
                  </div>
                ))}
              </SlideIn>
            </div>
          </SlideIn>

          {/* Feature 2: Trusted Professionals + Recent Reviews (staggered) */}
          <SlideIn stagger staggerGap={0.18} className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="bg-gray-500/5 backdrop-blur-md border border-white/20 rounded-3xl p-10">
              <h3 className="font-serif text-3xl text-gray-900 mb-4">Trusted Professionals</h3>
              <p className="text-gray-500 leading-relaxed text-lg mb-8">
                You can trust our professionals to enter your home with integrity and respect, providing reliable service you can depend on every time.
              </p>
              <div className="space-y-6">
                {[
                  { label: 'Professionalism', icon: Award, pct: 100 },
                  { label: 'Communication', icon: MessageSquare, pct: 100 },
                  { label: 'Overall Service', icon: ThumbsUp, pct: 100 },
                ].map((item, i) => (
                  <div key={i}>
                    <div className="flex items-center gap-3 mb-2">
                      <item.icon className="w-5 h-5 text-teal-600" />
                      <span className="font-semibold text-gray-700">{item.label}</span>
                      <span className="ml-auto text-sm font-bold text-teal-600">{item.pct}%</span>
                    </div>
                    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="progress-fill h-full rounded-full" style={{ width: `${item.pct}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gray-500/5 backdrop-blur-md border border-white/20 rounded-3xl p-10">
              <h4 className="font-serif text-xl text-gray-900 mb-6">Recent reviews</h4>
              <SlideIn stagger staggerGap={0.15} className="space-y-4">
                <div className="group bg-white/70 backdrop-blur-md border border-white/20 rounded-2xl p-6 shadow-sm hover:shadow-lg hover:bg-white transition-all duration-300">
                  <div className="flex items-center gap-4 mb-4">
                    <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="Maria T." className="w-12 h-12 rounded-full object-cover ring-2 ring-transparent group-hover:ring-teal-200 transition-all" />
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900">Maria T.</p>
                      <p className="text-sm text-gray-400">Belmont Shore</p>
                    </div>
                    <span className="text-sm text-gray-400 group-hover:text-teal-500 transition-colors">2 days ago</span>
                  </div>
                  <div className="flex gap-0.5 mb-3">
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors">
                    "Elena was fantastic! She arrived on time, listened to my requests, and left everything looking spotless. Professional, friendly, and thorough — I highly recommend her!"
                  </p>
                </div>
                <div className="group bg-white/70 backdrop-blur-md border border-white/20 rounded-2xl p-6 shadow-sm hover:shadow-lg hover:bg-white transition-all duration-300">
                  <div className="flex items-center gap-4 mb-4">
                    <img src="https://randomuser.me/api/portraits/men/75.jpg" alt="David R." className="w-12 h-12 rounded-full object-cover ring-2 ring-transparent group-hover:ring-teal-200 transition-all" />
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900">David R.</p>
                      <p className="text-sm text-gray-400">Signal Hill</p>
                    </div>
                    <span className="text-sm text-gray-400 group-hover:text-teal-500 transition-colors">5 days ago</span>
                  </div>
                  <div className="flex gap-0.5 mb-3">
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors">
                    "Best cleaning service in Long Beach. My home feels brand new after every visit. Can't recommend them enough."
                  </p>
                </div>
              </SlideIn>
            </div>
          </SlideIn>
        </div>
      </section>

      {/* ═══════════════════════════════════════
           SIMPLE ONLINE BOOKING — lime bg + mock cards
         ═══════════════════════════════════════ */}
      <section id="booking" className="py-24 bg-lime-200/40">
        <div className="max-w-6xl mx-auto px-6">
          <SlideIn className="mb-16">
            <span className="text-teal-600 font-semibold text-sm tracking-widest uppercase">HOW IT WORKS</span>
            <h2 className="font-serif text-[clamp(2rem,5vw,4rem)] text-gray-900 mt-4">
              Simple <span className="highlight">online</span> booking
            </h2>
            <p className="text-gray-500 text-lg mt-4 max-w-2xl">
              Easily schedule your house cleaning at your preferred time. No phone calls needed — just pick a date and we'll handle the rest.
            </p>
          </SlideIn>

          <SlideIn stagger staggerGap={0.2} className="grid md:grid-cols-2 gap-8">
            {/* Mock booking form card */}
            <div className="bg-white/80 backdrop-blur-md border border-white/30 rounded-3xl p-8 shadow-lg">
              <h4 className="font-serif text-2xl text-gray-900 mb-6">Add Cleaning</h4>

              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-500 mb-2">House Cleaner</label>
                <div className="flex items-center gap-3 bg-gray-50 rounded-xl p-4">
                  <img src="https://randomuser.me/api/portraits/women/33.jpg" alt="Sophia Riley" className="w-10 h-10 rounded-full object-cover" />
                  <span className="font-semibold text-gray-900 flex-1">Sophia Riley</span>
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                </div>
              </div>

              <div className="mb-8">
                <label className="block text-sm font-semibold text-gray-500 mb-2">Amount</label>
                <div className="bg-gray-50 rounded-xl p-4">
                  <span className="text-2xl font-bold text-gray-900">$ 140.00</span>
                </div>
              </div>

              <a href="#book" className="btn-glow block text-center bg-gray-900 hover:bg-gray-800 text-white py-4 rounded-full font-semibold text-lg">
                Book Cleaning
              </a>
            </div>

            {/* Mock confirmation + tip card */}
            <div className="space-y-6">
              <div className="bg-white/80 backdrop-blur-md border border-white/30 rounded-3xl p-8 shadow-lg">
                <div className="flex items-baseline justify-between mb-1">
                  <span className="text-sm font-semibold text-gray-500">Total</span>
                </div>
                <p className="text-4xl font-bold text-gray-900 mb-4">$140.00</p>
                <span className="text-sm font-semibold text-gray-500">Add tip</span>
                <div className="flex gap-3 mt-2 mb-6">
                  {['10%', '15%', '20%'].map(tip => (
                    <button key={tip} className="flex-1 py-3 rounded-full border-2 border-gray-200 text-gray-700 font-semibold hover:border-teal-500 hover:text-teal-600 transition-all text-sm">
                      {tip}
                    </button>
                  ))}
                </div>
                <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                  <img src="https://randomuser.me/api/portraits/women/33.jpg" alt="Sophia" className="w-10 h-10 rounded-full object-cover" />
                  <div>
                    <p className="font-semibold text-gray-900">Sophia Riley</p>
                    <p className="text-sm text-gray-400">Next Cleaning: March 18</p>
                  </div>
                </div>
              </div>

              <div className="bg-white/80 backdrop-blur-md border border-white/30 rounded-3xl p-8 shadow-lg flex items-center gap-4">
                <div className="flex-1">
                  <p className="font-bold text-gray-900 text-lg">Successfully Sent!</p>
                  <p className="text-gray-500 text-sm">Your transaction has been completed successfully.</p>
                </div>
                <div className="w-14 h-14 rounded-full bg-teal-100 flex items-center justify-center flex-shrink-0">
                  <Check className="w-7 h-7 text-teal-600" />
                </div>
              </div>
            </div>
          </SlideIn>
        </div>
      </section>

      {/* ═══════════════════════════════════════
           TESTIMONIALS — scrolling
         ═══════════════════════════════════════ */}
      <section id="reviews" className="py-24 bg-white overflow-hidden">
        <SlideIn className="max-w-6xl mx-auto px-6 mb-16 text-center">
          <span className="text-teal-600 font-semibold text-sm tracking-widest uppercase">REVIEWS</span>
          <h2 className="font-serif text-[clamp(2rem,5vw,4rem)] text-gray-900 mt-4">
            What our <span className="highlight">clients</span> say
          </h2>
        </SlideIn>

        <div className="relative">
          <div className="flex animate-scroll" style={{ width: 'fit-content' }}>
            {[...testimonials, ...testimonials].map((t, i) => (
              <div key={i} className="flex-shrink-0 w-[380px] mx-4 bg-white/60 backdrop-blur-md border border-white/20 p-8 rounded-2xl shadow-sm">
                <div className="flex gap-0.5 mb-4">
                  {[...Array(t.rating)].map((_, j) => (
                    <Star key={j} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-600 leading-relaxed mb-6">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <img src={t.avatar} alt={t.name} className="w-11 h-11 rounded-full object-cover ring-2 ring-gray-100" />
                  <div>
                    <p className="font-semibold text-gray-900">{t.name}</p>
                    <p className="text-sm text-gray-400">{t.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
           INSTANT QUOTE CALCULATOR
         ═══════════════════════════════════════ */}
      <section id="quote-calculator" className="py-24 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6">
          <SlideIn className="text-center mb-16">
            <span className="text-teal-600 font-semibold text-sm tracking-widest uppercase">INSTANT ESTIMATE</span>
            <h2 className="font-serif text-[clamp(2rem,5vw,4rem)] text-gray-900 mt-4">
              Get your <span className="highlight">free quote</span>
            </h2>
            <p className="text-gray-500 mt-4 max-w-xl mx-auto">Adjust the sliders to match your home. No commitment.</p>
          </SlideIn>

          <SlideIn delay={0.15} className="bg-white rounded-3xl p-8 md:p-12 shadow-lg border border-gray-100">
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-3">Service Type</label>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                  {[
                    { key: 'standard', label: 'Standard' }, { key: 'deep', label: 'Deep Clean' },
                    { key: 'moveinout', label: 'Move In/Out' }, { key: 'landscaping', label: 'Landscaping' },
                    { key: 'bundle', label: 'Bundle' },
                  ].map(s => (
                    <button key={s.key} onClick={() => setQuoteData(prev => ({ ...prev, serviceType: s.key }))}
                      className={`py-3 px-4 rounded-full text-sm font-semibold transition-all ${
                        quoteData.serviceType === s.key
                          ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}>{s.label}</button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">Bedrooms: <span className="text-teal-600">{quoteData.bedrooms}</span></label>
                <input type="range" min="1" max="6" value={quoteData.bedrooms} onChange={(e) => setQuoteData(prev => ({ ...prev, bedrooms: parseInt(e.target.value) }))} className="w-full" />
                <div className="flex justify-between text-xs text-gray-400 mt-1"><span>1</span><span>6</span></div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">Bathrooms: <span className="text-teal-600">{quoteData.bathrooms}</span></label>
                <input type="range" min="1" max="5" value={quoteData.bathrooms} onChange={(e) => setQuoteData(prev => ({ ...prev, bathrooms: parseInt(e.target.value) }))} className="w-full" />
                <div className="flex justify-between text-xs text-gray-400 mt-1"><span>1</span><span>5</span></div>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-3">Square Footage: <span className="text-teal-600">{quoteData.sqft.toLocaleString()} sq ft</span></label>
                <input type="range" min="500" max="4000" step="100" value={quoteData.sqft} onChange={(e) => setQuoteData(prev => ({ ...prev, sqft: parseInt(e.target.value) }))} className="w-full" />
                <div className="flex justify-between text-xs text-gray-400 mt-1"><span>500</span><span>4,000</span></div>
              </div>
            </div>

            <div className="quote-result rounded-2xl p-8 text-center text-white">
              <p className="text-teal-100 text-sm font-semibold uppercase tracking-wider mb-2">Your Estimated Quote</p>
              <p className="text-5xl font-bold mb-2">${quote.low} — ${quote.high}</p>
              <p className="text-teal-200 text-sm mb-6">Final price may vary based on home condition</p>
              <a href="#book" className="inline-flex items-center gap-2 bg-white text-gray-900 px-8 py-4 rounded-full font-semibold text-lg shadow-xl transition-all hover:scale-105">
                Claim This Quote <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          </SlideIn>
        </div>
      </section>

      {/* ═══════════════════════════════════════
           SERVICE AREAS
         ═══════════════════════════════════════ */}
      <section id="areas" className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <SlideIn className="text-center mb-16">
            <span className="text-teal-600 font-semibold text-sm tracking-widest uppercase">WHERE WE CLEAN</span>
            <h2 className="font-serif text-[clamp(2rem,5vw,4rem)] text-gray-900 mt-4">
              Service <span className="highlight">areas</span>
            </h2>
          </SlideIn>
          <SlideIn stagger staggerGap={0.2} className="grid md:grid-cols-3 gap-8 items-start">
            {/* Map */}
            <div className="md:col-span-2 rounded-2xl overflow-hidden shadow-lg border border-gray-100">
              <iframe
                title="Arciga Cleaning Service Area"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d106024.67603652498!2d-118.2520081!3d33.8091643!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80dd313b68a738f3%3A0x5cc6ec813e32077b!2sLong%20Beach%2C%20CA!5e0!3m2!1sen!2sus!4v1710000000000"
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full"
              ></iframe>
            </div>

            {/* Area list sidebar — scrollable */}
            <div>
              <h3 className="font-serif text-2xl text-gray-900 mb-4">Neighborhoods we serve</h3>
              <div className="max-h-[300px] overflow-y-auto space-y-2 pr-2 scrollbar-hide">
                {serviceAreas.map((area, i) => (
                  <div key={i} className={`flex items-center gap-3 p-3 rounded-xl transition-all ${
                    area.highlight ? 'bg-gray-900 text-white' : 'bg-gray-50 border border-gray-100'
                  }`}>
                    <MapPin className={`w-4 h-4 flex-shrink-0 ${area.highlight ? 'text-lime-400' : 'text-teal-500'}`} />
                    <span className="font-semibold text-sm">{area.name}</span>
                  </div>
                ))}
              </div>
              <div className="pt-4">
                <p className="text-gray-400 text-sm mb-3">Don't see your area?</p>
                <a href="#book" className="btn-glow inline-flex items-center gap-2 bg-gray-900 hover:bg-gray-800 text-white px-6 py-3 rounded-full font-semibold text-sm">
                  Check Availability <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </SlideIn>
        </div>
      </section>

      {/* ═══════════════════════════════════════
           BOOKING FORM (lead capture)
         ═══════════════════════════════════════ */}
      <section id="book" className="py-24 bg-gray-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 left-10 w-40 h-40 border-2 border-white rounded-full"></div>
          <div className="absolute bottom-10 right-10 w-60 h-60 border-2 border-white rounded-full"></div>
        </div>
        <div className="max-w-4xl mx-auto px-6 text-center relative">
          <SlideIn>
            <div className="inline-flex items-center gap-2 bg-white/10 text-gray-300 px-5 py-2.5 rounded-full text-sm font-semibold mb-6">
              <span className="w-2 h-2 bg-lime-400 rounded-full" style={{ animation: 'pulse-dot 1.5s infinite' }}></span>
              Limited spots — We respond within 24 hours
            </div>
          </SlideIn>
          <SlideIn delay={0.1}>
            <h2 className="font-serif text-4xl md:text-6xl text-white mb-6">
              Ready to <span className="highlight">book</span>?
            </h2>
          </SlideIn>
          <SlideIn delay={0.2}>
            <p className="text-gray-400 text-lg mb-10 max-w-2xl mx-auto">
              Get your free cleaning estimate. No obligations, no pressure.
            </p>
          </SlideIn>

          <SlideIn delay={0.3}>
          <div className="bg-white/90 backdrop-blur-xl border border-white/30 rounded-3xl p-8 md:p-12 shadow-2xl text-left">
            {formStatus === 'success' ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check className="w-8 h-8 text-teal-600" />
                </div>
                <h3 className="font-serif text-2xl text-gray-900 mb-2">Thank You!</h3>
                <p className="text-gray-500">We'll get back to you within 24 hours with your personalized quote.</p>
                <button onClick={() => setFormStatus('idle')} className="mt-6 text-teal-600 font-semibold hover:underline">Submit another request</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                {/* Honeypot — hidden from humans, bots fill it. Formspree rejects if _gotcha has a value */}
                <input type="text" name="_gotcha" autoComplete="off" tabIndex={-1} aria-hidden="true"
                  style={{ position: 'absolute', left: '-9999px', opacity: 0, height: 0, width: 0 }} />
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div className="relative">
                    <input type="text" name="name" id="name" required placeholder="Maria Garcia" className="peer w-full px-4 pt-6 pb-2 rounded-xl border border-gray-200 focus:border-gray-900 focus:ring-2 focus:ring-gray-900/10 outline-none transition-all placeholder-transparent" />
                    <label htmlFor="name" className="absolute left-4 top-1 text-xs font-semibold text-gray-400 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-400 peer-focus:top-1 peer-focus:text-xs peer-focus:text-teal-600">Your Name</label>
                  </div>
                  <div className="relative">
                    <input type="tel" name="phone" id="phone" required placeholder="(562) 555-0123" className="peer w-full px-4 pt-6 pb-2 rounded-xl border border-gray-200 focus:border-gray-900 focus:ring-2 focus:ring-gray-900/10 outline-none transition-all placeholder-transparent" />
                    <label htmlFor="phone" className="absolute left-4 top-1 text-xs font-semibold text-gray-400 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-400 peer-focus:top-1 peer-focus:text-xs peer-focus:text-teal-600">Phone Number</label>
                  </div>
                  <div className="relative">
                    <input type="email" name="email" id="email" required placeholder="maria@email.com" className="peer w-full px-4 pt-6 pb-2 rounded-xl border border-gray-200 focus:border-gray-900 focus:ring-2 focus:ring-gray-900/10 outline-none transition-all placeholder-transparent" />
                    <label htmlFor="email" className="absolute left-4 top-1 text-xs font-semibold text-gray-400 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-400 peer-focus:top-1 peer-focus:text-xs peer-focus:text-teal-600">Email Address</label>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Service Type</label>
                    <select name="service" className="w-full px-4 py-3.5 rounded-xl border border-gray-200 focus:border-gray-900 focus:ring-2 focus:ring-gray-900/10 outline-none transition-all bg-white accent-teal-600">
                      <option>Standard Clean</option><option>Deep Clean</option><option>Move In/Out</option>
                      <option>Landscaping</option><option>Deep Clean + Landscaping Bundle</option><option>Not sure yet</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Bedrooms</label>
                    <select name="bedrooms" className="w-full px-4 py-3.5 rounded-xl border border-gray-200 focus:border-gray-900 focus:ring-2 focus:ring-gray-900/10 outline-none transition-all bg-white accent-teal-600">
                      <option>1</option><option>2</option><option>3</option><option>4</option><option>5+</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Bathrooms</label>
                    <select name="bathrooms" className="w-full px-4 py-3.5 rounded-xl border border-gray-200 focus:border-gray-900 focus:ring-2 focus:ring-gray-900/10 outline-none transition-all bg-white accent-teal-600">
                      <option>1</option><option>2</option><option>3</option><option>4+</option>
                    </select>
                  </div>
                </div>
                <div className="relative mb-6">
                  <textarea name="message" id="message" rows="3" placeholder="Pets, special requests, preferred day..." className="peer w-full px-4 pt-6 pb-2 rounded-xl border border-gray-200 focus:border-gray-900 focus:ring-2 focus:ring-gray-900/10 outline-none transition-all resize-none placeholder-transparent"></textarea>
                  <label htmlFor="message" className="absolute left-4 top-1 text-xs font-semibold text-gray-400 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-400 peer-focus:top-1 peer-focus:text-xs peer-focus:text-teal-600">Anything else?</label>
                </div>
                {formStatus === 'error' && <p className="text-red-500 text-sm mb-4 text-center">Something went wrong. Please try again.</p>}
                <button type="submit" disabled={formStatus === 'submitting'}
                  className="btn-glow w-full bg-gray-900 hover:bg-gray-800 disabled:bg-gray-400 text-white py-4 rounded-full font-semibold text-lg">
                  {formStatus === 'submitting' ? 'Sending...' : 'Get My Free Estimate'}
                </button>
                <p className="text-sm text-gray-400 mt-4 text-center">We respond within 24 hours. Your info is 100% private.</p>
              </form>
            )}
          </div>
          </SlideIn>

          <SlideIn delay={0.4}>
            <div className="mt-8">
              <p className="text-gray-500 mb-3">Prefer to talk?</p>
              <a href="tel:+12134211673" className="inline-flex items-center gap-3 text-white text-2xl font-bold hover:text-lime-300 transition-colors">
                <Phone className="w-6 h-6" /> (213) 421-1673
              </a>
            </div>
          </SlideIn>
        </div>
      </section>

      {/* ═══════════════════════════════════════
           FAQ
         ═══════════════════════════════════════ */}
      <section id="faq" className="py-24 bg-gray-50">
        <div className="max-w-3xl mx-auto px-6">
          <SlideIn>
            <div className="text-center mb-16">
              <span className="text-teal-600 font-semibold text-sm tracking-widest uppercase">FAQ</span>
              <h2 className="font-serif text-[clamp(2rem,5vw,4rem)] text-gray-900 mt-4">
                Got <span className="highlight">questions</span>?
              </h2>
            </div>
          </SlideIn>
          <SlideIn stagger staggerGap={0.1}>
            {faqs.map((faq, i) => (
              <div key={i} className="group bg-white/70 backdrop-blur-md border border-white/20 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 mb-4">
                <button onClick={() => setActiveAccordion(activeAccordion === i ? null : i)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left group-hover:bg-gray-900/[0.02] transition-colors">
                  <span className="font-semibold text-gray-900 group-hover:text-teal-700 transition-colors">{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 text-gray-400 group-hover:text-teal-500 transition-all ${activeAccordion === i ? 'rotate-180' : ''}`} />
                </button>
                {activeAccordion === i && (
                  <div className="px-6 pb-5"><p className="text-gray-500 leading-relaxed">{faq.a}</p></div>
                )}
              </div>
            ))}
          </SlideIn>
          <SlideIn delay={0.3}>
            <div className="text-center mt-12">
              <a href="#book" className="btn-glow inline-flex items-center gap-2 bg-gray-900 hover:bg-gray-800 text-white px-8 py-4 rounded-full font-semibold">
                Get Your Free Quote <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          </SlideIn>
        </div>
      </section>

      {/* ═══════════════════════════════════════
           FOOTER
         ═══════════════════════════════════════ */}
      <footer className="bg-gray-900 text-white py-16 border-t border-gray-800">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-gray-900" />
                </div>
                <span className="font-serif text-xl">Arciga Cleaning</span>
              </div>
              <p className="text-gray-400 leading-relaxed">Professional residential cleaning in Long Beach. Licensed & Insured.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <div className="space-y-2">
                <a href="#why-us" className="block text-gray-400 hover:text-white transition-colors">Why Us</a>
                <a href="#quote-calculator" className="block text-gray-400 hover:text-white transition-colors">Free Quote</a>
                <a href="#book" className="block text-gray-400 hover:text-white transition-colors">Book Cleaning</a>
              </div>
              <h4 className="font-semibold mb-3 mt-6">Leave Us a Review</h4>
              <div className="space-y-2">
                <a href="https://g.page/r/YOUR_GOOGLE_ID/review" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
                  <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" /> Google
                </a>
                <a href="https://www.yelp.com/biz/arciga-cleaning-long-beach" target="_blank" rel="noopener noreferrer" className="block text-gray-400 hover:text-white transition-colors">
                  Yelp
                </a>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Service Areas</h4>
              <div className="space-y-2 text-gray-400">
                <p>Long Beach</p><p>Belmont Shore</p><p>Bixby Knolls</p><p>Naples Island</p><p>Signal Hill</p><p>Lakewood</p>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <div className="space-y-3">
                <a href="tel:+12134211673" className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors"><Phone className="w-5 h-5" />(213) 421-1673</a>
                <a href="mailto:arcigacleaning01@gmail.com" className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors"><Mail className="w-5 h-5" />arcigacleaning01@gmail.com</a>
                <div className="flex items-center gap-3 text-gray-400"><MapPin className="w-5 h-5" />Long Beach, CA</div>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-gray-500 text-sm">
            <span>&copy; 2026 Arciga Cleaning. All rights reserved.</span>
            <span>Licensed & Insured | Serving Long Beach Since 2020</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
