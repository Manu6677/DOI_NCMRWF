import React, { useState, useCallback } from 'react';
import bimstecLogo from '../assets/images/bimstec.png';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

// Import event images
import bimstecEve1 from '../assets/images/bimstec/event1.png';
import bimstecEve2 from '../assets/images/bimstec/event2.png';
import bimstecEve3 from '../assets/images/bimstec/event3.png';
import bimstecEve4 from '../assets/images/bimstec/event4.png';

// --- Translations Object ---
// Removed markdown **, relying on <strong> tags or Tailwind classes
const translations = {
  mainTitle: {
    en: 'BIMSTEC',
    hi: 'बिम्सटेक',
  },
  subTitle: {
    en: 'Regional Cooperation',
    hi: 'क्षेत्रीय सहयोग',
  },
  description: {
    para1: {
      // Use <strong> for emphasis, keep span for date styling
      en: `The <strong>Bay of Bengal Initiative for Multi-Sectoral Technical and Economic Cooperation (BIMSTEC)</strong>, established on <span class="font-semibold text-green-600">06 June 1997</span>, is a vital regional organization fostering economic growth and social progress across the Bay of Bengal. Initially formed as BIST-EC, it evolved into BIMSTEC with the inclusion of Myanmar (1997), followed by Bhutan and Nepal (2004). Its seven Member States – Bangladesh, Bhutan, India, Myanmar, Nepal, Sri Lanka, and Thailand – collaborate to enhance economic and technical cooperation.`,
      hi: `<strong>बंगाल की खाड़ी बहु-क्षेत्रीय तकनीकी और आर्थिक सहयोग पहल (बिम्सटेक)</strong>, <span class="font-semibold text-green-600">06 जून 1997</span> को स्थापित, बंगाल की खाड़ी में आर्थिक विकास और सामाजिक प्रगति को बढ़ावा देने वाला एक महत्वपूर्ण क्षेत्रीय संगठन है। प्रारंभ में BIST-EC के रूप में गठित, यह म्यांमार (1997) और उसके बाद भूटान और नेपाल (2004) के शामिल होने के साथ बिम्सटेक के रूप में विकसित हुआ। इसके सात सदस्य देश - बांग्लादेश, भूटान, भारत, म्यांमार, नेपाल, श्रीलंका और थाईलैंड - आर्थिक और तकनीकी सहयोग बढ़ाने के लिए सहयोग करते हैं।`,
    },
    para2: {
      // Plain text paragraph
      en: `The framework for cooperation spans seven key sectors, promoting synergy and shared development among the member nations. (Ref: Figure 45 - visual representation not displayed)`, // Removed italics around ref
      hi: `सहयोग का ढांचा सात प्रमुख क्षेत्रों तक फैला हुआ है, जो सदस्य देशों के बीच तालमेल और साझा विकास को बढ़ावा देता है। (संदर्भ: चित्र 45 - दृश्य प्रतिनिधित्व प्रदर्शित नहीं है)`,
    },
  },
  collaborationTitle: {
    en: 'Collaboration and Key Initiatives',
    hi: 'सहयोग और प्रमुख पहल',
  },
  collaboration: {
    para1: {
      // Use <strong> for emphasis
      en: `BIMSTEC drives collaboration across diverse sectors. India spearheads the <strong>"Security"</strong> pillar, which includes critical areas like Counterterrorism, Transnational Crime, Disaster Management, and Energy Security. A significant achievement under Disaster Management is the <strong>BIMSTEC Centre for Weather and Climate (BCWC)</strong>. Proposed by India at the 1st Summit (31 July 2004, Bangkok) and established virtually at NCMRWF, it serves as a hub for pooling regional scientific expertise to deliver advanced weather and climate information.`,
      hi: `बिम्सटेक विविध क्षेत्रों में सहयोग को बढ़ावा देता है। भारत <strong>"सुरक्षा"</strong> स्तंभ का नेतृत्व करता है, जिसमें आतंकवाद-विरोध, अंतर्राष्ट्रीय अपराध, आपदा प्रबंधन और ऊर्जा सुरक्षा जैसे महत्वपूर्ण क्षेत्र शामिल हैं। आपदा प्रबंधन के तहत एक महत्वपूर्ण उपलब्धि <strong>बिम्सटेक मौसम और जलवायु केंद्र (BCWC)</strong> है। प्रथम शिखर सम्मेलन (31 जुलाई 2004, बैंकॉक) में भारत द्वारा प्रस्तावित और NCMRWF में वर्चुअल रूप से स्थापित, यह उन्नत मौसम और जलवायु जानकारी देने के लिए क्षेत्रीय वैज्ञानिक विशेषज्ञता को एकत्र करने के केंद्र के रूप में कार्य करता है।`,
    },
    para2: {
      // Keep span for date styling
      en: `The Centre was formally established through a Memorandum of Association (MoA) signed during the 3rd Summit in Myanmar on <span class="font-semibold text-green-600">04 March 2014</span>. Operating from NCMRWF (Noida, India - Current Location), the BCWC focuses on:`, // Removed italics around ref
      hi: `केंद्र औपचारिक रूप से म्यांमार में तीसरे शिखर सम्मेलन के दौरान <span class="font-semibold text-green-600">04 मार्च 2014</span> को हस्ताक्षरित समझौता ज्ञापन (MoA) के माध्यम से स्थापित किया गया था। NCMRWF (नोएडा, भारत - वर्तमान स्थान) से संचालित, BCWC निम्नलिखित पर केंद्रित है:`,
    },
    objective1: {
      en: `Promoting collaborative fundamental and applied research in weather prediction and climate modelling.`,
      hi: `मौसम पूर्वानुमान और जलवायु मॉडलिंग में सहयोगात्मक मौलिक और अनुप्रयुक्त अनुसंधान को बढ़ावा देना।`,
    },
    objective2: {
      en: `Building scientific capacity within member states related to weather and climate research.`,
      hi: `मौसम और जलवायु अनुसंधान से संबंधित सदस्य देशों के भीतर वैज्ञानिक क्षमता का निर्माण करना।`,
    },
    objective3: {
      en: `Encouraging and assisting the dissemination of important research findings achieved through BIMSTEC cooperation.`,
      hi: `बिम्सटेक सहयोग के माध्यम से प्राप्त महत्वपूर्ण शोध निष्कर्षों के प्रसार को प्रोत्साहित करना और सहायता करना।`,
    },
    para3: {
      // Plain text paragraph
      en: `Through real-time forecast sharing, specialized workshops, regular expert consultations, and targeted collaborative research, the BCWC plays a crucial role in strengthening disaster management and risk reduction strategies throughout the Bay of Bengal region.`,
      hi: `वास्तविक समय के पूर्वानुमान साझाकरण, विशेष कार्यशालाओं, नियमित विशेषज्ञ परामर्श और लक्षित सहयोगात्मक अनुसंधान के माध्यम से, BCWC पूरे बंगाल की खाड़ी क्षेत्र में आपदा प्रबंधन और जोखिम न्यूनीकरण रणनीतियों को मजबूत करने में महत्वपूर्ण भूमिका निभाता है।`,
    },
  },
  learnMoreButton: {
    en: 'Learn More',
    hi: 'और जानें',
  },
  chartsButton: {
    en: 'View BIMSTEC Charts',
    hi: 'बिम्सटेक चार्ट देखें',
  },
  eventsTitle: {
    en: 'Recent Events',
    hi: 'हाल की घटनाएँ',
  },
  modalCloseLabel: {
    en: 'Close modal',
    hi: 'मोडल बंद करें',
  },
};

