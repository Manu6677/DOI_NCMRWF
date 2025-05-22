import { IoIosArrowRoundDown } from 'react-icons/io';
import GroupHeadTable from './GroupHead';
import GroupSubHeadTable from './GroupSubHead';
import { useSelector } from 'react-redux';

const OrganizationTree = () => {
  const orgTreeTranslations = {
    secretary: {
      en: 'Secretary, MoES',
      hi: 'सचिव, पृथ्वी विज्ञान मंत्रालय',
    },
    head_ncmrwf: {
      en: 'Head, NCMRWF',
      hi: 'मुखिया, NCMRWF',
    },
    dae: {
      en: 'DA&E',
      hi: 'DA&E',
    },
    modelDevelopment: {
      en: 'Model Development',
      hi: 'प्रतिरूप विकास',
    },
    medas: {
      en: 'MEDAS',
      hi: 'MEDAS',
    },
    capacity_building: {
      en: 'Capacity Buiding',
      hi: 'क्षमता निर्माण',
    },
    capacity_building_subSection: {
      en: [
        { title: 'Global', name: '(Surya)' },
        { title: 'Meso', name: '(Hari)' },
      ],
      hi: [
        { title: 'ग्लोबल', name: '(सूर्य)' },
        { title: 'मेसो', name: '(हरि)' },
      ],
    },
    cnai: {
      en: 'CNAI',
      hi: 'CNAI',
    },
    cnai_subSection: {
      en: [
        { title: 'HPCI', name: '' },
        { title: 'AI/ML', name: '(Raghav)' },
      ],
      hi: [
        { title: 'एचपीसीआई', name: '' },
        { title: 'एआई/एमएल', name: '(राघव)' },
      ],
    },
    bcwc: {
      en: 'BCWC',
      hi: 'BCWC',
    },
    admin: {
      en: 'Admin',
      hi: 'प्रशासन',
    },
    dae_subSection: {
      en: [
        { title: 'DAG', name: '(Indira)' },
        { title: 'SWG', name: '(Anita)' },
        { title: 'EWG', name: '(Anumeha)' },
      ],
      hi: [
        { title: 'DAG', name: '(इंदिरा)' },
        { title: 'SWG', name: '(अनीता)' },
        { title: 'EWG', name: '(अनुमेहा)' },
      ],
    },
  };

  const { language } = useSelector((state) => state.language);
  const locale = language?.locale;

  return (
    <div className="flex min-h-96 w-full flex-col items-start justify-center bg-light-default p-4">
      <div className="max-w-8xl relative flex w-full flex-col items-center py-12">
        {/* Secretary */}
        <div className="rounded-md bg-socialMedia-instagram-orange px-16 py-2 text-center font-bold text-richblack-400 shadow-lg transition-transform hover:scale-105">
          {orgTreeTranslations.secretary[locale]}
        </div>
        <IoIosArrowRoundDown className="text-4xl text-richblack-200" />

        {/* head ncmrwf */}
        <div className="rounded-md bg-socialMedia-instagram-orange px-16 py-2 text-center font-bold text-richblack-400 shadow-lg transition-transform hover:scale-105">
          {orgTreeTranslations.head_ncmrwf[locale]}
          <div className="text-sm">(V.S Prasad)</div>
        </div>
        <IoIosArrowRoundDown className="text-4xl text-richblack-200" />

        {/* Scientist & Admin */}
        <div className="relative flex w-full items-center justify-center">
          <div className="absolute left-1/2 top-0 h-0.5 w-[100%] -translate-x-1/2 transform bg-orange-300"></div>
          <div className="no-scrollbar flex flex-nowrap space-x-14 overflow-x-auto pt-1">
            {/* Scientist */}
            <div className="relative mx-4 flex flex-col items-center">
              <IoIosArrowRoundDown className="text-3xl text-richblack-200" />
              <div className="rounded-lg bg-green-500 px-12 py-2 text-center font-bold text-white shadow-md transition-transform hover:scale-105">
                {orgTreeTranslations.dae[locale]}
                <div className="text-sm">(John)</div>
              </div>

              {/* New Tree Below Scientist */}
              <IoIosArrowRoundDown className="mt-2 text-3xl text-richblack-200" />
              <div className="relative flex flex-col items-center">
                <div className="absolute top-0 h-0.5 w-[300px] bg-orange-300"></div>

                <div className="flex space-x-8">
                  {orgTreeTranslations.dae_subSection[locale].map((child) => (
                    <div
                      key={child.title}
                      className="flex flex-col items-center"
                    >
                      <IoIosArrowRoundDown className="text-3xl text-richblack-200" />
                      <div className="rounded-md bg-blue-500 px-4 py-2 font-medium text-white shadow-md transition-transform hover:scale-105">
                        {child.title}
                        <div className="text-sm text-white opacity-80">
                          {child.name}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {/* Model Development */}
            <div className="relative mx-4 flex flex-col items-center">
              <IoIosArrowRoundDown className="text-3xl text-richblack-200" />
              <div className="rounded-lg bg-green-500 px-12 py-2 text-center font-bold text-white shadow-md transition-transform hover:scale-105">
                {orgTreeTranslations.modelDevelopment[locale]}
                <div className="text-sm">(Saji)</div>
              </div>
            </div>
            {/* medas */}
            <div className="relative mx-4 flex flex-col items-center">
              <IoIosArrowRoundDown className="text-3xl text-richblack-200" />
              <div className="rounded-lg bg-green-500 px-12 py-2 text-center font-bold text-white shadow-md transition-transform hover:scale-105">
                {orgTreeTranslations.medas[locale]}
              </div>
            </div>
            {/* capacity_building */}
            <div className="relative mx-4 flex flex-col items-center">
              <IoIosArrowRoundDown className="text-3xl text-richblack-200" />
              <div className="rounded-lg bg-green-500 px-12 py-2 text-center font-bold text-white shadow-md transition-transform hover:scale-105">
                {orgTreeTranslations.capacity_building[locale]}
                <div className="text-sm">(Routray)</div>
              </div>

              {/* New Tree Below capacity_building */}
              <IoIosArrowRoundDown className="mt-2 text-3xl text-richblack-200" />
              <div className="relative flex flex-col items-center">
                <div className="absolute top-0 h-0.5 w-[150px] bg-orange-300"></div>

                <div className="flex space-x-8">
                  {orgTreeTranslations.capacity_building_subSection[locale].map(
                    (child) => (
                      <div
                        key={child.title}
                        className="flex flex-col items-center"
                      >
                        <IoIosArrowRoundDown className="text-3xl text-richblack-200" />
                        <div className="rounded-md bg-blue-500 px-4 py-2 font-medium text-white shadow-md transition-transform hover:scale-105">
                          {child.title}
                          <div className="text-sm text-white opacity-80">
                            {child.name}
                          </div>
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>

            {/* CNAI */}
            <div className="relative mx-4 flex flex-col items-center">
              <IoIosArrowRoundDown className="text-3xl text-richblack-200" />
              <div className="rounded-lg bg-green-500 px-12 py-2 text-center font-bold text-white shadow-md transition-transform hover:scale-105">
                {orgTreeTranslations.cnai[locale]}
                <div className="text-sm">(Preveen)</div>
              </div>

              {/* New Tree Below CNAI */}
              <IoIosArrowRoundDown className="mt-2 text-3xl text-richblack-200" />
              <div className="relative flex flex-col items-center">
                <div className="absolute top-0 h-0.5 w-[150px] bg-orange-300"></div>

                <div className="flex space-x-8">
                  {orgTreeTranslations.cnai_subSection[locale].map((child) => (
                    <div
                      key={child.title}
                      className="flex flex-col items-center"
                    >
                      <IoIosArrowRoundDown className="text-3xl text-richblack-200" />
                      <div className="rounded-md bg-blue-500 px-4 py-2 font-medium text-white shadow-md transition-transform hover:scale-105">
                        {child.title}
                        <div className="text-sm text-white opacity-80">
                          {child.name}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* bcwc */}
            <div className="relative mx-4 flex flex-col items-center">
              <IoIosArrowRoundDown className="text-3xl text-richblack-200" />
              <div className="rounded-lg bg-green-500 px-12 py-2 text-center font-bold text-white shadow-md transition-transform hover:scale-105">
                {orgTreeTranslations.bcwc[locale]}
                <div className="text-sm">(Akhilesh)</div>
              </div>
            </div>
            {/* Admin */}
            <div className="relative mx-4 flex flex-col items-center">
              <IoIosArrowRoundDown className="text-3xl text-richblack-200" />
              <div className="rounded-lg bg-green-500 px-12 py-2 text-center font-bold text-white shadow-md transition-transform hover:scale-105">
                {orgTreeTranslations.admin[locale]}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tables  */}
      <div className="flex w-full flex-col items-center justify-center space-y-11 px-4 py-4">
        <GroupHeadTable />

        <GroupSubHeadTable />
      </div>
    </div>
  );
};

export default OrganizationTree;
