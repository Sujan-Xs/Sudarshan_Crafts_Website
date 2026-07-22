import React, { useState, useRef, useEffect } from 'react';

import { Send, CheckCircle2, Clock, MapPin, Mail, Phone, Calendar, ChevronDown } from 'lucide-react';
import { useInquiries } from '../hooks/useInquiries';

export default function ContactForm() {
  const { addInquiry } = useInquiries();
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    countryCode: '+91',
    phone: '',
    email: '',
    contactMethod: 'Email',
    description: '',
  });

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const countryCodes = [
    { code: '+91', label: 'IN (+91)' },
    { code: '+1', label: 'US/CA (+1)' },
    { code: '+44', label: 'UK (+44)' },
    { code: '+61', label: 'AU (+61)' },
    { code: '+81', label: 'JP (+81)' },
    { code: '+971', label: 'UAE (+971)' },
    { code: '+65', label: 'SG (+65)' },
    { code: '+49', label: 'DE (+49)' },
    { code: '+33', label: 'FR (+33)' },
    { code: '+39', label: 'IT (+39)' },
    { code: '+34', label: 'ES (+34)' },
    { code: '+86', label: 'CN (+86)' },
    { code: '+27', label: 'ZA (+27)' },
    { code: '+55', label: 'BR (+55)' },
    { code: '+52', label: 'MX (+52)' },
    { code: '+966', label: 'SA (+966)' },
    { code: '+60', label: 'MY (+60)' },
    { code: '+64', label: 'NZ (+64)' },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // 1. Log to Supabase Database
      await addInquiry({
        full_name: formData.fullName,
        phone: `${formData.countryCode} ${formData.phone}`,
        email: formData.email,
        description: `[Contact via: ${formData.contactMethod}]\n${formData.description}`
      });

      // 2. Send Email via Web3Forms
      const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;
      if (accessKey) {
        const payload = {
          access_key: accessKey,
          subject: `New Commission Inquiry - ${formData.fullName}`,
          from_name: "Sudarshan Crafts System",
          name: formData.fullName,
          email: formData.email,
          phone: `${formData.countryCode} ${formData.phone}`,
          message: `Contact via: ${formData.contactMethod}\n\n${formData.description}`
        };

        const res = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(payload)
        });

        const result = await res.json();
        if (!result.success) {
          console.error("Failed to dispatch email:", result.message);
        }
      } else {
        console.warn("VITE_WEB3FORMS_ACCESS_KEY not configured. Email notification skipped.");
      }

      setFormSubmitted(true);
    } catch (error) {
      console.error("Failed to submit inquiry", error);
      alert("Failed to submit inquiry. Please try again.");
    }
  };

  const resetForm = () => {
    setFormData({
      fullName: '',
      countryCode: '+91',
      phone: '',
      email: '',
      contactMethod: 'Email',
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
                        <div className="flex items-center border-b border-brand-sand/20 focus-within:border-brand-bronze transition-colors duration-300 pb-2 relative" ref={dropdownRef}>
                          <div 
                            className="flex items-center space-x-1 cursor-pointer mr-3"
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                          >
                            <span className="text-sm text-brand-sand font-light select-none">
                              {formData.countryCode}
                            </span>
                            <ChevronDown className="w-3 h-3 text-brand-sand/70" />
                          </div>

                          {isDropdownOpen && (
                            <div className="absolute top-full left-0 mt-2 w-32 bg-[#1A1A17] border border-brand-bronze/20 shadow-xl z-50 max-h-48 overflow-y-auto">
                              {countryCodes.map((c, idx) => (
                                <div 
                                  key={idx}
                                  className={`px-3 py-2 text-xs cursor-pointer hover:bg-brand-bronze/20 transition-colors ${formData.countryCode === c.code ? 'text-brand-bronze bg-brand-bronze/10' : 'text-white'}`}
                                  onClick={() => {
                                    setFormData(prev => ({ ...prev, countryCode: c.code }));
                                    setIsDropdownOpen(false);
                                  }}
                                >
                                  {c.label}
                                </div>
                              ))}
                            </div>
                          )}

                          <input
                            type="tel"
                            id="phone"
                            name="phone"
                            required
                            pattern="[0-9\s\-\(\)]{7,20}"
                            maxLength={20}
                            minLength={7}
                            title="Please enter a valid phone number"
                            value={formData.phone}
                            onChange={handleInputChange}
                            className="bg-transparent flex-1 focus:outline-none text-sm text-white font-light w-full"
                            placeholder="98765 43210"
                          />
                        </div>
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

                    {/* Contact Preference input */}
                    <div className="flex flex-col space-y-4 pt-4">
                      <label className="text-sm text-brand-sand font-normal">I'd like to be contacted via</label>
                      <div className="flex flex-wrap gap-8 items-center">
                        {['Email', 'Phone Call', 'Either is fine'].map((method) => (
                          <label key={method} className="flex items-center space-x-3 cursor-pointer group">
                            <div className={`w-[18px] h-[18px] rounded-full border flex items-center justify-center transition-colors ${formData.contactMethod === method ? 'border-[#C85A32]' : 'border-brand-grey/50 group-hover:border-[#C85A32]/60'}`}>
                              {formData.contactMethod === method && (
                                <div className="w-[10px] h-[10px] rounded-full bg-[#C85A32]" />
                              )}
                            </div>
                            <span className="text-sm text-white font-light">{method}</span>
                            <input
                              type="radio"
                              name="contactMethod"
                              value={method}
                              checked={formData.contactMethod === method}
                              onChange={handleInputChange}
                              className="hidden"
                            />
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Description input */}
                    <div className="flex flex-col space-y-2">
                      <label htmlFor="description" className="text-[10px] tracking-[0.2em] uppercase text-brand-grey font-light">
                        Your query *
                      </label>
                      <textarea
                        id="description"
                        name="description"
                        rows={3}
                        required
                        value={formData.description}
                        onChange={handleInputChange}
                        className="bg-transparent border-b border-brand-sand/20 focus:border-brand-bronze focus:outline-none pb-2 text-sm text-white font-light transition-colors duration-300 resize-none"
                        placeholder=""
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
