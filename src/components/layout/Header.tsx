
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Menu, X, Home, Info, Activity, Users, Mail, LogIn } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const menuItems = [
    { name: 'Home', path: '/', icon: <Home className="h-5 w-5 mr-1" /> },
    { name: 'About', path: '/about', icon: <Info className="h-5 w-5 mr-1" /> },
    { name: 'Our Services', path: '/services', icon: <Activity className="h-5 w-5 mr-1" /> },
    { name: 'Community', path: '/community', icon: <Users className="h-5 w-5 mr-1" /> },
    { name: 'Contact Us', path: '/contact', icon: <Mail className="h-5 w-5 mr-1" /> },
  ];

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <div className="h-10 w-10 rounded-full bg-purple-400 flex items-center justify-center">
            <span className="font-bold text-white text-xl">MC</span>
          </div>
          <span className="font-bold text-xl text-purple-800">MindfulCare</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className="flex items-center text-gray-700 hover:text-purple-500 transition-colors"
            >
              {item.name}
            </Link>
          ))}
          <Link to="/signin">
            <Button className="bg-purple-400 hover:bg-purple-500">
              <LogIn className="h-4 w-4 mr-2" />
              Sign In
            </Button>
          </Link>
        </nav>

        {/* Mobile Navigation */}
        <div className="md:hidden flex items-center">
          <button
            onClick={toggleMenu}
            className="text-gray-700 hover:text-purple-500 focus:outline-none"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="max-w-7xl mx-auto px-4 py-2">
            <nav className="flex flex-col space-y-3 py-3">
              {menuItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className="flex items-center py-2 px-3 rounded-lg hover:bg-purple-100 text-gray-700"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.icon}
                  {item.name}
                </Link>
              ))}
              <Link to="/signin" onClick={() => setIsMenuOpen(false)}>
                <Button className="w-full bg-purple-400 hover:bg-purple-500 mt-2">
                  <LogIn className="h-4 w-4 mr-2" />
                  Sign In
                </Button>
              </Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
