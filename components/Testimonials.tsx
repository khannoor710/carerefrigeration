import React from 'react';
import { TESTIMONIALS } from '../constants';

const Testimonials: React.FC = () => {
  return (
    <section id="testimonials" className="py-24 bg-slate-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight">What Our Customers Say</h2>
          <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
            We're proud of our work, but don't just take our word for it. Here's what our clients have to say.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((testimonial, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg p-8 flex flex-col relative overflow-hidden">
               <svg className="absolute top-0 left-0 w-24 h-24 text-brand-light opacity-75 transform -translate-x-4 -translate-y-4" fill="currentColor" viewBox="0 0 32 32" aria-hidden="true">
                  <path d="M9.33,26.33h-4a2.67,2.67,0,0,1-2.66-2.66v-8A2.67,2.67,0,0,1,5.33,13h4a2.67,2.67,0,0,1,2.67,2.67v8A2.67,2.67,0,0,1,9.33,26.33ZM5.33,14.33a1.33,1.33,0,0,0-1.33,1.34v8a1.33,1.33,0,0,0,1.33,1.33h4a1.34,1.34,0,0,0,1.34-1.33v-8a1.34,1.34,0,0,0-1.34-1.34Z"></path>
                  <path d="M26.67,26.33h-4a2.67,2.67,0,0,1-2.66-2.66v-8A2.67,2.67,0,0,1,22.67,13h4a2.67,2.67,0,0,1,2.67,2.67v8A2.67,2.67,0,0,1,26.67,26.33ZM22.67,14.33a1.33,1.33,0,0,0-1.33,1.34v8a1.33,1.33,0,0,0,1.33,1.33h4a1.34,1.34,0,0,0,1.34-1.33v-8a1.34,1.34,0,0,0-1.34-1.34Z"></path>
                </svg>
              <p className="text-slate-600 italic relative z-10 mb-6 flex-grow">"{testimonial.quote}"</p>
              <div className="flex items-center z-10 mt-auto">
                <img className="w-12 h-12 rounded-full mr-4 object-cover" src={testimonial.avatarUrl} alt={testimonial.name} />
                <div>
                  <p className="font-bold text-slate-800">{testimonial.name}</p>
                  <p className="text-sm text-slate-500">{testimonial.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default React.memo(Testimonials);