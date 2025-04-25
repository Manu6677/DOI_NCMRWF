import { IoIosArrowRoundDown } from 'react-icons/io';
import GroupHeadTable from './GroupHead';
import GroupSubHeadTable from './GroupSubHead';
import { useSelector } from 'react-redux';

const OrganizationTree = () => {
  const orgTreeTranslations = {
    minister: {
      en: "Hon'ble Minister of State (Independent Charge) of the MoES",
      hi: 'माननीय राज्य मंत्री (स्वतंत्र प्रभार), पृथ्वी विज्ञान मंत्रालय (MoES)',
    },
    secretary: {
      en: 'Secretary MoES',
      hi: 'सचिव, पृथ्वी विज्ञान मंत्रालय',
    },
    headDirector: {
      en: 'Head / Director',
      hi: 'प्रमुख / निदेशक',
    },
    scientist: {
      en: 'Scientist',
      hi: 'वैज्ञानिक',
    },
    admin: {
      en: 'Admin',
      hi: 'प्रशासन',
    },
    projectScientists: {
      en: [
        'Project Scientist- III',
        'Project Scientist- II',
        'Project Scientist- I',
      ],
      hi: [
        'प्रोजेक्ट साइंटिस्ट- III',
        'प्रोजेक्ट साइंटिस्ट- II',
        'प्रोजेक्ट साइंटिस्ट- I',
      ],
    },
  };

  const { language } = useSelector((state) => state.language);
  const locale = language?.locale;

  return (
    <div className="flex min-h-96 w-full flex-col items-start justify-center bg-light-default p-4">
      <div className="max-w-8xl relative flex w-full flex-col items-center py-12">
        {/* Ministry */}
        <div className="rounded-md bg-socialMedia-instagram-orange px-16 py-2 text-center font-bold text-richblack-400 shadow-lg transition-transform hover:scale-105">
          {orgTreeTranslations.minister[locale]}
        </div>
        <IoIosArrowRoundDown className="text-4xl text-richblack-200" />

        {/* Secretary */}
        <div className="rounded-md bg-socialMedia-instagram-orange px-16 py-2 text-center font-bold text-richblack-400 shadow-lg transition-transform hover:scale-105">
          {orgTreeTranslations.secretary[locale]}
        </div>
        <IoIosArrowRoundDown className="text-4xl text-richblack-200" />

        {/* Head / Director */}
        <div className="rounded-md bg-socialMedia-instagram-orange px-16 py-2 text-center font-bold text-richblack-400 shadow transition-transform hover:scale-105">
          {orgTreeTranslations.headDirector[locale]}
        </div>
        <IoIosArrowRoundDown className="text-4xl text-richblack-200" />

        {/* Scientist & Admin */}
        <div className="relative flex w-full items-center justify-center">
          <div className="absolute left-1/2 top-0 h-0.5 w-[70%] -translate-x-1/2 transform bg-orange-300"></div>
          <div className="no-scrollbar flex flex-nowrap space-x-14 overflow-x-auto pt-1">
            {/* Scientist */}
            <div className="relative mx-4 flex flex-col items-center">
              <IoIosArrowRoundDown className="text-3xl text-richblack-200" />
              <div className="rounded-lg bg-green-500 px-12 py-2 text-center font-bold text-white shadow-md transition-transform hover:scale-105">
                {orgTreeTranslations.scientist[locale]}
              </div>

              {/* New Tree Below Scientist */}
              <IoIosArrowRoundDown className="mt-2 text-3xl text-richblack-200" />
              <div className="relative flex flex-col items-center">
                <div className="absolute top-0 h-0.5 w-[500px] bg-orange-300"></div>

                <div className="flex space-x-8">
                  {orgTreeTranslations.projectScientists[locale].map(
                    (child) => (
                      <div key={child} className="flex flex-col items-center">
                        <IoIosArrowRoundDown className="text-3xl text-richblack-200" />
                        <div className="rounded-md bg-blue-500 px-4 py-2 font-medium text-white shadow-md transition-transform hover:scale-105">
                          {child}
                        </div>
                      </div>
                    )
                  )}
                </div>
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
