import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import {
  ncmrwfImg1,
  ncmrwfImg2,
  ncmrwfImg3,
  ncmrwfImg4,
  ncmrwfImg5,
  ncmrwfImg6,
} from '../../../../../assets/images/photoGallery';

const defaultPhotoGallery = [
  {
    imageUrl: ncmrwfImg1,
    description: { en: 'Description of Image 1', hi: 'छवि 1 का विवरण' },
  },
  {
    imageUrl: ncmrwfImg2,
    description: { en: 'Description of Image 2', hi: 'छवि 2 का विवरण' },
  },
  {
    imageUrl: ncmrwfImg3,
    description: { en: 'Description of Image 3', hi: 'छवि 3 का विवरण' },
  },
  {
    imageUrl: ncmrwfImg4,
    description: { en: 'Description of Image 4', hi: 'छवि 4 का विवरण' },
  },
  {
    imageUrl: ncmrwfImg5,
    description: { en: 'Description of Image 5', hi: 'छवि 5 का विवरण' },
  },
  {
    imageUrl: ncmrwfImg6,
    description: { en: 'Description of Image 6', hi: 'छवि 6 का विवरण' },
  },
];

const PhotoGallery = ({ photos = defaultPhotoGallery }) => {
  const { language } = useSelector((state) => state.language);
  const locale = language.locale;
  const location = useLocation();

  return (
    <div className="relative px-4 pb-8 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-4">
        <h2 className="mt-4 text-center text-2xl font-bold text-slate-800 sm:text-3xl">
          Photo Gallery
        </h2>

        {/* Responsive grid layout */}
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          {photos.map(({ imageUrl, description }, index) => (
            <div
              key={index}
              className="group relative w-full overflow-hidden rounded-xl shadow-md transition-transform hover:scale-105"
            >
              <img
                src={imageUrl}
                alt={description[locale]}
                loading="lazy"
                className="h-48 w-full object-cover sm:h-56 md:h-60"
              />
            </div>
          ))}
        </div>
      </div>

      {/* See All Images CTA */}
      {location.pathname !== '/full-gallery' && (
        <div className="mt-6 flex justify-center sm:justify-end">
          <Link
            to="/full-gallery"
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700 sm:px-5 sm:py-2 sm:text-lg"
          >
            See All Images...
          </Link>
        </div>
      )}
    </div>
  );
};

export default PhotoGallery;
