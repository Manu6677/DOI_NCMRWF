// import PdfWallpaper from '../assets/images/ncmrwf-pdf-wallpapper.jpg';

// const PdfIcon = () => (
//   <svg
//     xmlns="http://www.w3.org/2000/svg"
//     className="mr-2 size-5 text-red-600"
//     viewBox="0 0 20 20"
//     fill="currentColor"
//     aria-hidden="true"
//   >
//     <path
//       fillRule="evenodd"
//       d="M4 2a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V8.414a1 1 0 00-.293-.707l-4-4A1 1 0 0011.586 3H4zm3 6a1 1 0 011-1h6a1 1 0 110 2H8a1 1 0 01-1-1zm1 4a1 1 0 100 2h4a1 1 0 100-2H8z"
//       clipRule="evenodd"
//     />
//   </svg>
// );
// const publicationDetails = [
//   {
//     label: 'Title',
//     value: 'HAFSV2.0.2 INSTALLATION, OPTIMIZATION AND IMPLEMENTATION AT NCMRWF',
//   },
//   { label: 'Series Title', value: 'Technical Report' },
//   { label: 'Series Number', value: 'nmrf.tr.5.2025' },
//   { label: 'Key Words', value: 'HPC, HAFS, Optimization, Installation' },
//   {
//     label: 'DOI',
//     value: 'https://nwp.ncmrwf.gov.in/publications/tr/10.64349/nmrf.tr.5.2025',
//   },
//   { label: 'Year Published', value: 'July 2025' },
//   { label: 'Language', value: 'English' },
//   { label: 'Publisher', value: 'NCMRWF' },
//   { label: 'Pages', value: '38' },
// ];

// const USGSPublicationPage = () => {
//   return (
//     <div className="to-amber-50 min-h-screen bg-gradient-to-br from-orange-50 via-slate-50 text-slate-800">
//       {/* Header */}
//       <header className="to-amber-500 bg-gradient-to-r from-blue-600 via-blue-500 p-6 shadow-2xl shadow-orange-500/20">
//         {/* <header className="bg-gradient-to-r from-blue-800 via-blue-600 to-[#00203f] p-6 shadow-2xl shadow-orange-500/20"> */}
//         <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 md:flex-row">
//           <div>
//             <h1 className="text-4xl font-black tracking-tight text-white drop-shadow-lg transition-all duration-300 hover:drop-shadow-xl">
//               NCMRWF Publications Archive
//             </h1>

//             <p className="mt-1 text-lg font-medium text-orange-100">
//               Explore scientific reports, technical documents, and research
//               findings
//             </p>
//           </div>
//         </div>
//       </header>

//       {/* Main content */}
//       <main className="container mx-auto px-4 py-8">
//         <div className="grid gap-8 md:grid-cols-3">
//           {/* Left Section */}
//           <section className="space-y-6 md:col-span-2">
//             <article className="group relative rounded-2xl border border-l-4 border-orange-500 bg-white bg-gradient-to-br from-orange-50/30 to-white p-6 shadow-xl transition-all duration-300 ease-in-out hover:scale-[1.015] hover:border-orange-400 hover:shadow-2xl hover:shadow-orange-600/30">
//               {/* Soft orange glow overlay on hover */}
//               <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-orange-100/0 to-orange-200/0 transition-all duration-300 group-hover:from-orange-100/20 group-hover:to-orange-200/10" />

//               <div className="relative mb-6 flex items-start gap-4">
//                 <img
//                   src={PdfWallpaper}
//                   alt="Document Thumbnail"
//                   className="h-32 w-24 rounded-lg object-cover shadow-lg transition-all duration-300 ease-in-out hover:rotate-1 hover:scale-105 hover:shadow-xl"
//                 />
//                 <div>
//                   <h2 className="text-gray-900 text-2xl font-bold leading-tight transition-colors duration-300 hover:text-orange-800">
//                     HAFSV2.0.2 INSTALLATION, OPTIMIZATION AND IMPLEMENTATION AT
//                     NCMRWF
//                   </h2>
//                   <p className="text-gray-600 pt-3 text-sm font-semibold">
//                     Shivali Gangwar, B. Athiyaman, K.B.R.R Hari Prasad, Ashish
//                     Routray
//                   </p>
//                   <a
//                     href="
// https://nwp.ncmrwf.gov.in/publications/tr/10.64349/nmrf.tr.5.2025"
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="mt-2 inline-block text-sm font-medium text-orange-600 transition-all duration-300 ease-in-out hover:text-orange-700 hover:underline"
//                   >
//                     https://nwp.ncmrwf.gov.in/publications/tr/10.64349/nmrf.tr.5.2025
//                   </a>
//                 </div>
//               </div>

