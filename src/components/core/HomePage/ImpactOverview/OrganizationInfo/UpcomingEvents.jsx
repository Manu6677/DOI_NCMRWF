// Headlines.js
import React from 'react';
import { useSelector } from 'react-redux';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// Import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

// Import event images
import event1 from '../../../../../assets/images/events/Banner_Foundatiaon_Day.png';
import event2 from '../../../../../assets/images/events/Banner_Hindi_Sangosthi_24-25Mar2025.png';
// import event3 from '../../../../../assets/images/events/foundationDay.png';
import event4 from '../../../../../assets/images/events/ncmrwf-meet.png';
import event5 from '../../../../../assets/images/events/IISF-2024_Banner.png';
import event6 from '../../../../../assets/images/events/Screenshot_5.png';
import event7 from '../../../../../assets/images/events/seminarrr.jpg';

const eventImages = [event1, event2, event4, event5, event6, event7];

const headlines = [
  {
    description: {
      en: 'Breaking: New advancements in AI technology announced.',
      hi: 'ताज़ा खबर: एआई प्रौद्योगिकी में नई प्रगति की घोषणा की गई।',
    },
  },
  {
    description: {
      en: 'Sports Update: Local team wins championship.',
      hi: 'खेल अपडेट: स्थानीय टीम ने चैम्पियनशिप जीती।',
    },
  },
  {
    description: {
      en: 'Weather Alert: Severe storms expected this weekend.',
      hi: 'मौसम चेतावनी: इस सप्ताहांत गंभीर तूफान की उम्मीद है।',
    },
  },
  {
    description: {
      en: 'Health News: New study reveals benefits of meditation.',
      hi: 'स्वास्थ्य समाचार: नई अध्ययन में ध्यान के लाभों का खुलासा।',
    },
  },
  {
    description: {
      en: 'Finance: Stock market hits all-time high.',
      hi: 'वित्त: शेयर बाजार ने सर्वकालिक उच्च स्तर पर पहुंचा।',
    },
  },
];

const UpcomingEvents = () => {
  const { language } = useSelector((state) => state.language);
  const locale = language.locale;

  return (
    <div className="relative bg-white">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        {eventImages.map((event, index) => (
          <SwiperSlide key={index}>
            <div className="flex items-center justify-center">
              <img
                src={event}
                alt={`event-${index + 1}`}
                loading="lazy"
                className="size-full object-cover"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default UpcomingEvents;
