import React from 'react';
import { SERVICES } from '../constants';

const Services: React.FC = () => {
  return (
    <section id="services" className="py-24 bg-slate-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight">Our Services</h2>
          <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
            We repair all major home appliances with precision and care.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES.map((service) => {
            const Icon = service.icon;
            return (
              <div key={service.title} className="bg-white rounded-xl shadow-lg p-8 flex flex-col hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
                <div className="flex items-center mb-4">
                  <Icon className="h-10 w-10 text-brand-primary" />
                  <h3 className="text-2xl font-bold text-slate-800 ml-4">{service.title}</h3>
                </div>
                <p className="text-slate-600 mb-6 flex-grow">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center">
                      <svg className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="m20 6-11 11L4 12" />
                      </svg>
                      <span className="text-slate-600">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default React.memo(Services);