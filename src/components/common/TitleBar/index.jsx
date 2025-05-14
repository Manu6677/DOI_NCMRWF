import ncmrwfLogo from '../../../assets/images/NCMRWF_Logo_Hindi-English.png';
import { useSelector } from 'react-redux';
import { navHeading } from '../../../data/nav-data';
import emblemLight from '../../../assets/svgs/Emblem-of-India-logo-vector-01.svg';

const TitleBar = () => {
  const { language } = useSelector((state) => state.language);

  return (
    <div className="flex flex-col items-center justify-between gap-4 rounded-lg bg-white px-4 py-3 shadow-lg sm:flex-row sm:gap-0 sm:px-6 sm:py-4">
      {/* Emblem */}
      <div className="flex items-center justify-center">
        <img
          src={emblemLight}
          alt="emblem-light-logo"
          loading="lazy"
          className="size-16 sm:size-20 lg:size-24"
        />
      </div>

      {/* Title */}
      <div className="flex flex-col items-center text-center">
        <span className="mb-1 text-xl font-bold text-blue-800 sm:text-2xl">
          {language?.locale === 'hi'
            ? navHeading.title.hi
            : navHeading.title.en}
        </span>
        <span className="text-base text-blue-600 sm:text-lg">
          {language?.locale === 'hi'
            ? navHeading.subtitle.hi
            : navHeading.subtitle.en}
        </span>
      </div>

      {/* NCMRWF Logo */}
      <div className="flex items-center justify-center">
        <img
          src={ncmrwfLogo}
          alt="ncmrwf-logo"
          loading="lazy"
          className="size-16 sm:size-20 lg:size-24"
        />
      </div>
    </div>
  );
};

export default TitleBar;
