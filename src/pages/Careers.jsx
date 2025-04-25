import { useEffect, useState, useMemo } from 'react';
import Openings from '../components/core/AboutPage/CareersPage/Openings';
import careerImg from '../assets/images/career.png';
import { useForm } from 'react-hook-form';
import JobSearchForm from '../components/core/AboutPage/CareersPage/JobSearchForm';
import { useNavigate } from 'react-router-dom';
import { navigateToJobs } from '../utils/navigateToJobs';

const Careers = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { touched },
  } = useForm({
    defaultValues: {
      jobTitle: '',
      location: '',
    },
  });

  const onSubmit = (data) => {
    const { jobTitle, location } = data;
    navigateToJobs(navigate, jobTitle, location); // Pass navigate as an argument
  };

  // Memoized dynamic word and color
  const dynamicWordAndColor = useMemo(() => {
    const words = ['Join', 'Explore', 'Discover', 'Shape'];
    const colors = ['text-orange-500', 'text-customRed-500', 'text-green-500'];

    return {
      word: words[currentIndex % words.length],
      color: colors[currentIndex % colors.length],
    };
  }, [currentIndex]);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setCurrentIndex((prevIndex) => prevIndex + 1);
  //   }, 3000); // Change every 3 seconds

  //   return () => clearInterval(interval); // Cleanup on unmount
  // }, []);

  return (
    <div>
      {/* Header Section */}
      <header className="mx-auto flex w-11/12 flex-col-reverse items-center justify-between py-12 lg:w-10/12 lg:flex-row">
        {/* Left Content */}
        <div className="flex flex-col items-center text-center lg:w-8/12 lg:items-start lg:text-left">
          {/* Dynamic Word on First Line */}
          <h1
            className={`mb-2 text-4xl font-bold text-blue-500 lg:text-5xl ${dynamicWordAndColor?.color}`}
          >
            {dynamicWordAndColor?.word}
          </h1>

          {/* Remaining Title on Second Line */}
          <h3 className="mb-4 text-2xl font-semibold lg:text-3xl">
            NCMRWF - Advancing Weather Science
          </h3>
          <p className="mb-8 text-lg">
            Explore Exciting Career Opportunities at NCMRWF
          </p>

          {/* Search Form */}
          <JobSearchForm
            formName={'careers'}
            formStyle="flex w-full flex-wrap gap-2"
            fieldStyle="border-none p-2 text-base outline-none"
            inputContainerStyle="flex items-center justify-start gap-2 overflow-hidden rounded-full border px-2 py-1 shadow-sm focus-within:ring-2 focus-within:ring-blue-500 lg:w-72 dark:focus-within:ring-blue-500"
            btnStyle={
              'self-end rounded-full bg-blue-500 px-8 py-3 font-semibold text-white hover:bg-blue-600'
            }
            register={register}
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
          />
        </div>

        {/* Right Image */}
        <div className="mb-8 w-8/12 lg:mb-0 lg:w-4/12">
          <img
            src={careerImg}
            alt="Careers"
            className="size-80 rounded-full object-cover shadow-lg"
            loading="lazy"
          />
        </div>
      </header>

      {/* Latest Jobs */}
      <Openings />
    </div>
  );
};

export default Careers;
