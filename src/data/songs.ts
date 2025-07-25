export interface Song {
  id: string;
  title: string;
  artist: string;
  album: string;
  duration: number; // in seconds
  coverUrl: string;
  audioUrl: string;
  genre: string;
  year: number;
}

export interface Playlist {
  id: string;
  name: string;
  description: string;
  coverUrl: string;
  songs: Song[];
  isLiked?: boolean;
}

// Sample songs with realistic data
export const songs: Song[] = [
  {
    id: "1",
    title: "Liquid Dreams",
    artist: "Neon Waves",
    album: "Digital Horizons",
    duration: 204, // 3:24
    coverUrl: "/src/assets/album-cover.jpg",
    audioUrl: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav", // placeholder
    genre: "Electronic",
    year: 2024
  },
  {
    id: "2", 
    title: "Glass Reflections",
    artist: "Aurora Bass",
    album: "Transparent Souls",
    duration: 228, // 3:48
    coverUrl: "/src/assets/album-cover.jpg",
    audioUrl: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav",
    genre: "Ambient",
    year: 2024
  },
  {
    id: "3",
    title: "Synthwave Nights", 
    artist: "Cyber Echo",
    album: "Retro Future",
    duration: 252, // 4:12
    coverUrl: "/src/assets/album-cover.jpg", 
    audioUrl: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav",
    genre: "Synthwave",
    year: 2023
  },
  {
    id: "4",
    title: "Virtual Reality",
    artist: "Tech Minds", 
    album: "Digital Dreams",
    duration: 302, // 5:02
    coverUrl: "/src/assets/album-cover.jpg",
    audioUrl: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav",
    genre: "Techno",
    year: 2024
  },
  {
    id: "5",
    title: "Holographic Love",
    artist: "Crystal Wave",
    album: "Neon Hearts", 
    duration: 195, // 3:15
    coverUrl: "/src/assets/album-cover.jpg",
    audioUrl: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav",
    genre: "Pop Electronic",
    year: 2024
  },
  {
    id: "6",
    title: "Quantum Leap",
    artist: "Future Bass Collective",
    album: "Beyond Tomorrow",
    duration: 267, // 4:27
    coverUrl: "/src/assets/album-cover.jpg",
    audioUrl: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav",
    genre: "Future Bass", 
    year: 2023
  }
];

export const playlists: Playlist[] = [
  {
    id: "liked",
    name: "Liked Songs",
    description: "Your favorite tracks",
    coverUrl: "/src/assets/album-cover.jpg",
    songs: songs.slice(0, 3),
    isLiked: true
  },
  {
    id: "discover",
    name: "Discover Weekly", 
    description: "Fresh finds for you",
    coverUrl: "/src/assets/album-cover.jpg",
    songs: songs.slice(2, 6)
  },
  {
    id: "chill",
    name: "Chill Vibes",
    description: "Relax and unwind", 
    coverUrl: "/src/assets/album-cover.jpg",
    songs: [songs[1], songs[4], songs[0]]
  },
  {
    id: "workout",
    name: "High Energy",
    description: "Get pumped up",
    coverUrl: "/src/assets/album-cover.jpg", 
    songs: [songs[2], songs[3], songs[5]]
  }
];

export const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};