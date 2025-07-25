import { useState } from 'react';
import { Play, Pause, SkipBack, SkipForward, Shuffle, Repeat, Volume2 } from 'lucide-react';
import albumCover from '@/assets/album-cover.jpg';

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(42);
  const [volume, setVolume] = useState(75);
  const [isShuffleOn, setIsShuffleOn] = useState(false);
  const [repeatMode, setRepeatMode] = useState('off'); // 'off', 'all', 'one'

  const song = {
    title: "Liquid Dreams",
    artist: "Neon Waves",
    album: "Digital Horizons",
    duration: "3:24",
    currentTime: "1:26"
  };

  const queue = [
    { title: "Synthwave Nights", artist: "Cyber Echo", duration: "4:12" },
    { title: "Glass Reflections", artist: "Aurora Bass", duration: "3:48" },
    { title: "Virtual Reality", artist: "Tech Minds", duration: "5:02" }
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 relative overflow-hidden">
      {/* Floating Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-neon-aqua/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-neon-violet/10 rounded-full blur-3xl animate-float" style={{animationDelay: '2s'}} />
      </div>

      {/* Main Player Container */}
      <div className="glass-panel w-full max-w-md p-8 animate-float relative z-10">
        
        {/* Album Artwork */}
        <div className="relative mb-8 group">
          <div className="glass-panel p-4 mx-auto w-fit relative overflow-hidden">
            <img 
              src={albumCover}
              alt={`${song.album} cover`}
              className="w-72 h-72 rounded-2xl object-cover shadow-glass-lg"
            />
            {/* Shimmer Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-glass-background/20 to-transparent transform -skew-x-12 group-hover:animate-glass-shimmer" />
          </div>
        </div>

        {/* Song Info */}
        <div className="text-center mb-8">
          <h1 className="font-display text-3xl font-semibold text-glass mb-2 tracking-tight">
            {song.title}
          </h1>
          <p className="text-glass/70 text-lg mb-1">{song.artist}</p>
          <p className="text-glass/50 text-sm">{song.album}</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="progress-track h-2 mb-3 relative cursor-pointer group">
            <div 
              className="progress-fill h-full rounded-capsule transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
            <div 
              className="absolute top-1/2 w-4 h-4 bg-neon-aqua rounded-full transform -translate-y-1/2 shadow-glow-aqua opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ left: `calc(${progress}% - 8px)` }}
            />
          </div>
          <div className="flex justify-between text-glass/60 text-sm">
            <span>{song.currentTime}</span>
            <span>{song.duration}</span>
          </div>
        </div>

        {/* Main Controls */}
        <div className="flex items-center justify-center gap-6 mb-8">
          <button 
            className="glass-control w-12 h-12 flex items-center justify-center hover:shadow-glow-aqua transition-all duration-300"
            onClick={() => setIsShuffleOn(!isShuffleOn)}
          >
            <Shuffle 
              size={20} 
              className={`text-glass transition-colors duration-300 ${isShuffleOn ? 'text-neon-aqua' : ''}`} 
            />
          </button>

          <button className="glass-control w-16 h-16 flex items-center justify-center hover:shadow-glow-aqua">
            <SkipBack size={24} className="text-glass" />
          </button>

          <button 
            className="glass-control w-20 h-20 flex items-center justify-center hover:shadow-glow-aqua neon-glow"
            onClick={() => setIsPlaying(!isPlaying)}
          >
            {isPlaying ? (
              <Pause size={32} className="text-glass" />
            ) : (
              <Play size={32} className="text-glass ml-1" />
            )}
          </button>

          <button className="glass-control w-16 h-16 flex items-center justify-center hover:shadow-glow-aqua">
            <SkipForward size={24} className="text-glass" />
          </button>

          <button 
            className="glass-control w-12 h-12 flex items-center justify-center hover:shadow-glow-aqua transition-all duration-300"
            onClick={() => setRepeatMode(repeatMode === 'off' ? 'all' : repeatMode === 'all' ? 'one' : 'off')}
          >
            <Repeat 
              size={20} 
              className={`text-glass transition-colors duration-300 ${repeatMode !== 'off' ? 'text-neon-violet' : ''}`} 
            />
          </button>
        </div>

        {/* Volume Control */}
        <div className="flex items-center gap-4 mb-8">
          <Volume2 size={20} className="text-glass/70" />
          <div className="flex-1 progress-track h-2 relative cursor-pointer group">
            <div 
              className="progress-fill h-full rounded-capsule"
              style={{ width: `${volume}%` }}
            />
            <div 
              className="absolute top-1/2 w-3 h-3 bg-neon-soft rounded-full transform -translate-y-1/2 shadow-glow-aqua opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ left: `calc(${volume}% - 6px)` }}
            />
          </div>
        </div>
      </div>

      {/* Now Playing Queue */}
      <div className="glass-panel w-full max-w-md mt-6 p-6 relative z-10">
        <h3 className="font-display text-lg font-semibold text-glass mb-4">Up Next</h3>
        <div className="space-y-3">
          {queue.map((track, index) => (
            <div key={index} className="glass-control p-4 hover:bg-glass-background/20 cursor-pointer group">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-glass font-medium text-sm group-hover:text-neon-aqua transition-colors duration-300">
                    {track.title}
                  </p>
                  <p className="text-glass/60 text-xs">{track.artist}</p>
                </div>
                <span className="text-glass/50 text-xs">{track.duration}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;