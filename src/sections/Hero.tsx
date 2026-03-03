import { useEffect, useRef, useState } from 'react';
import { heroConfig } from '../config';
import { ChevronDown } from 'lucide-react';

interface HeroProps {
  isReady: boolean;
}

export function Hero({ isReady }: HeroProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [counters, setCounters] = useState<number[]>([0, 0, 0]);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (isReady) {
      const timer = setTimeout(() => setIsVisible(true), 100);
      return () => clearTimeout(timer);
    }
  }, [isReady]);

  useEffect(() => {
    if (isVisible) {
      heroConfig.stats.forEach((stat, index) => {
        const duration = 2000;
        const steps = 60;
        const increment = stat.value / steps;
        let current = 0;
        const timer = setInterval(() => {
          current += increment;
          if (current >= stat.value) {
            current = stat.value;
            clearInterval(timer);
          }
          setCounters(prev => {
            const newCounters = [...prev];
            newCounters[index] = Math.floor(current);
            return newCounters;
          });
        }, duration / steps);
      });
    }
  }, [isVisible]);

  const scrollToAbout = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroConfig.backgroundImage}
          alt="Hero Background"
          className={`w-full h-full object-cover transition-transform duration-[20000ms] ease-linear ${
            isVisible ? 'scale-110' : 'scale-100'
          }`}
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 container-custom text-center text-white py-20">
        {/* Script Text */}
        <p
          className={`font-display text-lg md:text-xl tracking-widest text-green-300 mb-4 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          {heroConfig.scriptText}
        </p>

        {/* Main Title */}
        <h1
          className={`font-display text-5xl md:text-7xl lg:text-8xl font-bold leading-tight mb-8 transition-all duration-1000 delay-200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {heroConfig.mainTitle.split('\n').map((line, index) => (
            <span key={index} className="block">
              {line}
            </span>
          ))}
        </h1>

        {/* CTA Button */}
        <button
          onClick={scrollToAbout}
          className={`btn-primary inline-flex items-center gap-2 text-base transition-all duration-700 delay-500 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          {heroConfig.ctaButtonText}
          <ChevronDown className="w-5 h-5 animate-bounce" />
        </button>

        {/* Stats */}
        <div
          className={`grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 max-w-4xl mx-auto transition-all duration-1000 delay-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {heroConfig.stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 animate-pulse-soft"
              style={{ animationDelay: `${index * 0.5}s` }}
            >
              <div className="font-display text-4xl md:text-5xl font-bold text-green-300 mb-2">
                {counters[index]}
                <span className="text-2xl md:text-3xl">{stat.suffix}</span>
              </div>
              <p className="text-white/80 text-sm md:text-base">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Decorative Text */}
      <div className="absolute left-4 top-1/2 -translate-y-1/2 hidden lg:block">
        <p
          className={`text-white/20 text-xs tracking-[0.3em] uppercase transition-all duration-1000 delay-1000 ${
            isVisible ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
        >
          {heroConfig.decorativeText}
        </p>
      </div>
    </section>
  );
}
