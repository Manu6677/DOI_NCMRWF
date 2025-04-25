import React from 'react';
import { motion } from 'framer-motion';
import { FaCalendarAlt } from 'react-icons/fa'; // Importing an icon for events
import { Link } from 'react-router-dom';

const UpcomingEvents1 = () => {
  const events = [
    { title: 'Event 1', date: 'November 5, 2024', location: 'Location A' },
    { title: 'Event 2', date: 'November 12, 2024', location: 'Location B' },
    { title: 'Event 3', date: 'November 18, 2024', location: 'Location C' },
  ];

  // Animation variants for event items
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      className="bg-gray-900 rounded-xl border border-richblack-25 p-6 shadow-lg transition duration-300 hover:border-orange-500"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }} // Fade-in for the entire component
    >
      <h2 className="mb-4 flex items-center text-2xl font-bold text-orange-500">
        <FaCalendarAlt className="mr-2" />
        Upcoming Events
      </h2>
      {events.map((event, index) => (
        <motion.div
          key={index}
          className="hover:bg-gray-700 mb-6 flex items-center justify-between rounded-lg bg-white p-4 shadow-lg transition duration-300"
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={itemVariants}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          <span className="bg-gray-700 text-gray-100 flex w-5/12 flex-col items-center justify-center rounded-md p-2 text-slate-600 shadow-md">
            <span className="text-3xl font-bold leading-none">
              {new Date(event.date).getDate()}
            </span>
            <span className="text-md text-gray-300 uppercase tracking-wide">
              {new Date(event.date).toLocaleDateString('en-US', {
                month: 'short',
              })}
            </span>
            <span className="text-gray-400 text-sm">
              {new Date(event.date).getFullYear()}
            </span>
          </span>
          <span className="flex flex-col">
            <Link to={`event-details-${index}`}>
              <h3 className="text-xl font-semibold text-slate-600 transition duration-200 hover:underline">
                {event.title}
              </h3>
            </Link>
            <p className="text-gray-400 mt-1 text-sm">{event.location}</p>
          </span>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default UpcomingEvents1;
