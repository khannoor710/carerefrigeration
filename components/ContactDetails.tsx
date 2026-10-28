import React from 'react';
import { BUSINESS } from '../config/business';

const ContactDetails: React.FC = () => (
  <section id="contact" className="bg-brand-light py-16 md:py-20" aria-labelledby="contact-heading">
    <div className="container mx-auto px-6">
      <div className="max-w-2xl mb-8">
        <p className="text-brand-secondary-dark font-bold uppercase tracking-widest text-sm">Business details</p>
        <h2 id="contact-heading" className="text-3xl md:text-4xl font-extrabold text-brand-primary-dark mt-2">
          Contact Care Refrigeration
        </h2>
        <p className="text-slate-600 mt-3">Get in touch to discuss an appliance repair visit in Andheri West.</p>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-7 md:p-8">
          <h3 className="text-xl font-bold text-brand-primary-dark mb-3">Address & contact</h3>
          <address className="not-italic text-slate-600 leading-relaxed">{BUSINESS.address}</address>
          <a href={BUSINESS.mapHref} target="_blank" rel="noopener noreferrer" className="inline-block mt-3 text-brand-primary font-semibold underline">
            View on Google Maps
          </a>
          <div className="flex flex-wrap gap-3 mt-6">
            <a href={BUSINESS.phoneHref} className="bg-brand-primary text-white font-semibold px-5 py-3 rounded-lg hover:bg-brand-primary-dark transition-colors">
              Call {BUSINESS.phoneDisplay}
            </a>
            <a href={BUSINESS.whatsappHref} target="_blank" rel="noopener noreferrer" className="border border-green-700 text-green-800 font-semibold px-5 py-3 rounded-lg hover:bg-green-50 transition-colors">
              Message on WhatsApp
            </a>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-7 md:p-8">
          <h3 className="text-xl font-bold text-brand-primary-dark mb-3">Opening hours</h3>
          <dl className="space-y-3 text-slate-600">
            <div className="flex justify-between gap-4 border-b border-slate-100 pb-3"><dt>Monday–Saturday</dt><dd className="font-semibold text-slate-800 text-right">{BUSINESS.weekdayHours}</dd></div>
            <div className="flex justify-between gap-4"><dt>Sunday</dt><dd className="font-semibold text-slate-800 text-right">{BUSINESS.sundayHours}</dd></div>
          </dl>
          <p className="text-sm text-slate-500 mt-6">Call or message us to discuss visit availability.</p>
        </div>
      </div>
    </div>
  </section>
);

export default ContactDetails;
