import React from 'react';

const HowItWorks: React.FC = () => (
  <section id="how-it-works" className="py-24 bg-slate-50">
    <div className="container mx-auto px-6">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-extrabold text-slate-900">How to request a repair</h2>
        <p className="mt-4 text-lg text-slate-600">A straightforward way to tell us what needs attention.</p>
      </div>
      <ol className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        <li className="bg-white rounded-xl shadow p-8"><strong className="text-brand-primary text-xl">1. Describe the issue</strong><p className="mt-3">Tell us the appliance type, symptoms, and your area.</p></li>
        <li className="bg-white rounded-xl shadow p-8"><strong className="text-brand-primary text-xl">2. Discuss a visit</strong><p className="mt-3">We will contact you to discuss availability and next steps.</p></li>
        <li className="bg-white rounded-xl shadow p-8"><strong className="text-brand-primary text-xl">3. Decide on the repair</strong><p className="mt-3">Ask about the diagnosis and charges before authorising work.</p></li>
      </ol>
    </div>
  </section>
);

export default React.memo(HowItWorks);
