import React from 'react';

const Hero: React.FC = () => {
  return (
    <section id="home" className="bg-brand-light pt-32 pb-24 md:pt-48 md:pb-32">
      <div className="container mx-auto px-6 text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold text-brand-primary-dark tracking-tight leading-tight">
          Fast, Reliable Appliance Repair
          <br />
          <span className="text-brand-secondary-dark">in Mumbai.</span>
        </h1>
        <p className="mt-6 max-w-2xl mx-auto text-lg md:text-xl text-slate-600">
          Don't let a broken appliance ruin your day. Our expert technicians are here to provide quick, affordable, and trustworthy repairs for all your home appliances.
        </p>
        <div className="mt-8 flex justify-center">
          <a
            href="#booking"
            className="bg-brand-primary text-white font-semibold px-8 py-4 rounded-lg text-lg hover:bg-brand-primary-dark transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            Schedule a Repair
          </a>
        </div>
      </div>
    </section>
  );
};

export default React.memo(Hero);