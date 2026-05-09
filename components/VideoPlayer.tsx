import React, { useEffect, useRef } from 'react';
import shaka from 'shaka-player/dist/shaka-player.ui.js';
import 'shaka-player/dist/controls.css';
import { VideoPlayerProps } from '../types';

const VideoPlayer: React.FC<VideoPlayerProps> = ({ src, poster }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<any>(null);
  const uiRef = useRef<any>(null);

  useEffect(() => {
    // Install polyfills
    shaka.polyfill.installAll();
    
    // Check if browser is supported
    if (!shaka.Player.isBrowserSupported()) {
      console.error('Browser not supported for Shaka Player!');
      return;
    }

    const initPlayer = async () => {
      const video = videoRef.current;
      const container = containerRef.current;
      if (!video || !container) return;

      const player = new shaka.Player(video);
      playerRef.current = player;
      
      const ui = new shaka.ui.Overlay(player, container, video);
      uiRef.current = ui;

      // Listen for error events
      player.addEventListener('error', onErrorEvent);

      try {
        await player.load(src);
      } catch (e) {
        onError(e);
      }
    };

    initPlayer();

    // Cleanup
    return () => {
      if (uiRef.current) {
        uiRef.current.destroy();
      }
      if (playerRef.current) {
        playerRef.current.destroy();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Only run once on mount

  // Watch for changes to 'src' properly
  useEffect(() => {
    const loadNewSource = async () => {
      if (playerRef.current) {
        try {
          await playerRef.current.load(src);
          // Optional: handle autoplay when channel changes
          const videoElement = videoRef.current;
          if (videoElement) {
             const playPromise = videoElement.play();
             if (playPromise !== undefined) {
               playPromise.catch((error) => {
                 console.log("Autoplay was prevented.", error);
               });
             }
          }
        } catch (e) {
          onError(e);
        }
      }
    };
    loadNewSource();
  }, [src]);

  const onErrorEvent = (event: any) => {
    onError(event.detail);
  };

  const onError = (error: any) => {
    console.error('Shaka Player Error code', error.code, 'object', error);
  };

  return (
    <div className="w-full h-full bg-black relative shadow-2xl overflow-hidden rounded-xl">
      <div ref={containerRef} className="w-full h-full object-contain">
        <video
          ref={videoRef}
          poster={poster}
          className="w-full h-full object-contain"
          autoPlay
          playsInline
          crossOrigin="anonymous"
        />
      </div>
    </div>
  );
};

export default VideoPlayer;
