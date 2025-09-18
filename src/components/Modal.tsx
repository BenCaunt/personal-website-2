import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur"
      onClick={onClose}
    >
      <div 
        className="relative max-w-4xl w-full overflow-hidden rounded-3xl border border-white/10 bg-slate-900/90 shadow-glow"
        onClick={e => e.stopPropagation()}
      >
        <button
          className="absolute top-4 right-4 text-slate-400 transition-colors hover:text-white"
          onClick={onClose}
          aria-label="Close modal"
        >
          <svg 
            className="w-6 h-6" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M6 18L18 6M6 6l12 12" 
            />
          </svg>
        </button>
        <div className="p-4">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal; 
