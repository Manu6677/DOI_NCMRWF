import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const PolicyPage = () => {
  const location = useLocation();
  const [activeSection, setActiveSection] = useState('privacy');

  useEffect(() => {
    if (location.pathname.includes('cookie-policy')) {
      setActiveSection('cookie');
    } else if (location.pathname.includes('terms-of-use')) {
      setActiveSection('terms');
    } else {
      setActiveSection('privacy');
    }
  }, [location.pathname]);

  return (
    <div className="mx-auto max-w-3xl rounded-lg bg-white p-6 shadow-lg">
      {activeSection === 'privacy' && (
        <section className="rounded-lg border bg-slate-100 p-4">
          <h1 className="mb-4 text-2xl font-bold text-blue-600">
            Privacy Policy
          </h1>
          <p className="text-slate-700">
            The National Centre for Medium Range Weather Forecasting (NCMRWF) is
            committed to protecting your privacy. We collect minimal personal
            data necessary for providing our services and do not share your
            information with third parties without your consent. Your data is
            used solely for analytical purposes to improve our services. By
            using our website, you agree to the collection and use of
            information as outlined in this policy.
          </p>
        </section>
      )}

      {activeSection === 'cookie' && (
        <section className="rounded-lg border bg-slate-100 p-4">
          <h1 className="mb-4 text-2xl font-bold text-blue-600">
            Cookie Policy
          </h1>
          <p className="text-slate-700">
            Our website uses cookies to enhance user experience. Cookies help us
            analyze web traffic, store user preferences, and improve our
            website’s functionality. You have the option to accept or decline
            cookies. Disabling cookies may limit certain features of the
            website. By continuing to use our website, you consent to our use of
            cookies as described in this policy.
          </p>
        </section>
      )}

      {activeSection === 'terms' && (
        <section className="rounded-lg border bg-slate-100 p-4">
          <h1 className="mb-4 text-2xl font-bold text-blue-600">
            Terms of Use
          </h1>
          <p className="text-slate-700">
            By accessing the NCMRWF website, you agree to comply with the terms
            and conditions outlined here. The content provided is for
            informational purposes only and is subject to change. Unauthorized
            use or reproduction of materials is prohibited. While we strive for
            accuracy, NCMRWF is not responsible for errors or inaccuracies in
            the information provided.
          </p>
        </section>
      )}
    </div>
  );
};

export default PolicyPage;
