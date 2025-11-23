import React from 'react';

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop/Overlay */}
      <div
        className="fixed inset-0 bg-primary/80 backdrop-blur-sm z-50"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
        <div className="bg-dark-100 rounded-2xl shadow-inner shadow-light-100/10 p-6 max-w-4xl w-screen mx-4 max-h-[90vh] overflow-y-auto">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white hover:text-light-100 transition-colors duration-200 text-lg font-bold bg-dark-100/80 rounded-full w-8 h-8 flex items-center justify-center"
            aria-label="Close modal"
          >
            X
          </button>

          {/* Content Area - empty for now */}
          <div className="pt-2">
            {children || (
              <div className="text-white text-center py-8">
                <p>Modal content goes here</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
