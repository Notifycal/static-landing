import { useState, type JSX } from 'react';
import { Play } from 'react-feather';
import YouTube from 'react-youtube';

interface VideoComponentProps {
  height: string | number;
  width: string | number;
  src: string;
  title: string;
  videoId: string;
  videoHeight: string;
  videoWidth: string;
}

const VideoComponent = ({
  height,
  width,
  src,
  title,
  videoId,
  videoHeight,
  videoWidth
}: VideoComponentProps): JSX.Element => {
  const [play, setPlay] = useState<boolean>(false);
  const videoOptions = {
    borderRadius: '16px',
    playerVars: {
      autoplay: 1
    }
  };

  return (
    <>
      {!play ? (
        <div className="relative text-center">
          <button
            aria-label="play"
            className="video-play-btn"
            onClick={() => {
              setPlay(true);
            }}
          >
            <Play />
          </button>
          <img alt={title} className="inline h-auto max-w-full rounded-2xl" height={height} src={src} width={width} />
        </div>
      ) : (
        <div className="youtube mx-auto text-center">
          <YouTube
            iframeClassName={`  aspect-video ${videoHeight} ${videoWidth} max-w-full bg-transparent rounded-2xl`}
            opts={videoOptions}
            videoId={videoId}
          />
        </div>
      )}
    </>
  );
};

export default VideoComponent;
