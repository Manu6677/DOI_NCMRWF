import React, { useState, useEffect } from 'react'; // Import hooks
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { notices } from '../data/rajbhasha'; // Static notices data
import { fetchImagesByType } from '../services/operations/sliderImagesAPI'; // Your API function

// Import Swiper React components and styles
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

// Define Backend Base URL (Use environment variable in real app)
const API_BASE_URL =
  process.env.REACT_APP_BASE_URL || 'https://nwp.ncmrwf.gov.in/apis/api/v1';

const RajbhashaPortal = () => {
  // --- State Variables ---
  const [sliderImages, setSliderImages] = useState([]); // To store fetched images
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  // --- Data Fetching Effect ---
  useEffect(() => {
    const getImages = async () => {
      setLoading(true); // Start loading
      setError(null); // Reset error
      try {
        // Fetch images specifically for the 'rajbhasha' category for this portal
        const responseData = await fetchImagesByType('rajbhasha');
        if (responseData) {
          setSliderImages(responseData); // Set fetched images to state
        } else {
          setSliderImages([]); // Set empty if no data received
        }
      } catch (err) {
        console.error('Error fetching slider images:', err);
        setError('Failed to load slider images.'); // Set error message
        setSliderImages([]); // Clear images on error
      } finally {
        setLoading(false); // Stop loading regardless of success/failure
      }
    };

    getImages(); // Call the fetch function
  }, []); // Empty dependency array means this runs once when the component mounts

  // --- Render Helper for Slider ---
  const renderSlider = () => {
    if (loading) {
      return (
        <div className="flex h-64 items-center justify-center rounded-lg bg-slate-200 p-10 text-center md:h-80">
          Loading Slider...
        </div>
      );
    }
    if (error) {
      return (
        <div className="flex h-64 items-center justify-center rounded-lg bg-red-100 p-10 text-center text-red-700 md:h-80">
          {error}
        </div>
      );
    }
    if (sliderImages.length === 0) {
      return (
        <div className="flex h-64 items-center justify-center rounded-lg bg-slate-200 p-10 text-center md:h-80">
          No images available.
        </div>
      );
    }

    return (
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation={false}
        modules={[Autoplay, Pagination, Navigation]}
        // Container size and overflow are set here - NO CHANGES NEEDED HERE
        className="mySwiper h-40 w-full overflow-hidden rounded-lg md:h-80"
        loop={sliderImages.length > 1} // Only loop if more than one image
      >
        {/* Map over the fetched sliderImages state */}
        {sliderImages.map((image) => {
          // Construct the full image URL
          const fullImageUrl = `${API_BASE_URL}${image.file_path}`;
          return (
            <SwiperSlide
              key={image.id}
              className="relative max-h-full overflow-hidden bg-slate-200"
            >
              <img
                src={fullImageUrl} // Use the full URL
                alt={image.alt_text} // Use alt text from fetched data
                loading="lazy"
                className="size-[100px] object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 via-black/50 to-transparent p-4 pt-8 text-white">
                {/* Use caption from fetched data */}
                <p className="text-base font-semibold">{image.caption}</p>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    );
  };

  // --- Main Component Return ---
  return (
    <div className="bg-slate-100 p-6">
      <div className="mx-auto h-auto max-w-6xl rounded-lg bg-white p-6 shadow-xl">
        <h2 className="mb-6 text-center text-3xl font-bold text-red-700">
          राजभाषा पोर्टल
        </h2>
        <p className="mb-8 text-center text-slate-700">
          हिंदी भाषा से जुड़ी नवीनतम घोषणाएँ और कार्यक्रम
        </p>

        {/* --- START Notices Grid (Static) --- */}
        <h3 className="mb-6 text-2xl font-semibold text-slate-800">
          नवीनतम सूचनाएँ
        </h3>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {notices.map((notice, index) => (
            <motion.div
              key={notice.id || `notice-${index}`}
              className="flex flex-col rounded-lg border border-slate-200 bg-white p-4 shadow-md hover:shadow-lg"
              whileHover={{ scale: 1.02 }}
              layout
            >
              <div className="flex flex-grow flex-col">
                <h3 className="text-xl font-semibold text-blue-600">
                  {notice.title}
                </h3>
                <p className="mt-2 flex-grow text-slate-700">
                  {notice.description}
                </p>
                <div className="mt-3 pt-3">
                  {notice.reports && notice.reports.length > 0 && (
                    <Link
                      to={`/rajbhasha/${notice.id}`}
                      className="inline-block text-sm font-medium text-red-600 hover:underline"
                    >
                      और पढ़ें →
                    </Link>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        {/* --- END Notices Grid --- */}

        {/* --- START Image Slider (Dynamic) --- */}
        <div className="my-10">
          <h3 className="text-2xl font-semibold text-slate-800">
            गतिविधियों की झलकियाँ (राजभाषा)
          </h3>
          {/* Render the slider using the helper function */}
          {renderSlider()}
        </div>
        {/* --- END Image Slider --- */}
      </div>
    </div>
  );
};

export default RajbhashaPortal;
