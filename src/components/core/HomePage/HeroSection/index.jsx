import React, { useRef, useEffect, useState } from 'react';
import ncmrwfVideo from '../../../../assets/videos/ncmrwf.mp4'; // Importing the .mp4 video
import HeroContent from './HeroContent';
import { useSelector } from 'react-redux';

const HeroSection = () => {
  const videoRef = useRef(null); // Ref to control the video element
  const [currentSlide, setCurrentSlide] = useState(0); // Track the current slide
  const { language } = useSelector((state) => state.language);
  const locale = language?.locale;

  const slides = [
    {
      time: 0,
      heading: {
        en: '30+ years of Operational NWP',
        hi: '30+ वर्षों का परिचालन NWP',
      },
      text: {
        en: 'Celebrated 30 years of excellence in Operational Numerical Weather Prediction',
        hi: 'ऑपरेशनल संख्यात्मक मौसम पूर्वानुमान में 30 वर्षों की उत्कृष्टता का जश्न मनाया गया',
      },
    },
    {
      time: 10, // Adjusted timing so it flows smoothly
      heading: {
        en: 'Research and Development',
        hi: 'अनुसंधान और विकास',
      },
      text: {
        en: 'NCMRWF is conducting research and development to maintain and improve its technical expertise, knowledge, and skills',
        hi: 'रा.म.अ.मौ.पू.कें अनुसंधान और विकास कर रहा है ताकि अपनी तकनीकी विशेषज्ञता, ज्ञान और कौशल को बनाए रखा जा सके और उन्हें सुधारा जा सके',
      },
    },
    {
      time: 15, // seconds
      heading: {
        en: 'Impact of Weather Systems on Various Sectors',
        hi: 'विभिन्न क्षेत्रों पर मौसम प्रणालियों का प्रभाव',
      },
      text: {
        en: "The dynamic system of weather, shaped by Earth's rotation, the sun, atmosphere, and oceans, has a significant impact on our daily lives across various sectors such as agriculture, aviation, disaster management, health, and tourism",
        hi: 'मौसम की गतिशील प्रणाली, जो पृथ्वी की घूर्णन, सूर्य, वायुमंडल और महासागरों द्वारा आकारित होती है, हमारे दैनिक जीवन पर कृषि, विमानन, आपदा प्रबंधन, स्वास्थ्य और पर्यटन जैसे विभिन्न क्षेत्रों में महत्वपूर्ण प्रभाव डालती है',
      },
    },
    {
      time: 32, // seconds
      heading: {
        en: 'Advanced Weather Forecasting Techniques',
        hi: 'उन्नत मौसम पूर्वानुमान तकनीकें',
      },
      text: {
        en: 'Modern weather forecasting relies on advanced Numerical Weather Prediction or NWP models. These models use complex maths and high-performance computing to predict future weather accurately. Precise initial conditions are crucial, achieved by combining model data with real-time global observations.',
        hi: 'आधुनिक मौसम पूर्वानुमान उन्नत संख्यात्मक मौसम पूर्वानुमान (NWP) मॉडलों पर निर्भर करता है। ये मॉडल भविष्य के मौसम का सटीक अनुमान लगाने के लिए जटिल गणित और उच्च-प्रदर्शन कंप्यूटिंग का उपयोग करते हैं। सटीक प्रारंभिक स्थितियाँ महत्वपूर्ण होती हैं, जो मॉडल डेटा को वास्तविक समय के वैश्विक अवलोकनों के साथ संयोजित करके प्राप्त की जाती हैं।',
      },
    },
    {
      time: 44, // seconds
      heading: {
        en: 'Advancements in Weather Forecasting by NCMRWF',
        hi: 'रा.म.अ.मौ.पू.कें द्वारा मौसम पूर्वानुमान में प्रगति',
      },
      text: {
        en: 'In the past decade, NCMRWF has made significant progress, reducing forecast errors using deterministic and ensemble prediction systems. It stands out globally, aligning India with leading weather forecasting centres.',
        hi: 'पिछले दशक में, रा.म.अ.मौ.पू.कें ने निर्धारित और संयोजन पूर्वानुमान प्रणालियों का उपयोग करके पूर्वानुमान त्रुटियों को कम करने में महत्वपूर्ण प्रगति की है। यह वैश्विक स्तर पर प्रमुख मौसम पूर्वानुमान केंद्रों के साथ भारत को जोड़ता है।',
      },
      btnLink: '/bimstec',
    },
    {
      time: 55, // seconds
      heading: {
        en: 'International Collaborations in Weather Forecasting',
        hi: 'मौसम पूर्वानुमान में अंतर्राष्ट्रीय सहयोग',
      },
      text: {
        en: 'NCMRWF collaborates with international agencies like NCEP, NOAA, and the Met Office, leading in developing cutting-edge technologies in Numerical Weather Prediction. It also contributes to regional advancements by providing weather forecasts to neighbouring countries through BCWC',
        hi: 'रा.म.अ.मौ.पू.कें अंतर्राष्ट्रीय एजेंसियों जैसे एनसीईपी, नोआ, और मेट ऑफिस के साथ सहयोग करता है, जो संख्यात्मक मौसम पूर्वानुमान में अत्याधुनिक तकनीकों के विकास में अग्रणी हैं। यह बीसीडब्ल्यूसी के माध्यम से पड़ोसी देशों को मौसम पूर्वानुमान प्रदान करके क्षेत्रीय प्रगति में भी योगदान देता है।',
      },
      btnLink: '/bimstec',
    },
    {
      time: 66, // seconds
      heading: {
        en: 'Leadership in Weather Prediction',
        hi: 'मौसम पूर्वानुमान में वैश्विक नेतृत्व',
      },
      text: {
        en: 'NCMRWF leads in weather prediction by deploying High-Resolution Global Deterministic and Ensemble Prediction Systems. These advanced models provide reliable forecasts for disaster preparedness, climate research, and resource management for a more resilient society.',
        hi: 'रा.म.अ.मौ.पू.कें उच्च-रिज़ॉल्यूशन वैश्विक निर्धारक और एन्सेम्बल भविष्यवाणी प्रणालियों को तैनात करके मौसम पूर्वानुमान में अग्रणी है। ये उन्नत मॉडल आपदा तैयारी, जलवायु अनुसंधान और संसाधन प्रबंधन के लिए विश्वसनीय पूर्वानुमान प्रदान करते हैं, जिससे एक अधिक मजबूत और सुरक्षित समाज का निर्माण होता है।',
      },
      btnLink: '/ncmrwf',
    },
  ];

  const handleTimeUpdate = () => {
    const currentTime = videoRef.current.currentTime;
    const activeSlide = slides.find((slide, index) => {
      const nextSlideTime =
        slides[index + 1]?.time || videoRef.current.duration;
      return currentTime >= slide.time && currentTime < nextSlideTime;
    });

    if (activeSlide) {
      setCurrentSlide(slides.indexOf(activeSlide));
    }
  };

  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    videoRef.current.play(); // Ensure video starts playing when component loads

    // Add event listener for time update to switch slides
    videoElement.addEventListener('timeupdate', handleTimeUpdate);

    return () => {
      // Cleanup event listener when component unmounts
      videoElement.removeEventListener('timeupdate', handleTimeUpdate);
    };
  }, [slides]);

  return (
    <div className="relative h-full w-full">
      {/* Video */}
      <video
        ref={videoRef}
        src={ncmrwfVideo}
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        className="h-full w-full object-cover"
      />

      {/* Overlay with informative content */}
      <div className="absolute left-0 top-0 flex h-full w-full flex-col justify-center overflow-hidden bg-black bg-opacity-50 px-4 text-center">
        <div className="relative flex h-full w-full items-center justify-center">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`absolute w-full transition-transform duration-1000 ease-in-out ${
                index === currentSlide
                  ? 'translate-x-0 opacity-100'
                  : 'translate-x-full opacity-0'
              }`}
            >
              <HeroContent
                heading={slide.heading[locale]} // Display heading based on locale
                text={slide.text[locale]} // Display text based on locale
                // buttonText={locale === 'en' ? 'Learn more' : 'अधिक जानें'}
                // link={slide?.btnLink}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
