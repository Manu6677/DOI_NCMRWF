import React from 'react';

const CustomModal = ({ open, setOpen, componentToRender }) => {
  const handleClose = () => {
    setOpen();
  };

  return (
    <>
      {open && ( // Only render the modal if it's open
        <div className="fixed inset-0 z-[1000] flex items-center justify-center">
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black opacity-50"
            onClick={handleClose} // Close modal when clicking on overlay
          ></div>
          {/* Modal Content */}
          <div
            className="relative w-full max-w-md rounded-lg bg-white p-6 shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute right-2 top-2 font-bold text-black"
              onClick={handleClose}
            >
              &times;
            </button>
            {componentToRender}
          </div>
        </div>
      )}
    </>
  );
};

export default CustomModal;
