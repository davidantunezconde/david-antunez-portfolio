import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Volume2, VolumeX } from 'lucide-react';

const Hero = () => {
  const videoId = 'GN2GYZoP16E';
  const [isMuted, setIsMuted] = useState(true);
  const playerRef = useRef(null);
  const iframeRef = useRef(null);

  useEffect(() => {
    // Load YouTube IFrame API
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    // Initialize player when API is ready
    window.onYouTubeIframeAPIReady = () => {
      playerRef.current = new window.YT.Player('hero-video', {
        events: {
          onReady: (event) => {
            event.target.mute();
            event.target.playVideo();
          }
        }
      });
    };

    // If API is already loaded
    if (window.YT && window.YT.Player) {
      playerRef.current = new window.YT.Player('hero-video', {
        events: {
          onReady: (event) => {
            event.target.mute();
            event.target.playVideo();
          }
        }
      });
    }

    return () => {
      window.onYouTubeIframeAPIReady = null;
    };
  }, []);

  const toggleMute = () => {
    if (playerRef.current) {
      if (isMuted) {
        playerRef.current.unMute();
        playerRef.current.setVolume(100);
      } else {
        playerRef.current.mute();
      }
      setIsMuted(!isMuted);
    }
  };

  return (
    <section className="hero-section relative h-screen w-full overflow-hidden">
      {/* Fullscreen YouTube Video Background */}
      <div className="absolute inset-0 w-full h-full">
        {/* YouTube Video - Fullscreen, scaled up to hide YouTube UI */}
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <iframe
            id="hero-video"
            ref={iframeRef}
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1&enablejsapi=1&vq=hd1080&iv_load_policy=3&disablekb=1&fs=0&cc_load_policy=0&origin=${window.location.origin}`}
            className="absolute"
            style={{
              width: '120%',
              height: '120%',
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
        </div>
        
        {/* Subtle gradient overlay for aesthetics only */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/40 pointer-events-none z-10"></div>
      </div>

      {/* Mute/Unmute Button */}
      <button
        onClick={toggleMute}
        data-testid="mute-toggle-btn"
        className="absolute bottom-8 right-8 z-30 w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/20 transition-all duration-300 border border-white/20 group"
        aria-label={isMuted ? 'Activar so' : 'Silenciar'}
      >
        {isMuted ? (
          <VolumeX className="w-5 h-5 text-white group-hover:scale-110 transition-transform" />
        ) : (
          <Volume2 className="w-5 h-5 text-white group-hover:scale-110 transition-transform" />
        )}
      </button>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 animate-bounce">
        <ChevronDown className="text-white w-8 h-8 opacity-70 drop-shadow-lg" />
      </div>
    </section>
  );
};

export default Hero;
