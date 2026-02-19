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
          
          {/* Top bar to hide YouTube title and channel name */}
          <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-black via-black/80 to-transparent pointer-events-none z-10"></div>
          
          {/* Bottom bar to hide YouTube branding/slogan */}
          <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black via-black/80 to-transparent pointer-events-none z-10"></div>
          
          {/* Additional corners overlay */}
          <div className="absolute top-0 left-0 w-40 h-28 bg-gradient-to-br from-black via-black/60 to-transparent pointer-events-none z-10"></div>
          <div className="absolute top-0 right-0 w-40 h-28 bg-gradient-to-bl from-black via-black/60 to-transparent pointer-events-none z-10"></div>
          <div className="absolute bottom-0 left-0 w-40 h-24 bg-gradient-to-tr from-black via-black/60 to-transparent pointer-events-none z-10"></div>
          <div className="absolute bottom-0 right-0 w-40 h-24 bg-gradient-to-tl from-black via-black/60 to-transparent pointer-events-none z-10"></div>
        </div>
      </div>

      {/* Hero Content - REMOVED: Clean video only */}
      <div className="relative z-20 h-full flex flex-col items-center justify-center">
        {/* Scroll Indicator */}
        <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="text-white w-8 h-8 opacity-70 drop-shadow-lg" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
