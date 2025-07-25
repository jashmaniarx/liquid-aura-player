import { useState, useRef, useEffect, useCallback } from 'react';
import { Song } from '@/data/songs';

export type RepeatMode = 'off' | 'all' | 'one';

interface MusicPlayerState {
  currentSong: Song | null;
  isPlaying: boolean;
  currentTime: number;
  volume: number;
  isMuted: boolean;
  isShuffleOn: boolean;
  repeatMode: RepeatMode;
  queue: Song[];
  currentIndex: number;
}

export const useMusicPlayer = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [state, setState] = useState<MusicPlayerState>({
    currentSong: null,
    isPlaying: false,
    currentTime: 0,
    volume: 75,
    isMuted: false,
    isShuffleOn: false,
    repeatMode: 'off',
    queue: [],
    currentIndex: -1
  });

  // Initialize audio element
  useEffect(() => {
    const audio = new Audio();
    audioRef.current = audio;

    const handleTimeUpdate = () => {
      setState(prev => ({ ...prev, currentTime: audio.currentTime }));
    };

    const handleEnded = () => {
      handleNext();
    };

    const handleLoadedMetadata = () => {
      audio.volume = state.volume / 100;
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.pause();
    };
  }, []);

  // Update audio source when current song changes
  useEffect(() => {
    if (audioRef.current && state.currentSong) {
      audioRef.current.src = state.currentSong.audioUrl;
      audioRef.current.load();
    }
  }, [state.currentSong]);

  // Update volume when volume state changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = state.isMuted ? 0 : state.volume / 100;
    }
  }, [state.volume, state.isMuted]);

  const playSong = useCallback((song: Song, queue: Song[] = [song]) => {
    const songIndex = queue.findIndex(s => s.id === song.id);
    setState(prev => ({
      ...prev,
      currentSong: song,
      queue,
      currentIndex: songIndex !== -1 ? songIndex : 0,
      isPlaying: false
    }));
  }, []);

  const togglePlayPause = useCallback(() => {
    if (!audioRef.current || !state.currentSong) return;

    if (state.isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(console.error);
    }
    
    setState(prev => ({ ...prev, isPlaying: !prev.isPlaying }));
  }, [state.isPlaying, state.currentSong]);

  const handleNext = useCallback(() => {
    if (state.queue.length === 0) return;

    let nextIndex: number;

    if (state.repeatMode === 'one') {
      nextIndex = state.currentIndex;
    } else if (state.isShuffleOn) {
      nextIndex = Math.floor(Math.random() * state.queue.length);
    } else {
      nextIndex = state.currentIndex + 1;
      if (nextIndex >= state.queue.length) {
        nextIndex = state.repeatMode === 'all' ? 0 : state.currentIndex;
      }
    }

    if (nextIndex !== state.currentIndex || state.repeatMode === 'one') {
      const nextSong = state.queue[nextIndex];
      setState(prev => ({
        ...prev,
        currentSong: nextSong,
        currentIndex: nextIndex,
        currentTime: 0
      }));
    }
  }, [state.queue, state.currentIndex, state.isShuffleOn, state.repeatMode]);

  const handlePrevious = useCallback(() => {
    if (state.queue.length === 0) return;

    let prevIndex: number;

    if (state.currentTime > 3) {
      // If more than 3 seconds played, restart current song
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
      }
      setState(prev => ({ ...prev, currentTime: 0 }));
      return;
    }

    if (state.isShuffleOn) {
      prevIndex = Math.floor(Math.random() * state.queue.length);
    } else {
      prevIndex = state.currentIndex - 1;
      if (prevIndex < 0) {
        prevIndex = state.repeatMode === 'all' ? state.queue.length - 1 : 0;
      }
    }

    const prevSong = state.queue[prevIndex];
    setState(prev => ({
      ...prev,
      currentSong: prevSong,
      currentIndex: prevIndex,
      currentTime: 0
    }));
  }, [state.queue, state.currentIndex, state.currentTime, state.isShuffleOn, state.repeatMode]);

  const seekTo = useCallback((time: number) => {
    if (audioRef.current && state.currentSong) {
      audioRef.current.currentTime = time;
      setState(prev => ({ ...prev, currentTime: time }));
    }
  }, [state.currentSong]);

  const setVolume = useCallback((volume: number) => {
    setState(prev => ({ ...prev, volume: Math.max(0, Math.min(100, volume)) }));
  }, []);

  const toggleMute = useCallback(() => {
    setState(prev => ({ ...prev, isMuted: !prev.isMuted }));
  }, []);

  const toggleShuffle = useCallback(() => {
    setState(prev => ({ ...prev, isShuffleOn: !prev.isShuffleOn }));
  }, []);

  const toggleRepeat = useCallback(() => {
    setState(prev => ({
      ...prev,
      repeatMode: prev.repeatMode === 'off' ? 'all' : prev.repeatMode === 'all' ? 'one' : 'off'
    }));
  }, []);

  const addToQueue = useCallback((song: Song) => {
    setState(prev => ({
      ...prev,
      queue: [...prev.queue, song]
    }));
  }, []);

  const removeFromQueue = useCallback((index: number) => {
    setState(prev => {
      const newQueue = prev.queue.filter((_, i) => i !== index);
      let newCurrentIndex = prev.currentIndex;
      
      if (index < prev.currentIndex) {
        newCurrentIndex--;
      } else if (index === prev.currentIndex && newQueue.length > 0) {
        newCurrentIndex = Math.min(newCurrentIndex, newQueue.length - 1);
      }

      return {
        ...prev,
        queue: newQueue,
        currentIndex: newCurrentIndex,
        currentSong: newQueue[newCurrentIndex] || null
      };
    });
  }, []);

  return {
    ...state,
    duration: state.currentSong?.duration || 0,
    playSong,
    togglePlayPause,
    handleNext,
    handlePrevious,
    seekTo,
    setVolume,
    toggleMute,
    toggleShuffle,
    toggleRepeat,
    addToQueue,
    removeFromQueue
  };
};