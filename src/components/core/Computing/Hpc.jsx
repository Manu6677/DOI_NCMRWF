import arunikaImg from '../../../assets/images/hpc/arunika.png';
import { useSelector } from 'react-redux';

const hpcTranslations = {
  title: {
    en: 'Arunika Super Computer',
    hi: 'अरुणिका सुपर कंप्यूटर',
  },
  description: {
    en: 'Arunika is a state-of-the-art high-performance computing (HPC) system installed at NCMRWF, India. It plays a crucial role in advancing weather and climate research, disaster preparedness, and climate resilience through cutting-edge computational capabilities.',
    hi: 'अरुणिका एक अत्याधुनिक उच्च प्रदर्शन कंप्यूटिंग (HPC) प्रणाली है जिसे भारत के एनसीएमआरडब्ल्यूएफ में स्थापित किया गया है। यह मौसम और जलवायु अनुसंधान, आपदा तैयारी और जलवायु लचीलापन को उन्नत बनाने में एक महत्वपूर्ण भूमिका निभाती है।',
  },
  features: [
    {
      title: {
        en: 'Processing Power',
        hi: 'प्रोसेसिंग पावर',
      },
      description: {
        en: 'Powered by AMD Milan 7643 processors with 48 cores per node and 2115 computational nodes, achieving a peak performance of 7.47 PetaFLOPS.',
        hi: 'AMD Milan 7643 प्रोसेसर द्वारा संचालित, प्रत्येक नोड में 48 कोर और 2115 कंप्यूटेशनल नोड्स के साथ, अधिकतम 7.47 पेटाफ्लॉप्स प्रदर्शन प्राप्त करता है।',
      },
    },
    {
      title: {
        en: 'Storage & Connectivity',
        hi: 'स्टोरेज और कनेक्टिविटी',
      },
      description: {
        en: 'Backed by 2.247 Petabytes of high-speed DDN storage and HDR 200 Gbps interconnect for seamless data processing and communication.',
        hi: '2.247 पेटाबाइट्स की हाई-स्पीड DDN स्टोरेज और HDR 200 Gbps इंटरकनेक्ट द्वारा समर्थित, जो डेटा प्रोसेसिंग और संचार को निर्बाध बनाता है।',
      },
    },
    {
      title: {
        en: 'Energy Efficiency',
        hi: 'ऊर्जा दक्षता',
      },
      description: {
        en: 'Operates with a 2.295 MW power capacity, supporting a 30% future HPC expansion and achieving an efficient Power Usage Effectiveness (PUE) of ~1.2.',
        hi: '2.295 मेगावाट की बिजली क्षमता के साथ संचालित, भविष्य में 30% HPC विस्तार का समर्थन करता है और लगभग 1.2 की ऊर्जा उपयोग दक्षता (PUE) प्राप्त करता है।',
      },
    },
    {
      title: {
        en: 'Cooling System',
        hi: 'कूलिंग सिस्टम',
      },
      description: {
        en: 'Features 25 liquid-cooled racks and 7 air-cooled racks, with 95% heat dissipation via liquid cooling, enhancing efficiency and sustainability.',
        hi: '25 लिक्विड-कूल्ड रैक्स और 7 एयर-कूल्ड रैक्स की सुविधा, जिसमें 95% गर्मी लिक्विड कूलिंग के माध्यम से नष्ट होती है, दक्षता और स्थिरता को बढ़ाता है।',
      },
    },
    {
      title: {
        en: 'Software & Tools',
        hi: 'सॉफ्टवेयर और उपकरण',
      },
      description: {
        en: 'Runs on RHEL OS, leveraging PBS Pro for workload management, SMC xScale for cluster management, and AMD AOCC & NVIDIA SDK for AI/ML workloads.',
        hi: 'RHEL OS पर चलता है, वर्कलोड प्रबंधन के लिए PBS Pro, क्लस्टर प्रबंधन के लिए SMC xScale और AI/ML कार्यभार के लिए AMD AOCC और NVIDIA SDK का उपयोग करता है।',
      },
    },
    {
      title: {
        en: 'AI & ML Capabilities',
        hi: 'एआई और एमएल क्षमताएं',
      },
      description: {
        en: 'Dedicated computational resources for AI/ML applications with 1.9 PetaFLOPS standalone power, enhancing predictive analytics and data modeling.',
        hi: 'AI/ML अनुप्रयोगों के लिए समर्पित 1.9 पेटाफ्लॉप्स की स्टैंडअलोन शक्ति के साथ कंप्यूटेशनल संसाधन, जो भविष्यवाणी विश्लेषण और डेटा मॉडलिंग को बढ़ाते हैं।',
      },
    },
    {
      title: {
        en: 'Applications',
        hi: 'अनुप्रयोग',
      },
      description: {
        en: 'Supports extreme weather forecasting, climate simulations, AI-driven analytics, and high-resolution atmospheric data processing.',
        hi: 'अत्यधिक मौसम पूर्वानुमान, जलवायु सिमुलेशन, एआई-संचालित विश्लेषण और उच्च-रिज़ॉल्यूशन वायुमंडलीय डेटा प्रोसेसिंग का समर्थन करता है।',
      },
    },
    {
      title: {
        en: 'National Initiative',
        hi: 'राष्ट्रीय पहल',
      },
      description: {
        en: 'Inaugurated alongside Arka (IITM Pune) by the Prime Minister, boosting India’s meteorological computing power to 22 PetaFLOPS under MoES.',
        hi: 'प्रधानमंत्री द्वारा अर्पण (IITM पुणे) के साथ उद्घाटन किया गया, जिससे भारत की मौसम संबंधी कंप्यूटिंग शक्ति को MoES के तहत 22 पेटाफ्लॉप्स तक बढ़ावा मिला।',
      },
    },
  ],
};

const Hpc = () => {
  const { language } = useSelector((state) => state.language);
  const locale = language?.locale || 'en';

  return (
    <div className="bg-slate-950 flex min-h-screen flex-col items-center justify-center p-10 text-white">
      <div className="w-full max-w-6xl text-center">
        <img
          src={arunikaImg}
          alt="Arunika HPC"
          className="mx-auto rounded-xl border-4 border-blue-500 object-cover shadow-xl transition-transform duration-300 ease-in-out hover:scale-105"
        />
        <h2 className="mt-6 text-5xl font-extrabold text-blue-400">
          {/* Arunika Super Computer */}
          {hpcTranslations.title[locale]}
        </h2>
        <p className="mx-auto mt-4 max-w-3xl text-lg text-slate-300">
          {/* Arunika is a state-of-the-art high-performance computing (HPC) system
          installed at NCMRWF, India. It plays a crucial role in advancing
          weather and climate research, disaster preparedness, and climate
          resilience through cutting-edge computational capabilities. */}
          {hpcTranslations.description[locale]}
        </p>
      </div>

      <div className="mt-12 grid w-full max-w-6xl grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-2 lg:grid-cols-4">
        {hpcTranslations.features.map((feature, index) => (
          <div
            key={index}
            className="flex flex-col items-center rounded-2xl bg-gradient-to-br from-blue-900 to-slate-900 p-6 text-center text-white shadow-lg transition-all duration-300 ease-in-out hover:scale-110 hover:shadow-2xl"
          >
            <h3 className="text-2xl font-semibold text-blue-400">
              {feature.title[locale]}
            </h3>
            <p className="mt-2 text-slate-300">{feature.description[locale]}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Hpc;
