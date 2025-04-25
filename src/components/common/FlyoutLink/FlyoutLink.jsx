import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FiChevronDown } from 'react-icons/fi';
import { chevronVariantsHeader } from '../../../animations/chevronVariants';
import { flyoutVariants } from '../../../animations/flyoutVariants'; // Import flyout animation

const FlyoutLink = ({ children, FlyoutContent, styles }) => {
  const [open, setOpen] = useState(false);

  const showFlyout = FlyoutContent && open;

  const handleCloseDropdown = () => {
    setTimeout(() => {
      setOpen(false);
    }, 1000);
  };

  return (
    <div
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      className="relative h-fit w-fit"
    >
      <p className={`relative flex items-center gap-1`}>
        {children}
        <motion.span
          variants={chevronVariantsHeader}
          animate={open ? 'open' : 'closed'}
          transition={{ duration: 0.3 }}
        >
          <FiChevronDown className={`text-${styles}`} />
        </motion.span>
        <span
          style={{
            transform: showFlyout ? 'scaleX(1)' : 'scaleX(0)',
          }}
          className="underline-animation"
        />
      </p>
      <AnimatePresence>
        {showFlyout && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={flyoutVariants}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="absolute -left-12 top-10 z-10 bg-white text-black"
          >
            <div className="absolute left-0 right-0 top-6 h-6 bg-transparent" />
            <div className="absolute left-1/2 top-0 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-[rgb(241_242_255_/_var(--tw-bg-opacity))]" />
            <FlyoutContent />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FlyoutLink;
