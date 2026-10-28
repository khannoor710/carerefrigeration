import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import WhyChooseUs from './components/WhyChooseUs';
import HowItWorks from './components/Testimonials';
import BookingForm from './components/BookingForm';
import Gallery from './components/Gallery';
import Footer from './components/Footer';
import Amc from './components/Amc';
import ContactDetails from './components/ContactDetails';
import AdminPage from './components/AdminPage';
import ErrorBoundary from './components/ErrorBoundary';
import { useSmoothScroll } from './hooks/useSmoothScroll';

const App: React.FC = () => {
  useSmoothScroll();
  const [showAdmin, setShowAdmin] = useState(false);

  useEffect(() => {
    const path = window.location.pathname;
    setShowAdmin(path === '/admin' || path.includes('/admin'));

    const handlePopState = () => {
      const currentPath = window.location.pathname;
      setShowAdmin(currentPath === '/admin' || currentPath.includes('/admin'));
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  if (showAdmin) {
    return (
      <ErrorBoundary>
        <AdminPage />
      </ErrorBoundary>
    );
  }

  return (
    <ErrorBoundary>
      <div className="bg-white text-slate-700">
        <Header />
        <main>
          <Hero />
          <Services />
          <WhyChooseUs />
          <Amc />
          <HowItWorks />
          <Gallery />
          <BookingForm />
          <ContactDetails />
        </main>
        <Footer />
      </div>
    </ErrorBoundary>
  );
};

export default App;
