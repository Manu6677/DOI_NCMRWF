import React from 'react';
import Slider from 'react-slick';

const SliderComponent = ({ items }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    adaptiveHeight: true,
  };

  return (
    <div className="container mx-auto px-6 py-12">
      <Slider {...settings}>
        {items.map((item, index) => (
          <div key={index} className="p-4">
            <div className="flex flex-col overflow-hidden">
              <img
                src={item.image}
                alt={item.title}
                className="w-20 object-cover"
              />
              <div className="p-6">
                <h3 className="text-gray-800 text-xl font-semibold">
                  {item.title}
                </h3>
                <p className="text-gray-600 mt-2">{item.description}</p>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default SliderComponent;
