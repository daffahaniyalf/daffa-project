import { useState, useEffect, useRef } from 'react';
import { Send, CheckCircle, AlertCircle, MapPin, Phone, Mail, Clock } from 'lucide-react';
import { contactFormConfig } from '../config';

// Icon lookup map for dynamic icon resolution from config strings
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  MapPin, Phone, Mail, Clock,
};

export function ContactForm() {
  // Null check: if config is empty, render nothing
  if (!contactFormConfig.mainTitle) return null;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    visitDate: '',
    visitors: '1',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission (no actual endpoint)
    setTimeout(() => {
      setStatus('success');
      setFormData({ name: '', email: '', phone: '', visitDate: '', visitors: '2', message: '' });
      setIsSubmitting(false);
      setTimeout(() => setStatus('idle'), 5000);
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const form = contactFormConfig.form;

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="section-padding bg-white relative overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #22c55e 1px, transparent 0)`,
          backgroundSize: '32px 32px'
        }} />
      </div>

      <div className="container-custom relative">
        {/* Section Header */}
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <p className="text-green-600 font-medium tracking-wider uppercase text-sm mb-2">
            {contactFormConfig.scriptText}
          </p>
          <p className="text-blue-600 font-medium tracking-wider uppercase text-sm mb-4">
            {contactFormConfig.subtitle}
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            {contactFormConfig.mainTitle}
          </h2>
          {contactFormConfig.introText && (
            <p className="text-gray-600 max-w-2xl mx-auto">
              {contactFormConfig.introText}
            </p>
          )}
        </div>

        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
          {/* Contact Info */}
          <div className="lg:col-span-2 space-y-6">
            <div
              className={`transition-all duration-1000 delay-100 ${
                isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
              }`}
            >
              {contactFormConfig.contactInfoTitle && (
                <h3 className="font-display text-xl font-bold text-gray-800 mb-6">{contactFormConfig.contactInfoTitle}</h3>
              )}
              <div className="space-y-4" role="list" aria-label="Contact information">
                {contactFormConfig.contactInfo.map((item) => {
                  const IconComponent = iconMap[item.icon];
                  return (
                    <div
                      key={item.label}
                      className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100 hover:border-green-200 hover:bg-green-50 transition-colors"
                      role="listitem"
                    >
                      <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center flex-shrink-0">
                        {IconComponent && <IconComponent className="w-6 h-6 text-green-600" />}
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">{item.label}</p>
                        <p className="text-gray-800 font-medium">{item.value}</p>
                        <p className="text-sm text-gray-500">{item.subtext}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-3">
            <div
              className={`bg-white rounded-2xl border border-gray-200 shadow-card p-8 transition-all duration-1000 delay-200 ${
                isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
              }`}
            >
              {status === 'success' ? (
                <div className="text-center py-12" role="alert">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-10 h-10 text-green-600" />
                  </div>
                  <h3 className="font-display text-2xl font-bold text-gray-800 mb-2">
                    {form.successMessage}
                  </h3>
                </div>
              ) : status === 'error' ? (
                <div className="text-center py-12" role="alert">
                  <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <AlertCircle className="w-10 h-10 text-red-600" />
                  </div>
                  <h3 className="font-display text-2xl font-bold text-gray-800 mb-2">
                    {form.errorMessage}
                  </h3>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Name */}
                    <div>
                      <label htmlFor="contact-name" className="block text-sm text-gray-700 font-medium mb-2">
                        {form.nameLabel} <span className="text-green-500">*</span>
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder={form.namePlaceholder}
                        autoComplete="name"
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-colors"
                      />
                    </div>

                    {/* Phone */}
                    <div>
                      <label htmlFor="contact-phone" className="block text-sm text-gray-700 font-medium mb-2">
                        {form.phoneLabel} <span className="text-green-500">*</span>
                      </label>
                      <input
                        id="contact-phone"
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        placeholder={form.phonePlaceholder}
                        autoComplete="tel"
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-colors"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label htmlFor="contact-email" className="block text-sm text-gray-700 font-medium mb-2">
                        {form.emailLabel} <span className="text-green-500">*</span>
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder={form.emailPlaceholder}
                        autoComplete="email"
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-colors"
                      />
                    </div>

                    {/* Visit Date */}
                    <div>
                      <label htmlFor="contact-date" className="block text-sm text-gray-700 font-medium mb-2">
                        {form.visitDateLabel} <span className="text-green-500">*</span>
                      </label>
                      <input
                        id="contact-date"
                        type="date"
                        name="visitDate"
                        value={formData.visitDate}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-800 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-colors"
                      />
                    </div>
                  </div>

                  {/* Number of Visitors */}
                  {form.visitorsOptions.length > 0 && (
                    <div>
                      <label htmlFor="contact-visitors" className="block text-sm text-gray-700 font-medium mb-2">
                        {form.visitorsLabel}
                      </label>
                      <select
                        id="contact-visitors"
                        name="visitors"
                        value={formData.visitors}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-800 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-colors"
                      >
                        {form.visitorsOptions.map((option) => (
                          <option key={option} value={option}>{option}</option>
                        ))}
                      </select>
                    </div>
                  )}

                  {/* Message */}
                  <div>
                    <label htmlFor="contact-message" className="block text-sm text-gray-700 font-medium mb-2">
                      {form.messageLabel}
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={4}
                      placeholder={form.messagePlaceholder}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-colors resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        {form.submittingText}
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        {form.submitText}
                      </>
                    )}
                  </button>

                  {contactFormConfig.privacyNotice && (
                    <p className="text-xs text-gray-500 text-center">
                      {contactFormConfig.privacyNotice}
                    </p>
                  )}
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
