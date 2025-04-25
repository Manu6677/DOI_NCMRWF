import { useState, useEffect } from 'react';
import HeroSection from '../../components/core/HomePage/HeroSection';
import ImpactOverview from '../../components/core/HomePage/ImpactOverview';
import VideoAndPartnerSection from '../../components/core/HomePage/VideoAndPartnerSection';
import SpecialProducts from '../../components/core/HomePage/SpecialProducts';
import { IoPersonSharp } from 'react-icons/io5';
import CustomModal from '../../components/common/CustomModal';
import TestimonialSection from '../../components/core/HomePage/TestimonialSection';
import TopTitles from '../../components/core/HomePage/TopTitles';
import Footer from '../../components/common/Footer';

const Home = () => {
  const [isTestimonialOpen, setTestimonialOpen] = useState(false);

  const handleIconClick = () => {
    setTestimonialOpen(true);
  };

  return (
    <>
      <div>
        {/* Section 1 : Hero Section */}
        <div className="h-[42rem] w-full">
          <HeroSection />
        </div>

        {/* Section 2 : ImpactOverview Section */}
        <div className="w-full">
          <ImpactOverview />
        </div>

        {/* Section 3 : SpecialProducts Section */}
        <div className="w-full">
          <SpecialProducts />
        </div>

        {/* Section 4 - Our Partners Section */}
        <div className="w-full">
          <VideoAndPartnerSection />
        </div>

        {/* Bulletin board icon */}
        <div
          role="button"
          className="fixed right-0 top-52 z-10 cursor-pointer rounded-l-md bg-orange-600 py-2 pl-2 pr-4 text-richblack-5"
          onClick={() => handleIconClick()}
        >
          <IoPersonSharp className="scale-100 animate-bounce text-2xl transition-transform duration-500 ease-in-out hover:scale-110" />
        </div>

        {/* Overlay and Testimonial Modal */}
        {isTestimonialOpen && (
          <div className="absolute">
            <CustomModal
              open={isTestimonialOpen}
              setOpen={() => setTestimonialOpen(false)}
              componentToRender={<TestimonialSection />}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
