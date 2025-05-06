
import YouTube from 'react-youtube';

export default function YoutubeVideoElement({setErrorMessage,setIsBuffering,setPlaybackError,video}) {
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

    return (
        <div className="youtube-preview">
            <YouTube
                videoId={video.id.videoId}
                opts={opts}
                onPlay={() => {
                    setIsBuffering(false);
                }}
                onEnd={() => { setIsBuffering(false); }}
                onError={handlePlaybackError}
                onStateChange={(event) => {
                    if (event.data === 3) {
                        setIsBuffering(true);
                    } else if (event.data !== 1) {
                        setIsBuffering(false);
                    } else {
                        setIsBuffering(false);
                    }
                }}
            />
        </div>
    )
}