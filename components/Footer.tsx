import React from 'react';
import { FacebookIcon } from './icons/FacebookIcon';
import { TwitterIcon } from './icons/TwitterIcon';
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
              Your trusted partner for home appliance repairs in Mumbai. Fast, reliable, and professional service guaranteed.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#services" className="hover:text-white transition-colors">Services</a></li>
              <li><a href="#amc" className="hover:text-white transition-colors">AMC</a></li>
              <li><a href="#booking" className="hover:text-white transition-colors">Book a Repair</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold text-white mb-4">Contact Us</h3>
            <ul className="space-y-3 text-slate-400">
              <li className="flex items-center">
                <PhoneIcon className="h-5 w-5 mr-3 text-brand-secondary" />
                <span>+91 9819 124 194</span>
              </li>
              <li className="flex items-center">
                <EnvelopeIcon className="h-5 w-5 mr-3 text-brand-secondary" />
                <span>asadcare94@gmail.com</span>
              </li>
            </ul>
            <div className="flex space-x-4 mt-6">
              <a href="#" className="text-slate-400 hover:text-white transition-colors" aria-label="Facebook">
                <FacebookIcon className="h-6 w-6" />
              </a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors" aria-label="Twitter">
                <TwitterIcon className="h-6 w-6" />
              </a>
            </div>
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