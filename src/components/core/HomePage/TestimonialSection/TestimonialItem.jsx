import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

const TestimonialItem = ({ testimonial }) => {
  // Log the testimonial to the console
  const { language } = useSelector((state) => state.language);
  const locale = language?.locale;

  return (
    <div className="h-full rounded-2xl border border-richblack-5 bg-richblack-5 p-6 shadow-lg transition duration-300 hover:scale-105 hover:border-customRed-500">
      <div className="mt-4">
        {/* <p className="text-gray-600 dark:text-gray-300 mb-6 italic opacity-75">
					{testimonial.description || "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In venenatis nunc sit amet magna volutpat, et feugiat mi pharetra."}
				</p> */}
        <div className="flex items-center">
          <div className="mr-4">
            <img
              src={testimonial.author.picture}
              alt={testimonial.author.fullName}
              className={`border-gray-300 rounded-full border object-cover ${testimonial?.author?.classes}`}
            />
          </div>
          <div>
            <h4 className="text-lg font-semibold text-blue-700">
              {testimonial.author.fullName[locale]}
            </h4>
            <p className="text-sm text-slate-800">
              <i>{testimonial.author.designation[locale]}</i>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

TestimonialItem.propTypes = {
  testimonial: PropTypes.object.isRequired,
};

export default TestimonialItem;
