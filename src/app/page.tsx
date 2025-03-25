'use client';

import { useState, useEffect, lazy, Suspense, useCallback, useRef } from 'react';
import Image from 'next/image';
import ReactPlayer from 'react-player/lazy';
import { FaSearch, FaPlay, FaTimes, FaSpinner, FaInfo, FaLock, FaEnvelope, FaGithub } from 'react-icons/fa';
import Link from 'next/link';

interface Video {
  videoId: string;
  title: string;
  channelName: string;
  viewCountText: string;
  thumbnail: string;
  link: string;
}

// Loading spinner component
const Spinner = () => (
  <div className="flex justify-center items-center p-4">
    <FaSpinner className="animate-spin text-[var(--primary)] text-4xl" />
  </div>
);

// Skeleton loader untuk video cards
const SkeletonCard = () => (
  <div className="card animate-pulse">
    <div className="relative aspect-video bg-gray-700"></div>
    <div className="p-4">
      <div className="h-5 bg-gray-700 rounded mb-2"></div>
      <div className="h-4 bg-gray-700 rounded w-3/4 mb-2"></div>
      <div className="h-3 bg-gray-700 rounded w-1/2"></div>
    </div>
  </div>
);

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [error, setError] = useState('');
  const [searchTimeout, setSearchTimeout] = useState<NodeJS.Timeout | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);
  const [hasMoreVideos, setHasMoreVideos] = useState(true);

  // Memoize searchVideos untuk performa
  const searchVideos = useCallback(async (page = 1) => {
    if (!searchQuery.trim()) return;

    // Batalkan request sebelumnya jika ada
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    // Buat controller baru untuk request ini
    abortControllerRef.current = new AbortController();
    const signal = abortControllerRef.current.signal;

    setLoading(true);
    setError('');
    
    try {
      // Menambahkan cache busting parameter acak untuk menghindari caching browser
      const timestamp = Date.now();
      const response = await fetch(
        `/api/search?q=${encodeURIComponent(searchQuery)}&page=${page}&_=${timestamp}`, 
        { signal }
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch videos');
      }
      
      const data = await response.json();
      
      // Menggunakan properti hasMore dari API response
      if (data.hasMore !== undefined) {
        setHasMoreVideos(data.hasMore);
      } else {
        // Fallback ke perilaku lama
        setHasMoreVideos(data.videos.length > 0);
      }
      
      if (page === 1) {
        setVideos(data.videos);
      } else {
        setVideos(prev => {
          const existingIds = new Set(prev.map(v => v.videoId));
          const newVideos = data.videos.filter(video => !existingIds.has(video.videoId));
          return [...prev, ...newVideos];
        });
      }
      
      setCurrentPage(page);
    } catch (err: any) {
      // Abaikan AbortError karena itu disengaja
      if (err.name !== 'AbortError') {
        console.error('Error fetching videos:', err);
        setError('Failed to fetch videos. Please try again later.');
      }
    } finally {
      setLoading(false);
    }
  }, [searchQuery]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Batalkan pencarian sebelumnya jika ada
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }
    
    // Reset state
    setCurrentPage(1);
    setHasMoreVideos(true);
    
    // Gunakan debounce untuk mencegah terlalu banyak request
    const timeout = setTimeout(() => {
      searchVideos(1);
    }, 300);
    
    setSearchTimeout(timeout);
  };

  const loadMore = () => {
    if (!loading && hasMoreVideos) {
      searchVideos(currentPage + 1);
    }
  };

  const playVideo = (video: Video) => {
    setSelectedVideo(video);
    // Preload player
    const preloadImg = new Image();
    preloadImg.src = video.thumbnail;
  };

  const closePlayer = () => {
    setSelectedVideo(null);
  };
  
  // Cleanup pada unmount
  useEffect(() => {
    return () => {
      if (searchTimeout) {
        clearTimeout(searchTimeout);
      }
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [searchTimeout]);

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] p-4 md:p-8 flex flex-col">
      {/* Header dengan navigasi */}
      <header className="flex flex-col items-center justify-center py-8 mb-8 relative">
        <div className="absolute top-0 right-0 flex space-x-4">
          <Link 
            href="/about" 
            className="text-gray-400 hover:text-[var(--primary)] transition-colors flex items-center text-sm"
          >
            <FaInfo className="mr-1" /> Tentang
          </Link>
          <Link 
            href="/privacy" 
            className="text-gray-400 hover:text-[var(--primary)] transition-colors flex items-center text-sm"
          >
            <FaLock className="mr-1" /> Privasi
          </Link>
          <Link 
            href="/contact" 
            className="text-gray-400 hover:text-[var(--primary)] transition-colors flex items-center text-sm"
          >
            <FaEnvelope className="mr-1" /> Kontak
          </Link>
        </div>

        <h1 className="text-4xl md:text-6xl font-bold mb-4 neon-text">SynthTube</h1>
        <p className="text-lg mb-8 text-center">
          Search and watch YouTube videos without leaving the site
        </p>
        
        {/* Search Form */}
        <form onSubmit={handleSearch} className="w-full max-w-2xl">
          <div className="relative flex items-center">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for videos..."
              className="input-search w-full py-3 px-4 pr-12 rounded-full"
            />
            <button 
              type="submit" 
              className="absolute right-2 p-2 rounded-full bg-[var(--primary)] text-white hover:neon-glow"
              disabled={loading}
            >
              {loading ? <FaSpinner className="animate-spin" size={20} /> : <FaSearch size={20} />}
            </button>
          </div>
        </form>
      </header>

      {/* Loading Indicator - hanya tampilkan jika tidak ada video */}
      {loading && videos.length === 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <div className="col-span-full text-center mb-4">
            <Spinner />
            <p className="mt-2">Mencari video "{searchQuery}", mohon tunggu sebentar...</p>
          </div>
          {Array.from({ length: 8 }).map((_, index) => (
            <SkeletonCard key={`skeleton-${index}`} />
          ))}
        </div>
      )}

      {/* Loading more indicator */}
      {loading && videos.length > 0 && (
        <div className="flex justify-center mt-4 mb-4">
          <Spinner />
          <p className="ml-2">Memuat lebih banyak video...</p>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="text-[var(--primary)] text-center mb-8 p-4 bg-red-100 bg-opacity-20 rounded-lg">
          <p className="font-bold mb-1">Terjadi kesalahan:</p>
          <p>{error}</p>
          <button 
            onClick={() => searchVideos(currentPage)} 
            className="mt-3 px-4 py-2 bg-[var(--primary)] text-white rounded-full hover:opacity-90"
          >
            Coba Lagi
          </button>
        </div>
      )}

      {/* Video Player Modal */}
      {selectedVideo && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
          <div className="relative w-full max-w-5xl">
            <button 
              onClick={closePlayer}
              className="absolute -top-12 right-0 text-white p-2 rounded-full hover:text-[var(--primary)]"
            >
              <FaTimes size={24} />
            </button>
            <div className="aspect-video w-full">
              <Suspense fallback={<Spinner />}>
                <ReactPlayer
                  url={selectedVideo.link}
                  width="100%"
                  height="100%"
                  controls
                  playing
                  config={{
                    youtube: {
                      playerVars: {
                        modestbranding: 1,
                        rel: 0,
                        hl: 'id' // Bahasa Indonesia
                      }
                    }
                  }}
                  onError={(e) => console.error('Player error:', e)}
                />
              </Suspense>
            </div>
            <h2 className="text-xl font-bold mt-4">{selectedVideo.title}</h2>
            <p className="text-sm text-gray-400">{selectedVideo.channelName}</p>
          </div>
        </div>
      )}

      {/* Video Grid */}
      {videos.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {videos.map((video) => (
            video.videoId !== 'not-found' ? (
              <div key={video.videoId} className="card group">
                <div className="relative aspect-video cursor-pointer" onClick={() => playVideo(video)}>
                  <Image
                    src={video.thumbnail}
                    alt={video.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover"
                    loading="lazy"
                    placeholder="blur"
                    blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                    <div className="p-3 rounded-full bg-[var(--primary)] text-white">
                      <FaPlay size={20} />
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-lg line-clamp-2 mb-1">{video.title}</h3>
                  <p className="text-sm text-gray-400 mb-2">{video.channelName}</p>
                  <p className="text-xs text-gray-500">{video.viewCountText}</p>
                </div>
              </div>
            ) : (
              <div key="not-found" className="col-span-full flex flex-col items-center justify-center py-8">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-2xl font-bold">No videos found</h3>
                <p className="text-gray-400">Try a different search term</p>
              </div>
            )
          ))}
        </div>
      )}

      {/* Load More Button - hanya tampilkan jika ada video dan masih ada video lain yang bisa diload */}
      {videos.length > 0 && hasMoreVideos && !loading && (
        <div className="flex justify-center mt-8">
          <button
            onClick={loadMore}
            disabled={loading}
            className="btn-primary px-6 py-3 rounded-full"
          >
            {loading ? <><FaSpinner className="animate-spin mr-2 inline" /> Loading...</> : 'Muat Lebih Banyak'}
          </button>
        </div>
      )}

      {/* No more videos message */}
      {videos.length > 0 && !hasMoreVideos && !loading && (
        <div className="text-center mt-8 text-gray-500">
          <p>Tidak ada lagi video untuk ditampilkan</p>
        </div>
      )}

      {/* Empty State - hanya tampilkan jika tidak loading dan tidak ada video */}
      {!loading && videos.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16">
          <div className="text-6xl mb-4">🎬</div>
          <h2 className="text-2xl font-bold mb-2">No videos found</h2>
          <p className="text-gray-400">
            Search for videos to get started
          </p>
        </div>
      )}

      {/* Footer */}
      <footer className="mt-auto pt-8 pb-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center border-t border-gray-800 pt-6">
            <div className="mb-4 md:mb-0">
              <p className="text-sm text-gray-500">
                &copy; {new Date().getFullYear()} SynthTube. Dibuat oleh Rasya Ramadhan.
              </p>
            </div>
            <div className="flex space-x-6">
              <Link 
                href="/about" 
                className="text-sm text-gray-500 hover:text-[var(--primary)] transition-colors"
              >
                Tentang
              </Link>
              <Link 
                href="/privacy" 
                className="text-sm text-gray-500 hover:text-[var(--primary)] transition-colors"
              >
                Privasi
              </Link>
              <Link 
                href="/contact" 
                className="text-sm text-gray-500 hover:text-[var(--primary)] transition-colors"
              >
                Kontak
              </Link>
              <a 
                href="https://github.com/rasya-ramadhan/synthtube" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-sm text-gray-500 hover:text-[var(--primary)] transition-colors flex items-center"
              >
                <FaGithub className="mr-1" /> GitHub
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
