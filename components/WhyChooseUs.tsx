import React from 'react';
import { WHY_CHOOSE_US_POINTS } from '../constants';

const WhyChooseUs: React.FC = () => {
  return (
    <section id="why-us" className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight">Why Choose Care Refrigeration?</h2>
          <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
            We're committed to providing a service that's not just effective, but also trustworthy and convenient.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {WHY_CHOOSE_US_POINTS.map((point, index) => {
            const Icon = point.icon;
            return (
              <div key={index} className="text-center p-8">
                <div className="flex items-center justify-center h-20 w-20 rounded-full bg-brand-light mx-auto mb-6">
                  <Icon className="h-10 w-10 text-brand-secondary" />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-2">{point.title}</h3>
                <p className="text-slate-600">{point.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default React.memo(WhyChooseUs);