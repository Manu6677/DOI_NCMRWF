import React from 'react';
import SocialMediaLinks from '../SocialMediaLinks';
import NavigationLinks from './NavigationLinks';
import ChangeLanguage from '../ChangeLanguage';

const Header = () => {
  return (
    <div className="flex items-center justify-between px-6 py-2 text-sm text-white">
      {/* Left - Language Switcher */}
      <div className="flex items-center gap-4">{/* <ChangeLanguage /> */}</div>

      {/* Center - Social Media Links */}
      <div className="flex items-center justify-center gap-6">
        <SocialMediaLinks />
      </div>

      {/* Right - Navigation Links */}
      <div className="flex items-center gap-6">
        <NavigationLinks />
      </div>
    </div>
  );
};

export default Header;
