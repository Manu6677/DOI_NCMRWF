import React from 'react';
import TestimonialItem from './TestimonialItem';
import { testimonialList } from '../../../../data/testimonial-data';
import { useSelector } from 'react-redux';

const TestimonialSection = () => {
  const { language } = useSelector((state) => state.language);
  const locale = language?.locale;

  const sectionText = {
    heading: {
      en: 'Our Esteemed Leaders',
      hi: 'हमारे प्रतिष्ठित नेता',
    },
    description: {
      en: 'Celebrating the visionaries steering our organization towards excellence. Their unwavering commitment and strategic insight drive our mission forward',
      hi: 'हमारे संगठन को उत्कृष्टता की ओर ले जाने वाले दूरदर्शी नेताओं का उत्सव। उनकी अटूट प्रतिबद्धता और रणनीतिक दृष्टि हमारे मिशन को आगे बढ़ाती है',
    },
  };

  return (
    // <section className="py-4 md:py-20 bg-gray-50 text-gray-900 bg-orange-300">
    // 	<div className="container px-6 mx-auto">
    // 		<div className="text-center mb-8">
    // 			<h2 className="text-3xl md:text-5xl font-bold mb-4 text-blue-700">{ sectionText?.heading[locale] }</h2>
    // 			<p className="text-blue-700">
    // 				{ sectionText?.description[locale] }
    // 			</p>
    // 		</div>
    // 		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    // 			{testimonialList.map((testimonial, i) => (
    // 				<div key={i} className="col-span-1 cursor-pointer">
    // 					<TestimonialItem testimonial={testimonial} />
    // 				</div>
    // 			))}
    // 		</div>
    // 	</div>
    // </section>
    <section className="bg-gray-50 text-gray-900 bg-orange-300 py-2">
      <div className="container mx-auto px-6">
        <div className="mb-2 text-center">
          <h2 className="mb-4 text-2xl font-bold text-blue-700">
            {sectionText?.heading[locale]}
          </h2>
        </div>
        <div
          // className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          className="flex flex-col gap-4"
        >
          {testimonialList.map((testimonial, i) => (
            <div key={i} className="col-span-1 cursor-pointer">
              <TestimonialItem testimonial={testimonial} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
