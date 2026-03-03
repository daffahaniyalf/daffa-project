import { useEffect, useRef, useState } from 'react';
import { processConfig } from '../config';
import { ArrowRight } from 'lucide-react';

export function Process() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="process"
      ref={sectionRef}
      className="section-padding bg-gradient-to-b from-gray-50 to-white"
    >
      <div className="container-custom">
        {/* Header */}
        <div
          className={`text-center max-w-3xl mx-auto mb-16 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <p className="text-green-600 font-medium tracking-wider uppercase text-sm mb-2">
            {processConfig.scriptText}
          </p>
          <p className="text-blue-600 font-medium tracking-wider uppercase text-sm mb-4">
            {processConfig.subtitle}
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-gray-800">
            {processConfig.mainTitle}
          </h2>
        </div>

        {/* Process Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {processConfig.steps.map((step, index) => (
            <div
              key={step.id}
              className={`relative group transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
              style={{ transitionDelay: `${200 + index * 150}ms` }}
            >
              {/* Card */}
              <div className="bg-white rounded-3xl p-6 shadow-card hover:shadow-card-hover transition-all duration-300 h-full border border-gray-100">
                {/* Step Number */}
                <div className="absolute -top-4 -left-2 w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-green">
                  {step.id}
                </div>

                {/* Image */}
                <div className="mb-6 mt-4">
                  <img
                    src={step.image}
                    alt={step.title}
                    className="w-full h-48 object-contain transition-transform duration-300 group-hover:scale-105"
                  />
                </div>

                {/* Content */}
                <h3 className="font-display font-bold text-xl text-gray-800 mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {step.description}
                </p>

                {/* Arrow connector (hidden on last item and mobile) */}
                {index < processConfig.steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <ArrowRight className="w-4 h-4 text-green-600" />
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Flow indicator */}
        <div
          className={`hidden lg:flex items-center justify-center mt-12 transition-all duration-1000 delay-700 ${
            isVisible ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="flex items-center gap-4">
            <div className="w-4 h-4 bg-green-500 rounded-full animate-pulse" />
            <div className="w-32 h-1 bg-gradient-to-r from-green-500 to-blue-500 rounded-full" />
            <div className="w-4 h-4 bg-blue-500 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
            <div className="w-32 h-1 bg-gradient-to-r from-blue-500 to-green-500 rounded-full" />
            <div className="w-4 h-4 bg-green-500 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
          </div>
        </div>
      </div>
    </section>
  );
}
