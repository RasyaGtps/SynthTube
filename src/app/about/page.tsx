'use client';

import { FaYoutube, FaRocket, FaBolt, FaShieldAlt, FaHeart, FaCode, FaGithub } from 'react-icons/fa';
import Link from 'next/link';

export default function About() {
  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 neon-text">Tentang SynthTube</h1>
          <div className="text-[var(--primary)] text-6xl mb-6">
          </div>
          <p className="text-lg text-gray-300 mb-8">
            Aplikasi pencarian dan penonton video YouTube yang cepat, ringan, dan tanpa gangguan
          </p>
        </div>

        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-6 text-center text-[var(--primary)]">Apa itu SynthTube?</h2>
          <p className="text-gray-300 mb-4">
            SynthTube adalah aplikasi web yang memungkinkan Anda mencari dan menonton video YouTube tanpa harus meninggalkan situs atau terganggu oleh rekomendasi, iklan, dan elemen lain yang tidak perlu. 
          </p>
          <p className="text-gray-300 mb-4">
            Dibangun dengan teknologi modern seperti Next.js, Tailwind CSS, dan Puppeteer, SynthTube dirancang untuk memberikan pengalaman menonton yang sederhana, cepat, dan fokus pada konten yang Anda cari.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="feature-card p-6 bg-gray-800 bg-opacity-50 rounded-lg">
            <div className="text-3xl text-[var(--primary)] mb-4">
              <FaRocket />
            </div>
            <h2 className="text-xl font-bold mb-2">Super Cepat</h2>
            <p className="text-gray-400">
              Nikmati konten YouTube dengan performa yang optimal dan waktu pemuatan yang minimal. Aplikasi dioptimalkan untuk kecepatan akses.
            </p>
          </div>

          <div className="feature-card p-6 bg-gray-800 bg-opacity-50 rounded-lg">
            <div className="text-3xl text-[var(--primary)] mb-4">
              <FaBolt />
            </div>
            <h2 className="text-xl font-bold mb-2">Bebas Gangguan</h2>
            <p className="text-gray-400">
              Fokus pada konten yang Anda inginkan tanpa rekomendasi, komentar, atau elemen yang tidak perlu. Pengalaman menonton yang bersih.
            </p>
          </div>

          <div className="feature-card p-6 bg-gray-800 bg-opacity-50 rounded-lg">
            <div className="text-3xl text-[var(--primary)] mb-4">
              <FaShieldAlt />
            </div>
            <h2 className="text-xl font-bold mb-2">Privasi Terjaga</h2>
            <p className="text-gray-400">
              Kami tidak mengumpulkan data pengguna atau riwayat pencarian. Aktivitas Anda tetap privat dan tidak dilacak.
            </p>
          </div>

          <div className="feature-card p-6 bg-gray-800 bg-opacity-50 rounded-lg">
            <div className="text-3xl text-[var(--primary)] mb-4">
              <FaHeart />
            </div>
            <h2 className="text-xl font-bold mb-2">Gratis dan Terbuka</h2>
            <p className="text-gray-400">
              SynthTube sepenuhnya gratis untuk digunakan dan kode sumbernya tersedia untuk dilihat dan dikembangkan bersama komunitas.
            </p>
          </div>
        </div>

        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-6 text-center text-[var(--primary)]">Teknologi</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 text-center">
            <div className="tech-card p-4 bg-gray-800 bg-opacity-30 rounded-lg">
              <h3 className="font-bold mb-2">Next.js</h3>
              <p className="text-gray-400 text-sm">Framework React untuk aplikasi web</p>
            </div>
            <div className="tech-card p-4 bg-gray-800 bg-opacity-30 rounded-lg">
              <h3 className="font-bold mb-2">Tailwind CSS</h3>
              <p className="text-gray-400 text-sm">Framework CSS untuk desain yang responsif</p>
            </div>
            <div className="tech-card p-4 bg-gray-800 bg-opacity-30 rounded-lg">
              <h3 className="font-bold mb-2">Puppeteer</h3>
              <p className="text-gray-400 text-sm">Untuk mengambil data video YouTube</p>
            </div>
            <div className="tech-card p-4 bg-gray-800 bg-opacity-30 rounded-lg">
              <h3 className="font-bold mb-2">TypeScript</h3>
              <p className="text-gray-400 text-sm">Untuk kode yang lebih bersih dan terstruktur</p>
            </div>
            <div className="tech-card p-4 bg-gray-800 bg-opacity-30 rounded-lg">
              <h3 className="font-bold mb-2">React</h3>
              <p className="text-gray-400 text-sm">Library UI untuk membangun antarmuka</p>
            </div>
            <div className="tech-card p-4 bg-gray-800 bg-opacity-30 rounded-lg">
              <h3 className="font-bold mb-2">React Player</h3>
              <p className="text-gray-400 text-sm">Pemutar video yang andal dan responsif</p>
            </div>
          </div>
        </div>

        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-6 text-center text-[var(--primary)]">Pengembang</h2>
          <div className="text-center">
            <div className="inline-flex items-center justify-center text-3xl text-[var(--primary)] mb-4">
              <FaCode className="mr-2" />
            </div>
            <p className="text-gray-300 mb-4">
              SynthTube dikembangkan oleh Rasya sebagai proyek pembelajaran dan eksperimen. 
              Aplikasi ini dibuat untuk mendemonstrasikan penggunaan teknologi web modern dan 
              menyediakan alternatif ringan untuk mengakses konten YouTube.
            </p>
            <div className="mt-6">
              <a 
                href="https://github.com/rasyagtps" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center text-[var(--primary)] hover:underline"
              >
                <FaGithub className="mr-2" /> rayy
              </a>
            </div>
          </div>
        </div>

        <div className="flex justify-center gap-4 mt-12">
          <Link href="/" className="btn-primary px-6 py-2 rounded-full">
            Kembali ke Beranda
          </Link>
          <Link href="/privacy" className="text-[var(--primary)] px-6 py-2 hover:underline">
            Kebijakan Privasi
          </Link>
        </div>
      </div>
    </div>
  );
}