import React from 'react';
import { SERVICES } from '../constants';
import { useBookingForm } from '../hooks/useBookingForm';

const BookingForm: React.FC = () => {
  const {
    formState,
    setFormField,
    handleSubmit,
    isLoading,
    confirmation,
    error,
  } = useBookingForm();

  return (
    <section id="booking" className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight">Book Your Repair Today</h2>
          <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
            Fill out the form below, and we'll get back to you shortly to schedule your service.
          </p>
        </div>

        <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8">
          {!confirmation ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-slate-700">Full Name</label>
                <input
                  type="text"
                  id="name"
                  value={formState.name}
                  onChange={(e) => setFormField('name', e.target.value)}
                  className="mt-1 block w-full px-4 py-3 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-secondary focus:border-brand-secondary"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label htmlFor="appliance" className="block text-sm font-medium text-slate-700">Appliance Type</label>
                <select
                  id="appliance"
                  value={formState.appliance}
                  onChange={(e) => setFormField('appliance', e.target.value)}
                  className="mt-1 block w-full px-4 py-3 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-secondary focus:border-brand-secondary bg-white"
                >
                  {SERVICES.map(service => (
                    <option key={service.title} value={service.title}>{service.title}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="issue" className="block text-sm font-medium text-slate-700">Describe the Issue</label>
                <textarea
                  id="issue"
                  rows={4}
                  value={formState.issue}
                  onChange={(e) => setFormField('issue', e.target.value)}
                  className="mt-1 block w-full px-4 py-3 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-secondary focus:border-brand-secondary"
                  placeholder="My fridge is not cooling and making a loud noise."
                ></textarea>
              </div>
              
              {error && <p className="text-red-500 text-sm">{error}</p>}

              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-semibold text-white bg-brand-primary hover:bg-brand-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-secondary disabled:bg-slate-400 disabled:cursor-not-allowed transition-all"
                >
                  {isLoading ? 'Generating Confirmation...' : 'Request Service'}
                </button>
              </div>
            </form>
          ) : (
            <div className="text-center">
              <h3 className="text-2xl font-bold text-slate-800 mb-4">Thank You!</h3>
              <p className="text-slate-600 whitespace-pre-wrap">{confirmation}</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default BookingForm;