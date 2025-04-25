import React from 'react';
import { motion } from 'framer-motion';

const milestones = [
  {
    year: '1989',
    title: 'Inauguration of HPC System',
    description:
      'The Cray XMP-14 was installed and officially inaugurated on March 25, 1989, enabling medium-range NWP.',
  },
  {
    year: '1999',
    title: 'Expansion with Indigenous Supercomputers',
    description:
      "Acquired India's parallel processing systems: Anupam-Alpha (BARC) & PARAM-10000 (C-DAC), along with Origin-200.",
  },
  {
    year: '2001-2015',
    title: 'Major Supercomputing Upgrades',
    description:
      'Installed Cray SV1 (24 processors) in 2001, Cray C1e (64 processors) in 2006, and Bhaskara (IBM iDataPlex) in 2015.',
  },
  {
    year: '2018',
    title: 'Mihir Supercomputer',
    description:
      'Introduced Mihir, a Cray-XC40 with 2.8 PetaFLOPS, supporting high-resolution NWP and data assimilation.',
  },
  {
    year: '2024',
    title: 'Arunika: The Major Milestone',
    description:
      "On September 27, 2024, Hon'ble Prime Minister of India inaugurated Arunika, an 8.24 PetaFLOPS HPC with 24 PetaBytes storage, enhancing extreme weather forecasting.",
  },
];

const Milestones = () => {
  return (
    <div className="bg-slate-950 flex min-h-screen flex-col items-center justify-center p-10 text-white">
      <div className="w-full max-w-6xl text-center">
        <h2 className="mt-6 text-5xl font-extrabold text-blue-400">
          NCMRWF: Supercomputing Milestones
        </h2>
        <p className="mx-auto mt-4 max-w-3xl text-lg text-slate-300">
          The journey of <strong className="text-yellow-400">NCMRWF</strong> in{' '}
          <span className="font-semibold text-green-400">
            Numerical Weather Prediction (NWP)
          </span>{' '}
          began with the acquisition of the{' '}
          <span className="font-semibold text-blue-400">Cray XMP-14</span> in
          1988, marking its entry into high-performance computing.
        </p>
      </div>

      {/* Timeline Container */}
      <div className="relative mt-12 w-full max-w-4xl border-l-4 border-blue-500 pl-8">
        {milestones.map((milestone, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            className="relative mb-12"
          >
            {/* Timeline Dot */}
            <div className="absolute left-[-32px] top-3 h-6 w-6 rounded-full border-4 border-white bg-blue-500"></div>

            <div className="rounded-lg bg-gradient-to-br from-blue-900 to-slate-900 p-6 shadow-lg transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-2xl">
              <h3 className="text-2xl font-semibold text-blue-400">
                {milestone.title} ({milestone.year})
              </h3>
              <p className="mt-2 text-slate-300">{milestone.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Milestones;
