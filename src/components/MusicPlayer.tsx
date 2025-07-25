import { useState } from 'react';
import { Search, Home, Library, Plus } from 'lucide-react';
import { playlists } from '@/data/songs';
import { useMusicPlayer } from '@/hooks/useMusicPlayer';
import PlaylistView from './PlaylistView';
import SearchView from './SearchView';
import MusicPlayerControls from './MusicPlayerControls';

type View = 'home' | 'search' | 'library' | 'playlist';

const MusicPlayer = () => {
  const [currentView, setCurrentView] = useState<View>('home');
  const [selectedPlaylistId, setSelectedPlaylistId] = useState<string>('');
  const { playSong } = useMusicPlayer();

  const selectedPlaylist = playlists.find(p => p.id === selectedPlaylistId);

  const handlePlaylistSelect = (playlistId: string) => {
    setSelectedPlaylistId(playlistId);
    setCurrentView('playlist');
  };

  const handleBackToHome = () => {
    setCurrentView('home');
    setSelectedPlaylistId('');
  };

  const renderView = () => {
    switch (currentView) {
      case 'search':
        return <SearchView onBack={handleBackToHome} />;
      case 'playlist':
        if (selectedPlaylist) {
          return <PlaylistView playlist={selectedPlaylist} onBack={handleBackToHome} />;
        }
        return renderHomeView();
      default:
        return renderHomeView();
    }
  };

  const renderHomeView = () => (
    <div className="min-h-screen p-8 pb-32">
      {/* Floating Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-neon-aqua/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-neon-violet/10 rounded-full blur-3xl animate-float" style={{animationDelay: '2s'}} />
      </div>

      {/* Header */}
      <div className="glass-panel p-8 mb-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-neon-aqua/20 via-transparent to-neon-violet/20 pointer-events-none" />
        <div className="relative z-10">
          <h1 className="font-display text-5xl font-bold text-glass mb-2 tracking-tight">
            LQD Music
          </h1>
          <p className="text-glass/70 text-xl">Liquid Glass Experience</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <button 
          onClick={() => setCurrentView('search')}
          className="glass-control p-6 text-center hover:shadow-glow-aqua group relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-neon-aqua/10 scale-0 group-hover:scale-100 transition-transform duration-500 rounded-control" />
          <Search size={32} className="mx-auto mb-3 text-glass group-hover:text-neon-aqua transition-colors duration-300" />
          <p className="font-medium text-glass group-hover:text-neon-aqua transition-colors duration-300">Search</p>
        </button>

        <button className="glass-control p-6 text-center hover:shadow-glow-violet group relative overflow-hidden">
          <div className="absolute inset-0 bg-neon-violet/10 scale-0 group-hover:scale-100 transition-transform duration-500 rounded-control" />
          <Library size={32} className="mx-auto mb-3 text-glass group-hover:text-neon-violet transition-colors duration-300" />
          <p className="font-medium text-glass group-hover:text-neon-violet transition-colors duration-300">Library</p>
        </button>

        <button className="glass-control p-6 text-center hover:shadow-glow-aqua group relative overflow-hidden">
          <div className="absolute inset-0 bg-neon-aqua/10 scale-0 group-hover:scale-100 transition-transform duration-500 rounded-control" />
          <Plus size={32} className="mx-auto mb-3 text-glass group-hover:text-neon-aqua transition-colors duration-300" />
          <p className="font-medium text-glass group-hover:text-neon-aqua transition-colors duration-300">Create</p>
        </button>

        <button className="glass-control p-6 text-center hover:shadow-glow-violet group relative overflow-hidden">
          <div className="absolute inset-0 bg-neon-violet/10 scale-0 group-hover:scale-100 transition-transform duration-500 rounded-control" />
          <Home size={32} className="mx-auto mb-3 text-glass group-hover:text-neon-violet transition-colors duration-300" />
          <p className="font-medium text-glass group-hover:text-neon-violet transition-colors duration-300">Home</p>
        </button>
      </div>

      {/* Featured Playlists */}
      <div className="glass-panel p-8">
        <h2 className="font-display text-3xl font-semibold text-glass mb-8 tracking-tight">
          Your Playlists
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {playlists.map((playlist) => (
            <div 
              key={playlist.id}
              className="glass-control p-6 cursor-pointer group relative overflow-hidden hover:shadow-glow-aqua transition-all duration-300"
              onClick={() => handlePlaylistSelect(playlist.id)}
            >
              {/* Ripple effect background */}
              <div className="absolute inset-0 bg-neon-aqua/10 scale-0 group-hover:scale-100 transition-transform duration-500 rounded-control" />
              
              <div className="relative z-10">
                <div className="glass-panel p-3 mb-4 w-fit relative group-hover:shadow-glow-aqua transition-all duration-300">
                  <img 
                    src={playlist.coverUrl}
                    alt={playlist.name}
                    className="w-24 h-24 rounded-2xl object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-glass-background/20 to-transparent transform -skew-x-12 group-hover:animate-glass-shimmer" />
                </div>
                
                <h3 className="font-display text-xl font-semibold text-glass mb-2 group-hover:text-neon-aqua transition-colors duration-300">
                  {playlist.name}
                </h3>
                <p className="text-glass/70 mb-3">{playlist.description}</p>
                <p className="text-glass/50 text-sm">{playlist.songs.length} songs</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recently Played */}
      <div className="glass-panel p-8 mt-8">
        <h2 className="font-display text-3xl font-semibold text-glass mb-8 tracking-tight">
          Quick Play
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {playlists.slice(0, 4).map((playlist) => (
            <div 
              key={`quick-${playlist.id}`}
              className="glass-control p-4 cursor-pointer group flex items-center gap-4 hover:shadow-glow-violet relative overflow-hidden"
              onClick={() => {
                if (playlist.songs.length > 0) {
                  playSong(playlist.songs[0], playlist.songs);
                }
              }}
            >
              <div className="absolute inset-0 bg-neon-violet/10 scale-0 group-hover:scale-100 transition-transform duration-500 rounded-control" />
              
              <div className="w-16 h-16 rounded-xl overflow-hidden shadow-glass relative z-10">
                <img 
                  src={playlist.coverUrl}
                  alt={playlist.name}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="flex-1 min-w-0 relative z-10">
                <h3 className="font-medium text-glass group-hover:text-neon-violet transition-colors duration-300 truncate">
                  {playlist.name}
                </h3>
                <p className="text-glass/60 text-sm truncate">{playlist.songs.length} songs</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen relative">
      {renderView()}
      <MusicPlayerControls />
    </div>
  );
};

export default MusicPlayer;