import React, { useState } from 'react';
import { languages } from '../../data/header-data';
import { FiChevronDown } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { useSelector, useDispatch } from 'react-redux';
import { setLanguage } from '../../slices/languageSlice';
import langIcon from '../../assets/svgs/english-hindi-icon.svg';
import { chevronVariants } from '../../animations/chevronVariants';
import { itemVariants } from '../../animations/itemVariants';
import { wrapperVariants } from '../../animations/wrapperVariants';
import Spinner from './Spinner';
import toast from 'react-hot-toast';

const ChangeLanguage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { language } = useSelector((state) => state.language);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  // Toggle dropdown visibility
  const toggleDropdown = () => setIsOpen((prevState) => !prevState);

  // Handle language change
  const handleChangeLanguage = (selectedLocale) => {
    setLoading(true);

    const updatedLanguage = languages.find(
      (lang) => lang?.locale === selectedLocale
    );

    if (updatedLanguage) {
      dispatch(setLanguage(updatedLanguage));
    } else {
      console.error(`Language with locale ${selectedLocale} not found.`);
    }

    setLoading(false);

    setIsOpen(false); // Close the dropdown after selection

    toast.success(`Language changed to ${updatedLanguage?.label}`);
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <header className="flex items-center justify-center text-richblack-5">
      <motion.div animate={isOpen ? 'open' : 'closed'} className="relative">
        {/* Language selection button */}
        <button
          onClick={toggleDropdown}
          className="flex items-center gap-2 rounded-md px-3 transition-colors"
        >
          <img src={langIcon} alt="Language Icon" className="size-5" />
          {/* <p className='text-blue-700'>{language?.label}</p> */}
          <motion.span variants={chevronVariants}>
            <FiChevronDown className="text-blue-700" />
          </motion.span>
        </button>

        {/* Dropdown menu for language selection */}
        <motion.ul
          initial={wrapperVariants.closed}
          variants={wrapperVariants}
          style={{ originY: 'top', translateX: '-10%' }}
          className="absolute left-1/2 top-[120%] z-10 flex w-48 flex-col gap-2 overflow-hidden rounded-lg bg-richblack-900 p-2 text-richblack-5 shadow-xl"
        >
          {languages.map((lang, index) => (
            <LanguageOption
              key={index}
              label={lang?.label}
              selectedLang={language?.label}
              locale={lang?.locale}
              clickHandler={() => handleChangeLanguage(lang?.locale)} // Pass the language value
            />
          ))}
        </motion.ul>
      </motion.div>
    </header>
  );
};

const LanguageOption = ({ label, selectedLang, clickHandler, locale }) => {
  return (
    <motion.li
      variants={itemVariants}
      onClick={clickHandler} // Handle click for language change
      className={`cursor-pointer rounded-lg p-2 transition-colors duration-200 ease-in-out hover:bg-richblack-700 ${
        selectedLang === label ? 'bg-richblack-700 font-bold' : ''
      }`}
    >
      <span>{label}</span>
    </motion.li>
  );
};

export default ChangeLanguage;
