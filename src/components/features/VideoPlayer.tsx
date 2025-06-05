import ReactPlayer from "react-player";
import { useRef, useState } from "react";

interface VideoPlayerProps {
  videoId: string;
  onTimeUpdate?: (time: number) => void;
  initialTime?: number;
}

export default function VideoPlayer({
  videoId,
  onTimeUpdate,
  initialTime = 0,
}: VideoPlayerProps) {
  const playerRef = useRef<ReactPlayer>(null);
  const [isReady, setIsReady] = useState(false);

  const handleProgress = (state: { playedSeconds: number }) => {
    onTimeUpdate?.(state.playedSeconds);
  };

  const handleReady = () => {
    setIsReady(true);
    if (initialTime > 0 && playerRef.current) {
      playerRef.current.seekTo(initialTime, "seconds");
    }
  };

  return (
    <div className="aspect-video bg-black rounded-lg overflow-hidden">
      <ReactPlayer
        ref={playerRef}
        url={`https://www.youtube.com/watch?v=${videoId}`}
        width="100%"
        height="100%"
        controls
        playing={isReady}
        onProgress={handleProgress}
        onReady={handleReady}
        config={{
          youtube: {
            playerVars: {
              modestbranding: 1,
              rel: 0,
            },
          },
        }}
      />
    </div>
  );
} 