import React, { useEffect, useState } from 'react';
import {
  FiArrowRight,
  FiBarChart2,
  FiChevronDown,
  FiHome,
  FiPieChart,
} from 'react-icons/fi';
import { AnimatePresence, motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { navData } from '../../data/nav-data';

export const NavMenu = () => {
  return (
    <div className="bg-neutral-950 text-neutral-200 flex h-96 w-full justify-start p-8 md:justify-center">
      <Tabs />
    </div>
  );
};

const Tabs = () => {
  const [selected, setSelected] = useState(null);
  const [dir, setDir] = useState(null);

  const handleSetSelected = (val) => {
    if (typeof selected === 'number' && typeof val === 'number') {
      setDir(selected > val ? 'r' : 'l');
    } else if (val === null) {
      setDir(null);
    }

    setSelected(val);
  };

  return (
    <div
      onMouseLeave={() => handleSetSelected(null)}
      className="relative flex h-fit gap-2"
    >
      {TABS.map((t) => {
        return (
          <Tab
            key={t.id}
            selected={selected}
            handleSetSelected={handleSetSelected}
            tab={t.id}
          >
            {t.title}
          </Tab>
        );
      })}

      <AnimatePresence>
        {selected && <Content dir={dir} selected={selected} />}
      </AnimatePresence>
    </div>
  );
};

const Tab = ({ children, tab, handleSetSelected, selected }) => {
  return (
    <button
      id={`shift-tab-${tab}`}
      onMouseEnter={() => handleSetSelected(tab)}
      onClick={() => handleSetSelected(tab)}
      className={`flex items-center gap-1 rounded-full px-3 py-1.5 text-sm transition-colors ${
        selected === tab
          ? 'bg-neutral-800 text-neutral-100'
          : 'text-neutral-400'
      }`}
    >
      <span>{children}</span>
      <FiChevronDown
        className={`transition-transform ${
          selected === tab ? 'rotate-180' : ''
        }`}
      />
    </button>
  );
};

const Content = ({ selected, dir }) => {
  return (
    <motion.div
      id="overlay-content"
      initial={{
        opacity: 0,
        y: 8,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      exit={{
        opacity: 0,
        y: 8,
      }}
      className="border-neutral-600 from-neutral-900 via-neutral-900 to-neutral-800 absolute left-0 top-[calc(100%_+_24px)] w-96 rounded-lg border bg-gradient-to-b p-4"
    >
      <Bridge />
      <Nub selected={selected} />

      {TABS.map((t) => {
        return (
          <div className="overflow-hidden" key={t.id}>
            {selected === t.id && (
              <motion.div
                initial={{
                  opacity: 0,
                  x: dir === 'l' ? 100 : dir === 'r' ? -100 : 0,
                }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.25, ease: 'easeInOut' }}
              >
                <t.Component />
              </motion.div>
            )}
          </div>
        );
      })}
    </motion.div>
  );
};

const Bridge = () => (
  <div className="absolute -top-[24px] left-0 right-0 h-[24px]" />
);

const Nub = ({ selected }) => {
  const [left, setLeft] = useState(0);

  useEffect(() => {
    moveNub();
  }, [selected]);

  const moveNub = () => {
    if (selected) {
      const hoveredTab = document.getElementById(`shift-tab-${selected}`);
      const overlayContent = document.getElementById('overlay-content');

      if (!hoveredTab || !overlayContent) return;

      const tabRect = hoveredTab.getBoundingClientRect();
      const { left: contentLeft } = overlayContent.getBoundingClientRect();

      const tabCenter = tabRect.left + tabRect.width / 2 - contentLeft;

      setLeft(tabCenter);
    }
  };

  return (
    <motion.span
      style={{
        clipPath: 'polygon(0 0, 100% 0, 50% 50%, 0% 100%)',
      }}
      animate={{ left }}
      transition={{ duration: 0.25, ease: 'easeInOut' }}
      className="border-neutral-600 bg-neutral-900 absolute left-1/2 top-0 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rotate-45 rounded-tl border"
    />
  );
};

const Pricing = () => {
  return (
    <div className="divide-neutral-700 grid grid-cols-3 gap-4 divide-x">
      <Link
        to="#"
        className="text-neutral-400 hover:text-neutral-50 flex w-full flex-col items-center justify-center py-2 transition-colors"
      >
        <FiHome className="text-indigo-300 mb-2 text-xl" />
        <span className="text-xs">Startup</span>
      </Link>
      <a
        href="#"
        className="text-neutral-400 hover:text-neutral-50 flex w-full flex-col items-center justify-center py-2 transition-colors"
      >
        <FiBarChart2 className="text-indigo-300 mb-2 text-xl" />
        <span className="text-xs">Scaleup</span>
      </a>
      <a
        href="#"
        className="text-neutral-400 hover:text-neutral-50 flex w-full flex-col items-center justify-center py-2 transition-colors"
      >
        <FiPieChart className="text-indigo-300 mb-2 text-xl" />
        <span className="text-xs">Enterprise</span>
      </a>
    </div>
  );
};

const TABS = [
  {
    title: 'Pricing',
    Component: Pricing,
  },
].map((n, idx) => ({ ...n, id: idx + 1 }));
