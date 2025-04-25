import React from 'react';
import { Link } from 'react-router-dom';

// const HeroContent = ({ heading, text, buttonText, link }) => {
//   return (
//     <div className="ml-12 flex w-7/12 flex-col items-start justify-center gap-3">
//       <h1 className="mb-4 text-start text-7xl font-semibold text-richblack-5">
//         {heading}
//       </h1>
//       <p className="mb-6 max-w-xl text-start text-lg text-richblack-5">
//         {text}
//       </p>
//       {/* Learn More Button */}
//       {/* <Link
//         to={link} // Change this to your actual link
//         className="rounded-lg bg-customRed-500 px-6 py-2 text-richblack-5 shadow-md transition duration-200 hover:bg-customRed-800"
//       >
//         {buttonText}
//       </Link> */}
//     </div>
//   );
// };

const HeroContent = ({ heading, text, buttonText, link }) => {
  return (
    <div className="ml-4 flex w-full flex-col items-start justify-center gap-3 sm:ml-8 sm:w-10/12 md:ml-12 md:w-7/12">
      <h1 className="mb-4 text-start text-3xl font-semibold leading-tight text-richblack-5 drop-shadow-lg sm:text-5xl md:text-6xl lg:text-7xl">
        {heading}
      </h1>
      <p className="mb-6 max-w-xl text-start text-base leading-relaxed text-richblack-5 sm:text-lg md:text-xl">
        {text}
      </p>
      {/* Learn More Button */}
      {/* <Link
        to={link}
        className="rounded-lg bg-customRed-500 px-6 py-2 text-richblack-5 shadow-md transition duration-200 hover:bg-customRed-800"
      >
        {buttonText}
      </Link> */}
    </div>
  );
};

export default HeroContent;
