import { useState, useEffect } from 'react';
import { Sparkles, Home, Clock, Shield, Phone, Mail, MapPin, ChevronDown, Star, Check, Leaf, Droplets } from 'lucide-react';

// Custom CSS for animations and fonts
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=Outfit:wght@300;400;500;600;700&display=swap');
  
  :root {
    --teal: #0D9488;
    --teal-light: #5EEAD4;
    --teal-dark: #0F766E;
    --coral: #F97316;
    --coral-light: #FB923C;
    --coral-dark: #EA580C;
    --charcoal: #1F2937;
    --cream: #FEFCE8;
  }
  
  * {
    font-family: 'Outfit', sans-serif;
  }
  
  .font-serif {
    font-family: 'DM Serif Display', serif;
  }
  
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-20px); }
  }
  
  @keyframes float-slow {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    50% { transform: translateY(-15px) rotate(5deg); }
  }
  
  @keyframes shimmer {
    0% { background-position: -200% center; }
    100% { background-position: 200% center; }
  }
  
  @keyframes pulse-glow {
    0%, 100% { box-shadow: 0 0 20px rgba(13, 148, 136, 0.3); }
    50% { box-shadow: 0 0 40px rgba(13, 148, 136, 0.5); }
  }
  
  @keyframes sparkle {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.5; transform: scale(1.2); }
  }
  
  @keyframes slide-up {
    from { opacity: 0; transform: translateY(30px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  @keyframes fade-in {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  @keyframes scroll {
    0% { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }

  .animate-scroll {
    animation: scroll 20s linear infinite;
  }

  .animate-scroll:hover {
    animation-play-state: paused;
  }

  .animate-float { animation: float 6s ease-in-out infinite; }
  .animate-float-slow { animation: float-slow 8s ease-in-out infinite; }
  .animate-shimmer { 
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
    background-size: 200% 100%;
    animation: shimmer 3s infinite;
  }
  .animate-pulse-glow { animation: pulse-glow 2s ease-in-out infinite; }
  .animate-sparkle { animation: sparkle 2s ease-in-out infinite; }
  .animate-slide-up { animation: slide-up 0.6s ease-out forwards; }
  .animate-fade-in { animation: fade-in 0.8s ease-out forwards; }
  
  .delay-100 { animation-delay: 0.1s; }
  .delay-200 { animation-delay: 0.2s; }
  .delay-300 { animation-delay: 0.3s; }
  .delay-400 { animation-delay: 0.4s; }
  .delay-500 { animation-delay: 0.5s; }
  
  .hover-lift {
    transition: all 0.3s ease;
  }
  .hover-lift:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 40px rgba(0,0,0,0.1);
  }
  
  .btn-glow {
    transition: all 0.3s ease;
  }
  .btn-glow:hover {
    transform: scale(1.05);
    box-shadow: 0 10px 30px rgba(249, 115, 22, 0.4);
  }
  
  .gradient-text {
    background: linear-gradient(135deg, #0D9488, #5EEAD4);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  
  .wave-divider {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    overflow: hidden;
    line-height: 0;
  }
  
  .wave-divider svg {
    position: relative;
    display: block;
    width: calc(100% + 1.3px);
    height: 80px;
  }
`;

export default function ArcigaCleaning() {
  const [activeAccordion, setActiveAccordion] = useState(null);
  const [isVisible, setIsVisible] = useState({});
  const [formStatus, setFormStatus] = useState('idle'); // idle, submitting, success, error

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus('submitting');

    const form = e.target;
    const data = new FormData(form);

    try {
      const response = await fetch('https://formspree.io/f/xykzrywq', {
        method: 'POST',
        body: data,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        setFormStatus('success');
        form.reset();
      } else {
        setFormStatus('error');
      }
    } catch (error) {
      setFormStatus('error');
    }
  };
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setIsVisible(prev => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.1 }
    );
    
    document.querySelectorAll('section[id]').forEach(section => {
      observer.observe(section);
    });
    
    return () => observer.disconnect();
  }, []);

  const services = [
    { icon: Home, title: 'Standard Clean', desc: 'Perfect for regular maintenance. Dusting, vacuuming, mopping, and bathroom sanitization.', price: 'From $170' },
    { icon: Sparkles, title: 'Deep Clean', desc: 'Thorough top-to-bottom cleaning. Inside appliances, baseboards, and hard-to-reach areas.', price: 'From $250' },
    { icon: Clock, title: 'Move In/Out', desc: 'Get your deposit back or start fresh. Complete cleaning for transitions.', price: 'From $300' },
    { icon: Leaf, title: 'Eco-Friendly', desc: 'All-natural, non-toxic products safe for kids, pets, and the planet.', price: 'Add $25' },
  ];

  const testimonials = [
    { name: 'Maria T.', location: 'Belmont Shore', text: 'Finally found a cleaner I can trust! My house has never looked better. So detail-oriented.', rating: 5 },
    { name: 'James & Lisa K.', location: 'Bixby Knolls', text: 'We\'ve used Arciga Cleaning for 6 months now. Consistent, reliable, and always on time.', rating: 5 },
    { name: 'Sandra M.', location: 'Naples Island', text: 'The deep clean exceeded my expectations. They got stains out I thought were permanent!', rating: 5 },
  ];

  const faqs = [
    { q: 'What areas do you serve?', a: 'We proudly serve Long Beach and surrounding areas including Belmont Shore, Bixby Knolls, Naples, Signal Hill, and Lakewood. If you live outside these areas, there will be an additional travel charge.' },
    { q: 'Do I need to be home during cleaning?', a: 'Nope! Many clients give us a key or garage code. We\'re fully insured and background-checked for your peace of mind.' },
    { q: 'What products do you use?', a: 'We use professional-grade cleaning products. Upon request, we also offer eco-friendly, non-toxic alternatives at a small additional cost.' },
    { q: 'How do I pay?', a: 'We accept Venmo, Zelle, and cash. Payment is due upon completion of service.' },
    { q: 'What if I need to reschedule?', a: 'Life happens! Just give us 24 hours notice and we\'ll find a new time that works for you.' },
  ];

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <style>{styles}</style>
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-500 to-teal-600 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="font-serif text-xl text-gray-800">Arciga Cleaning</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
            <a href="#services" className="hover:text-teal-600 transition-colors">Services</a>
            <a href="#about" className="hover:text-teal-600 transition-colors">About</a>
            <a href="#testimonials" className="hover:text-teal-600 transition-colors">Reviews</a>
            <a href="#faq" className="hover:text-teal-600 transition-colors">FAQ</a>
          </div>
          <a href="#book" className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2.5 rounded-lg font-semibold text-sm transition-all hover:scale-105 shadow-lg shadow-orange-500/25">
            Book Now
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="relative min-h-screen bg-gradient-to-br from-white via-teal-50/50 to-white pt-20 overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-32 right-10 w-64 h-64 bg-teal-400/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-32 left-10 w-80 h-80 bg-orange-400/10 rounded-full blur-3xl animate-float-slow"></div>
        <div className="absolute top-1/3 left-1/4 w-4 h-4 bg-teal-400 rounded-full animate-sparkle"></div>
        <div className="absolute top-1/2 right-1/3 w-3 h-3 bg-orange-400 rounded-full animate-sparkle delay-300"></div>
        <div className="absolute bottom-1/3 left-1/3 w-2 h-2 bg-teal-300 rounded-full animate-sparkle delay-500"></div>
        
        <div className="relative max-w-6xl mx-auto px-6 flex flex-col justify-center items-center min-h-screen text-center">
          <div className="animate-slide-up opacity-0" style={{ animationDelay: '0.1s', animationFillMode: 'forwards' }}>
            <span className="inline-flex items-center gap-2 text-sm font-semibold text-teal-600 mb-6 tracking-widest uppercase bg-teal-50 px-4 py-2 rounded-full">
              <MapPin className="w-4 h-4" /> Serving Long Beach
            </span>
          </div>
          
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-gray-800 mb-6 leading-tight animate-slide-up opacity-0" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
            Your Home<br />
            <span className="gradient-text">Deserves Better</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 mb-10 max-w-2xl animate-slide-up opacity-0" style={{ animationDelay: '0.3s', animationFillMode: 'forwards' }}>
            Professional cleaning services that actually care.<br className="hidden md:block" />
            Local, reliable, and detail-obsessed.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 animate-slide-up opacity-0" style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}>
            <a href="#book" className="btn-glow bg-orange-500 hover:bg-orange-600 text-white px-10 py-4 rounded-xl font-semibold text-lg shadow-xl shadow-orange-500/30">
              Get Your Free Estimate
            </a>
            <a href="#services" className="bg-white hover:bg-gray-50 text-gray-800 px-10 py-4 rounded-xl font-semibold text-lg border-2 border-gray-200 hover:border-teal-300 transition-all">
              View Services
            </a>
          </div>
          
          {/* Trust Badges */}
          <div className="flex flex-wrap justify-center gap-6 mt-16 animate-slide-up opacity-0" style={{ animationDelay: '0.5s', animationFillMode: 'forwards' }}>
            <div className="flex items-center gap-2 text-gray-500 text-sm">
              <Shield className="w-5 h-5 text-teal-500" />
              <span>Fully Insured</span>
            </div>
            <div className="flex items-center gap-2 text-gray-500 text-sm">
              <Check className="w-5 h-5 text-teal-500" />
              <span>Background Checked</span>
            </div>
            <div className="flex items-center gap-2 text-gray-500 text-sm">
              <Star className="w-5 h-5 text-orange-400 fill-orange-400" />
              <span>5-Star Rated</span>
            </div>
          </div>
        </div>
        
        {/* Wave Divider */}
        <div className="wave-divider">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C57.1,118.92,156.63,69.08,321.39,56.44Z" fill="#ffffff"></path>
          </svg>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 bg-white relative">
        <div className="max-w-6xl mx-auto px-6">
          <div className={`text-center mb-16 ${isVisible.services ? 'animate-slide-up' : 'opacity-0'}`}>
            <span className="text-teal-600 font-semibold text-sm tracking-widest uppercase">What We Offer</span>
            <h2 className="font-serif text-4xl md:text-5xl text-gray-800 mt-4">Services Tailored to You</h2>
            <p className="text-gray-600 mt-4 max-w-xl mx-auto">From quick touch-ups to deep transformations, we've got your home covered.</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, i) => (
              <div 
                key={i}
                className={`hover-lift bg-gradient-to-br from-white to-gray-50 p-8 rounded-2xl border border-gray-100 group cursor-pointer ${isVisible.services ? 'animate-slide-up' : 'opacity-0'}`}
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-teal-500 to-teal-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg shadow-teal-500/25">
                  <service.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="font-serif text-xl text-gray-800 mb-3">{service.title}</h3>
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">{service.desc}</p>
                <span className="text-orange-500 font-semibold">{service.price}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-gradient-to-br from-teal-50 to-white relative overflow-hidden">
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-teal-100 rounded-full blur-3xl opacity-50"></div>
        <div className="max-w-6xl mx-auto px-6 relative">
          <div className={`grid md:grid-cols-2 gap-16 items-center ${isVisible.about ? 'animate-fade-in' : 'opacity-0'}`}>
            <div>
              <span className="text-teal-600 font-semibold text-sm tracking-widest uppercase">Why Arciga</span>
              <h2 className="font-serif text-4xl md:text-5xl text-gray-800 mt-4 mb-6">Cleaning That Feels Like Home</h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                Hi, I'm the face behind Arciga Cleaning. For years, I've been helping Long Beach families come home to spaces that feel fresh, peaceful, and truly clean.
              </p>
              <p className="text-gray-600 leading-relaxed mb-8">
                Every home is unique, and I treat yours with the care and attention it deserves. No rushed jobs, no cutting corners — just honest, thorough cleaning you can count on.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-teal-100 flex items-center justify-center flex-shrink-0">
                    <Check className="w-5 h-5 text-teal-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Locally Owned</h4>
                    <p className="text-sm text-gray-500">Proud LB resident</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-teal-100 flex items-center justify-center flex-shrink-0">
                    <Check className="w-5 h-5 text-teal-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Consistent Quality</h4>
                    <p className="text-sm text-gray-500">Same cleaner every time</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-teal-100 flex items-center justify-center flex-shrink-0">
                    <Check className="w-5 h-5 text-teal-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Flexible Scheduling</h4>
                    <p className="text-sm text-gray-500">On your time</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-teal-100 flex items-center justify-center flex-shrink-0">
                    <Check className="w-5 h-5 text-teal-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">100% Satisfaction</h4>
                    <p className="text-sm text-gray-500">Guaranteed</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-teal-500 to-teal-600 rounded-3xl p-1">
                <div className="bg-white rounded-3xl p-8">
                  <div className="aspect-square rounded-2xl bg-gradient-to-br from-teal-50 to-orange-50 flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-32 h-32 rounded-full bg-teal-100 animate-pulse-glow"></div>
                    </div>
                    <Sparkles className="w-24 h-24 text-teal-500 relative z-10 animate-float" />
                    <Droplets className="absolute top-8 right-8 w-8 h-8 text-teal-300 animate-float-slow" />
                    <Leaf className="absolute bottom-8 left-8 w-8 h-8 text-teal-300 animate-float delay-300" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-24 bg-white overflow-hidden">
        <div className="max-w-6xl mx-auto px-6">
          <div className={`text-center mb-16 ${isVisible.testimonials ? 'animate-slide-up' : 'opacity-0'}`}>
            <span className="text-teal-600 font-semibold text-sm tracking-widest uppercase">Happy Homes</span>
            <h2 className="font-serif text-4xl md:text-5xl text-gray-800 mt-4">What Our Clients Say</h2>
          </div>
        </div>

        <div className="relative">
          <div className="flex animate-scroll" style={{ width: 'fit-content' }}>
            {[...testimonials, ...testimonials].map((testimonial, i) => (
              <div
                key={i}
                className="flex-shrink-0 w-[350px] mx-4 bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl border border-gray-100"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, j) => (
                    <Star key={j} className="w-5 h-5 text-orange-400 fill-orange-400" />
                  ))}
                </div>
                <p className="text-gray-600 leading-relaxed mb-6 italic">"{testimonial.text}"</p>
                <div>
                  <p className="font-semibold text-gray-800">{testimonial.name}</p>
                  <p className="text-sm text-teal-600">{testimonial.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking Section */}
      <section id="book" className="py-24 bg-gradient-to-br from-teal-600 to-teal-700 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-40 h-40 border-2 border-white rounded-full"></div>
          <div className="absolute bottom-10 right-10 w-60 h-60 border-2 border-white rounded-full"></div>
          <div className="absolute top-1/2 left-1/2 w-80 h-80 border border-white rounded-full -translate-x-1/2 -translate-y-1/2"></div>
        </div>
        
        <div className="max-w-4xl mx-auto px-6 text-center relative">
          <h2 className="font-serif text-4xl md:text-5xl text-white mb-6">Ready to Reclaim Your Time?</h2>
          <p className="text-teal-100 text-xl mb-10 max-w-2xl mx-auto">
            Book your cleaning today and come home to a space that sparkles. Free estimates, no obligations.
          </p>
          
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl">
            {formStatus === 'success' ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check className="w-8 h-8 text-teal-600" />
                </div>
                <h3 className="font-serif text-2xl text-gray-800 mb-2">Thank You!</h3>
                <p className="text-gray-600">We'll get back to you within 24 hours.</p>
                <button
                  onClick={() => setFormStatus('idle')}
                  className="mt-6 text-teal-600 font-semibold hover:underline"
                >
                  Submit another request
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="grid md:grid-cols-2 gap-8 mb-8">
                  <div className="text-left">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Your Name</label>
                    <input
                      type="text"
                      name="name"
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none transition-all"
                      placeholder="Maria Garcia"
                    />
                  </div>
                  <div className="text-left">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none transition-all"
                      placeholder="(562) 555-0123"
                    />
                  </div>
                  <div className="text-left">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none transition-all"
                      placeholder="maria@email.com"
                    />
                  </div>
                  <div className="text-left">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Service Type</label>
                    <select
                      name="service"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none transition-all bg-white"
                    >
                      <option>Standard Clean</option>
                      <option>Deep Clean</option>
                      <option>Move In/Out</option>
                      <option>Not sure yet</option>
                    </select>
                  </div>
                </div>
                <div className="text-left mb-8">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Tell us about your home</label>
                  <textarea
                    name="message"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none transition-all resize-none"
                    rows="3"
                    placeholder="Number of bedrooms, bathrooms, any special requests..."
                  ></textarea>
                </div>
                {formStatus === 'error' && (
                  <p className="text-red-500 text-sm mb-4 text-center">Something went wrong. Please try again.</p>
                )}
                <button
                  type="submit"
                  disabled={formStatus === 'submitting'}
                  className="btn-glow w-full bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 text-white py-4 rounded-xl font-semibold text-lg shadow-xl shadow-orange-500/30"
                >
                  {formStatus === 'submitting' ? 'Sending...' : 'Get My Free Estimate'}
                </button>
                <p className="text-sm text-gray-500 mt-4">We'll get back to you within 24 hours!</p>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-24 bg-gray-50">
        <div className="max-w-3xl mx-auto px-6">
          <div className={`text-center mb-16 ${isVisible.faq ? 'animate-slide-up' : 'opacity-0'}`}>
            <span className="text-teal-600 font-semibold text-sm tracking-widest uppercase">Questions?</span>
            <h2 className="font-serif text-4xl md:text-5xl text-gray-800 mt-4">We've Got Answers</h2>
          </div>
          
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div 
                key={i}
                className={`bg-white rounded-2xl border border-gray-100 overflow-hidden ${isVisible.faq ? 'animate-slide-up' : 'opacity-0'}`}
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <button
                  onClick={() => setActiveAccordion(activeAccordion === i ? null : i)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
                >
                  <span className="font-semibold text-gray-800">{faq.q}</span>
                  <ChevronDown 
                    className={`w-5 h-5 text-teal-500 transition-transform ${activeAccordion === i ? 'rotate-180' : ''}`}
                  />
                </button>
                {activeAccordion === i && (
                  <div className="px-6 pb-5">
                    <p className="text-gray-600 leading-relaxed">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-12 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-500 to-teal-600 flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <span className="font-serif text-xl">Arciga Cleaning</span>
              </div>
              <p className="text-gray-400 leading-relaxed">
                Professional residential cleaning services in Long Beach and surrounding areas.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <div className="space-y-2">
                <a href="#services" className="block text-gray-400 hover:text-teal-400 transition-colors">Services</a>
                <a href="#about" className="block text-gray-400 hover:text-teal-400 transition-colors">About</a>
                <a href="#testimonials" className="block text-gray-400 hover:text-teal-400 transition-colors">Reviews</a>
                <a href="#book" className="block text-gray-400 hover:text-teal-400 transition-colors">Book Now</a>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <div className="space-y-3">
                <a href="tel:+12134211673" className="flex items-center gap-3 text-gray-400 hover:text-teal-400 transition-colors">
                  <Phone className="w-5 h-5" />
                  (213) 421-1673
                </a>
                <a href="mailto:arcigacleaning01@gmail.com" className="flex items-center gap-3 text-gray-400 hover:text-teal-400 transition-colors">
                  <Mail className="w-5 h-5" />
                  arcigacleaning01@gmail.com
                </a>
                <div className="flex items-center gap-3 text-gray-400">
                  <MapPin className="w-5 h-5" />
                  Long Beach, CA
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8 text-center text-gray-500 text-sm">
            © 2026 Arciga Cleaning. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
