import { useState } from 'react';
import { Play, Heart, MoreHorizontal } from 'lucide-react';
import { Playlist, Song, formatTime } from '@/data/songs';
import { useMusicPlayer } from '@/hooks/useMusicPlayer';

interface PlaylistViewProps {
  playlist: Playlist;
  onBack: () => void;
}

const PlaylistView = ({ playlist, onBack }: PlaylistViewProps) => {
  const { playSong, currentSong, isPlaying } = useMusicPlayer();
  const [hoveredSong, setHoveredSong] = useState<string | null>(null);

  const handlePlayPlaylist = () => {
    if (playlist.songs.length > 0) {
      playSong(playlist.songs[0], playlist.songs);
    }
  };

  const handlePlaySong = (song: Song) => {
    playSong(song, playlist.songs);
  };

  return (
    <div className="min-h-screen p-8">
      {/* Header */}
      <div className="glass-panel p-8 mb-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-neon-aqua/20 via-transparent to-neon-violet/20 pointer-events-none" />
        
        <button 
          onClick={onBack}
          className="glass-control w-10 h-10 flex items-center justify-center mb-6 hover:shadow-glow-aqua"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-glass">
            <path d="M19 12H5M12 19L5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        <div className="flex items-end gap-6">
          <div className="glass-panel p-4 relative group">
            <img 
              src={playlist.coverUrl}
              alt={playlist.name}
              className="w-48 h-48 rounded-2xl object-cover shadow-glass-lg"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-glass-background/20 to-transparent transform -skew-x-12 group-hover:animate-glass-shimmer" />
          </div>
          
          <div>
            <p className="text-glass/70 text-sm mb-2">Playlist</p>
            <h1 className="font-display text-5xl font-bold text-glass mb-4 tracking-tight">
              {playlist.name}
            </h1>
            <p className="text-glass/80 text-lg mb-4">{playlist.description}</p>
            <p className="text-glass/60">{playlist.songs.length} songs</p>
          </div>
        </div>

        {/* Play Button */}
        <button 
          onClick={handlePlayPlaylist}
          className="glass-control w-16 h-16 flex items-center justify-center mt-8 hover:shadow-glow-aqua neon-glow"
        >
          <Play size={24} className="text-glass ml-1" fill="currentColor" />
        </button>
      </div>

      {/* Songs List */}
      <div className="glass-panel p-6">
        <div className="space-y-2">
          {playlist.songs.map((song, index) => (
            <div 
              key={song.id}
              className={`glass-control p-4 cursor-pointer group relative overflow-hidden transition-all duration-300 ${
                currentSong?.id === song.id ? 'bg-neon-aqua/20 shadow-glow-aqua' : ''
              }`}
              onMouseEnter={() => setHoveredSong(song.id)}
              onMouseLeave={() => setHoveredSong(null)}
              onClick={() => handlePlaySong(song)}
            >
              {/* Ripple effect background */}
              <div className="absolute inset-0 bg-neon-aqua/10 scale-0 group-hover:scale-100 transition-transform duration-500 rounded-control" />
              
              <div className="flex items-center gap-4 relative z-10">
                <div className="w-8 flex justify-center">
                  {hoveredSong === song.id || currentSong?.id === song.id ? (
                    <Play 
                      size={16} 
                      className={`text-glass ${currentSong?.id === song.id && isPlaying ? 'animate-glow-pulse' : ''}`}
                      fill="currentColor"
                    />
                  ) : (
                    <span className="text-glass/60 text-sm font-medium">{index + 1}</span>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className={`font-medium truncate transition-colors duration-300 ${
                    currentSong?.id === song.id ? 'text-neon-aqua' : 'text-glass group-hover:text-neon-aqua'
                  }`}>
                    {song.title}
                  </h3>
                  <p className="text-glass/60 text-sm truncate">{song.artist}</p>
                </div>

                <div className="hidden md:block text-glass/60 text-sm truncate max-w-32">
                  {song.album}
                </div>

                <div className="flex items-center gap-4">
                  <button className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Heart size={16} className="text-glass/60 hover:text-neon-violet transition-colors duration-300" />
                  </button>
                  
                  <span className="text-glass/60 text-sm min-w-12 text-right">
                    {formatTime(song.duration)}
                  </span>
                  
                  <button className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <MoreHorizontal size={16} className="text-glass/60 hover:text-glass transition-colors duration-300" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PlaylistView;