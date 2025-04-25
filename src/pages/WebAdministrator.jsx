import { useSelector } from 'react-redux';
import { testimonialList } from '../data/web-administrator-testimonial';

const LeadershipAndPartners = () => {
  const { language } = useSelector((state) => state.language);
  const locale = language?.locale;

  return (
    <div className="min-h-screen bg-light-default py-4">
      <div className="container mx-auto flex justify-center py-12">
        <div className="w-full">
          <div className="mb-12">
            <div>
              {testimonialList.map((item, index) => (
                <div
                  className="flex w-full flex-col items-center gap-6 p-6"
                  key={index}
                >
                  <div className="cursor-pointer object-contain">
                    <img
                      src={item?.author?.picture}
                      alt={item?.author?.fullName}
                      className="size-64 rounded-full border-4 border-orange-200 transition-transform duration-300 ease-in-out hover:scale-110"
                    />
                  </div>

                  {/* Name and Designation  */}
                  <div className="space-y-6 text-center text-2xl text-blue-700">
                    <h3 className="text-6xl font-semibold">
                      {item.author.fullName[locale]}
                    </h3>
                    <p className="text-center text-5xl font-bold">
                      {item?.author?.designation[locale]}
                    </p>
                  </div>

                  {/* Contact Details: */}
                  <div className="text-center text-2xl text-blue-700">
                    <div className="pb-2 font-semibold">
                      {locale === 'hi' ? 'संपर्क विवरण:' : 'Contact Details:'}
                    </div>
                    <div className="flex justify-center space-x-3">
                      <p className="text-center">
                        {item?.author?.contactDetails.email[locale]},
                      </p>

                      <p>{item?.author?.contactDetails.phone[locale]}</p>
                    </div>
                  </div>

                  {/* For Queries: */}
                  <div className="text-center text-2xl text-blue-700">
                    <div className="font-semibold">
                      {locale === 'hi' ? 'प्रश्नों के लिए:' : 'For Queries:'}
                    </div>
                    <div className="flex justify-center space-x-3 pb-2">
                      <p>{item?.author?.queries.site0[locale]},</p>

                      <p>{item?.author?.queries.site1[locale]}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeadershipAndPartners;
