import { useEffect, useState } from 'react';

const VisitCounter = () => {
  const [visits, setVisits] = useState(0);

  useEffect(() => {
    // Get visits count from localStorage
    const storedVisits = localStorage.getItem('visitCount');
    const newCount = storedVisits ? parseInt(storedVisits) + 1 : 1;
    setVisits(newCount);
    localStorage.setItem('visitCount', newCount);
  }, []);

  return (
    <div className="to-indigo-300 flex min-h-screen items-center justify-center bg-gradient-to-r from-blue-200">
      <div className="rounded-xl bg-white p-10 text-center shadow-lg">
        <h1 className="text-4xl font-bold text-slate-800">
          Website Visit Counter
        </h1>
        <p className="mt-4 text-lg text-slate-600">You are visitor number:</p>
        <p className="mt-2 text-5xl font-extrabold text-blue-600">{visits}</p>
      </div>
    </div>
  );
};

export default VisitCounter;
