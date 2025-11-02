import React from 'react';
import { AMC_BENEFITS } from '../constants';

const Amc: React.FC = () => {
  return (
    <section id="amc" className="py-24 bg-blue-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight">Peace of Mind Guaranteed</h2>
          <p className="mt-4 text-lg text-slate-600 max-w-3xl mx-auto">
            Protect your appliances and save money with our Annual Maintenance Contract (AMC).
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {AMC_BENEFITS.map((benefit) => {
            const Icon = benefit.icon;
            return (
              <div key={benefit.title} className="bg-white rounded-xl shadow-lg p-8 text-center flex flex-col items-center hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
                <div className="flex items-center justify-center h-20 w-20 rounded-full bg-brand-light mx-auto mb-6">
                   <Icon className="h-10 w-10 text-brand-secondary" />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-2">{benefit.title}</h3>
                <p className="text-slate-600 flex-grow">{benefit.description}</p>
              </div>
            );
          })}
        </div>
        <div className="mt-16 text-center">
            <a
                href="#booking"
                className="bg-brand-secondary text-brand-primary-dark font-bold px-8 py-4 rounded-lg text-lg hover:bg-brand-secondary-dark transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
                Enquire About AMC
            </a>
        </div>
      </div>
    </section>
  );
};

export default React.memo(Amc);