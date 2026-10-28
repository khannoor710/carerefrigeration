import React from 'react';
import { PhoneIcon } from './icons/PhoneIcon';
import { EnvelopeIcon } from './icons/EnvelopeIcon';
import Logo from './Logo';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-800 text-slate-300">
      <div className="container mx-auto px-6 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <Logo className="text-white text-xl mb-4" />
            <p className="text-slate-400">
              Appliance repair enquiries in Andheri West, Mumbai. Call us to discuss your AC, washing machine, or other appliance issue.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#services" className="hover:text-white transition-colors">Services</a></li>
              <li><a href="/ac-repair-andheri-west/" className="hover:text-white transition-colors">AC Repair in Andheri West</a></li>
              <li><a href="/washing-machine-repair-andheri-west/" className="hover:text-white transition-colors">Washing Machine Repair in Andheri West</a></li>
              <li><a href="#amc" className="hover:text-white transition-colors">AMC</a></li>
              <li><a href="#booking" className="hover:text-white transition-colors">Book a Repair</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold text-white mb-4">Contact Us</h3>
            <ul className="space-y-3 text-slate-400">
              <li className="flex items-center">
                <PhoneIcon className="h-5 w-5 mr-3 text-brand-secondary" />
                <a href="tel:+919819124194" className="hover:text-white underline">+91 9819 124 194</a>
              </li>
              <li className="flex items-center">
                <EnvelopeIcon className="h-5 w-5 mr-3 text-brand-secondary" />
                <a href="mailto:asadcare94@gmail.com" className="hover:text-white underline">asadcare94@gmail.com</a>
              </li>
            </ul>
            <p className="mt-4 text-slate-400">Service area: Andheri West, Mumbai</p>
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
