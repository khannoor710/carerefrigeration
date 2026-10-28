import React from 'react';
import { PhoneIcon } from './icons/PhoneIcon';
import { EnvelopeIcon } from './icons/EnvelopeIcon';
import { BUSINESS } from '../config/business';
import Logo from './Logo';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-800 text-slate-300">
      <div className="container mx-auto px-6 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <Logo className="text-white text-xl mb-4" />
            <p className="text-slate-400">
              Appliance repair enquiries in Mumbai. Call us to discuss your AC, washing machine, or other appliance issue.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#services" className="hover:text-white transition-colors">Services</a></li>
              <li><a href="/ac-repair-andheri-west/" className="hover:text-white transition-colors">AC Repair in Mumbai</a></li>
              <li><a href="/washing-machine-repair-andheri-west/" className="hover:text-white transition-colors">Washing Machine Repair in Mumbai</a></li>
              <li><a href="#amc" className="hover:text-white transition-colors">AMC</a></li>
              <li><a href="#booking" className="hover:text-white transition-colors">Book a Repair</a></li>
              <li><a href="#contact" className="hover:text-white transition-colors">Contact & Hours</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold text-white mb-4">Contact Us</h3>
            <ul className="space-y-3 text-slate-400">
              <li className="flex items-center">
                <PhoneIcon className="h-5 w-5 mr-3 text-brand-secondary" />
                <a href={BUSINESS.phoneHref} className="hover:text-white underline">{BUSINESS.phoneDisplay}</a>
              </li>
              <li><a href={BUSINESS.whatsappHref} target="_blank" rel="noopener noreferrer" className="hover:text-white underline">Message on WhatsApp</a></li>
              <li className="flex items-center">
                <EnvelopeIcon className="h-5 w-5 mr-3 text-brand-secondary" />
                <a href={`mailto:${BUSINESS.email}`} className="hover:text-white underline">{BUSINESS.email}</a>
              </li>
            </ul>
            <address className="mt-4 not-italic text-slate-400">{BUSINESS.address}</address>
            <p className="mt-3 text-slate-400">Mon–Sat: {BUSINESS.weekdayHours}<br />Sun: {BUSINESS.sundayHours}</p>
          </div>
        </div>
        <div className="mt-12 border-t border-slate-700 pt-8 text-center text-slate-500">
          <p>&copy; {new Date().getFullYear()} Care Refrigeration. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
