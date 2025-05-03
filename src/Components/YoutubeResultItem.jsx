import React, { useState, useRef } from 'react';
import Tippy from '@tippyjs/react'; 
import YouTube from 'react-youtube';
import 'tippy.js/dist/tippy.css';



export default function YoutubeResultItem({ video }){
    const [isPlaying, setIsPlaying] = useState(false);
    const opts = {
        height: '0',
        width: '0',
        playerVars: {
          autoplay: 1,
          controls: 0,
          disablekb: 1,
          fs: 0,
          modestbranding: 1,
          rel: 0
        },
      };
  
    const handlePlayPreview = () => {
        setIsPlaying(!isPlaying);
    };
  
    return (
      <li className="flex w-100 items-center gap-4 p-3 hover:bg-gray-100 rounded-lg transition-colors">
        {/* Thumbnail (using smallest available) */}
        <img 
          src={video.snippet.thumbnails.default.url} 
          alt={video.snippet.title}
          className="w-16 h-12 object-cover rounded"
        />
        
        {/* Video Info */}
        <Tippy content={video.snippet.title} delay={[300, 0]} interactive={true}>
        <h3 className="text-sm font-medium truncate">{video.snippet.title}</h3>
      </Tippy>

        
        {/* Audio Preview Button */}
        <div className="flex items-center text-gray-400 hover:text-blue-500 focus:outline-none h-5 w-6" aria-label={isPlaying ? 'Stop preview' : 'Play preview'} onClick={handlePlayPreview}>
          <span className={`wave-bar ${isPlaying ? 'animate-wave' : ''}`}></span>
          <span className={`wave-bar ${isPlaying ? 'animate-wave' : ''}`} style={{ animationDelay: '0.2s' }}></span>
          <span className={`wave-bar ${isPlaying ? 'animate-wave' : ''}`} style={{ animationDelay: '0.4s' }}></span>
          <span className={`wave-bar ${isPlaying ? 'animate-wave' : ''}`} style={{ animationDelay: '0.2s' }}></span>
          <span className={`wave-bar ${isPlaying ? 'animate-wave' : ''}`} style={{ animationDelay: '0.4s' }}></span>
        </div>
        <button className='ml-auto bg-blue-500 text-white rounded-full text-xs hover:bg-blue-600 transition-colors'>Request</button>
        
        {/* Hidden audio element */}
        {isPlaying && (
        <div className="youtube-preview">
          <YouTube
            videoId={video.id.videoId}
            opts={opts}
            onEnd={() => setIsPlaying(false)} // Stop playing when the video ends
          />
        </div>
      )}
      </li>
    );
  };    