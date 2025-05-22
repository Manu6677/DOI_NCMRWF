import { useSelector } from 'react-redux';
import UpcomingEvents1 from './UpcomingEvents1';
import OrganizationInfo from './OrganizationInfo';
import MapComponent from '../MapComponent';
import { useMapEvents } from 'react-leaflet';

const ImpactOverview = () => {
  const { language } = useSelector((state) => state.language);
  const locale = language?.locale;

  const translations = {
    en: {
      heading: 'Explore Our Organization & Impact',
      description:
        'Learn more about our organization’s initiatives, mission, and see our impact through detailed maps and valuable insights.',
    },
    hi: {
      heading: 'हमारे संगठन और प्रभाव की खोज करें',
      description:
        'हमारे संगठन की पहलों, मिशन के बारे में अधिक जानें और विस्तृत मानचित्रों और मूल्यवान अंतर्दृष्टियों के माध्यम से हमारे प्रभाव को देखें',
    },
  };

  const handleMapClick = () => {
    window.open('https://nwp.ncmrwf.gov.in/dashboard/', '_blank');
  };

  return (
    <section className="bg-blue-700 bg-gradient-to-r py-4">
      <div className="mx-auto mt-2 px-4">
        {/* Header */}
        <div className="mb-8 text-center">
          <h2 className="mb-4 text-3xl font-bold text-white md:text-5xl">
            {translations[locale]?.heading || translations.en.heading}
          </h2>
          <p className="text-lg text-white md:text-xl">
            {translations[locale]?.description || translations.en.description}
          </p>
        </div>

        {/* Featured Sections */}
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-center">
          <div className="-mt-12 w-full md:w-6/12">
            <OrganizationInfo />
          </div>

          <div
            onClick={handleMapClick}
            className="w-full cursor-pointer rounded-lg border border-slate-300 bg-[#008B8B] p-1 md:w-5/12"
          >
            <h2 className="mb-4 w-full text-center text-2xl font-bold text-white">
              {locale === 'en'
                ? 'GIS-Based Weather Analysis Tool'
                : 'जीआईएस आधारित मौसम मानचित्रण और विश्लेषण'}
            </h2>
            <MapComponent />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImpactOverview;
