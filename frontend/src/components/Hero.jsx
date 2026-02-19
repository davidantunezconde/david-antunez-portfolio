import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { ChevronDown } from 'lucide-react';

const Hero = ({ profileData, onViewProjects }) => {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  useEffect(() => {
    // Simulate video loading
    const timer = setTimeout(() => setIsVideoLoaded(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  const scrollToProjects = () => {
    const element = document.getElementById('portfolio');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="hero-section relative h-screen w-full overflow-hidden">
      {/* Background Image with cinematic overlay */}
      <div className="absolute inset-0 w-full h-full">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(https://images.unsplash.com/photo-1704580116048-cff8a7f72d47)`,
          }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black z-10"></div>
      </div>

      {/* Hero Content */}
      <div className="relative z-20 h-full flex flex-col items-center justify-center text-center px-6">
        <div className="hero-content max-w-4xl">
          <h1 className="hero-title text-6xl md:text-8xl font-bold text-white mb-6 tracking-tight">
            {profileData.name}
          </h1>
          <p className="hero-subtitle text-2xl md:text-3xl text-gray-200 mb-4 font-light">
            {profileData.title}
          </p>
          <p className="hero-tagline text-lg md:text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
            {profileData.tagline}
          </p>
          <Button 
            onClick={scrollToProjects}
            size="lg"
            className="hero-cta text-lg px-8 py-6 bg-white text-black hover:bg-gray-200 transition-all duration-300 transform hover:scale-105"
          >
            View Projects
          </Button>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="text-white w-8 h-8 opacity-70" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
