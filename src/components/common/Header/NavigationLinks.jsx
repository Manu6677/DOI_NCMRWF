import React from 'react';
import { Link } from 'react-router-dom';
import FlyoutLink from '../FlyoutLink/FlyoutLink'; // Import FlyoutLink
import FlyoutContent from '../FlyoutLink/FlyoutContent'; // Import FlyoutContent
import { aboutData } from '../../../data/header-data';
import { authData, aboutHeading } from '../../../data/header-data';
import { useSelector } from 'react-redux';

const NavigationLinks = () => {
  const selectedLanguage = useSelector((state) => state.language);
  const locale = selectedLanguage?.language?.locale;

  return (
    <div className="flex space-x-4 text-blue-700">
      {/* Login Link */}
      {/* {
        authData.map((authData, index) => (
          <Link key={index} to={authData?.path} className='hover:underline capitalize hover:text-blue-400'>
            {
              authData?.title[locale]
            }
          </Link>
        ))
      } */}

      {/* About Flyout */}
      {/* <div className="flex items-center justify-center">
        <FlyoutLink 
          FlyoutContent={() => <FlyoutContent links={aboutData} language={locale}/>}
          styles={"blue-700"}
        >
          {
            aboutHeading.map((aboutHead, index) => (
              <Link 
                key={index} 
                to={aboutHead?.path} 
                className='capitalize hover:text-blue-300 text-blue-700 hover:underline'
              >
                {
                  aboutHead?.title[locale]
                }
              </Link>
            ))
          }
        </FlyoutLink>
      </div> */}
    </div>
  );
};

export default NavigationLinks;
