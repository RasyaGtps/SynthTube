import { NextRequest, NextResponse } from 'next/server';
import puppeteer from 'puppeteer';

// Memperluas in-memory cache dengan durasi yang lebih panjang
const cache: Record<string, { data: any; timestamp: number }> = {};
const CACHE_DURATION = 43200000; // 12 jam (sebelumnya 1 jam)

// Konfigurasi Browser gloabl (untuk reuse)
let browserInstance: puppeteer.Browser | null = null;

// Mengelola koneksi browser
async function getBrowser() {
  if (!browserInstance) {
    browserInstance = await puppeteer.launch({
      headless: 'new',
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-accelerated-2d-canvas',
        '--no-first-run',
        '--no-zygote',
        '--disable-gpu',
        '--disable-extensions',
        '--disable-background-networking',
        '--disable-default-apps',
        '--disable-sync',
        '--disable-translate',
        '--hide-scrollbars',
        '--metrics-recording-only',
        '--mute-audio',
        '--safebrowsing-disable-auto-update'
      ]
    });
  }
  return browserInstance;
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get('q');
  const page = parseInt(searchParams.get('page') || '1');
  
  if (!query) {
    return NextResponse.json({ error: 'Query parameter is required' }, { status: 400 });
  }
  
  const cacheKey = `${query}-${page}`;
  
  // Mengecek cache dengan durasi lebih panjang
  if (cache[cacheKey] && Date.now() - cache[cacheKey].timestamp < CACHE_DURATION) {
    return NextResponse.json(cache[cacheKey].data);
  }
  
  try {
    const results = await scrapeYouTube(query, page);
    
    // Cache the results
    cache[cacheKey] = {
      data: results,
      timestamp: Date.now()
    };
    
    return NextResponse.json(results);
  } catch (error) {
    console.error('Error scraping YouTube:', error);
    
    // Jika ada error, coba gunakan cache yang sudah expired jika ada
    if (cache[cacheKey]) {
      console.log('Using expired cache for', cacheKey);
      return NextResponse.json(cache[cacheKey].data);
    }
    
    return NextResponse.json({ error: 'Failed to scrape YouTube' }, { status: 500 });
  }
}

