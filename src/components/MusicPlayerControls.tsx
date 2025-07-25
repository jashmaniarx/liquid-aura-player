import { useState, useRef } from 'react';
import { Play, Pause, SkipBack, SkipForward, Shuffle, Repeat, Volume2, VolumeX } from 'lucide-react';
import { useMusicPlayer } from '@/hooks/useMusicPlayer';
import { formatTime } from '@/data/songs';

const MusicPlayerControls = () => {
  const {
    currentSong,
    isPlaying,
    currentTime,
    duration,
    volume,
    isMuted,
    isShuffleOn,
    repeatMode,
    togglePlayPause,
    handleNext,
    handlePrevious,
    seekTo,
    setVolume,
    toggleMute,
    toggleShuffle,
    toggleRepeat
  } = useMusicPlayer();

  const [isDraggingProgress, setIsDraggingProgress] = useState(false);
  const [isDraggingVolume, setIsDraggingVolume] = useState(false);
  const progressRef = useRef<HTMLDivElement>(null);
  const volumeRef = useRef<HTMLDivElement>(null);

  if (!currentSong) {
    return null;
  }

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  const handleProgressClick = (e: React.MouseEvent) => {
    if (progressRef.current) {
      const rect = progressRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const percentage = (x / rect.width) * 100;
      const newTime = (percentage / 100) * duration;
      seekTo(newTime);
    }
  };

  const handleVolumeClick = (e: React.MouseEvent) => {
    if (volumeRef.current) {
      const rect = volumeRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const percentage = (x / rect.width) * 100;
      setVolume(Math.max(0, Math.min(100, percentage)));
    }
  };

  const handleProgressDrag = (e: React.MouseEvent) => {
    if (isDraggingProgress && progressRef.current) {
      const rect = progressRef.current.getBoundingClientRect();
      const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
      const percentage = (x / rect.width) * 100;
      const newTime = (percentage / 100) * duration;
      seekTo(newTime);
    }
  };

  const handleVolumeDrag = (e: React.MouseEvent) => {
    if (isDraggingVolume && volumeRef.current) {
      const rect = volumeRef.current.getBoundingClientRect();
      const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
      const percentage = (x / rect.width) * 100;
      setVolume(percentage);
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 glass-panel m-4 p-6 z-50">
      <div className="flex items-center gap-6">
        {/* Song Info */}
        <div className="flex items-center gap-4 min-w-0 flex-1">
          <div className="w-16 h-16 rounded-xl overflow-hidden shadow-glass">
            <img 
              src={currentSong.coverUrl}
              alt={currentSong.album}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="min-w-0">
            <h3 className="font-medium text-glass truncate">{currentSong.title}</h3>
            <p className="text-glass/60 text-sm truncate">{currentSong.artist}</p>
          </div>
        </div>

        {/* Main Controls */}
        <div className="flex flex-col items-center gap-4 flex-1 max-w-lg">
          <div className="flex items-center gap-4">
            <button 
              className="glass-control w-10 h-10 flex items-center justify-center hover:shadow-glow-aqua transition-all duration-300"
              onClick={toggleShuffle}
            >
              <Shuffle 
                size={16} 
                className={`text-glass transition-colors duration-300 ${isShuffleOn ? 'text-neon-aqua' : ''}`} 
              />
            </button>

            <button 
              className="glass-control w-12 h-12 flex items-center justify-center hover:shadow-glow-aqua"
              onClick={handlePrevious}
            >
              <SkipBack size={18} className="text-glass" />
            </button>

            <button 
              className="glass-control w-14 h-14 flex items-center justify-center hover:shadow-glow-aqua neon-glow"
              onClick={togglePlayPause}
            >
              {isPlaying ? (
                <Pause size={20} className="text-glass" />
              ) : (
                <Play size={20} className="text-glass ml-1" />
              )}
            </button>

            <button 
              className="glass-control w-12 h-12 flex items-center justify-center hover:shadow-glow-aqua"
              onClick={handleNext}
            >
              <SkipForward size={18} className="text-glass" />
            </button>

            <button 
              className="glass-control w-10 h-10 flex items-center justify-center hover:shadow-glow-aqua transition-all duration-300"
              onClick={toggleRepeat}
            >
              <Repeat 
                size={16} 
                className={`text-glass transition-colors duration-300 ${repeatMode !== 'off' ? 'text-neon-violet' : ''}`} 
              />
            </button>
          </div>

          {/* Progress Bar */}
          <div className="flex items-center gap-3 w-full">
            <span className="text-glass/60 text-xs min-w-10 text-right">
              {formatTime(currentTime)}
            </span>
            <div 
              ref={progressRef}
              className="flex-1 progress-track h-2 relative cursor-pointer group"
              onClick={handleProgressClick}
              onMouseDown={() => setIsDraggingProgress(true)}
              onMouseMove={handleProgressDrag}
              onMouseUp={() => setIsDraggingProgress(false)}
              onMouseLeave={() => setIsDraggingProgress(false)}
            >
              <div 
                className="progress-fill h-full rounded-capsule transition-all duration-150"
                style={{ width: `${progress}%` }}
              />
              <div 
                className="absolute top-1/2 w-3 h-3 bg-neon-aqua rounded-full transform -translate-y-1/2 shadow-glow-aqua opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ left: `calc(${progress}% - 6px)` }}
              />
            </div>
            <span className="text-glass/60 text-xs min-w-10">
              {formatTime(duration)}
            </span>
          </div>
        </div>

        {/* Volume Control */}
        <div className="flex items-center gap-3 flex-1 justify-end">
          <button 
            onClick={toggleMute}
            className="glass-control w-10 h-10 flex items-center justify-center hover:shadow-glow-aqua"
          >
            {isMuted || volume === 0 ? (
              <VolumeX size={16} className="text-glass" />
            ) : (
              <Volume2 size={16} className="text-glass" />
            )}
          </button>
          <div className="w-24">
            <div 
              ref={volumeRef}
              className="progress-track h-2 relative cursor-pointer group"
              onClick={handleVolumeClick}
              onMouseDown={() => setIsDraggingVolume(true)}
              onMouseMove={handleVolumeDrag}
              onMouseUp={() => setIsDraggingVolume(false)}
              onMouseLeave={() => setIsDraggingVolume(false)}
            >
              <div 
                className="progress-fill h-full rounded-capsule"
                style={{ width: `${isMuted ? 0 : volume}%` }}
              />
              <div 
                className="absolute top-1/2 w-3 h-3 bg-neon-soft rounded-full transform -translate-y-1/2 shadow-glow-aqua opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ left: `calc(${isMuted ? 0 : volume}% - 6px)` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MusicPlayerControls;