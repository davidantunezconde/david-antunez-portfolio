import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { ChevronDown } from 'lucide-react';

const Hero = ({ profileData, onViewProjects }) => {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  useEffect(() => {
    // Preconnect to YouTube for faster loading
    const preconnectLink = document.createElement('link');
    preconnectLink.rel = 'preconnect';
    preconnectLink.href = 'https://www.youtube.com';
    document.head.appendChild(preconnectLink);

    const preconnectLink2 = document.createElement('link');
    preconnectLink2.rel = 'preconnect';
    preconnectLink2.href = 'https://i.ytimg.com';
    document.head.appendChild(preconnectLink2);

    const timer = setTimeout(() => setIsVideoLoaded(true), 1000);
    return () => {
      clearTimeout(timer);
      document.head.removeChild(preconnectLink);
      document.head.removeChild(preconnectLink2);
    };
  }, []);

  const scrollToProjects = () => {
    const element = document.getElementById('portfolio');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const videoId = 'rHUYgdc1u7E';

  return (
    <section className="hero-section relative h-screen w-full overflow-hidden">
      {/* Fullscreen YouTube Video Background - High Quality, Less Cropping */}
      <div className="absolute inset-0 w-full h-full">
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60 z-10"></div>
        
        {/* YouTube Video - Less vertical cropping, High Quality, No Branding */}
        <div className="absolute inset-0 w-full h-full flex items-center justify-center">
          <iframe
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1&enablejsapi=1&vq=hd1080&quality=high&iv_load_policy=3&disablekb=1&fs=0&cc_load_policy=0`}
            className="w-full h-full"
            style={{
              minWidth: '100%',
              minHeight: '100%',
              objectFit: 'cover',
              pointerEvents: 'none',
            }}
            frameBorder="0"
            allow="autoplay; encrypted-media"
            loading="eager"
            title="Showreel Background"
          ></iframe>
          
          {/* Overlay to hide YouTube branding in corners */}
          <div className="absolute top-0 left-0 w-32 h-20 bg-gradient-to-br from-black/80 via-black/40 to-transparent pointer-events-none z-10"></div>
          <div className="absolute top-0 right-0 w-32 h-20 bg-gradient-to-bl from-black/80 via-black/40 to-transparent pointer-events-none z-10"></div>
        </div>
      </div>

      {/* Hero Content */}
      <div className="relative z-20 h-full flex flex-col items-center justify-center text-center px-6">
        <div className="hero-content max-w-4xl">
          <h1 className="hero-title text-5xl sm:text-6xl md:text-8xl font-bold text-white mb-6 tracking-tight drop-shadow-2xl">
            {profileData.name}
          </h1>
          <p className="hero-subtitle text-xl sm:text-2xl md:text-3xl text-gray-200 mb-4 font-light drop-shadow-lg">
            {profileData.title}
          </p>
          <p className="hero-tagline text-base sm:text-lg md:text-xl text-gray-300 mb-12 max-w-2xl mx-auto drop-shadow-lg">
            {profileData.tagline}
          </p>
          <Button 
            onClick={scrollToProjects}
            size="lg"
            className="hero-cta text-base sm:text-lg px-6 sm:px-8 py-5 sm:py-6 bg-white text-black hover:bg-gray-200 transition-all duration-300 transform hover:scale-105 shadow-xl"
          >
            View Projects
          </Button>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="text-white w-8 h-8 opacity-70 drop-shadow-lg" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
