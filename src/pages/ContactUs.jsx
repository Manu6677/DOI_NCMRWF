import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const ContactTable = () => {
  return (
    <div className="min-h-screen bg-white p-8">
      {/* Info Section */}
      <div className="flex min-h-screen flex-col items-center py-8">
        <h2 className="mb-16 bg-gradient-to-r from-blue-600 to-green-500 bg-clip-text text-center text-5xl font-extrabold text-transparent">
          Correspondence Address
        </h2>

        {/* Contact Sections */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {/* Section 1 */}
          <motion.div
            className="max-w-lg rounded-lg border-l-4 border-orange-500 bg-white p-8 shadow-lg transition-all duration-300 hover:shadow-xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p className="pb-3 text-2xl font-semibold text-blue-700">
              The Head, NCMRWF
            </p>
            <div className="pl-5 text-lg text-slate-600">
              Ministry of Earth Sciences
              <br />
              A-50, Sector-62, NOIDA, UP, Pin: 201 309
              <br />
              <span className="font-medium">Phone:</span> +91-120-2419401
              <br />
              <span className="font-medium">Fax:</span> +91-120-2419484
              <br />
              <Link
                to="/route-map"
                className="ml-1 text-blue-600 hover:underline"
              >
                View Route Map
              </Link>
            </div>
          </motion.div>

          {/* Section 2 */}
          <motion.div
            className="max-w-xl rounded-lg border-l-4 border-orange-500 bg-white p-8 shadow-lg transition-all duration-300 hover:shadow-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p className="pb-3 text-2xl font-semibold text-blue-700">
              For Any Tender-Related Enquiries
            </p>
            <div className="pl-5 text-lg text-slate-600">
              <strong>Mr. Biswajit Guha</strong> (Deputy Secretary)
              <br />
              A-50, Sector-62, NOIDA, UP, Pin: 201 309
              <br />
              <span className="font-medium">Phone:</span> +91-120-2419480
              <br />
              <span className="font-medium">Fax:</span> +91-120-2419480
            </div>
          </motion.div>

          {/* Section 3 */}
          <motion.div
            className="max-w-2xl rounded-lg border-l-4 border-orange-500 bg-white p-8 shadow-lg transition-all duration-300 hover:shadow-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p className="pb-3 text-2xl font-semibold text-blue-700">
              Useful Contact Links
            </p>
            <div className="flex flex-col space-y-3 pl-5 text-xl">
              <Link
                to="/contact-us/head"
                className="font-normal text-blue-600 transition-colors duration-200 hover:text-blue-800"
              >
                Telephone Office of Head, NCMRWF
              </Link>
              <p className="font-normal text-blue-600 transition-colors duration-200 hover:text-blue-800">
                Telephone Directory - Scientists
              </p>
              <p className="font-normal text-blue-600 transition-colors duration-200 hover:text-blue-800">
                Telephone Directory - Administration
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ContactTable;
