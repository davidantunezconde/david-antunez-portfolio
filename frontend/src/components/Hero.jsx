import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Volume2, VolumeX, Play } from 'lucide-react';

const Hero = () => {
  const videoId = 'GN2GYZoP16E';
  const [isMuted, setIsMuted] = useState(true);
  const [showSplash, setShowSplash] = useState(true);
  const [isRevealing, setIsRevealing] = useState(false);
  const [highlightVolume, setHighlightVolume] = useState(false);
  const [waveArrow, setWaveArrow] = useState(false);
  const [videoReady, setVideoReady] = useState(false);
  const [videoPlaying, setVideoPlaying] = useState(false);
  const playerRef = useRef(null);
  const iframeRef = useRef(null);
  const waveTimerRef = useRef(null);

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
    const initPlayer = () => {
      playerRef.current = new window.YT.Player('hero-video', {
        events: {
          onReady: (event) => {
            // Preload video but keep it paused and muted
            event.target.mute();
            event.target.setPlaybackQuality('hd2160'); // 4K
            // Cue the video to preload it without playing
            event.target.cueVideoById({
              videoId: videoId,
              suggestedQuality: 'hd2160'
            });
            setVideoReady(true);
          },
          onStateChange: (event) => {
            // Video started playing (state 1)
            if (event.data === 1) {
              setVideoPlaying(true);
            }
            // Video ended (state 0) - restart loop
            if (event.data === 0) {
              event.target.playVideo();
            }
          }
        }
      });
    };

    window.onYouTubeIframeAPIReady = initPlayer;

    // If API is already loaded
    if (window.YT && window.YT.Player) {
      initPlayer();
    }

    return () => {
      window.onYouTubeIframeAPIReady = null;
      createdLinks.forEach(link => {
        if (link.parentNode) link.parentNode.removeChild(link);
      });
      // Clear wave timer on unmount
      if (waveTimerRef.current) {
        clearTimeout(waveTimerRef.current);
      }
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

  const triggerWaveAnimation = () => {
    // Dispatch custom event for header wave animation
    window.dispatchEvent(new CustomEvent('videoEnded'));
    setWaveArrow(true);
    setTimeout(() => setWaveArrow(false), 2500);
  };

  const handleDiscover = () => {
    // Start video playback with sound
    if (playerRef.current) {
      playerRef.current.unMute();
      playerRef.current.setVolume(100);
      playerRef.current.setPlaybackQuality('hd2160');
      playerRef.current.playVideo();
      setIsMuted(false);
    }
    
    // Start revealing animation
    setIsRevealing(true);
    
    // Wait for video to actually start playing before fully hiding splash
    const checkVideoPlaying = setInterval(() => {
      if (playerRef.current) {
        const state = playerRef.current.getPlayerState();
        // State 1 = playing
        if (state === 1) {
          clearInterval(checkVideoPlaying);
          setVideoPlaying(true);
          
          setTimeout(() => {
            setShowSplash(false);
            // Highlight the volume button to draw attention
            setHighlightVolume(true);
            setTimeout(() => {
              setHighlightVolume(false);
            }, 2000);
          }, 500);
        }
      }
    }, 100);
    
    // Fallback: hide splash after 3 seconds even if video not detected as playing
    setTimeout(() => {
      clearInterval(checkVideoPlaying);
      setVideoPlaying(true);
      setShowSplash(false);
      setHighlightVolume(true);
      setTimeout(() => setHighlightVolume(false), 2000);
    }, 3000);

    // Trigger wave animation exactly 1 minute and 2 seconds after clicking Discover
    waveTimerRef.current = setTimeout(() => {
      triggerWaveAnimation();
    }, 62000); // 62000ms = 1 minute 2 seconds
  };

  return (
    <section className="hero-section relative h-screen w-full overflow-hidden">
      {/* Splash Screen Overlay */}
      {showSplash && (
        <div 
          className={`fixed inset-0 z-50 bg-black flex flex-col items-center justify-center transition-all duration-1000 ease-out ${
            isRevealing ? 'opacity-0 scale-110' : 'opacity-100 scale-100'
          }`}
        >
          {/* Logo / Name */}
          <h1 
            className={`text-5xl md:text-7xl font-bold text-white mb-4 tracking-tight transition-all duration-700 ${
              isRevealing ? 'opacity-0 -translate-y-10' : 'opacity-100 translate-y-0'
            }`}
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            David Antúnez
          </h1>
          
          {/* Subtitle */}
          <p 
            className={`text-lg md:text-xl text-gray-400 mb-12 tracking-widest uppercase transition-all duration-700 delay-100 ${
              isRevealing ? 'opacity-0 -translate-y-10' : 'opacity-100 translate-y-0'
            }`}
          >
            Filmmaker & Visual Creator
          </p>
          
          {/* Discover Button - English */}
          <button
            onClick={handleDiscover}
            data-testid="discover-btn"
            className={`group relative px-10 py-4 border border-white/30 rounded-full text-white font-medium tracking-wider uppercase transition-all duration-500 hover:bg-white hover:text-black hover:border-white ${
              isRevealing ? 'opacity-0 scale-90' : 'opacity-100 scale-100'
            } ${!videoReady ? 'opacity-50 cursor-wait' : ''}`}
            disabled={!videoReady}
          >
            <span className="flex items-center gap-3">
              <Play className="w-5 h-5 group-hover:scale-110 transition-transform" />
              {videoReady ? 'Discover' : 'Loading...'}
            </span>
          </button>
          
          {/* Animated line */}
          <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2">
            <div className="w-px h-16 bg-gradient-to-b from-transparent via-white/50 to-transparent animate-pulse"></div>
          </div>
        </div>
      )}

      {/* Fullscreen YouTube Video Background - only visible when playing */}
      <div className={`absolute inset-0 w-full h-full transition-opacity duration-500 ${videoPlaying ? 'opacity-100' : 'opacity-0'}`}>
        {/* YouTube Video - Fullscreen 4K */}
        <div className="absolute inset-0 w-full h-full flex items-center justify-center z-[1]">
          <iframe
            id="hero-video"
            ref={iframeRef}
            src={`https://www.youtube.com/embed/${videoId}?mute=1&loop=1&playlist=${videoId}&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1&enablejsapi=1&vq=hd2160&iv_load_policy=3&disablekb=1&fs=0&cc_load_policy=0&origin=${window.location.origin}`}
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

      {/* Mute/Unmute Button - only show after splash */}
      {!showSplash && (
        <button
          onClick={toggleMute}
          data-testid="mute-toggle-btn"
          className={`absolute bottom-24 right-8 z-30 w-14 h-14 rounded-full flex items-center justify-center transition-all duration-500 border group
            ${highlightVolume 
              ? 'bg-white/40 border-white scale-110 shadow-lg shadow-white/30 animate-pulse' 
              : 'bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20'
            }`}
          aria-label={isMuted ? 'Unmute' : 'Mute'}
        >
          {isMuted ? (
            <VolumeX className={`w-6 h-6 text-white transition-transform ${highlightVolume ? 'scale-110' : 'group-hover:scale-110'}`} />
          ) : (
            <Volume2 className={`w-6 h-6 text-white transition-transform ${highlightVolume ? 'scale-110' : 'group-hover:scale-110'}`} />
          )}
        </button>
      )}

      {/* Scroll Indicator - only show after splash */}
      {!showSplash && (
        <div className="relative z-20 h-full flex flex-col items-center justify-center">
          <div 
            className={`absolute bottom-12 left-1/2 transform -translate-x-1/2 transition-all duration-700 ${
              waveArrow 
                ? 'scale-150 drop-shadow-[0_0_25px_rgba(255,255,100,1)]' 
                : 'animate-bounce'
            }`}
            style={{ transitionDelay: waveArrow ? '600ms' : '0ms' }}
          >
            <ChevronDown className={`w-10 h-10 drop-shadow-lg transition-all duration-700 ${
              waveArrow ? 'text-yellow-300' : 'text-white opacity-70'
            }`} 
            style={{
              filter: waveArrow ? 'drop-shadow(0 0 20px rgba(255, 255, 100, 0.9))' : 'none'
            }}
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default Hero;
