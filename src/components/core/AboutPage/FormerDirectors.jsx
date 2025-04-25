// Import all images explicitly
import rattan from '../../../assets/images/directors/dr-rattan.png';
import santosh from '../../../assets/images/directors/dr-santosh.png';
import shyam from '../../../assets/images/directors/dr-shyam.png';
import ashwini from '../../../assets/images/directors/dr-ashwini.png';
import harendu from '../../../assets/images/directors/dr-harendu.png';
import swati from '../../../assets/images/directors/dr-swati.png';
import enRajagopal from '../../../assets/images/directors/dr-en.png';
import akMitra from '../../../assets/images/directors/dr-akmitra.png';
import { useSelector } from 'react-redux';

const formerDirectors = {
  en: [
    {
      photo: rattan,
      designation: 'Project Coordinator',
      name: 'Dr. Rattan Kumar Dutta',
      period: '1988 to 1993',
    },
    {
      photo: santosh,
      designation: 'Director General',
      name: 'Dr. Santosh Kumar Mishra',
      period: '1993 to 1996',
    },
    {
      photo: shyam,
      designation: 'Head NCMRWF',
      name: 'Dr. Shyam Vir Singh',
      period: '1997 to 2004',
    },
    {
      photo: ashwini,
      designation: 'Head NCMRWF',
      name: 'Dr. Ashwini Kumar Bohra',
      period: '2005 to 2010',
    },
    {
      photo: harendu,
      designation: 'Head NCMRWF',
      name: 'Dr. Harendu Prakash',
      period: '2010 to 2011',
    },
    {
      photo: swati,
      designation: 'Director NCMRWF',
      name: 'Dr. Swati Basu',
      period: '2012 to 2015',
    },
    {
      photo: enRajagopal,
      designation: 'Head NCMRWF',
      name: 'Dr. E N Rajagopal',
      period: '2015 to 2020',
    },
    {
      photo: akMitra,
      designation: 'Head NCMRWF',
      name: 'Dr. Ashis Kumar Mitra',
      period: '2021 to 2022',
    },
  ],
  hi: [
    {
      photo: rattan,
      designation: 'परियोजना समन्वयक',
      name: 'डॉ. रत्तन कुमार दत्ता',
      period: '1988 से 1993',
    },
    {
      photo: santosh,
      designation: 'महानिदेशक',
      name: 'डॉ. संतोष कुमार मिश्रा',
      period: '1993 से 1996',
    },
    {
      photo: shyam,
      designation: 'प्रमुख, एनसीएमआरडब्ल्यूएफ',
      name: 'डॉ. श्याम वीर सिंह',
      period: '1997 से 2004',
    },
    {
      photo: ashwini,
      designation: 'प्रमुख, एनसीएमआरडब्ल्यूएफ',
      name: 'डॉ. अश्विनी कुमार बोहरा',
      period: '2005 से 2010',
    },
    {
      photo: harendu,
      designation: 'प्रमुख, एनसीएमआरडब्ल्यूएफ',
      name: 'डॉ. हरेंदु प्रकाश',
      period: '2010 से 2011',
    },
    {
      photo: swati,
      designation: 'निदेशक, एनसीएमआरडब्ल्यूएफ',
      name: 'डॉ. स्वाति बसु',
      period: '2012 से 2015',
    },
    {
      photo: enRajagopal,
      designation: 'प्रमुख, एनसीएमआरडब्ल्यूएफ',
      name: 'डॉ. ई. एन. राजगोपाल',
      period: '2015 से 2020',
    },
    {
      photo: akMitra,
      designation: 'प्रमुख, एनसीएमआरडब्ल्यूएफ',
      name: 'डॉ. आशीष कुमार मित्रा',
      period: '2021 से 2022',
    },
  ],
};

const formerDirectorTranslations = {
  en: {
    title: 'NCMRWF Heads Since 1988',
    photo: 'Photo',
    designation: 'Designation',
    name: 'Name',
    period: 'Period',
  },
  hi: {
    title: '1988 से अब तक के एनसीएमआरडब्ल्यूएफ प्रमुख',
    photo: 'फोटो',
    designation: 'पदनाम',
    name: 'नाम',
    period: 'कार्यकाल',
  },
};

const FormerDirectors = () => {
  const { language } = useSelector((state) => state.language);
  const locale = language?.locale || 'en';

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="mb-6 text-center text-3xl font-bold text-blue-700">
        {/* NCMRWF Heads Since 1988 */}
        {formerDirectorTranslations[locale].title}
      </h2>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse overflow-hidden rounded-lg shadow-lg">
          <thead>
            <tr className="bg-blue-600 text-left text-white">
              <th className="px-6 py-3 text-lg">
                {formerDirectorTranslations[locale].photo}
              </th>
              <th className="px-6 py-3 text-lg">
                {formerDirectorTranslations[locale].designation}
              </th>
              <th className="px-6 py-3 text-lg">
                {formerDirectorTranslations[locale].name}
              </th>
              <th className="px-6 py-3 text-lg">
                {formerDirectorTranslations[locale].period}
              </th>
            </tr>
          </thead>
          <tbody>
            {formerDirectors[locale]?.map((director, index) => (
              <tr
                key={index}
                className={`${
                  index % 2 === 0 ? 'bg-slate-100' : 'bg-white'
                } transition-all duration-300 hover:bg-blue-100`}
              >
                <td className="px-6 py-4">
                  <img
                    src={
                      director.photo ||
                      '../../../assets/images/default-profile.png'
                    }
                    alt={director.name}
                    className="size-16 rounded-full border border-slate-300 object-cover shadow-sm"
                  />
                </td>
                <td className="px-6 py-4 font-medium text-slate-800">
                  {director.designation}
                </td>
                <td className="px-6 py-4 font-semibold text-slate-900">
                  {director.name}
                </td>
                <td className="px-6 py-4 text-slate-700">{director.period}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FormerDirectors;
