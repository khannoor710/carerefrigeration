import React from 'react';
import { useHeaderState } from '../hooks/useHeaderState';
import { NavLink } from '../types';
import Logo from './Logo';

const NAV_LINKS: NavLink[] = [
  { href: '#home', label: 'Home' },
  { href: '#services', label: 'Services' },
  { href: '#why-us', label: 'Why Us' },
  { href: '#amc', label: 'AMC' },
  { href: '#gallery', label: 'Gallery' },
  { href: '#testimonials', label: 'Testimonials' },
];

const Header: React.FC = () => {
  const { isOpen, isScrolled, setIsOpen } = useHeaderState();

  const headerClasses = `fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
    isScrolled || isOpen ? 'bg-white shadow-md' : 'bg-transparent'
  }`;

  return (
    <header className={headerClasses}>
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <Logo className="text-brand-primary-dark" />
          <nav className="hidden md:flex space-x-8" aria-label="Main navigation">
            {NAV_LINKS.map(link => (
              <a key={link.href} href={link.href} className="text-slate-600 hover:text-brand-primary transition-colors font-medium">
                {link.label}
              </a>
            ))}
          </nav>
          <a href="#booking" className="hidden md:inline-block bg-brand-primary text-white font-semibold px-6 py-2 rounded-lg hover:bg-brand-primary-dark transition-all">
            Book Now
          </a>
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-700 focus:outline-none"
              aria-label="Toggle menu"
              aria-expanded={isOpen}
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>
      {/* Mobile Menu */}
      {isOpen && (
        <nav className="md:hidden bg-white shadow-lg" aria-label="Mobile navigation">
          <div className="flex flex-col items-center py-4 space-y-4">
            {NAV_LINKS.map(link => (
               <a key={link.href} href={link.href} onClick={() => setIsOpen(false)} className="text-slate-600 hover:text-brand-primary transition-colors font-medium">
                {link.label}
              </a>
            ))}
            <a href="#booking" onClick={() => setIsOpen(false)} className="bg-brand-primary text-white font-semibold px-6 py-2 rounded-lg hover:bg-brand-primary-dark transition-all">
                Book Now
            </a>
          </div>
        </nav>
      )}
    </header>
  );
};

export default Header;