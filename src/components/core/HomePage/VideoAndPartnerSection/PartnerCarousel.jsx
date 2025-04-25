import React from 'react';
import Ticker from 'react-vertical-ticker';

const PartnerCarousel = () => {
  const partners = [
    { name: 'Partner 1', logo: 'link_to_logo_1' },
    { name: 'Partner 2', logo: 'link_to_logo_2' },
    { name: 'Partner 3', logo: 'link_to_logo_3' },
    // Add more partners here
  ];

  return (
    <div className="partner-carousel">
      <Ticker>
        {partners.map((partner, index) => (
          <div key={index} className="partner">
            <img src={partner.logo} alt={partner.name} />
          </div>
        ))}
      </Ticker>
    </div>
  );
};

export default PartnerCarousel;