// --- Event Data (Structure remains the same, ensure no markdown in descriptions) ---
const recentEventsData = [
  {
    id: 1,
    date: '15-26 July 2024',
    image: bimstecEve1,
    title: {
      en: 'BCWC Training Workshop',
      hi: 'बीसीडब्ल्यूसी प्रशिक्षण कार्यशाला',
    },
    alt: {
      en: 'BCWC Training Workshop July 2024 participants',
      hi: 'बीसीडब्ल्यूसी प्रशिक्षण कार्यशाला जुलाई 2024 प्रतिभागी',
    },
    description: {
      en: 'An intensive two-week training workshop focused on advanced weather modeling techniques for participants from BIMSTEC member states, held at NCMRWF, Noida.',
      hi: 'बिम्सटेक सदस्य देशों के प्रतिभागियों के लिए उन्नत मौसम मॉडलिंग तकनीकों पर केंद्रित एक गहन दो सप्ताह की प्रशिक्षण कार्यशाला, जो एनसीएमआरडब्ल्यूएफ, नोएडा में आयोजित की गई।',
    },
  },
  {
    id: 2,
    date: '15-26 July 2024',
    image: bimstecEve2,
    title: {
      en: 'BCWC Training Workshop Session',
      hi: 'बीसीडब्ल्यूसी प्रशिक्षण कार्यशाला सत्र',
    },
    alt: {
      en: 'BCWC Training Workshop July 2024 session',
      hi: 'बीसीडब्ल्यूसी प्रशिक्षण कार्यशाला जुलाई 2024 सत्र',
    },
    description: {
      en: 'Participants engaging in a practical session during the BCWC training workshop, learning about data analysis tools.',
      hi: 'बीसीडब्ल्यूसी प्रशिक्षण कार्यशाला के दौरान एक व्यावहारिक सत्र में भाग लेते हुए प्रतिभागी, डेटा विश्लेषण उपकरणों के बारे में सीख रहे हैं।',
    },
  },
  {
    id: 3,
    date: '18th Nov 2024',
    image: bimstecEve3,
    title: {
      en: '4th GB Meeting of BCWC',
      hi: 'बीसीडब्ल्यूसी की चौथी जीबी बैठक',
    },
    alt: {
      en: '4th Governing Board Meeting of BCWC Nov 2024 attendees',
      hi: 'बीसीडब्ल्यूसी की चौथी गवर्निंग बोर्ड बैठक नवंबर 2024 में उपस्थित लोग',
    },
    description: {
      en: 'The 4th Meeting of the Governing Board of the BIMSTEC Centre for Weather and Climate reviewed progress and discussed future collaborations.',
      hi: 'बिम्सटेक मौसम और जलवायु केंद्र के गवर्निंग बोर्ड की चौथी बैठक में प्रगति की समीक्षा की गई और भविष्य के सहयोग पर चर्चा की गई।',
    },
  },
  {
    id: 4,
    date: 'Nov 2024',
    image: bimstecEve4,
    title: {
      en: 'Youth-Led Action on Climate Change',
      hi: 'जलवायु परिवर्तन पर युवा-नेतृत्व वाली कार्रवाई',
    },
    alt: {
      en: 'BIMSTEC Youth-Led Action on Climate Change event poster',
      hi: 'बिम्सटेक जलवायु परिवर्तन पर युवा-नेतृत्व वाली कार्रवाई कार्यक्रम पोस्टर',
    },
    description: {
      en: 'An initiative empowering youth from BIMSTEC nations to take concrete action against climate change through workshops and collaborative projects.',
      hi: 'कार्यशालाओं और सहयोगी परियोजनाओं के माध्यम से जलवायु परिवर्तन के खिलाफ ठोस कार्रवाई करने के लिए बिम्सटेक देशों के युवाओं को सशक्त बनाने की एक पहल।',
    },
  },
];

