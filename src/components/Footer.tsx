
import React from 'react';

const Footer = () => {
  const year = new Date().getFullYear();
  
  return (
    <footer className="bg-cecos-dark text-white py-6 mt-auto">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <img 
              src="/lovable-uploads/2c231bcb-5829-44fe-86c3-34b642f1e9fe.png" 
              alt="CECOS University Logo" 
              className="h-10 mb-2"
            />
            <p className="text-sm text-cecos-lightest">
              Smart Teacher Evaluation System
            </p>
          </div>
          <div className="text-center md:text-right">
            <p className="text-sm text-cecos-lightest">
              © {year} CECOS University. All rights reserved.
            </p>
            <p className="text-xs mt-1 text-cecos-lighter">
              Final Year Project
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
