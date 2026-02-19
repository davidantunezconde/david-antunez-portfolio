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
      <div className="absolute inset-0 w-full h-full flex items-center justify-center p-4 md:p-8 lg:p-12">
        <div 
          className="relative w-full h-full rounded-3xl overflow-hidden shadow-2xl border border-white/5"
          style={{
            backgroundImage: `url(https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg)`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          {/* YouTube Video - overlays the background image when loaded */}
          <iframe
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1&enablejsapi=1&vq=hd1080&iv_load_policy=3&disablekb=1&fs=0&cc_load_policy=0`}
            className="absolute inset-0 w-full h-full z-10"
            style={{
              width: '300%',
              height: '300%',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              pointerEvents: 'none',
            }}
            frameBorder="0"
            allow="autoplay; encrypted-media"
            loading="eager"
            title="Showreel Background"
          ></iframe>
          
          {/* SOLID top bar to completely hide YouTube title */}
          <div className="absolute top-0 left-0 right-0 h-24 bg-black pointer-events-none z-20"></div>
          <div className="absolute top-24 left-0 right-0 h-12 bg-gradient-to-b from-black to-transparent pointer-events-none z-20"></div>
          
          {/* SOLID bottom bar to completely hide YouTube branding */}
          <div className="absolute bottom-0 left-0 right-0 h-20 bg-black pointer-events-none z-20"></div>
          <div className="absolute bottom-20 left-0 right-0 h-10 bg-gradient-to-t from-black to-transparent pointer-events-none z-20"></div>
          
          {/* Solid corner overlays to hide any remaining YouTube UI */}
          <div className="absolute top-0 left-0 w-72 h-28 bg-black pointer-events-none z-20"></div>
          <div className="absolute top-0 right-0 w-40 h-28 bg-black pointer-events-none z-20"></div>
          <div className="absolute bottom-0 right-0 w-32 h-24 bg-black pointer-events-none z-20"></div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-30 animate-bounce">
        <ChevronDown className="text-white w-8 h-8 opacity-70 drop-shadow-lg" />
      </div>
    </section>
  );
};

export default Hero;
