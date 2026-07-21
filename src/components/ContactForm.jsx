import React, { useState } from 'react';

import { Send, CheckCircle2, Clock, MapPin, Mail, Phone, Calendar } from 'lucide-react';
import { useInquiries } from '../hooks/useInquiries';

export default function ContactForm() {
  const { addInquiry } = useInquiries();
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    description: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addInquiry({
        full_name: formData.fullName,
        phone: formData.phone,
        email: formData.email,
        description: formData.description
      });
      setFormSubmitted(true);
    } catch (error) {
      console.error("Failed to submit inquiry", error);
      alert("Failed to submit inquiry. Please try again.");
    }
  };

  const resetForm = () => {
    setFormData({
      fullName: '',
      phone: '',
      email: '',
      description: '',
    });
    setFormSubmitted(false);
  };

  return (
    <section
      className="py-24 md:py-36 bg-[#111111] text-brand-sand relative overflow-hidden"
    >
      {/* Visual background details */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-brand-sand/10" />
      <div className="absolute top-1/3 left-0 w-[40vw] h-[40vw] bg-brand-bronze/5 blur-[120px] rounded-full pointer-events-none" />

      <div id="contact" className="max-w-[1400px] mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 relative z-10">

        {/* Left Column: Premium Brand Metadata & Studio Details */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-12">

          <div className="flex flex-col">
            <h2 className="text-4xl md:text-5xl font-serif font-light text-white leading-tight">
              Begin a <br /><span className="italic text-brand-bronze">Bespoke Commission</span>
            </h2>
            <div className="w-12 h-[1px] bg-brand-bronze mt-6 mb-4" />

            <div className="space-y-4">
              <div className="flex items-start space-x-4">
                <Mail className="w-4 h-4 text-brand-bronze mt-0.5" />
                <div>
                  <h4 className="text-[10px] tracking-[0.2em] uppercase text-brand-grey font-light">Email</h4>
                  <a href="mailto:sudarshancrafts@gmail.com" className="text-sm text-white font-light hover:text-brand-bronze transition-colors">
                    sudarshancrafts@gmail.com
                  </a>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <Phone className="w-4 h-4 text-brand-bronze mt-0.5" />
                <div>
                  <h4 className="text-[10px] tracking-[0.2em] uppercase text-brand-grey font-light">Phone</h4>
                  <div className="flex flex-col leading-snug">
                    <a href="tel:+919437072474" className="text-sm text-white font-light hover:text-brand-bronze transition-colors">+91 94370 72474</a>
                    <a href="tel:+919437036161" className="text-sm text-white font-light hover:text-brand-bronze transition-colors">+91 94370 36161</a>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column: Premium Form Body */}
        <div className="lg:col-span-7">
          <div className="bg-[#1A1A17] border border-brand-bronze/15 p-8 md:p-12 relative group shadow-2xl">
            {/* Fine border inside container */}
            <div className="absolute top-4 left-4 right-4 bottom-4 border border-brand-bronze/5 pointer-events-none" />

            {!formSubmitted ? (
                <div
                  key="form-fields"
                >
                  {/* Form Submission */}
                  <form onSubmit={handleSubmit} className="space-y-8">

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {/* Name input */}
                      <div className="flex flex-col space-y-2">
                        <label htmlFor="fullName" className="text-[10px] tracking-[0.2em] uppercase text-brand-grey font-light">Full Name *</label>
                        <input
                          type="text"
                          id="fullName"
                          name="fullName"
                          required
                          value={formData.fullName}
                          onChange={handleInputChange}
                          className="bg-transparent border-b border-brand-sand/20 focus:border-brand-bronze focus:outline-none pb-2 text-sm text-white font-light transition-colors duration-300"
                          placeholder="e.g., Aditya Sharma"
                        />
                      </div>

                      {/* Phone input */}
                      <div className="flex flex-col space-y-2">
                        <label htmlFor="phone" className="text-[10px] tracking-[0.2em] uppercase text-brand-grey font-light">Contact Number *</label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          required
                          pattern="[0-9]{10}"
                          maxLength={10}
                          minLength={10}
                          title="Please enter exactly 10 digits"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="bg-transparent border-b border-brand-sand/20 focus:border-brand-bronze focus:outline-none pb-2 text-sm text-white font-light transition-colors duration-300"
                          placeholder="e.g., 9876543210"
                        />
                      </div>
                    </div>

                    {/* Email input */}
                    <div className="flex flex-col space-y-2">
                      <label htmlFor="email" className="text-[10px] tracking-[0.2em] uppercase text-brand-grey font-light">Email Address *</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        pattern="[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}"
                        title="Please enter a valid email address (e.g., name@example.com)"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="bg-transparent border-b border-brand-sand/20 focus:border-brand-bronze focus:outline-none pb-2 text-sm text-white font-light transition-colors duration-300"
                        placeholder="e.g., yourname@email.com"
                      />
                    </div>

                    {/* Description input */}
                    <div className="flex flex-col space-y-2">
                      <label htmlFor="description" className="text-[10px] tracking-[0.2em] uppercase text-brand-grey font-light">
                        Description of the Statue *
                      </label>
                      <textarea
                        id="description"
                        name="description"
                        rows={3}
                        required
                        value={formData.description}
                        onChange={handleInputChange}
                        className="bg-transparent border-b border-brand-sand/20 focus:border-brand-bronze focus:outline-none pb-2 text-sm text-white font-light transition-colors duration-300 resize-none"
                        placeholder="Please describe your requirements for the custom sculpture..."
                      />
                    </div>

                    {/* Premium action button */}
                    <button
                      type="submit"
                      className="w-full bg-brand-bronze text-white hover:bg-white hover:text-[#111111] transition-all duration-500 py-4 uppercase text-xs tracking-[0.25em] font-light flex items-center justify-center space-x-2 border border-brand-bronze hover:border-white shadow-md cursor-pointer"
                    >
                      <span>Transmit Inquiry</span>
                      <Send className="w-3.5 h-3.5" />
                    </button>

                  </form>
                </div>
              ) : (
                // Elegant Submission Success Card
                <div
                  key="success-card"
                  className="flex flex-col items-center justify-center py-16 text-center space-y-6"
                >
                  <CheckCircle2 className="w-16 h-16 text-brand-bronze stroke-[1.25] animate-pulse-subtle" />

                  <div className="space-y-2">
                    <h3 className="text-2xl font-serif text-white font-light">
                      Inquiry Logged
                    </h3>
                    <p className="text-xs text-brand-grey uppercase tracking-widest">
                      Reference Code: INQ-2026-{(Math.random() * 10000).toFixed(0)}
                    </p>
                  </div>

                  <p className="text-xs text-brand-sand/80 font-light max-w-sm leading-relaxed">
                    Thank you, {formData.fullName || "valued client"}. Our Lead Curator is reviewing your request. A formal response and diagnostic follow-up will be dispatched to <strong className="text-white font-normal">{formData.email}</strong> within 24 working hours.
                  </p>

                  <button
                    onClick={resetForm}
                    className="mt-6 border border-brand-bronze/35 text-brand-bronze hover:bg-brand-bronze hover:text-white px-8 py-2.5 text-xs uppercase tracking-[0.2em] font-light transition-all duration-300 cursor-pointer"
                  >
                    Submit New Request
                  </button>
                </div>
              )}
            </div>
        </div>

      </div>
    </section>
  );
}
