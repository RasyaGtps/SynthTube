import { FaTimes } from 'react-icons/fa';
import ReactPlayer from 'react-player';

interface Video {
  videoId: string;
  title: string;
  channelName: string;
  link: string;
}

interface VideoPlayerProps {
  video: Video;
  onClose: () => void;
}

export default function VideoPlayer({ video, onClose }: VideoPlayerProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
      <div className="relative w-full max-w-5xl">
        <button 
          onClick={onClose}
          className="absolute -top-12 right-0 text-white p-2 rounded-full hover:text-[var(--primary)]"
        >
          <FaTimes size={24} />
        </button>
        <div className="aspect-video w-full">
          <ReactPlayer
            url={video.link}
            width="100%"
            height="100%"
            controls
            playing
            config={{
              youtube: {
                playerVars: {
                  modestbranding: 1,
                  rel: 0
                }
              }
            }}
          />
        </div>
        <h2 className="text-xl font-bold mt-4">{video.title}</h2>
        <p className="text-sm text-gray-400">{video.channelName}</p>
      </div>
    </div>
  );
}