async function scrapeYouTube(query: string, page: number = 1) {
  // Limit jumlah video per halaman untuk kecepatan
  const videosPerPage = 8; // Mengurangi dari 12 menjadi 8
  
  try {
    const browser = await getBrowser();
    const tab = await browser.newPage();
    
    // Meningkatkan performa dengan mematikan beberapa fitur
    await tab.setDefaultNavigationTimeout(20000); // Mengurangi dari 30000
    
    // Pendekatan lebih konservatif dalam pemblokiran resource
    await tab.setRequestInterception(true);
    tab.on('request', (request) => {
      const resourceType = request.resourceType();
      const url = request.url();
      
      // Blokir hanya resource yang tidak penting
      // Biarkan script penting dan CSS untuk YouTube berfungsi dengan baik
      if (
        (resourceType === 'image' && !url.includes('ytimg.com')) || // Izinkan thumbnail
        resourceType === 'media' ||
        resourceType === 'font' ||
        (resourceType === 'stylesheet' && !url.includes('youtube.com/s/desktop')) || // Izinkan CSS utama YouTube
        (resourceType === 'script' && !url.includes('base.js') && !url.includes('desktop_polymer')) // Izinkan script utama
      ) {
        request.abort();
      } else {
        request.continue();
      }
    });
    
    // Set a random user agent
    await tab.setUserAgent(
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    );
    
    // Gunakan URL YouTube standar daripada pbj=1 yang mungkin menyebabkan masalah
    const searchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`;
    
    console.log('Trying to access:', searchUrl);
    
    try {
      // Coba dengan strategi navigasi yang lebih toleran
      await tab.goto(searchUrl, { 
        waitUntil: 'domcontentloaded', 
        timeout: 15000 // Menambah timeout menjadi 15 detik
      });
    } catch (navError) {
      console.warn('Initial navigation failed, trying alternative approach:', navError);
      
      // Pendekatan alternatif: buka halaman kosong terlebih dahulu
      await tab.goto('about:blank');
      await tab.evaluate((url) => {
        window.location.href = url;
      }, searchUrl);
      
      // Tunggu beberapa detik
      await new Promise(resolve => setTimeout(resolve, 5000));
    }
    
    // Tunggu lebih lama untuk konten dan coba beberapa selector alternatif
    try {
      await tab.waitForSelector('#contents ytd-video-renderer, #contents ytd-grid-video-renderer, ytd-rich-item-renderer', { 
        timeout: 8000 
      });
    } catch (e) {
      console.warn('Timeout waiting for selectors, continuing with partial content');
      
      // Coba screenshot untuk debug jika selector gagal
      try {
        await tab.screenshot({ path: 'debug-screenshot.png' });
        console.log('Debug screenshot saved');
      } catch (screenshotErr) {
        console.error('Failed to take debug screenshot:', screenshotErr);
      }
    }

    // Extract video information - optimized version
    const videos = await tab.evaluate((targetPage) => {
      const results: any[] = [];
      const seenVideoIds = new Set();
      const maxResults = 30; // Ambil lebih banyak dan filter di server
      
      try {
        // Mencoba langsung ekstrak data dengan selector yang lebih toleran
        const videoElements = document.querySelectorAll('#contents ytd-video-renderer, #contents ytd-grid-video-renderer, ytd-rich-item-renderer, ytd-compact-video-renderer');
        
        console.log('Found video elements:', videoElements.length);
        
        for (let i = 0; i < Math.min(videoElements.length, maxResults); i++) {
          try {
            const videoElement = videoElements[i];
            
            // Selector yang lebih toleran untuk link
            const linkElement = videoElement.querySelector('a#video-title, a.ytd-thumbnail, a[href*="/watch?v="]');
            if (!linkElement) continue;
            
            // Ekstrak link video
            const link = linkElement.getAttribute('href');
            if (!link) continue;
            
            // Pastikan ini adalah link video YouTube
            if (!link.includes('/watch?v=')) continue;
            
            // Ekstrak video ID
            const videoId = link.split('v=')[1]?.split('&')[0];
            if (!videoId || seenVideoIds.has(videoId)) continue;
            
            seenVideoIds.add(videoId);
            
            // Ekstrak judul dengan cara yang lebih toleran
            const title = linkElement.getAttribute('title') || 
                          linkElement.getAttribute('aria-label') || 
                          linkElement.textContent?.trim() || 
                          'Untitled Video';
            
            // Channel selectors - lebih toleran
            const channelElement = videoElement.querySelector(
              'ytd-channel-name a, #channel-name a, #text-container.ytd-channel-name a, .ytd-channel-name, [href*="channel/"], [href*="user/"]'
            );
            const channelName = channelElement?.textContent?.trim() || 'Unknown Channel';
            
            // View count selectors - gunakan regex yang lebih toleran
            const metadataElement = videoElement.querySelector('#metadata-line, .metadata-line, #video-info-container, .ytd-video-meta-block');
            const metaText = metadataElement?.textContent || '';
            const viewCountMatch = metaText.match(/(\d+(\.\d+)?\s*[KMB]?)(\s+views|\s+view|\s+ditonton)/i);
            const viewCountText = viewCountMatch ? viewCountMatch[0] : '0 views';
            
            // Coba beberapa format thumbnail (webp gagal di beberapa browser)
            const thumbnail = `https://i.ytimg.com/vi/${videoId}/mqdefault.jpg`;
            
            results.push({
              videoId,
              title,
              channelName,
              viewCountText,
              thumbnail,
              link: `https://www.youtube.com/watch?v=${videoId}`
            });
          } catch (err) {
            console.error('Error processing video element:', err);
          }
        }
      } catch (e) {
        console.error('Error evaluating page:', e);
      }
      
      return results;
    }, page);
    
    // Log untuk debug
    console.log(`Found ${videos.length} videos before filtering`);
    
    // Cleanup - tutup tab tetapi tetap pertahankan browser
    await tab.close();
    
    // Filter duplicates and take only what we need
    const uniqueVideosMap = new Map();
    videos.forEach(video => {
      if (!uniqueVideosMap.has(video.videoId)) {
        uniqueVideosMap.set(video.videoId, video);
      }
    });
    
    // Ambil hanya sejumlah video yang dibutuhkan berdasarkan halaman
    const uniqueVideos = Array.from(uniqueVideosMap.values());
    const startIndex = (page - 1) * videosPerPage;
    const pageVideos = uniqueVideos.slice(startIndex, startIndex + videosPerPage);
    
    console.log(`Returning ${pageVideos.length} videos for page ${page}`);
    
    // Menambahkan dummy videos jika tidak cukup hasil (untuk menghindari infinite loading)
    if (pageVideos.length === 0 && page === 1) {
      return {
        query,
        page,
        videos: [{
          videoId: 'not-found',
          title: 'No videos found',
          channelName: 'SynthTube',
          viewCountText: '0 views',
          thumbnail: 'https://placehold.co/480x360/gradient?text=No+Results',
          link: '#'
        }]
      };
    }
    
    return {
      query,
      page,
      videos: pageVideos,
      hasMore: uniqueVideos.length > startIndex + videosPerPage
    };
  } catch (e) {
    console.error('Error in scrapeYouTube:', e);
    
    // Jika ada error fatal, tutup browser dan reset instance
    try {
      if (browserInstance) {
        await browserInstance.close();
        browserInstance = null;
      }
    } catch (closeError) {
      console.error('Error closing browser:', closeError);
    }
    
    // Return empty results jika terjadi error
    return {
      query,
      page,
      videos: [],
      hasMore: false
    };
  }
}