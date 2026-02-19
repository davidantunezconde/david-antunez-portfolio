import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Volume2, VolumeX } from 'lucide-react';

const Hero = () => {
  const videoId = 'GN2GYZoP16E';
  const [isMuted, setIsMuted] = useState(true);
  const playerRef = useRef(null);
  const iframeRef = useRef(null);

  useEffect(() => {
    // Preconnect to YouTube for faster loading
    const links = [
      { rel: 'preconnect', href: 'https://www.youtube.com' },
      { rel: 'preconnect', href: 'https://www.google.com' },
      { rel: 'preconnect', href: 'https://i.ytimg.com' },
      { rel: 'preconnect', href: 'https://s.ytimg.com' },
      { rel: 'dns-prefetch', href: 'https://www.youtube.com' },
    ];
    
    const createdLinks = links.map(({ rel, href }) => {
      const link = document.createElement('link');
      link.rel = rel;
      link.href = href;
      document.head.appendChild(link);
      return link;
    });

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
            event.target.setPlaybackQuality('hd2160'); // 4K
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
            event.target.setPlaybackQuality('hd2160'); // 4K
            event.target.playVideo();
          }
        }
      });
    }

    return () => {
      window.onYouTubeIframeAPIReady = null;
      createdLinks.forEach(link => {
        if (link.parentNode) link.parentNode.removeChild(link);
      });
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
        {/* Thumbnail preload while video loads - z-0 so video shows on top */}
        <div 
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{ backgroundImage: `url(https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg)` }}
        />
        
        {/* YouTube Video - Fullscreen 4K - z-1 above thumbnail */}
        <div className="absolute inset-0 w-full h-full flex items-center justify-center z-[1]">
          <iframe
            id="hero-video"
            ref={iframeRef}
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1&enablejsapi=1&vq=hd2160&iv_load_policy=3&disablekb=1&fs=0&cc_load_policy=0&origin=${window.location.origin}`}
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
        </div>
        
        {/* Dark overlay for better aesthetics - z-10 */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60 z-10 pointer-events-none"></div>
        
        {/* Top gradient to hide YouTube title */}
        <div className="absolute top-0 left-0 right-0 h-28 bg-gradient-to-b from-black via-black/90 to-transparent pointer-events-none z-10"></div>
        
        {/* Bottom gradient to hide YouTube branding */}
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black via-black/80 to-transparent pointer-events-none z-10"></div>
        
        {/* Corner gradients */}
        <div className="absolute top-0 left-0 w-48 h-32 bg-gradient-to-br from-black via-black/70 to-transparent pointer-events-none z-10"></div>
        <div className="absolute top-0 right-0 w-64 h-36 bg-gradient-to-bl from-black via-black/80 to-transparent pointer-events-none z-10"></div>
        <div className="absolute bottom-0 left-0 w-40 h-24 bg-gradient-to-tr from-black via-black/60 to-transparent pointer-events-none z-10"></div>
        <div className="absolute bottom-0 right-0 w-48 h-28 bg-gradient-to-tl from-black via-black/70 to-transparent pointer-events-none z-10"></div>
      </div>

      {/* Mute/Unmute Button */}
      <button
        onClick={toggleMute}
        data-testid="mute-toggle-btn"
        className="absolute bottom-24 right-8 z-30 w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/20 transition-all duration-300 border border-white/20 group"
        aria-label={isMuted ? 'Activar so' : 'Silenciar'}
      >
        {isMuted ? (
          <VolumeX className="w-5 h-5 text-white group-hover:scale-110 transition-transform" />
        ) : (
          <Volume2 className="w-5 h-5 text-white group-hover:scale-110 transition-transform" />
        )}
      </button>

      {/* Scroll Indicator */}
      <div className="relative z-20 h-full flex flex-col items-center justify-center">
        <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="text-white w-8 h-8 opacity-70 drop-shadow-lg" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
