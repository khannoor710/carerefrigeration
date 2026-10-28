import React from 'react';
import { BUSINESS } from '../config/business';

const Hero: React.FC = () => {
  return (
    <section id="home" className="bg-brand-light pt-32 pb-24 md:pt-48 md:pb-32">
      <div className="container mx-auto px-6 text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold text-brand-primary-dark tracking-tight leading-tight">
          AC &amp; Washing Machine Repair
          <br />
          <span className="text-brand-secondary-dark">in Mumbai.</span>
        </h1>
        <p className="mt-6 max-w-2xl mx-auto text-lg md:text-xl text-slate-600">
          Need help with an AC that is not cooling or a washing machine that has stopped working? Tell us the issue and arrange an appliance repair visit in Mumbai.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <a href={BUSINESS.phoneHref} className="bg-brand-secondary-dark text-white font-semibold px-8 py-4 rounded-lg text-lg hover:bg-brand-secondary transition-colors">Call {BUSINESS.phoneDisplay}</a>
          <a
            href="#booking"
            className="bg-brand-primary text-white font-semibold px-8 py-4 rounded-lg text-lg hover:bg-brand-primary-dark transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            Schedule a Repair
          </a>
        </div>
        <a href={BUSINESS.whatsappHref} target="_blank" rel="noopener noreferrer" className="inline-block mt-5 text-green-800 font-semibold underline">
          Prefer WhatsApp? Message us
        </a>
        <div className="mt-6 flex flex-wrap justify-center gap-5 text-brand-primary-dark font-medium">
          <a href="/ac-repair-andheri-west/" className="underline">AC repair in Mumbai</a>
          <a href="/washing-machine-repair-andheri-west/" className="underline">Washing machine repair in Mumbai</a>
        </div>
      </div>
    </section>
  );
};

export default React.memo(Hero);
