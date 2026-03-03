import { useEffect, useRef, useState } from 'react';
import { technologyConfig } from '../config';
import { Check, Zap } from 'lucide-react';

const colorMap: Record<string, { bg: string; text: string; shadow: string; gradient: string }> = {
  blue: {
    bg: 'bg-blue-100',
    text: 'text-blue-600',
    shadow: 'shadow-blue',
    gradient: 'from-blue-500 to-blue-700',
  },
  green: {
    bg: 'bg-green-100',
    text: 'text-green-600',
    shadow: 'shadow-green',
    gradient: 'from-green-500 to-green-700',
  },
  purple: {
    bg: 'bg-purple-100',
    text: 'text-purple-600',
    shadow: 'shadow-purple',
    gradient: 'from-purple-500 to-purple-700',
  },
};

export function Technology() {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
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
      id="technology"
      ref={sectionRef}
      className="section-padding bg-white"
    >
      <div className="container-custom">
        {/* Header */}
        <div
          className={`text-center max-w-3xl mx-auto mb-16 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <p className="text-green-600 font-medium tracking-wider uppercase text-sm mb-2">
            {technologyConfig.scriptText}
          </p>
          <p className="text-blue-600 font-medium tracking-wider uppercase text-sm mb-4">
            {technologyConfig.subtitle}
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-gray-800">
            {technologyConfig.mainTitle}
          </h2>
        </div>

        {/* Technology Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 perspective-1000">
          {technologyConfig.technologies.map((tech, index) => {
            const colors = colorMap[tech.color] || colorMap.blue;
            const isHovered = hoveredCard === tech.id;

            return (
              <div
                key={tech.id}
                className={`relative group transition-all duration-700 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                }`}
                style={{
                  transitionDelay: `${200 + index * 150}ms`,
                  transform: isHovered ? 'translateY(-12px) rotateY(0deg)' : 'translateY(0) rotateY(5deg)',
                  transformStyle: 'preserve-3d',
                }}
                onMouseEnter={() => setHoveredCard(tech.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div
                  className={`bg-white rounded-3xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 h-full border border-gray-100 ${
                    isHovered ? colors.shadow : ''
                  }`}
                >
                  {/* Image */}
                  <div className={`relative h-56 ${colors.bg} flex items-center justify-center overflow-hidden`}>
                    <img
                      src={tech.image}
                      alt={tech.name}
                      className={`w-full h-full object-contain p-6 transition-transform duration-500 ${
                        isHovered ? 'scale-110' : 'scale-100'
                      }`}
                    />
                    {/* Efficiency Badge */}
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1 shadow-sm">
                      <Zap className={`w-4 h-4 ${colors.text}`} />
                      <span className={`text-sm font-semibold ${colors.text}`}>{tech.efficiency}</span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="font-display font-bold text-2xl text-gray-800 mb-3">
                      {tech.name}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed mb-6">
                      {tech.description}
                    </p>

                    {/* Features */}
                    <div className="space-y-2">
                      {tech.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center gap-2">
                          <div className={`w-5 h-5 ${colors.bg} rounded-full flex items-center justify-center flex-shrink-0`}>
                            <Check className={`w-3 h-3 ${colors.text}`} />
                          </div>
                          <span className="text-gray-600 text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Bottom Gradient Bar */}
                  <div className={`h-1 bg-gradient-to-r ${colors.gradient}`} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
