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

  const videoId = 'GN2GYZoP16E';

  return (
    <section className="hero-section relative h-screen w-full bg-black overflow-hidden">
      {/* Video Container with Padding and Rounded Corners */}
      <div className="absolute inset-0 w-full h-full flex items-center justify-center p-6 md:p-12">
        <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-2xl">
          {/* Dark overlay for better aesthetics */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/40 z-10 pointer-events-none"></div>
          
          {/* YouTube Video */}
          <iframe
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1&enablejsapi=1&vq=hd1080&quality=high&iv_load_policy=3&disablekb=1&fs=0&cc_load_policy=0`}
            className="w-full h-full"
            style={{
              minWidth: '177.77vh',
              minHeight: '100%',
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              objectFit: 'cover',
              pointerEvents: 'none',
            }}
            frameBorder="0"
            allow="autoplay; encrypted-media"
            loading="eager"
            title="Showreel Background"
          ></iframe>
          
          {/* Top bar to hide YouTube title and channel name */}
          <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-black via-black/80 to-transparent pointer-events-none z-10"></div>
          
          {/* Bottom bar to hide YouTube branding/slogan */}
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black via-black/70 to-transparent pointer-events-none z-10"></div>
          
          {/* Corner overlays */}
          <div className="absolute top-0 left-0 w-32 h-24 bg-gradient-to-br from-black/70 to-transparent pointer-events-none z-10"></div>
          <div className="absolute top-0 right-0 w-48 h-28 bg-gradient-to-bl from-black/80 to-transparent pointer-events-none z-10"></div>
          <div className="absolute bottom-0 left-0 w-28 h-20 bg-gradient-to-tr from-black/60 to-transparent pointer-events-none z-10"></div>
          <div className="absolute bottom-0 right-0 w-36 h-24 bg-gradient-to-tl from-black/70 to-transparent pointer-events-none z-10"></div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 animate-bounce">
        <ChevronDown className="text-white w-8 h-8 opacity-70 drop-shadow-lg" />
      </div>
    </section>
  );
};

export default Hero;
