'use client';

import { useState } from 'react';
import type { SettingsData } from '@/lib/api';

interface ContactProps {
  settings?: SettingsData;
}

export function Contact({ settings }: ContactProps) {
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState<{ show: boolean; success: boolean; msg: string }>({ show: false, success: false, msg: '' });
  const [form, setForm] = useState({ brandName: '', contactName: '', email: '', phone: '', campaignType: '', budget: '', timeline: '', message: '' });

  const emailSetting = settings?.primary_email || 'brijal@brijalcreates.com';
  const whatsapp = settings?.whatsapp_number || '+91 98765 43210';
  const location = settings?.creator_location || 'Mumbai, India · Available Worldwide';
  const waLink = `https://wa.me/${whatsapp.replace(/[^0-9]/g, '')}?text=Hi%20Brijal!%20I'd%20love%20to%20collaborate%20with%20you.`;

  const set = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm((f) => ({ ...f, [field]: e.target.value }));
  };

  const handleSubmit = async () => {
    if (!form.brandName || !form.contactName || !form.email || !form.campaignType) {
      setToast({ show: true, success: false, msg: 'Please fill in all required fields.' });
      setTimeout(() => setToast({ show: false, success: false, msg: '' }), 4000);
      return;
    }

    setSubmitting(true);
    try {
      const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
      const res = await fetch(`${API_BASE}/inquiries`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ brandName: form.brandName, contactName: form.contactName, email: form.email, phone: form.phone, campaignType: form.campaignType, budgetRange: form.budget, timelineText: form.timeline, message: form.message }),
      });
      const json = await res.json();
      if (json.success) {
        setToast({ show: true, success: true, msg: "Message sent! I'll reply within 24 hours." });
        setForm({ brandName: '', contactName: '', email: '', phone: '', campaignType: '', budget: '', timeline: '', message: '' });
      } else {
        setToast({ show: true, success: false, msg: json.message || 'Something went wrong. Try again.' });
      }
    } catch {
      setToast({ show: true, success: false, msg: 'Network error. Please try again.' });
    }
    setSubmitting(false);
    setTimeout(() => setToast({ show: false, success: false, msg: '' }), 4000);
  };

  return (
    <section id="contact">
      <div className="max-w">
        <div className="contact-inner">
          <div className="contact-left reveal">
            <div className="section-label">Let&apos;s Collaborate</div>
            <h2 className="section-title">
              Start a
              <br />
              <em className="serif-italic" style={{ color: 'var(--gold)' }}>
                Campaign
              </em>
            </h2>
            <p className="section-sub" style={{ marginTop: '1rem' }}>
              Have a brand or product you&apos;d like to put in front of a highly engaged audience? I&apos;d love to hear about it.
            </p>

            <div className="contact-info-items">
              <div className="ci-item">
                <div className="ci-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </div>
                <div>
                  <div className="ci-label">Email</div>
                  <div className="ci-val">{emailSetting}</div>
                </div>
              </div>

              <div className="ci-item">
                <div className="ci-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                  </svg>
                </div>
                <div>
                  <div className="ci-label">Instagram</div>
                  <div className="ci-val">@brijalsavaniya</div>
                </div>
              </div>

              <div className="ci-item">
                <div className="ci-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <div>
                  <div className="ci-label">Based in</div>
                  <div className="ci-val">{location}</div>
                </div>
              </div>
            </div>

            <a
              href={waLink}
              className="wa-btn"
              target="_blank"
              rel="noreferrer"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
              </svg>
              Chat on WhatsApp
            </a>
          </div>

          <div className="reveal">
            <div className="collab-form">
              <h3>Let&apos;s Work Together</h3>
              <p>Fill in the details below and I&apos;ll get back within 24 hours.</p>
              <div className="form-row">
                <div className="form-group">
                  <label>Brand Name *</label>
                  <input type="text" placeholder="e.g. Nykaa Fashion" value={form.brandName} onChange={set('brandName')} />
                </div>
                <div className="form-group">
                  <label>Your Name *</label>
                  <input type="text" placeholder="Your full name" value={form.contactName} onChange={set('contactName')} />
                </div>
              </div>
              <div className="form-group">
                <label>Email Address *</label>
                <input type="email" placeholder="you@brand.com" value={form.email} onChange={set('email')} />
              </div>
              <div className="form-group">
                <label>Phone Number</label>
                <input type="tel" placeholder="+91 98765 43210" value={form.phone} onChange={set('phone')} />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Campaign Type *</label>
                  <select value={form.campaignType} onChange={set('campaignType')} className="bg-[#1a1a1a]" style={{ colorScheme: 'dark' }}>
                    <option value="" className="bg-[#1a1a1a] text-[#7a7568]">Select type</option>
                    <option className="bg-[#1a1a1a] text-[#f5f0e8]">Reel Promotion</option>
                    <option className="bg-[#1a1a1a] text-[#f5f0e8]">Story Promotion</option>
                    <option className="bg-[#1a1a1a] text-[#f5f0e8]">UGC Content</option>
                    <option className="bg-[#1a1a1a] text-[#f5f0e8]">Affiliate Campaign</option>
                    <option className="bg-[#1a1a1a] text-[#f5f0e8]">Brand Ambassador</option>
                    <option className="bg-[#1a1a1a] text-[#f5f0e8]">Event Coverage</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Budget Range</label>
                  <select value={form.budget} onChange={set('budget')} className="bg-[#1a1a1a]" style={{ colorScheme: 'dark' }}>
                    <option value="" className="bg-[#1a1a1a] text-[#7a7568]">Select budget</option>
                    <option className="bg-[#1a1a1a] text-[#f5f0e8]">Under ₹10,000</option>
                    <option className="bg-[#1a1a1a] text-[#f5f0e8]">₹10,000 – ₹25,000</option>
                    <option className="bg-[#1a1a1a] text-[#f5f0e8]">₹25,000 – ₹50,000</option>
                    <option className="bg-[#1a1a1a] text-[#f5f0e8]">₹50,000 – ₹1,00,000</option>
                    <option className="bg-[#1a1a1a] text-[#f5f0e8]">₹1,00,000+</option>
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label>Campaign Timeline</label>
                <select value={form.timeline} onChange={set('timeline')} className="bg-[#1a1a1a]" style={{ colorScheme: 'dark' }}>
                  <option value="" className="bg-[#1a1a1a] text-[#7a7568]">Select timeline</option>
                  <option className="bg-[#1a1a1a] text-[#f5f0e8]">ASAP (within 1 week)</option>
                  <option className="bg-[#1a1a1a] text-[#f5f0e8]">2–4 weeks</option>
                  <option className="bg-[#1a1a1a] text-[#f5f0e8]">1–2 months</option>
                  <option className="bg-[#1a1a1a] text-[#f5f0e8]">3+ months (long-term)</option>
                </select>
              </div>
              <div className="form-group">
                <label>Tell Me About Your Campaign</label>
                <textarea placeholder="What product / service? What's the goal? Any specific ideas?" value={form.message} onChange={set('message')} />
              </div>
              <button className="submit-btn" id="submitBtn" type="button" onClick={handleSubmit} disabled={submitting}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="22" y1="2" x2="11" y2="13" />
                  <polygon points="22 2 15 22 11 13 2 9 22 2" />
                </svg>
                {submitting ? 'Sending...' : 'Send Collaboration Request'}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className={`toast ${toast.show ? 'show' : ''}`} id="toast" style={toast.show ? { opacity: 1, transform: 'translateY(0)' } : undefined}>
        <span className="toast-icon">{toast.success ? '✓' : '✕'}</span>
        <span id="toastMsg">{toast.msg}</span>
      </div>
    </section>
  );
}
