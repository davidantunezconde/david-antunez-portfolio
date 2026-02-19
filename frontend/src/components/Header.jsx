import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from './ui/button';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [waveAnimation, setWaveAnimation] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    // Listen for video end event
    const handleVideoEnd = () => {
      setWaveAnimation(true);
      // Reset animation after it completes
      setTimeout(() => {
        setWaveAnimation(false);
      }, 2500);
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('videoEnded', handleVideoEnd);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('videoEnded', handleVideoEnd);
    };
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  const navItems = [
    { label: 'About', id: 'about', delay: '0ms' },
    { label: 'Portfolio', id: 'portfolio', delay: '150ms' },
    { label: 'Services', id: 'services', delay: '300ms' },
    { label: 'Contact', id: 'contact', delay: '450ms' }
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-black/90 backdrop-blur-md border-b border-white/10' 
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a 
            href="/"
            className="text-2xl font-bold text-white hover:text-gray-300 transition-colors duration-300"
          >
            David Antúnez
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                data-testid={`nav-${item.id}`}
                className={`text-white font-medium transition-all duration-500 ${
                  waveAnimation 
                    ? 'text-white scale-110 drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]' 
                    : 'hover:text-gray-300'
                }`}
                style={{
                  transitionDelay: waveAnimation ? item.delay : '0ms',
                }}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-white"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <nav className="md:hidden mt-6 pb-4 border-t border-white/10 pt-4">
            <div className="flex flex-col gap-4">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="text-white hover:text-gray-300 transition-colors duration-300 font-medium text-left"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
