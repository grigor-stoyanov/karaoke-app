import React, { useState, useEffect} from 'react';
import Tippy from '@tippyjs/react';
import YouTube from 'react-youtube';
import './YoutubeResultItem.css';
import 'tippy.js/dist/tippy.css';



export default function YoutubeResultItem({ video, activeVideoId, setActiveVideoId,setQueue }) {
  const isActive = activeVideoId === video.id.videoId;
  const [isBuffering, setIsBuffering] = useState(false);
  const [playbackError, setPlaybackError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const opts = {
    height: '0',
    width: '0',
    playerVars: {
      start: 30,
      end: 60,
      autoplay: 1,
      controls: 1,
      disablekb: 0,
      fs: 0,
      modestbranding: 1,
      rel: 0
    },
  };

  const handlePlayPreview = (videoId) => {
    setActiveVideoId(prev => (prev === videoId ? null : videoId));
  };

  const handlePlaybackError = (event) => {
    const errorCode = event.data;

    let message = 'An error occurred while trying to play the preview.';
    switch (errorCode) {
      case 2:
        message = 'Invalid video ID.';
        break;
      case 5:
        message = 'Playback error due to the embedded player.';
        break;
      case 100:
        message = 'This video is unavailable or private.';
        break;
      case 101:
      case 150:
        message = 'The video owner has disabled embedding.';
        break;
    }
    setPlaybackError(true);
    setIsBuffering(false);
    setErrorMessage(message);
  };
  useEffect(() => {
    if (activeVideoId) {
      setIsBuffering(true);
    } else {
      setIsBuffering(false);
    }
  }, [activeVideoId]);
  

  return (
    <li className="flex items-center justify-items-center align-items-center gap-4 p-3 hover:bg-gray-100 rounded-lg transition-colors">
      {/* Thumbnail (using smallest available) */}
      <img
        src={video.snippet.thumbnails.default.url}
        alt={video.snippet.title}
        className="w-16 h-12 object-cover rounded"
      />

      {/* Video Info */}
      <div className="flex flex-col flex-grow min-w-0">
      <Tippy content={video.snippet.title} zIndex={9999} delay={[300, 0]} placement='top' interactive={true}>
        <h3 className="text-sm font-medium truncate cursor-pointer">{video.snippet.title}</h3>
      </Tippy>
      
      {playbackError && isActive && (
          <div className="error-message">⚠ {errorMessage}</div>
        )}

      </div>
      {/* Audio Preview Button */}
      <div className="flex items-center text-gray-400 hover:text-blue-500 focus:outline-none h-5 w-6" aria-label={isActive ? 'Stop preview' : 'Play preview'}
       onClick={(e)=>handlePlayPreview(video.id.videoId)}>

        {[0, 0.2, 0.4, 0.2, 0.4].map((delay, i) => (
          <span
            key={i}
            className={`wave-bar ${
              playbackError && isActive
                ? 'wave-error'
                : isBuffering && isActive
                ? 'animate-buffering buffering-bar'
                : isActive
                ? 'animate-wave'
                : ''
            }`}
            style={
              isActive && !isBuffering && !playbackError
                ? { animationDelay: `${delay}s` }
                : {}
            }   
          ></span>
        ))}
      </div>
      <button onClick={()=>setQueue((prev)=>[...prev,video.snippet.title])} className='ml-auto bg-blue-500 text-white rounded-full text-xs hover:bg-blue-600 transition-colors'>Request</button>

      {/* Hidden audio element */}
      {activeVideoId === video.id.videoId && (
        <div className="youtube-preview">
          <YouTube
            videoId={video.id.videoId}
            opts={opts}
            onPlay={() => {
              setIsBuffering(false);
            }}
            onEnd={() => {setIsBuffering(false);}}
            onError={handlePlaybackError}
            onStateChange={(event) => {
              if (event.data === 3) { 
                setIsBuffering(true);
              } else if (event.data !== 1) { 
                setIsBuffering(false);
              }else{
                setIsBuffering(false);
              }
            }}
          />
        </div>
      )}  
    </li>
  );
};    