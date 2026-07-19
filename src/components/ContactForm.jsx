import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle2, Clock, MapPin, Mail, Phone, Calendar } from 'lucide-react';

export default function ContactForm() {
  const [inquiryType, setInquiryType] = useState('commission'); // 'commission' | 'catalogue' | 'consultation'
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    role: '',
    email: '',
    phone: '',
    projectDetails: '',
    preferredDate: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate luxury API response delay
    setTimeout(() => {
      setFormSubmitted(true);
    }, 1000);
  };

  const resetForm = () => {
    setFormData({
      fullName: '',
      role: '',
      email: '',
      phone: '',
      projectDetails: '',
      preferredDate: '',
    });
    setFormSubmitted(false);
  };

  const tabs = [
    { id: 'commission', label: 'Commission Sacred Art', desc: 'Submit specifications for custom hand-carved deity stone masterpieces.' },
    { id: 'catalogue', label: 'Request Private Catalogue', desc: 'Acquire our private leatherbound print or high-fidelity digital museum archives.' },
    { id: 'consultation', label: 'Consult for Architectural Spaces', desc: 'Consult with our master sculptors for hotel foyer, public monument, or villa installations.' }
  ];

  return (
    <section
      id="contact"
      className="py-24 md:py-36 bg-[#111111] text-brand-sand relative overflow-hidden"
    >
      {/* Visual background details */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-brand-sand/10" />
      <div className="absolute top-1/3 left-0 w-[40vw] h-[40vw] bg-brand-bronze/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 relative z-10">

        {/* Left Column: Premium Brand Metadata & Studio Details */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-12">

          <div className="space-y-6">
            <span className="text-[10px] tracking-[0.3em] text-brand-bronze uppercase block font-light">
              07 // ACQUISITIONS & INQUIRIES
            </span>
            <h2 className="text-4xl md:text-5xl font-serif font-light text-white leading-tight">
              Begin a <br /><span className="italic text-brand-bronze">Bespoke Commission</span>
            </h2>
            <div className="w-12 h-[1px] bg-brand-bronze my-6" />
            <p className="text-xs text-brand-grey font-light leading-relaxed max-w-sm">
              We accept a limited number of custom architectural and residential commissions annually to ensure meticulous quality. We invite collectors, architects, and designers to reach out.
            </p>
          </div>

          {/* Contact Details List */}
          <div className="space-y-8 border-t border-brand-sand/10 pt-10">

            <div className="flex items-start space-x-4">
              <MapPin className="w-4 h-4 text-brand-bronze stroke-[1.5] mt-0.5" />
              <div>
                <span className="text-[9px] tracking-[0.2em] uppercase text-brand-grey block">Sudarshan Crafts Museum</span>
                <span className="text-xs text-white/90 font-light mt-1 block">
                  Station Road<br />Puri- 752002, Odisha, India
                </span>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <Clock className="w-4 h-4 text-brand-bronze stroke-[1.5] mt-0.5" />
              <div>
                <span className="text-[9px] tracking-[0.2em] uppercase text-brand-grey block">Gallery Viewings</span>
                <span className="text-xs text-white/90 font-light mt-1 block">
                  Strictly by prior private appointment only.<br />Monday — Saturday: 07:00am to 05:00pm
                </span>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <Mail className="w-4 h-4 text-brand-bronze stroke-[1.5] mt-0.5" />
              <div>
                <span className="text-[9px] tracking-[0.2em] uppercase text-brand-grey block">Electronic Correspondence</span>
                <a href="mailto:curator@sudarshancrafts.com" className="text-xs text-white hover:text-brand-bronze transition-colors mt-1 block font-light">
                  curator@sudarshancrafts.com
                </a>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <Phone className="w-4 h-4 text-brand-bronze stroke-[1.5] mt-0.5" />
              <div>
                <span className="text-[9px] tracking-[0.2em] uppercase text-brand-grey block">Telephonic Line</span>
                <a href="tel:+911412789988" className="text-xs text-white hover:text-brand-bronze transition-colors mt-1 block font-light">
                  +06725 220474
                </a>
              </div>
            </div>

          </div>

          <div className="text-[9px] tracking-[0.25em] text-brand-grey uppercase font-light border-t border-brand-sand/10 pt-6">
            <span>SUDARSHAN CRAFTS MUSEUM © 2026</span>
          </div>

        </div>

        {/* Right Column: Premium Form Body */}
        <div className="lg:col-span-7">
          <div className="bg-[#1A1A17] border border-brand-bronze/15 p-8 md:p-12 relative group shadow-2xl">
            {/* Fine border inside container */}
            <div className="absolute top-4 left-4 right-4 bottom-4 border border-brand-bronze/5 pointer-events-none" />

            <AnimatePresence mode="wait">
              {!formSubmitted ? (
                <motion.div
                  key="form-fields"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                >
                  {/* Luxury tab switchers */}
                  <div className="flex flex-col sm:flex-row border-b border-brand-sand/10 pb-6 mb-8 gap-4">
                    {tabs.map((tab) => (
                      <button
                        key={tab.id}
                        type="button"
                        onClick={() => setInquiryType(tab.id)}
                        className={`text-xs uppercase tracking-[0.15em] font-light pb-2 text-left relative transition-colors duration-300 ${inquiryType === tab.id
                          ? 'text-brand-bronze font-medium'
                          : 'text-brand-grey hover:text-brand-sand'
                          }`}
                      >
                        {tab.label}
                        {inquiryType === tab.id && (
                          <motion.div
                            layoutId="activeTabIndicator"
                            className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-brand-bronze"
                          />
                        )}
                      </button>
                    ))}
                  </div>

                  {/* Dynamic description of tab context */}
                  <p className="text-[11px] tracking-wider text-brand-grey uppercase font-light mb-8 italic">
                    {tabs.find(t => t.id === inquiryType)?.desc}
                  </p>

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

                      {/* Role input */}
                      <div className="flex flex-col space-y-2">
                        <label htmlFor="role" className="text-[10px] tracking-[0.2em] uppercase text-brand-grey font-light">Professional Role</label>
                        <input
                          type="text"
                          id="role"
                          name="role"
                          value={formData.role}
                          onChange={handleInputChange}
                          className="bg-transparent border-b border-brand-sand/20 focus:border-brand-bronze focus:outline-none pb-2 text-sm text-white font-light transition-colors duration-300"
                          placeholder="e.g., Principal Architect / Collector"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {/* Email input */}
                      <div className="flex flex-col space-y-2">
                        <label htmlFor="email" className="text-[10px] tracking-[0.2em] uppercase text-brand-grey font-light">Email Address *</label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleInputChange}
                          className="bg-transparent border-b border-brand-sand/20 focus:border-brand-bronze focus:outline-none pb-2 text-sm text-white font-light transition-colors duration-300"
                          placeholder="e.g., aditya@sharma.com"
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
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="bg-transparent border-b border-brand-sand/20 focus:border-brand-bronze focus:outline-none pb-2 text-sm text-white font-light transition-colors duration-300"
                          placeholder="e.g., +91 9876543285"
                        />
                      </div>
                    </div>

                    {/* Conditional Input based on selection */}
                    {inquiryType === 'consultation' && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="flex flex-col space-y-2"
                      >
                        <label htmlFor="preferredDate" className="text-[10px] tracking-[0.2em] uppercase text-brand-grey font-light flex items-center">
                          <Calendar className="w-3.5 h-3.5 text-brand-bronze mr-1" />
                          <span>Preferred Consultation Date</span>
                        </label>
                        <input
                          type="date"
                          id="preferredDate"
                          name="preferredDate"
                          value={formData.preferredDate}
                          onChange={handleInputChange}
                          className="bg-transparent border-b border-brand-sand/20 focus:border-brand-bronze focus:outline-none pb-2 text-sm text-white font-light transition-colors duration-300 cursor-pointer"
                        />
                      </motion.div>
                    )}

                    {/* Project notes */}
                    <div className="flex flex-col space-y-2">
                      <label htmlFor="projectDetails" className="text-[10px] tracking-[0.2em] uppercase text-brand-grey font-light">
                        {inquiryType === 'catalogue' ? 'Shipping Address / Delivery details' : 'Project description & Site dimensions'}
                      </label>
                      <textarea
                        id="projectDetails"
                        name="projectDetails"
                        rows={3}
                        value={formData.projectDetails}
                        onChange={handleInputChange}
                        className="bg-transparent border-b border-brand-sand/20 focus:border-brand-bronze focus:outline-none pb-2 text-sm text-white font-light transition-colors duration-300 resize-none"
                        placeholder={
                          inquiryType === 'catalogue'
                            ? "Please include physical shipping address if requiring a printed hardcover catalogue..."
                            : "Describe the architectural setting, stone preferences, scaling, and general timeframe..."
                        }
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
                </motion.div>
              ) : (
                // Elegant Submission Success Card
                <motion.div
                  key="success-card"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
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
                </motion.div>
              )}
            </AnimatePresence>

          </div>
        </div>

      </div>
    </section>
  );
}