const Bimstec = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const { language } = useSelector((state) => state.language);
  const locale = language?.locale || 'en';

  const handleEventClick = useCallback((event) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    setSelectedEvent(null);
  }, []);

  const renderEventCard = useCallback(
    (event, keyPrefix) => (
      <div
        key={`${keyPrefix}-${event.id}`}
        className="group cursor-pointer overflow-hidden rounded-xl border border-slate-200 bg-white shadow-md transition-all duration-300 hover:border-slate-300 hover:shadow-lg"
        onClick={() => handleEventClick(event)}
      >
        <img
          src={event.image}
          alt={event.alt?.[locale] || event.title?.[locale]}
          className="aspect-video w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="p-4">
          <h4 className="text-base font-semibold text-blue-600 transition-colors duration-300 group-hover:text-blue-700">
            {event.title?.[locale]}
          </h4>
          {event.date && (
            <p className="pt-1 text-xs text-richblack-500">{event.date}</p>
          )}
        </div>
      </div>
    ),
    [locale, handleEventClick]
  );

  // Keep renderHTML for paragraphs containing explicit <span> tags
  const renderHTML = (htmlString) => {
    return { __html: htmlString || '' };
  };

  return (
    <div className="min-h-screen bg-white p-4 pt-10 text-richblack-900 md:p-10 lg:p-16">
      <div className="container mx-auto max-w-screen-xl">
        <div className="relative flex flex-col lg:flex-row lg:gap-16">
          {/* --- Left / Main Content Area --- */}
          <div className="w-full lg:w-[65%]">
            {/* Logo and Title Section */}
            <div className="mb-10 flex flex-col items-center gap-6 sm:flex-row sm:items-start lg:mb-12">
              <img
                src={bimstecLogo}
                alt="BIMSTEC Logo"
                className="h-36 w-36 flex-shrink-0 rounded-2xl border-2 border-blue-100 object-contain shadow-md shadow-slate-300/60 md:h-40 md:w-40"
              />
              <div className="mt-2 flex-grow text-center sm:text-left">
                <h1 className="text-3xl font-bold tracking-tight text-blue-600 md:text-4xl lg:text-5xl">
                  {translations.mainTitle[locale]}
                </h1>
                <p className="mt-1 text-lg font-medium text-blue-500 md:text-xl">
                  {translations.subTitle[locale]}
                </p>
              </div>
            </div>

            {/* --- Main Description Text (Prose) --- */}
            {/* Adjusted prose styling for headings slightly */}
            <div className="prose lg:prose-lg prose-p:text-richblack-700 prose-p:leading-relaxed prose-strong:text-orange-600 prose-strong:font-semibold prose-ul:text-richblack-700 prose-li:marker:text-blue-500 prose-h3:text-blue-600 prose-h3:font-bold /* Changed to bold */ prose-h3:border-b prose-h3:border-slate-300 prose-h3:pb-3 prose-h3:mb-6 /* Increased mb */ prose-a:text-blue-500 prose-a:font-medium hover:prose-a:text-blue-700 prose-a:transition-colors prose-a:duration-200 max-w-none">
              {/* Use dangerouslySetInnerHTML only for paragraphs with HTML tags */}
              <p
                dangerouslySetInnerHTML={renderHTML(
                  translations.description.para1[locale]
                )}
              ></p>
              {/* Render plain text paragraphs directly */}
              <p>{translations.description.para2[locale]}</p>

              <h3 id="collaboration">
                {translations.collaborationTitle[locale]}
              </h3>

              {/* Use dangerouslySetInnerHTML only for paragraphs with HTML tags */}
              <p
                dangerouslySetInnerHTML={renderHTML(
                  translations.collaboration.para1[locale]
                )}
              ></p>
              <p
                dangerouslySetInnerHTML={renderHTML(
                  translations.collaboration.para2[locale]
                )}
              ></p>
              <ul>
                <li>{translations.collaboration.objective1[locale]}</li>
                <li>{translations.collaboration.objective2[locale]}</li>
                <li>{translations.collaboration.objective3[locale]}</li>
              </ul>
              {/* Render plain text paragraphs directly */}
              <p>{translations.collaboration.para3[locale]}</p>
            </div>

            {/* --- Buttons Container --- */}
            <div className="mt-12 flex flex-col items-center justify-start gap-5 sm:flex-row lg:mt-16">
              <Link
                to="https://bimstec.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full transform rounded-lg bg-blue-500 px-7 py-3 text-center text-base font-semibold text-white shadow-md ring-blue-300 ring-offset-2 ring-offset-white transition duration-300 ease-in-out hover:scale-[1.03] hover:bg-blue-600 hover:shadow-lg focus:outline-none focus:ring-2 sm:w-auto lg:text-lg"
              >
                {translations.learnMoreButton[locale]}
              </Link>
              <Link
                to="/bimstec/charts"
                className="w-full transform rounded-lg border border-aquaGreen bg-transparent px-7 py-3 text-center text-base font-semibold text-aquaGreen shadow-sm ring-aquaGreen ring-offset-2 ring-offset-white transition duration-300 ease-in-out hover:scale-[1.03] hover:bg-aquaGreen/10 hover:text-aquaGreen focus:outline-none focus:ring-2 sm:w-auto lg:text-lg"
              >
                {translations.chartsButton[locale]}
              </Link>
            </div>

            {/* --- Events Section on Smaller Screens --- */}
            <div className="mt-16 lg:hidden">
              {/* Adjusted heading style */}
              <h3 className="mb-6 border-b border-slate-300 pb-3 text-2xl font-bold text-blue-600">
                {translations.eventsTitle[locale]}
              </h3>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                {recentEventsData.map((event) =>
                  renderEventCard(event, 'mobile')
                )}
              </div>
            </div>
          </div>{' '}
          {/* End of Left / Main Content Area */}
          {/* --- Right Sidebar: Event Images (Visible on Large Screens) --- */}
          <div className="hidden lg:sticky lg:top-16 lg:block lg:max-h-[calc(100vh-8rem)] lg:w-[35%] lg:overflow-y-auto lg:pl-6">
            {/* Adjusted heading style */}
            <h3 className="mb-6 text-2xl font-bold text-blue-600">
              {translations.eventsTitle[locale]}
            </h3>
            <div className="space-y-7">
              {recentEventsData.map((event) =>
                renderEventCard(event, 'desktop')
              )}
              <div className="h-10"></div> {/* Bottom padding */}
            </div>
          </div>{' '}
          {/* End of Right Sidebar */}
        </div>{' '}
        {/* End of Main Flex Container */}
      </div>{' '}
      {/* End of Container */}
      {/* --- Modal Component (Structure unchanged) --- */}
      {isModalOpen && selectedEvent && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true"
        >
          <div
            className="fixed inset-0 bg-richblack-900/70 backdrop-blur-sm transition-opacity duration-300 ease-in-out"
            aria-hidden="true"
            onClick={handleCloseModal}
          ></div>
          <div className="relative z-10 w-full max-w-2xl transform overflow-hidden rounded-xl bg-white text-left align-middle shadow-xl transition-all duration-300 ease-in-out">
            <div className="p-6">
              <button
                onClick={handleCloseModal}
                className="absolute right-4 top-4 text-richblack-400 transition-colors hover:text-richblack-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                aria-label={translations.modalCloseLabel[locale]}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
              <img
                src={selectedEvent.image}
                alt={
                  selectedEvent.alt?.[locale] || selectedEvent.title?.[locale]
                }
                className="mb-4 aspect-video w-full rounded-lg object-cover"
              />
              <h3
                className="mb-1 text-xl font-semibold text-blue-600"
                id="modal-title"
              >
                {selectedEvent.title?.[locale]}
              </h3>
              {selectedEvent.date && (
                <p className="mb-4 text-sm text-richblack-500">
                  {' '}
                  {selectedEvent.date}{' '}
                </p>
              )}
              <div className="prose prose-sm prose-p:text-richblack-700 max-w-none">
                <p>{selectedEvent.description?.[locale]}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Bimstec;
