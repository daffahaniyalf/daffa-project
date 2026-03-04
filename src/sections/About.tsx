import { useEffect, useRef, useState } from "react";
import { aboutConfig } from "../config";
import { Trash2, Zap, RefreshCw } from "lucide-react";

const iconMap: Record<string, React.ElementType> = {
  Trash2,
  Zap,
  RefreshCw,
};

export function About() {
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
      { threshold: 0.2 },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="section-padding bg-white">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image */}
          <div
            className={`relative transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-12"
            }`}
          >
            <div className="relative rounded-3xl overflow-hidden shadow-card-hover">
              <img
                src={aboutConfig.image}
                alt={aboutConfig.imageAlt}
                className="w-full h-auto object-cover"
              />
              {/* Decorative elements */}
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-green-500/20 rounded-full blur-2xl" />
              <div className="absolute -top-6 -left-6 w-24 h-24 bg-blue-500/20 rounded-full blur-2xl" />
            </div>
            {/* Floating badge */}
            <div className="absolute -bottom-4 -right-4 bg-white rounded-2xl shadow-card p-4 animate-float">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                  <Zap className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="font-display font-bold text-2xl text-gray-800">
                    90%
                  </p>
                  <p className="text-sm text-gray-500">Reduksi Sampah</p>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div
            className={`transition-all duration-1000 delay-200 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-12"
            }`}
          >
            {/* Script Text */}
            <p className="text-green-600 font-medium tracking-wider uppercase text-sm mb-2">
              {aboutConfig.scriptText}
            </p>

            {/* Subtitle */}
            <p className="text-blue-600 font-medium tracking-wider uppercase text-sm mb-4">
              {aboutConfig.subtitle}
            </p>

            {/* Main Title */}
            <h2 className="font-display text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              {aboutConfig.mainTitle}
            </h2>

            {/* Body Text */}
            <p className="text-gray-600 text-lg leading-relaxed mb-8">
              {aboutConfig.bodyText}
            </p>

            {/* Features */}
            <div className="space-y-4">
              {aboutConfig.features.map((feature, index) => {
                const Icon = iconMap[feature.icon] || Zap;
                return (
                  <div
                    key={index}
                    className={`flex items-start gap-4 p-4 rounded-xl bg-gray-50 hover:bg-green-50 transition-all duration-300 group ${
                      isVisible
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-4"
                    }`}
                    style={{ transitionDelay: `${400 + index * 100}ms` }}
                  >
                    <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-green-200 transition-colors">
                      <Icon className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-display font-semibold text-lg text-gray-800 mb-1">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 text-sm">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
