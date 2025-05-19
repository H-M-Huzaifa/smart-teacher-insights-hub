
import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <header className="bg-cecos text-white shadow-md">
      <div className="container mx-auto p-4 flex flex-col md:flex-row items-center justify-between">
        <div className="flex items-center mb-4 md:mb-0">
          <img 
            src="/lovable-uploads/2c231bcb-5829-44fe-86c3-34b642f1e9fe.png" 
            alt="CECOS University Logo" 
            className="h-12 mr-3"
          />
          <h1 className="text-xl md:text-2xl font-bold">Smart Teacher Evaluation System</h1>
        </div>
        <nav>
          <ul className="flex space-x-6">
            <li>
              <Link to="/" className="hover:text-cecos-lightest transition duration-200">
                Home
              </Link>
            </li>
            <li>
              <Link to="/results" className="hover:text-cecos-lightest transition duration-200">
                Results
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default NavBar;
