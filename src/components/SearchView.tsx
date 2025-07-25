import { useState, useMemo } from 'react';
import { Search, Play, Heart } from 'lucide-react';
import { songs, Song, formatTime } from '@/data/songs';
import { useMusicPlayer } from '@/hooks/useMusicPlayer';

interface SearchViewProps {
  onBack: () => void;
}

const SearchView = ({ onBack }: SearchViewProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const { playSong, currentSong, isPlaying } = useMusicPlayer();

  const filteredSongs = useMemo(() => {
    if (!searchQuery.trim()) return songs;
    
    const query = searchQuery.toLowerCase();
    return songs.filter(song => 
      song.title.toLowerCase().includes(query) ||
      song.artist.toLowerCase().includes(query) ||
      song.album.toLowerCase().includes(query) ||
      song.genre.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  const genres = useMemo(() => {
    const genreSet = new Set(songs.map(song => song.genre));
    return Array.from(genreSet);
  }, []);

  const handlePlaySong = (song: Song) => {
    playSong(song, filteredSongs);
  };

  return (
    <div className="min-h-screen p-8">
      {/* Header */}
      <div className="glass-panel p-8 mb-8">
        <div className="flex items-center gap-4 mb-6">
          <button 
            onClick={onBack}
            className="glass-control w-10 h-10 flex items-center justify-center hover:shadow-glow-aqua"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-glass">
              <path d="M19 12H5M12 19L5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          
          <h1 className="font-display text-4xl font-bold text-glass tracking-tight">
            Search Music
          </h1>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <div className="glass-control p-4 flex items-center gap-3">
            <Search size={20} className="text-glass/60" />
            <input
              type="text"
              placeholder="Search songs, artists, albums..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 bg-transparent text-glass placeholder-glass/60 outline-none text-lg"
            />
          </div>
        </div>
      </div>

      {/* Browse Genres */}
      {!searchQuery.trim() && (
        <div className="glass-panel p-6 mb-8">
          <h2 className="font-display text-2xl font-semibold text-glass mb-6">Browse Genres</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {genres.map(genre => (
              <button
                key={genre}
                onClick={() => setSearchQuery(genre)}
                className="glass-control p-6 text-center hover:shadow-glow-violet group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-neon-violet/10 scale-0 group-hover:scale-100 transition-transform duration-500 rounded-control" />
                <h3 className="font-medium text-glass group-hover:text-neon-violet transition-colors duration-300 relative z-10">
                  {genre}
                </h3>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Search Results */}
      <div className="glass-panel p-6">
        <h2 className="font-display text-2xl font-semibold text-glass mb-6">
          {searchQuery.trim() ? `Results for "${searchQuery}"` : 'All Songs'}
        </h2>
        
        {filteredSongs.length === 0 ? (
          <div className="text-center py-12">
            <Search size={48} className="text-glass/30 mx-auto mb-4" />
            <p className="text-glass/60 text-lg">No songs found</p>
            <p className="text-glass/40">Try searching for something else</p>
          </div>
        ) : (
          <div className="space-y-2">
            {filteredSongs.map((song) => (
              <div 
                key={song.id}
                className={`glass-control p-4 cursor-pointer group relative overflow-hidden transition-all duration-300 ${
                  currentSong?.id === song.id ? 'bg-neon-aqua/20 shadow-glow-aqua' : ''
                }`}
                onClick={() => handlePlaySong(song)}
              >
                {/* Ripple effect background */}
                <div className="absolute inset-0 bg-neon-aqua/10 scale-0 group-hover:scale-100 transition-transform duration-500 rounded-control" />
                
                <div className="flex items-center gap-4 relative z-10">
                  <div className="glass-panel p-2 w-12 h-12 flex items-center justify-center group-hover:shadow-glow-aqua transition-all duration-300">
                    <Play 
                      size={16} 
                      className={`text-glass ${currentSong?.id === song.id && isPlaying ? 'animate-glow-pulse' : ''}`}
                      fill="currentColor"
                    />
                  </div>

                  <div className="w-16 h-16 rounded-xl overflow-hidden">
                    <img 
                      src={song.coverUrl}
                      alt={song.album}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className={`font-medium truncate transition-colors duration-300 ${
                      currentSong?.id === song.id ? 'text-neon-aqua' : 'text-glass group-hover:text-neon-aqua'
                    }`}>
                      {song.title}
                    </h3>
                    <p className="text-glass/60 text-sm truncate">{song.artist} • {song.album}</p>
                    <p className="text-glass/40 text-xs">{song.genre} • {song.year}</p>
                  </div>

                  <div className="flex items-center gap-4">
                    <button className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Heart size={16} className="text-glass/60 hover:text-neon-violet transition-colors duration-300" />
                    </button>
                    
                    <span className="text-glass/60 text-sm min-w-12 text-right">
                      {formatTime(song.duration)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchView;