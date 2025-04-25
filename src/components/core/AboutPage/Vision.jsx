import React from 'react';
import { useSelector } from 'react-redux';
import teamImg from '../../../assets/images/ncmrwf.jpg';
import InfoSection from '../../common/InfoSection';

const Vision = () => {
  const { language } = useSelector((state) => state.language);
  const locale = language?.locale;

  const visionTranslations = {
    aboutTitle: {
      en: 'Vision',
      hi: 'दृष्टि',
    },
    aboutDescription: {
      en: 'Seamless prediction of weather and climate for the benefit of the society.',
      hi: 'समाज के लाभ के लिए मौसम और जलवायु की सहज भविष्यवाणी।',
    },
  };

  return (
    <div className="h-[24rem] bg-light-default">
      <InfoSection
        title={visionTranslations.aboutTitle[locale]}
        description={visionTranslations.aboutDescription[locale]}
        imageSrc={teamImg}
        imageAlt={'about-ncmrwf-team'}
        className="flex flex-col items-center justify-between lg:flex-row"
      />
    </div>
  );
};

export default Vision;
