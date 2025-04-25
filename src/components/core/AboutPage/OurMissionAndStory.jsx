import React from 'react';
import { useSelector } from 'react-redux';
import teamImg from '../../../assets/images/vision.webp';
import InfoSection from '../../common/InfoSection';

const OurMissionAndStory = () => {
  const { language } = useSelector((state) => state.language);
  const locale = language?.locale;

  const ourMissionTranslations = {
    visionTitle: {
      en: 'Mission',
      hi: 'हमारा मिशन',
    },
    visionDescription: {
      en: `Continuously develop advanced numerical weather prediction systems, with increased reliability and accuracy over India and neighboring regions through research, development and demonstration of new and novel applications, maintaining highest level of knowledge, skill and technical bases.`,
      hi: 'भारत और पड़ोसी क्षेत्रों में अधिक विश्वसनीय और सटीक संख्यात्मक मौसम पूर्वानुमान प्रणालियों के निरंतर विकास के लिए अनुसंधान, विकास और नवीनतम अनुप्रयोगों के प्रदर्शन के माध्यम से उच्चतम स्तर के ज्ञान, कौशल और तकनीकी विशेषज्ञता को बनाए रखना।',
    },
  };

  return (
    <div className="flex flex-col py-2 pt-10">
      <InfoSection
        title={ourMissionTranslations.visionTitle[locale]}
        description={ourMissionTranslations.visionDescription[locale]}
        imageSrc={teamImg}
        imageAlt={
          locale === 'hi' ? 'NCMRWF टीम के बारे में' : 'About NCMRWF Team'
        }
        className="mb-24 flex flex-col items-center justify-between lg:flex-row-reverse"
      />
    </div>
  );
};

export default OurMissionAndStory;
