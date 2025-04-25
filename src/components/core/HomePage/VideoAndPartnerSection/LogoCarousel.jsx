import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Link } from 'react-router-dom';
import emblemImg from '../../../../assets/svgs/Emblem-of-India-logo-vector-01-white.svg';
import imdLogo from '../../../../assets/images/imd_logo_a.webp';
import iitmLogo from '../../../../assets/images/IITM.jpg';
import incoisLogo from '../../../../assets/images/INCOIS.jpg';
import ncporLogo from '../../../../assets/images/ncpor.png';
import niotLogo from '../../../../assets/images/niot.jpg';
import { useSelector } from 'react-redux';

const LogoCarousel = () => {
  const { language } = useSelector((state) => state.language);
  const locale = language?.locale;

  const logos = [
    {
      name: 'moes',
      src: emblemImg,
      url: 'https://www.moes.gov.in/',
    },
    {
      name: 'imd',
      src: imdLogo,
      url: 'https://mausam.imd.gov.in/',
    },
    {
      name: 'iitm',
      src: iitmLogo,
      url: 'https://www.tropmet.res.in/',
    },
    {
      name: 'incois',
      src: incoisLogo,
      url: 'https://incois.gov.in/',
    },
    {
      name: 'ncpor',
      src: ncporLogo,
      url: 'https://ncpor.res.in/',
    },
    {
      name: 'niot',
      src: niotLogo,
      url: 'https://www.niot.res.in/',
    },
  ];

  const settings = {
    infinite: true,
    speed: 5000,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 0,
    cssEase: 'linear',
    pauseOnHover: true,
    arrows: false,
  };

  const textContent = {
    heading: {
      en: 'Collaborating for Excellence',
      hi: 'उत्कृष्टता के लिए सहयोग',
    },
    description: {
      en: 'Highlighting our strategic partners who contribute to our mission of excellence and innovation',
      hi: 'हमारे उन रणनीतिक साझेदारों पर प्रकाश डालना जो हमारी उत्कृष्टता और नवाचार के मिशन में योगदान करते हैं',
    },
  };

  return (
    <div className="bg-gray-100 relative flex w-full flex-col overflow-hidden py-20">
      {/* Left gradient shadow */}
      <div className="from-gray-100 pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r to-transparent"></div>

      {/* Carousel */}
      <Slider {...settings}>
        {logos.map((logo, index) => (
          <div key={index}>
            <Link
              to={logo.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Visit ${logo.name} website`}
              className="flex flex-col items-center justify-center transition-opacity duration-300 hover:opacity-80"
            >
              <div className={`flex flex-col items-center justify-center p-4`}>
                <img
                  src={logo.src}
                  alt={logo.name}
                  className={`h-28 w-28 object-contain text-white ${
                    logo.name === 'moes' ? 'bg-white p-2' : ''
                  }`}
                  loading="lazy"
                />
                <p className="mt-2 text-center text-lg font-medium uppercase text-white">
                  {logo.name}
                </p>
              </div>
            </Link>
          </div>
        ))}
      </Slider>

      {/* Right gradient shadow */}
      <div className="from-gray-100 pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l to-transparent"></div>
    </div>
  );
};

export default LogoCarousel;
