import React from 'react';
import facebookIcon from '../../assets/facebook.png';
import instaIcon from '../../assets/insta.png';
import tiktokIcon from '../../assets/tiktok.png';

type TabKey = 'home' | 'menu' | 'about' | 'contact';

interface FooterProps {
  onNavigate: (tab: TabKey) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-kamora-dark text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <h3 className="text-2xl font-bold text-kamora-orange mb-4">Kamora</h3>
            <p className="text-gray-300 mb-4">
              Creating memorable dining experiences with quality food and exceptional service.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com/profile.php?id=61573337227317&rdid=QUVyv1mVajnPPUUU&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1C4ayqFM75%2F#" target="_blank" rel="noreferrer" className="text-gray-300 hover:text-kamora-orange transition-colors">
                <img src={facebookIcon} alt="Facebook" className="w-6 h-6 object-contain" />
              </a>
              <a href="https://www.tiktok.com/@goldensunfield?_r=1&_t=ZS-95Q6eBgXIVI" target="_blank" rel="noreferrer" className="text-gray-300 hover:text-kamora-orange transition-colors">
                <img src={tiktokIcon} alt="TikTok" className="w-6 h-6 object-contain" />
              </a>
              <a href="https://www.instagram.com/kamora_official?igsh=NWN6ejJxbjRqdHMx" target="_blank" rel="noreferrer" className="text-gray-300 hover:text-kamora-orange transition-colors">
                <img src={instaIcon} alt="Instagram" className="w-6 h-6 object-contain" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <button 
                  type="button"
                  onClick={() => onNavigate('home')}
                  className="text-gray-300 hover:text-kamora-orange transition-colors"
                >
                  Home
                </button>
              </li>
              <li>
                <button 
                  type="button"
                  onClick={() => onNavigate('about')}
                  className="text-gray-300 hover:text-kamora-orange transition-colors"
                >
                  About
                </button>
              </li>
              <li>
                <button 
                  type="button"
                  onClick={() => onNavigate('menu')}
                  className="text-gray-300 hover:text-kamora-orange transition-colors"
                >
                  Menu
                </button>
              </li>
              <li>
                <button 
                  type="button"
                  onClick={() => onNavigate('contact')}
                  className="text-gray-300 hover:text-kamora-orange transition-colors"
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
            <ul className="space-y-2 text-gray-300">
              <li className="flex items-center">
                <svg className="w-5 h-5 mr-2 text-kamora-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                goldensunfield@gmail.com
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 mr-2 text-kamora-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                +63 966 544 3985
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 mr-2 text-kamora-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                4031 Gen T. De Leon, Valenzuela City, Philippines
              </li>
            </ul>
          </div>

          {/* Business Hours */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Business Hours</h4>
            <ul className="space-y-2 text-gray-300">
              <li>Monday to Saturday</li>
              <li> 8:00 AM - 8:00 PM</li>
              
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {currentYear} Kamora. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
