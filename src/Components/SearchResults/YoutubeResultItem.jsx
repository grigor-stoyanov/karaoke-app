import React, { useState, useEffect } from 'react';
import Tippy from '@tippyjs/react';
import './YoutubeResultItem.css';
import 'tippy.js/dist/tippy.css';
import YoutubeVideoElement from '../Util/YoutubeVideoElement';
import ModalElement from '../Util/ModalElement';



export default function YoutubeResultItem({ video, activeVideoId, setActiveVideoId, setRequests }) {
  const isActive = activeVideoId === video.id.videoId;
  const [isBuffering, setIsBuffering] = useState(false);
  const [playbackError, setPlaybackError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isModalOpen, setModalOpen] = useState(false);

  const handlePlayPreview = (videoId) => {
    setActiveVideoId(prev => (prev === videoId ? null : videoId));
  };
  const submitRequestHandler = () => {
    setRequests((prev) => {
      const exists = prev.some((req) => req === video.snippet.title);
      return exists ? prev : [...prev, video.snippet.title];
    })
  }


  useEffect(() => {
    if (activeVideoId) {
      setIsBuffering(true);
    } else {
      setIsBuffering(false);
    }
  }, [activeVideoId]);


  return (
    <li className="flex items-center justify-items-center align-items-center gap-4 w-full p-1 hover:bg-gray-100 rounded-lg transition-colors">
      {/* Thumbnail (using smallest available) */}
      <img
        src={video.snippet.thumbnails.default.url}
        alt={video.snippet.title}
        className="w-16 h-12 object-cover rounded cursor-pointer"
        onClick={() => setModalOpen(true)}
      />
      {/* Modal */}
      {isModalOpen && <ModalElement link={`https://www.youtube.com/watch?v=${video.id.videoId}`} print={false} source={video.snippet.thumbnails.high.url} alt={video.snippet.title} setModalOpen={setModalOpen} />}
      {/* Video Info */}
      <div className="flex flex-col flex-grow min-w-0">
        <Tippy content={video.snippet.title} zIndex={9999} delay={[300, 0]} placement='top' interactive={true}>
          <h3 className="text-sm font-medium truncate cursor-pointer">{video.snippet.title}</h3>
        </Tippy>

        {playbackError && isActive && (
          <div className="error-message pointer-events-none">⚠ {errorMessage}</div>
        )}

      </div>
      {/* Audio Preview Button */}
      <div className="flex items-center text-gray-400 hover:text-blue-500 focus:outline-none h-5 w-6" aria-label={isActive ? 'Stop preview' : 'Play preview'}
        onClick={(e) => handlePlayPreview(video.id.videoId)}>

        {[0, 0.2, 0.4, 0.2, 0.4].map((delay, i) => (
          <span
            key={i}
            className={`wave-bar ${playbackError && isActive
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
      <button onClick={submitRequestHandler} className='ml-auto bg-blue-500 text-white rounded-full text-xs hover:bg-blue-600 transition-colors'>Request</button>

      {/* Hidden video element */}
      {activeVideoId === video.id.videoId &&
        <YoutubeVideoElement playbackError={playbackError} setPlaybackError={setPlaybackError} video={video} setErrorMessage={setErrorMessage} setIsBuffering={setIsBuffering} />}
    </li>
  );
};    