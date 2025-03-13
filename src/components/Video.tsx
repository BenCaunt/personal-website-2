import React, { useState } from 'react';
import Modal from './Modal';

interface VideoProps {
  src: string;
  className?: string;
  alt: string;
}

const Video: React.FC<VideoProps> = ({ src, className = '', alt }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClick = () => {
    setIsModalOpen(true);
  };

  const ExpandIcon = () => (
    <div className="absolute top-2 right-2 bg-black bg-opacity-50 rounded-full p-1.5 text-white opacity-0 group-hover:opacity-100 transition-opacity">
      <svg 
        className="w-4 h-4" 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" 
        />
      </svg>
    </div>
  );

  // If it's a GIF, render as an image
  if (src.endsWith('.gif')) {
    return (
      <>
        <div className="relative group cursor-pointer" onClick={handleClick} title="Click to expand">
          <img
            src={src}
            alt={alt}
            className={`${className} hover:opacity-90 transition-opacity`}
            loading="lazy"
            width="800"
            height="450"
          />
          <ExpandIcon />
        </div>
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <img
            src={src}
            alt={alt}
            className="w-full h-auto"
            loading="lazy"
          />
        </Modal>
      </>
    );
  }

  // Otherwise, render as a video
  return (
    <>
      <div className="relative group cursor-pointer" onClick={handleClick} title="Click to expand">
        <video
          autoPlay
          loop
          muted
          playsInline
          className={`${className} hover:opacity-90 transition-opacity`}
          width="800"
          height="450"
        >
          <source src={src} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <ExpandIcon />
      </div>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-auto"
        >
          <source src={src} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </Modal>
    </>
  );
};

export default Video; 