import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { ChevronDown, Play } from 'lucide-react';

const Hero = ({ profileData, onViewProjects }) => {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [showVideo, setShowVideo] = useState(false);

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

    // Auto-play video after 1 second
    const timer = setTimeout(() => {
      setShowVideo(true);
      setIsVideoLoaded(true);
    }, 1000);

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

  // Extract YouTube video ID
  const videoId = 'rHUYgdc1u7E';

  return (
    <section className="hero-section relative h-screen w-full overflow-hidden bg-black">
      {/* Video Background with Rounded Corners and Optimization */}
      <div className="absolute inset-0 w-full h-full p-4 md:p-8">
        <div className="relative w-full h-full rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70 z-10"></div>
          
          {!showVideo ? (
            // Optimized thumbnail with play button (loads instantly)
            <div 
              className="absolute inset-0 bg-cover bg-center cursor-pointer group"
              style={{
                backgroundImage: `url(https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg)`,
              }}
              onClick={() => setShowVideo(true)}
            >
              <div className="absolute inset-0 flex items-center justify-center z-20">
                <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:bg-white/30 transition-all duration-300 group-hover:scale-110">
                  <Play className="w-10 h-10 text-white ml-1" fill="white" />
                </div>
              </div>
            </div>
          ) : (
            // Actual YouTube video (loads on demand)
            <iframe
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1&enablejsapi=1`}
              className="absolute top-0 left-0 w-full h-full"
              style={{
                width: '100%',
                height: '100%',
              }}
              frameBorder="0"
              allow="autoplay; encrypted-media"
              loading="lazy"
              title="Showreel Background"
            ></iframe>
          )}
        </div>
      </div>

      {/* Hero Content */}
      <div className="relative z-20 h-full flex flex-col items-center justify-center text-center px-6">
        <div className="hero-content max-w-4xl">
          <h1 className="hero-title text-5xl sm:text-6xl md:text-8xl font-bold text-white mb-6 tracking-tight">
            {profileData.name}
          </h1>
          <p className="hero-subtitle text-xl sm:text-2xl md:text-3xl text-gray-200 mb-4 font-light">
            {profileData.title}
          </p>
          <p className="hero-tagline text-base sm:text-lg md:text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
            {profileData.tagline}
          </p>
          <Button 
            onClick={scrollToProjects}
            size="lg"
            className="hero-cta text-base sm:text-lg px-6 sm:px-8 py-5 sm:py-6 bg-white text-black hover:bg-gray-200 transition-all duration-300 transform hover:scale-105"
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
