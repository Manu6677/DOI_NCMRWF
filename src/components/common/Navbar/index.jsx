import React, { useState, useRef, useEffect } from 'react';
import { navData } from '../../../data/nav-data';
import { authData } from '../../../data/header-data';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import FlyoutLink from '../FlyoutLink/FlyoutLink';
import FlyoutContent from '../FlyoutLink/FlyoutContent';
import { Link } from 'react-router-dom';
import ChangeLanguage from '../ChangeLanguage';
import { CgProfile } from 'react-icons/cg';
import { FiChevronDown } from 'react-icons/fi';
import { GoBellFill } from 'react-icons/go';
import CustomModal from '../CustomModal';
import BulletinBoard from '../BuletinBoard';
import {
  closeBulletin,
  openBulletin,
  selectBulletinOpen,
  toggleBulletin,
} from '../../../slices/bulletinSlice';
import NavDropdown from './NavDropdown';
import NavOptions from '../NavOptions';
import { GiHamburgerMenu } from 'react-icons/gi';
import { IoClose } from 'react-icons/io5';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const { language } = useSelector((state) => state.language);
  const locale = language?.locale;
  const [activeDropdown, setActiveDropdown] = useState(null);
  const setHoverTimeout = useRef(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem('token');

  const dispatch = useDispatch();
  const isBulletinOpen = useSelector(selectBulletinOpen);

  return (
    <div className="relative flex w-full items-center justify-around bg-orange-500 py-2 font-thin text-richblack-5 shadow-md">
      <div className="flex items-center gap-4">
        <ChangeLanguage />
      </div>

      <div className="ml-auto flex items-center pr-4 lg:hidden">
        <motion.button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="text-white focus:outline-none"
          whileTap={{ scale: 0.9 }}
        >
          <motion.div
            key={isMobileMenuOpen ? 'close' : 'menu'}
            initial={{ opacity: 0, rotate: -90 }}
            animate={{ opacity: 1, rotate: 0 }}
            exit={{ opacity: 0, rotate: 90 }}
            transition={{ duration: 0.3 }}
          >
            {isMobileMenuOpen ? (
              <IoClose className="text-3xl" />
            ) : (
              <GiHamburgerMenu className="text-3xl" />
            )}
          </motion.div>
        </motion.button>
      </div>

      <div className="hidden lg:flex">
        {navData.map((nav, index) => (
          <div
            key={index}
            className="group relative mx-4 flex cursor-pointer items-center justify-center"
          >
            <span className="relative text-lg font-medium text-richblack-5 transition duration-300 hover:text-blue-500">
              {nav?.dropdown ? (
                // <FlyoutLink
                //   FlyoutContent={() => (
                //     // <FlyoutContent links={nav.dropdownData} language={locale} />
                //     <NavOptions links={nav.dropdownData} language={locale} />
                //   )}
                //   styles={'richblack-5'}
                // >
                //   {nav?.title[locale]}
                // </FlyoutLink>
                <NavOptions
                  links={nav.dropdownData}
                  language={locale}
                  dropdownContainerClass={nav?.dropdownContainerClass}
                  arrowClass={nav?.arrowClass}
                  id={index}
                  activeDropdown={activeDropdown}
                  setActiveDropdown={setActiveDropdown}
                  setHoverTimeout={setHoverTimeout}
                >
                  {nav?.title[locale]}
                </NavOptions>
              ) : (
                <div className="group">
                  <Link to={nav?.path}>{nav?.title[locale]}</Link>
                </div>
              )}

              <div className="duration-1300 absolute -bottom-2 hidden h-1 w-full rounded-lg bg-blue-500 transition ease-in group-hover:block"></div>
            </span>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-center gap-6 text-2xl">
        {/* Notification Bell */}
        <div
          className="relative cursor-pointer text-white transition-transform duration-300 hover:scale-110"
          onClick={() => dispatch(openBulletin())}
          title="New Notifications Available"
        >
          {/* Your original 'New' badge — unchanged */}
          <span className="absolute -right-4 -top-2 animate-bounce rounded-md bg-red-600 px-1 text-xs font-bold text-white">
            New
          </span>

          {/* Bell Icon with glow + gentle pulse */}
          <GoBellFill className="text-yellow-400 animate-bell-pulse text-4xl drop-shadow-[0_0_6px_rgba(255,255,0,0.7)]" />
        </div>
        <div>
          {isLoggedIn ? (
            <Link
              to="/ncmnet"
              className="flex items-center capitalize hover:text-blue-400 hover:underline"
            >
              <CgProfile className="mr-2 text-2xl font-semibold" />
              <FiChevronDown className="text-2xl font-semibold" />
            </Link>
          ) : (
            authData.map((authData, index) => (
              <Link
                key={index}
                to={authData?.path}
                className="flex items-center capitalize hover:text-blue-400 hover:underline"
              >
                <CgProfile className="mr-2 text-2xl font-semibold" />
                <FiChevronDown className="text-2xl font-semibold" />
              </Link>
            ))
          )}
        </div>
      </div>

      {/* Overlay and Testimonial Modal */}
      {isBulletinOpen && (
        <div className="absolute">
          <CustomModal
            open={isBulletinOpen}
            setOpen={() => dispatch(closeBulletin())}
            componentToRender={<BulletinBoard />}
          />
        </div>
      )}

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="absolute left-0 top-full z-50 flex w-full flex-col bg-orange-500 px-6 py-4 lg:hidden"
          >
            {navData.map((nav, index) => (
              <div key={index} className="border-b border-orange-200 py-3">
                {nav.dropdown ? (
                  <details className="group">
                    <summary className="cursor-pointer text-lg font-semibold text-white">
                      {nav?.title[locale]}
                    </summary>
                    <div className="mt-2 space-y-1 pl-4">
                      {nav.dropdownData.map((item) => (
                        <Link
                          key={item.id}
                          to={item.path}
                          className="block text-base font-semibold text-white hover:text-blue-700"
                        >
                          {item.title[locale]}
                        </Link>
                      ))}
                    </div>
                  </details>
                ) : (
                  <Link
                    to={nav.path}
                    className="block text-lg font-semibold text-white hover:text-blue-700"
                  >
                    {nav.title[locale]}
                  </Link>
                )}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Navbar;
