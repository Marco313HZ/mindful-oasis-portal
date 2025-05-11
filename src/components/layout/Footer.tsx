
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-purple-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <div className="h-10 w-10 rounded-full bg-white flex items-center justify-center">
                <span className="font-bold text-purple-800 text-xl">MC</span>
              </div>
              <span className="font-bold text-xl">MindfulCare</span>
            </Link>
            <p className="text-purple-100 mb-6">
              Providing compassionate mental health care and support for a balanced life.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-purple-200 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-white hover:text-purple-200 transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-white hover:text-purple-200 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-white hover:text-purple-200 transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-purple-100 hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/about" className="text-purple-100 hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/services" className="text-purple-100 hover:text-white transition-colors">Our Services</Link></li>
              <li><Link to="/community" className="text-purple-100 hover:text-white transition-colors">Community</Link></li>
              <li><Link to="/contact" className="text-purple-100 hover:text-white transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Our Services</h3>
            <ul className="space-y-2">
              <li><Link to="/services#therapy" className="text-purple-100 hover:text-white transition-colors">Individual Therapy</Link></li>
              <li><Link to="/services#groups" className="text-purple-100 hover:text-white transition-colors">Group Therapy</Link></li>
              <li><Link to="/services#assessment" className="text-purple-100 hover:text-white transition-colors">Psychological Assessment</Link></li>
              <li><Link to="/services#medication" className="text-purple-100 hover:text-white transition-colors">Medication Management</Link></li>
              <li><Link to="/services#teletherapy" className="text-purple-100 hover:text-white transition-colors">Teletherapy</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Contact Info</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mr-2 mt-0.5 text-purple-300" />
                <span>123 Healing Street, Mindful City, MC 12345</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-2 text-purple-300" />
                <span>(555) 123-4567</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-2 text-purple-300" />
                <span>contact@mindfulcare.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-purple-700 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-purple-200 text-sm">© {new Date().getFullYear()} MindfulCare. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link to="/privacy" className="text-purple-200 hover:text-white text-sm transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="text-purple-200 hover:text-white text-sm transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
