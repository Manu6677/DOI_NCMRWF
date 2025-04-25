import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

const wrapperVariants = {
  open: { opacity: 1, height: 'auto', transition: { duration: 0.3 } },
  closed: { opacity: 0, height: 0, transition: { duration: 0.2 } },
};

// Function to get available UTC options with date
const getUTCOptions = () => {
  const now = new Date();

  const utcHour = now.getUTCHours();
  const today = now.toISOString().split('T')[0]; // YYYY-MM-DD
  const yesterday = new Date(now.setUTCDate(now.getUTCDate() - 1))
    .toISOString()
    .split('T')[0];

  return [
    { label: `${today} (00 UTC)`, value: `${today}/00` },
    { label: `${today} (12 UTC)`, value: `${today}/12` },
    { label: `${yesterday} (00 UTC)`, value: `${yesterday}/00` },
    { label: `${yesterday} (12 UTC)`, value: `${yesterday}/12` },
  ].filter((option) => {
    const [date, hour] = option.value.split('-');
    return !(date === today && parseInt(hour) > utcHour);
  });
};

const ChangeUTC = ({ selectedUTC, setSelectedUTC }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [utcOptions, setUtcOptions] = useState(getUTCOptions());

  useEffect(() => {
    setUtcOptions(getUTCOptions()); // Update options dynamically
  }, []);

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const handleUTCChange = (utc) => {
    setSelectedUTC(utc);
    setIsOpen(false);
    toast.success(`Selected: ${utc.label}`);
  };

  return (
    <div className="p-4">
      <h2 className="mb-2 text-sm font-semibold text-slate-700">
        Select Date & Hour
      </h2>

      <motion.div animate={isOpen ? 'open' : 'closed'} className="relative">
        {/* Dropdown Button */}
        <button
          onClick={toggleDropdown}
          className="w-36 rounded-md border border-slate-400 bg-white px-4 py-2 text-sm font-medium text-slate-800 shadow-md transition-all duration-300 hover:border-blue-500 hover:bg-slate-100"
        >
          {selectedUTC?.label}
        </button>

        {/* Dropdown Menu */}
        <motion.ul
          initial={wrapperVariants.closed}
          variants={wrapperVariants}
          className="absolute left-0 top-[120%] z-10 w-48 overflow-hidden rounded-md border border-slate-300 bg-white shadow-lg"
        >
          {utcOptions.map((utc) => (
            <motion.li
              key={utc?.value}
              onClick={() => handleUTCChange(utc)}
              className={`cursor-pointer px-4 py-2 text-sm text-slate-800 transition duration-300 ${
                selectedUTC?.value === utc?.value
                  ? 'bg-blue-500 font-semibold text-white'
                  : 'hover:bg-slate-100'
              }`}
            >
              {utc?.label}
            </motion.li>
          ))}
        </motion.ul>
      </motion.div>
    </div>
  );
};

export default ChangeUTC;
