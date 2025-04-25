import { motion } from 'framer-motion'; // Importing Framer Motion for animations
import { stakeholders } from '../../../../data/stakeholder-collaborators';

const PartnerStakeholderPage = () => {
  return (
    <div className="to-pink-50 min-h-screen bg-gradient-to-r from-blue-50 px-8 py-12">
      <motion.div
        className="space-y-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <h1 className="mb-16 bg-gradient-to-r from-blue-600 to-green-500 bg-clip-text text-center text-5xl font-extrabold text-transparent drop-shadow-lg">
          Our Stakeholders
        </h1>
        <p className="text-gray-700 text-center text-lg">
          NCMRWF provides data products in digital and graphical forms to
          stakeholders including central & state organizations, private
          entities, and international agencies. These products support diverse
          applications in research, aviation, green energy, defense, and
          disaster management.
        </p>
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {stakeholders.map((stakeholder, index) => (
            <motion.div
              key={index}
              className="overflow-hidden rounded-lg bg-white shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-2xl"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="flex flex-col items-center p-6 text-center">
                {stakeholder.logo && (
                  <img
                    src={stakeholder.logo}
                    alt={stakeholder.name}
                    className="mb-4 h-20 w-20 object-contain"
                  />
                )}
                <h3 className="text-teal-700 text-2xl font-semibold">
                  {stakeholder.name}
                </h3>
                {stakeholder.role && (
                  <p className="text-teal-500 mb-2 text-sm font-medium">
                    {stakeholder.role}
                  </p>
                )}
                <p className="text-gray-700 text-base leading-relaxed">
                  {stakeholder.description}
                </p>
                {stakeholder.link && (
                  <a
                    href={stakeholder.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-teal-600 hover:text-teal-800 mt-4 inline-block font-medium underline"
                  >
                    Learn More
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default PartnerStakeholderPage;