//               <div className="relative flex flex-wrap gap-4">
//                 <a
//                   href="https://nwp.ncmrwf.gov.in/publication/TechnicalReportonHAFSv2.0.2Implementation_at_NCMRWF_final.pdf"
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="group/btn relative inline-flex items-center gap-2 overflow-hidden rounded-xl border border-orange-500 bg-gradient-to-r from-orange-500 to-orange-600 px-6 py-3 text-sm font-bold text-white shadow-lg transition-all duration-300 ease-in-out hover:scale-105 hover:from-orange-600 hover:to-orange-700 hover:shadow-xl hover:shadow-orange-500/30"
//                 >
//                   {/* Shine effect */}
//                   <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/60 to-transparent transition-transform duration-700 ease-out group-hover/btn:translate-x-full" />

//                   <PdfIcon className="relative z-10 h-5 w-5 text-white" />
//                   <span className="relative z-10">VIEW PDF</span>
//                 </a>
//               </div>
//             </article>

//             {/* Additional Details */}
//             <section className="rounded-2xl border border-orange-100 bg-white/80 p-6 text-sm shadow-xl backdrop-blur-sm transition-all duration-300 hover:bg-white/90 hover:shadow-2xl">
//               <div className="divide-y divide-orange-100">
//                 {publicationDetails.map((item, index) => (
//                   <div
//                     key={index}
//                     className="grid gap-2 rounded-lg px-2 py-4 transition-all duration-200 hover:bg-orange-50/50 md:grid-cols-3"
//                   >
//                     <dt className="font-bold text-orange-800">{item.label}</dt>
//                     <dd className="text-gray-700 font-medium md:col-span-2">
//                       {item.label === 'DOI' ? (
//                         <a
//                           href={item.value}
//                           target="_blank"
//                           rel="noopener noreferrer"
//                           className="text-orange-600 transition-all duration-300 hover:text-orange-700 hover:underline"
//                         >
//                           {item.value}
//                         </a>
//                       ) : (
//                         item.value
//                       )}
//                     </dd>
//                   </div>
//                 ))}
//               </div>
//             </section>
//           </section>

//           {/* Right Section (Metrics) */}
//           <aside className="rounded-2xl border border-orange-100 bg-white/90 p-6 shadow-xl backdrop-blur-sm transition-all duration-300 hover:bg-white hover:shadow-2xl">
//             <h2 className="mx-auto mb-4 rounded-lg border-b border-orange-300 bg-blue-600 px-4 py-4 text-base font-bold text-white">
//               Abstract
//             </h2>
//             <p className="space-y-3 text-sm text-slate-700">
//               The North Indian Ocean (NIO) is particularly vulnerable to
//               tropical cyclones (TCs), which pose significant risks due to their
//               potential for rapid intensification and destructive impacts on
//               coastal communities. The Hurricane Analysis and Forecast System
//               (HAFS) is a state-of-the-art modelling framework designed to
//               improve the prediction of TC track, intensity, and associated
//               weather phenomena. HAFS is developed as part of the Unified
//               Forecast System (UFS), employs the Finite-Volume Cubed-Sphere
//               (FV3) dynamical core and an advanced data assimilation system,
//               enabling high-resolution simulations that enhance forecast
//               reliability. This technical report documents the successful
//               implementation of HAFS version 2.0.2 on the MIHIR High-Performance
//               Computing (HPC) system at NCMRWF. The installation process
//               involved compiling the HAFS with Intel 19.0.1.144 compilers and
//               Cray MPICH 7.7.4, ensuring optimized performance on the MIHIR HPC.
//               Integration with NCEPLIBS and other necessary software libraries
//               is essential for the system’s functionality and accuracy. This
//               technical report serves as a comprehensive guide for building,
//               configuring, executing, and troubleshooting HAFS on MIHIR,
//               addressing technical aspects of installation and the required
//             </p>
//           </aside>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default USGSPublicationPage;

import { useParams } from 'react-router-dom';
import PdfWallpaper from '../assets/images/ncmrwf-pdf-wallpapper.jpg';
import {
  hardcodedPublications,
  ASSETS_BASE_URL,
  ASSETS_BASE_URL_NEW,
  doiMapping,
} from './Publications';
import { useLocation } from 'react-router-dom';

// Use doiMapping to find original DOI
const reverseTransformDOI = (transformedDOI) => {
  return doiMapping[transformedDOI] || transformedDOI;
};

const PdfIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="mr-2 size-5 text-red-600"
    viewBox="0 0 20 20"
    fill="currentColor"
    aria-hidden="true"
  >
    <path
      fillRule="evenodd"
      d="M4 2a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V8.414a1 1 0 00-.293-.707l-4-4A1 1 0 0011.586 3H4zm3 6a1 1 0 011-1h6a1 1 0 110 2H8a1 1 0 01-1-1zm1 4a1 1 0 100 2h4a1 1 0 100-2H8z"
      clipRule="evenodd"
    />
  </svg>
);
function transformDOI(doi, year, index) {
  return `10.64349/tr/nmrf.tr.${index}.${year}`;
}
const USGSPublicationPage = () => {
  // const location = useLocation();

  // // Split and extract the DOI from the full path
  // const pathParts = location.pathname.split('/');
  // const doiFromPath = pathParts.slice(2).join('/'); // after /publications/

  // // Find the matching publication by comparing transformed DOI
  // const publication = hardcodedPublications.find((pub, index) => {
  //   const transformed = transformDOI(pub.doi, pub.year, index + 1);
  //   return transformed === doiFromPath;
  // });

  const { doiPart1, doiPart2, doiPart3 } = useParams();
  const transformedDoi = `${doiPart1}/${doiPart2}/${doiPart3}`;

  const publication = hardcodedPublications.find(
    (pub) => pub.transformedDoi === transformedDoi
  );

  // If no publication is found, show fallback UI
  if (!publication) {
    return (
      <div className="to-amber-50 min-h-screen bg-gradient-to-br from-orange-50 via-slate-50 text-slate-800">
        <header className="to-amber-500 bg-gradient-to-r from-blue-600 via-blue-500 p-6 shadow-2xl shadow-orange-500/20">
          <div className="mx-auto max-w-7xl">
            <h1 className="text-4xl font-black tracking-tight text-white drop-shadow-lg transition-all duration-300 hover:drop-shadow-xl">
              NCMRWF Publications Archive
            </h1>
            <p className="mt-1 text-lg font-medium text-orange-100">
              Explore scientific reports, technical documents, and research
              findings
            </p>
          </div>
        </header>
        <main className="container mx-auto px-4 py-8">
          <div className="rounded-2xl border border-orange-100 bg-white/80 p-6 shadow-xl">
            <h2 className="text-2xl font-bold text-slate-800">
              Publication Not Found
            </h2>
            <p className="text-slate-600">
              {/* No publication found for DOI: {decodedId} */}
            </p>
          </div>
        </main>
      </div>
    );
  }

  // Dynamic publication details
  const publicationDetails = [
    { label: 'Title', value: publication.title },
    { label: 'Series Title', value: 'Journal Article' }, // Adjust if needed
    { label: 'Series Number', value: publication.doi }, // Using DOI as series number
    { label: 'Key Words', value: 'Weather Prediction, Modeling' }, // Placeholder; customize as needed
    {
      label: 'DOI',
      value: `https://doi.org/${publication.doi}`,
    },
    { label: 'Year Published', value: publication.year.toString() },
    { label: 'Language', value: 'English' },
    { label: 'Publisher', value: publication.journal },
    { label: 'Pages', value: 'N/A' }, // Placeholder; update if page data is available
  ];

  return (
    <div className="to-amber-50 min-h-screen bg-gradient-to-br from-orange-50 via-slate-50 text-slate-800">
      {/* Header */}
      <header className="to-amber-500 bg-gradient-to-r from-blue-600 via-blue-500 p-6 shadow-2xl shadow-orange-500/20">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 md:flex-row">
          <div>
            <h1 className="text-4xl font-black tracking-tight text-white drop-shadow-lg transition-all duration-300 hover:drop-shadow-xl">
              NCMRWF Publications Archive
            </h1>
            <p className="mt-1 text-lg font-medium text-orange-100">
              Explore scientific reports, technical documents, and research
              findings
            </p>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid gap-8 md:grid-cols-3">
          {/* Left Section */}
          <section className="space-y-6 md:col-span-2">
            <article className="group relative rounded-2xl border border-l-4 border-orange-500 bg-white bg-gradient-to-br from-orange-50/30 to-white p-6 shadow-xl transition-all duration-300 ease-in-out hover:scale-[1.015] hover:border-orange-400 hover:shadow-2xl hover:shadow-orange-600/30">
              <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-orange-100/0 to-orange-200/0 transition-all duration-300 group-hover:from-orange-100/20 group-hover:to-orange-200/10" />
              <div className="relative mb-6 flex items-start gap-4">
                <img
                  src={PdfWallpaper}
                  alt="Document Thumbnail"
                  className="h-32 w-24 rounded-lg object-cover shadow-lg transition-all duration-300 ease-in-out hover:rotate-1 hover:scale-105 hover:shadow-xl"
                />
                <div>
                  <h2 className="text-gray-900 text-2xl font-bold leading-tight transition-colors duration-300 hover:text-orange-800">
                    {publication.title}
                  </h2>
                  <p className="text-gray-600 pt-3 text-sm font-semibold">
                    {publication.authors.join(', ')}
                  </p>
                  {/* <a
                    href={`https://doi.org/${publication.doi}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-block text-sm font-medium text-orange-600 transition-all duration-300 ease-in-out hover:text-orange-700 hover:underline"
                  >
                    https://doi.org/{publication.doi}
                  </a> */}
                </div>
              </div>
              <div className="relative flex flex-wrap gap-4">
                {publication.link && (
                  <a
                    href="https://nwp.ncmrwf.gov.in/publication/TechnicalReportonHAFSv2.0.2Implementation_at_NCMRWF_final.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/btn relative inline-flex items-center gap-2 overflow-hidden rounded-xl border border-orange-500 bg-gradient-to-r from-orange-500 to-orange-600 px-6 py-3 text-sm font-bold text-white shadow-lg transition-all duration-300 ease-in-out hover:scale-105 hover:from-orange-600 hover:to-orange-700 hover:shadow-xl hover:shadow-orange-500/30"
                  >
                    <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/60 to-transparent transition-transform duration-700 ease-out group-hover/btn:translate-x-full" />
                    <PdfIcon className="relative z-10 h-5 w-5 text-white" />
                    <span className="relative z-10">VIEW PDF</span>
                  </a>
                )}
              </div>
            </article>

            <section className="rounded-2xl border border-orange-100 bg-white/80 p-6 text-sm shadow-xl backdrop-blur-sm transition-all duration-300 hover:bg-white/90 hover:shadow-2xl">
              <div className="divide-y divide-orange-100">
                {publicationDetails.map((item, index) => (
                  <div
                    key={index}
                    className="grid gap-2 rounded-lg px-2 py-4 transition-all duration-200 hover:bg-orange-50/50 md:grid-cols-3"
                  >
                    <dt className="font-bold text-orange-800">{item.label}</dt>
                    <dd className="text-gray-700 font-medium md:col-span-2">
                      {item.label === 'DOI' ? (
                        <a
                          href={item.value}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-orange-600 transition-all duration-300 hover:text-orange-700 hover:underline"
                        >
                          {item.value}
                        </a>
                      ) : (
                        item.value
                      )}
                    </dd>
                  </div>
                ))}
              </div>
            </section>
          </section>

          {/* Right Section (Abstract) */}
          <aside className="rounded-2xl border border-orange-100 bg-white/90 p-6 shadow-xl backdrop-blur-sm transition-all duration-300 hover:bg-white hover:shadow-2xl">
            <h2 className="mx-auto mb-4 rounded-lg border-b border-orange-300 bg-blue-600 px-4 py-4 text-base font-bold text-white">
              Abstract
            </h2>
            <p className="space-y-3 text-sm text-slate-700">
              The North Indian Ocean (NIO) is particularly vulnerable to
              tropical cyclones (TCs), which pose significant risks due to their
              potential for rapid intensification and destructive impacts on
              coastal communities. The Hurricane Analysis and Forecast System
              (HAFS) is a state-of-the-art modelling framework designed to
              improve the prediction of TC track, intensity, and associated
              weather phenomena. HAFS is developed as part of the Unified
              Forecast System (UFS), employs the Finite-Volume Cubed-Sphere
              (FV3) dynamical core and an advanced data assimilation system,
              enabling high-resolution simulations that enhance forecast
              reliability. This technical report documents the successful
              implementation of HAFS version 2.0.2 on the MIHIR High-Performance
              Computing (HPC) system at NCMRWF. The installation process
              involved compiling the HAFS with Intel 19.0.1.144 compilers and
              Cray MPICH 7.7.4, ensuring optimized performance on the MIHIR HPC.
              Integration with NCEPLIBS and other necessary software libraries
              is essential for the system’s functionality and accuracy. This
              technical report serves as a comprehensive guide for building,
              configuring, executing, and troubleshooting HAFS on MIHIR,
              addressing technical aspects of installation and the required
            </p>
          </aside>
        </div>
      </main>
    </div>
  );
};

export default USGSPublicationPage;
