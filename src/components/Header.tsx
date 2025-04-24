import type React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-md">
      <nav className="container mx-auto px-6 py-3 flex justify-between items-center">
        {/* Logo/Brand Name */}
        <Link to="/" className="text-xl font-bold text-gray-800">
          DentalSched
        </Link>

        {/* Navigation Links (Placeholders) */}
        {/* <div className="hidden md:flex space-x-4">
          <Link to="/features" className="text-gray-600 hover:text-gray-800">Features</Link>
          <Link to="/pricing" className="text-gray-600 hover:text-gray-800">Pricing</Link>
          <Link to="/contact" className="text-gray-600 hover:text-gray-800">Contact</Link>
        </div> */}

        {/* Sign In Button */}
        <div>
          <Link
            to="/login"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300"
          >
            Sign In
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header; 