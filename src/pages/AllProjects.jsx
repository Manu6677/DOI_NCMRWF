import { motion } from 'framer-motion';

const AllProjects = () => {
  const schemes = [
    {
      name: 'Numerical Modelling of Weather and Climate (NMWC) - Implemented by NCMRWF',
      objectives: [
        'Improvement of seamless weather and climate prediction system with high reliability over India and neighbouring regions',
        'Development of novel applications based on dynamical model outputs for various sectors (viz. Defence, Energy, Water Resource, Transport, Geo-Hazards etc.)',
        'Establishment, maintenance and enhancement of physical, computational and associated infrastructure for carrying out research and development activities',
      ],
    },
    {
      name: 'BIMSTEC Centre for Weather and Climate (BCWC) implemented by NCMRWF',
      description:
        'To conduct training, workshops, capacity building, enhancing the observing system for BIMSTEC (for both process understanding and forecast skill improvement). These activities are essential to meet the regional leadership and cooperation role committed by the Government of India under BIMSTEC Cooperation. BCWC is established at the National Centre for Medium-Range Weather Forecast (NCMRWF), Noida.',
      objectives: [
        'Deliver products and services in applied scientific research in weather prediction and climate modelling in the BIMSTEC region.',
        'Build capacity in the field of weather and climate through training programs, workshop, conference, scientific personnel exchange in the BIMSTEC region through research fellowships for the scientists.',
        'Enhance observing systems for the BIMSTEC region.',
      ],
    },
    {
      name: 'National Monsoon Mission (NMM) implemented by IITM, IMD, INCOIS and NCMRWF',
      description:
        'A mission mode program to improve quality of Monsoon forecasts at:',
      objectives: [
        'Seasonal scale (entire season – June-September) with lead times of up to 3 months',
        'Extended range (10-30) days',
        'Short (3-5 days) and Medium (5-15 days) ranges',
      ],
    },
    {
      name: 'Mission Mausam',
      description:
        'A collaborative initiative by IMD, NCMRWF, and IITM to enhance weather monitoring, prediction, and decision-making through advanced surveillance technologies, AI-driven analytics, and high-performance computing.',
      objectives: [
        'Advance weather surveillance with next-gen radars and satellites.',
        'Enhance weather prediction through AI/ML and HPC systems.',
        'Develop a state-of-the-art Decision Support System (DSS).',
        'Strengthen capacity building and research collaborations.',
      ],
    },
    {
      name: 'High Performance Computing (HPC) implemented by IITM/NCMRWF',
      objectives: [
        'Setup a multiple petaflops HPC system (at IITM & NCMRWF) to carryout R&D activities on model developments and to provide operational forecasts.',
      ],
    },
  ];

  return (
    <div className="w-full bg-white px-8 py-16">
      <h1 className="mb-16 bg-gradient-to-r from-blue-600 to-green-500 bg-clip-text text-center text-5xl font-extrabold text-transparent">
        Schemes & Objectives
      </h1>

      <div className="grid gap-20">
        {schemes.map((scheme, idx) => (
          <motion.div
            key={idx}
            className="mx-auto w-full max-w-7xl"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: idx * 0.2 }}
          >
            <h2 className="text-neutral-900 mb-4 text-3xl font-bold">
              {scheme.name}
            </h2>
            {scheme.description && (
              <p className="text-neutral-700 mb-4 text-base leading-relaxed">
                {scheme.description}
              </p>
            )}
            <h3 className="text-neutral-800 mb-2 text-xl font-semibold">
              Objectives:
            </h3>
            <ul className="text-neutral-700 list-inside list-disc space-y-2 text-base leading-relaxed">
              {scheme.objectives.map((objective, i) => (
                <li key={i}>{objective}</li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AllProjects;
