import React, { useState } from 'react';
import { ChannelItemProps } from '../types';
import { Play } from 'lucide-react';

const ChannelItem: React.FC<ChannelItemProps> = ({ channel, isActive, onClick }) => {
  const [imgError, setImgError] = useState(false);

  // Reset error state if logo url changes
  React.useEffect(() => {
    setImgError(false);
  }, [channel.logo]);

  return (
    <button
      onClick={() => onClick(channel)}
      title={channel.name}
      className={`
        relative group w-full aspect-square flex items-center justify-center
        rounded-full transition-all duration-300 ease-out
        border-[3px] bg-white overflow-hidden shadow-sm
        ${isActive 
          ? 'border-red-600 shadow-[0_0_20px_rgba(220,38,38,0.5)] scale-105 z-10' 
          : 'border-emerald-500 hover:border-emerald-400 hover:scale-105 hover:shadow-[0_0_20px_rgba(16,185,129,0.5)]'
        }
      `}
    >
      {/* Active Live Indicator Badge - Positioned absolutely at bottom */}
      {isActive && (
        <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1 bg-black/90 px-2 py-0.5 rounded-full border border-red-500/30 shadow-md">
           <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-red-600"></span>
           </span>
           <span className="text-[7px] font-black text-white tracking-widest animate-pulse leading-none">
             LIVE
           </span>
        </div>
      )}

      {/* Logo Container */}
      <div className="absolute inset-0 flex items-center justify-center">
        {channel.logo && !imgError ? (
          <img 
            src={channel.logo} 
            alt={channel.name} 
            className="max-w-[95%] max-h-[95%] w-auto h-auto object-contain drop-shadow-sm select-none"
            onError={() => setImgError(true)}
            loading="lazy"
            referrerPolicy="no-referrer"
          />
        ) : (
          /* Fallback for missing logo */
          <div className="flex flex-col items-center justify-center text-black w-full h-full px-2">
            <span className="font-black text-[10px] sm:text-[11px] uppercase text-center leading-tight break-words line-clamp-2">
              {channel.name}
            </span>
          </div>
        )}
      </div>
      
      {/* Hover Overlay - Only show when NOT active */}
      {!isActive && (
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40 backdrop-blur-[1px] z-20">
           <Play className="text-white fill-white drop-shadow-lg" size={28} />
        </div>
      )}
    </button>
  );
};

export default ChannelItem;