import bimstec from '../assets/images/bimstec.png';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const bimstecTranslations = {
  title: {
    en: 'BIMSTEC: Regional Cooperation',
    hi: 'बिम्सटेक: क्षेत्रीय सहयोग',
  },
  descriptionRich: {
    en: {
      part1: 'The ',
      highlighted:
        'Bay of Bengal Initiative for Multi-Sectoral Technical and Economic Cooperation (BIMSTEC)',
      part2: ' is a regional organization established on ',
      date: '06 June 1997',
      part3:
        '. Initially known as BIST-EC, it expanded with the inclusion of Myanmar (1997), Bhutan, and Nepal (2004).',
    },
    hi: {
      part1: '',
      highlighted:
        'बंगाल की खाड़ी बहु-क्षेत्रीय तकनीकी और आर्थिक सहयोग पहल (बिम्सटेक)',
      part2: ' एक क्षेत्रीय संगठन है जिसकी स्थापना ',
      date: '06 जून 1997',
      part3:
        ' को की गई थी। प्रारंभ में इसे BIST-EC कहा गया था, जो बाद में म्यांमार (1997), भूटान और नेपाल (2004) के शामिल होने से विस्तारित हुआ।',
    },
  },
  milestones: [
    {
      year: '1997',
      title: {
        en: 'Formation of BIMSTEC',
        hi: 'बिम्सटेक का गठन',
      },
      description: {
        en: 'Established as BIST-EC with Bangladesh, India, Sri Lanka, and Thailand. Later expanded with Myanmar, Bhutan, and Nepal.',
        hi: 'बांग्लादेश, भारत, श्रीलंका और थाईलैंड के साथ BIST-EC के रूप में स्थापित। बाद में म्यांमार, भूटान और नेपाल को जोड़ा गया।',
      },
    },
    {
      year: '2014',
      title: {
        en: 'BCWC Established',
        hi: 'BCWC की स्थापना',
      },
      description: {
        en: 'The BIMSTEC Centre for Weather and Climate (BCWC) was established to enhance weather prediction and climate modeling.',
        hi: 'मौसम पूर्वानुमान और जलवायु मॉडलिंग को बढ़ावा देने के लिए बिम्सटेक मौसम और जलवायु केंद्र (BCWC) की स्थापना की गई।',
      },
    },
    {
      year: 'Ongoing',
      title: {
        en: 'Disaster Management',
        hi: 'आपदा प्रबंधन',
      },
      description: {
        en: 'India leads the security sector, focusing on Counter-Terrorism, Disaster Management, and Energy initiatives.',
        hi: 'भारत सुरक्षा क्षेत्र का नेतृत्व करता है, जिसमें आतंकवाद विरोध, आपदा प्रबंधन और ऊर्जा पहलों पर ध्यान केंद्रित किया गया है।',
      },
    },
  ],
  learnMore: {
    en: 'Learn More',
    hi: 'और जानें',
  },
};

const Bimstec = () => {
  const { language } = useSelector((state) => state.language);
  const locale = language?.locale || 'en';

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-10 text-white">
      <div className="w-full max-w-6xl text-center">
        <img
          src={bimstec}
          alt="BIMSTEC Logo"
          className="mx-auto rounded-xl border-4 border-blue-500 object-cover shadow-xl transition-transform duration-300 ease-in-out hover:scale-105"
        />
        <h2 className="mt-6 text-5xl font-extrabold text-blue-400">
          {/* BIMSTEC: Regional Cooperation */}
          {bimstecTranslations.title[locale]}
        </h2>
        <p className="mx-auto mt-4 max-w-3xl text-lg text-slate-300">
          {bimstecTranslations.descriptionRich[locale].part1}{' '}
          <strong className="text-yellow-400">
            {/* Bay of Bengal Initiative for Multi-Sectoral Technical and Economic
            Cooperation (BIMSTEC) */}
            {bimstecTranslations.descriptionRich[locale].highlighted}
          </strong>{' '}
          {/* is a regional organization established on{' '} */}
          {bimstecTranslations.descriptionRich[locale].part2}
          <span className="font-semibold text-green-400">
            {/* 06 June 1997 */}
            {bimstecTranslations.descriptionRich[locale].date}
          </span>
          .
          {/* Initially known as BIST-EC, it expanded with the inclusion of Myanmar
          (1997), Bhutan, and Nepal (2004). */}
          {bimstecTranslations.descriptionRich[locale].part3}
        </p>
      </div>

      <div className="mt-12 grid w-full max-w-6xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {bimstecTranslations?.milestones?.map((milestone, index) => (
          <div
            key={index}
            className="flex flex-col items-center rounded-2xl bg-gradient-to-br from-blue-900 to-slate-900 p-6 text-center text-white shadow-lg transition-all duration-300 ease-in-out hover:scale-110 hover:shadow-2xl"
          >
            <h3 className="text-2xl font-semibold text-blue-400">
              {milestone.title[locale]} ({milestone.year})
            </h3>
            <p className="mt-2 text-slate-300">
              {milestone.description[locale]}
            </p>
          </div>
        ))}
      </div>
      <div className="mx-auto flex gap-4">
        <Link
          to="https://bimstec.org/"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 rounded-lg bg-blue-600 px-6 py-3 text-lg font-semibold text-white shadow-lg transition-all duration-300 ease-in-out hover:scale-105 hover:bg-blue-700 hover:shadow-2xl"
        >
          {bimstecTranslations.learnMore[locale]}
        </Link>
        <Link
          to="/bimstec/charts"
          className="mt-8 rounded-lg bg-blue-600 px-6 py-3 text-lg font-semibold text-white shadow-lg transition-all duration-300 ease-in-out hover:scale-105 hover:bg-blue-700 hover:shadow-2xl"
        >
          BIMSTEC Charts
        </Link>
      </div>
    </div>
  );
};

export default Bimstec;
