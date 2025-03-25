'use client';

import { FaShieldAlt, FaUserSecret, FaCookie, FaServer, FaEye, FaHistory, FaLock } from 'react-icons/fa';
import Link from 'next/link';

export default function Privacy() {
  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 neon-text">Kebijakan Privasi</h1>
          <div className="text-[var(--primary)] text-6xl mb-6">
          </div>
          <p className="text-lg text-gray-300 mb-4">
            SynthTube didesain dengan memperhatikan privasi Anda sebagai prioritas utama
          </p>
          <p className="text-sm text-gray-400">
            Terakhir diperbarui: 25 Maret 2024
          </p>
        </div>

        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-center text-[var(--primary)]">Komitmen Kami</h2>
          <p className="text-gray-300 mb-4">
            SynthTube berkomitmen untuk melindungi privasi pengguna kami. Kami percaya bahwa Anda memiliki hak untuk mengakses konten tanpa diawasi atau dilacak. Kebijakan privasi ini menjelaskan bagaimana kami menangani informasi saat Anda menggunakan aplikasi SynthTube.
          </p>
        </div>

        <div className="space-y-8 mb-16">
          <div className="privacy-section p-6 bg-gray-800 bg-opacity-50 rounded-lg">
            <div className="text-2xl text-[var(--primary)] mb-4">
              <FaUserSecret />
            </div>
            <h2 className="text-2xl font-bold mb-4">Pengumpulan Data</h2>
            <p className="text-gray-400 mb-2">
              Kami tidak mengumpulkan atau menyimpan informasi pribadi apa pun. Pencarian dan riwayat tontonan Anda tetap bersifat privat dan tidak dilacak oleh SynthTube.
            </p>
            <ul className="list-disc list-inside text-gray-400 ml-4 space-y-2">
              <li>Tidak ada akun pengguna yang dibuat atau diperlukan</li>
              <li>Tidak ada data pribadi yang disimpan di server kami</li>
              <li>Tidak ada pelacakan atau analitik pengguna</li>
            </ul>
          </div>

          <div className="privacy-section p-6 bg-gray-800 bg-opacity-50 rounded-lg">
            <div className="text-2xl text-[var(--primary)] mb-4">
              <FaCookie />
            </div>
            <h2 className="text-2xl font-bold mb-4">Cookie dan Penyimpanan Lokal</h2>
            <p className="text-gray-400 mb-2">
              Kami menggunakan cookie minimal yang diperlukan untuk fungsi aplikasi. Tidak ada cookie pelacakan atau iklan yang digunakan.
            </p>
            <ul className="list-disc list-inside text-gray-400 ml-4 space-y-2">
              <li>Kami hanya menggunakan cookie teknis yang diperlukan</li>
              <li>Cookie yang digunakan bersifat sementara dan dihapus saat sesi berakhir</li>
              <li>Beberapa data cache disimpan secara lokal untuk meningkatkan kinerja aplikasi</li>
            </ul>
          </div>

          <div className="privacy-section p-6 bg-gray-800 bg-opacity-50 rounded-lg">
            <div className="text-2xl text-[var(--primary)] mb-4">
              <FaServer />
            </div>
            <h2 className="text-2xl font-bold mb-4">Layanan Pihak Ketiga</h2>
            <p className="text-gray-400 mb-2">
              Konten diambil dari YouTube. Silakan merujuk ke kebijakan privasi YouTube untuk informasi tentang praktik data mereka.
            </p>
            <ul className="list-disc list-inside text-gray-400 ml-4 space-y-2">
              <li>SynthTube menggunakan API YouTube untuk pencarian dan pemutaran video</li>
              <li>Kami bertindak sebagai perantara dan tidak menyimpan konten YouTube</li>
              <li>Saat memutar video, koneksi dibuat langsung ke server YouTube</li>
              <li><a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-[var(--primary)] hover:underline">Kebijakan Privasi YouTube</a></li>
            </ul>
          </div>

          <div className="privacy-section p-6 bg-gray-800 bg-opacity-50 rounded-lg">
            <div className="text-2xl text-[var(--primary)] mb-4">
              <FaHistory />
            </div>
            <h2 className="text-2xl font-bold mb-4">Riwayat Pencarian</h2>
            <p className="text-gray-400 mb-2">
              Pencarian yang Anda lakukan di SynthTube tidak disimpan dalam database kami. Kami meng-cache hasil pencarian secara sementara untuk meningkatkan kinerja, tetapi data ini tidak dikaitkan dengan identitas pengguna.
            </p>
            <ul className="list-disc list-inside text-gray-400 ml-4 space-y-2">
              <li>Cache pencarian dihapus secara berkala</li>
              <li>Tidak ada log pencarian yang disimpan secara permanen</li>
              <li>Riwayat pencarian hanya disimpan di browser Anda jika browser Anda dikonfigurasi untuk menyimpan riwayat</li>
            </ul>
          </div>

          <div className="privacy-section p-6 bg-gray-800 bg-opacity-50 rounded-lg">
            <div className="text-2xl text-[var(--primary)] mb-4">
              <FaEye />
            </div>
            <h2 className="text-2xl font-bold mb-4">Transparansi</h2>
            <p className="text-gray-400 mb-2">
              SynthTube adalah proyek open source. Ini berarti bahwa semua orang dapat melihat kode sumber dan memverifikasi bagaimana data diproses.
            </p>
            <ul className="list-disc list-inside text-gray-400 ml-4 space-y-2">
              <li>Kode sumber kami tersedia untuk diperiksa oleh publik</li>
              <li>Transparansi memastikan akuntabilitas dalam praktik privasi kami</li>
              <li>Kami menyambut kontribusi untuk meningkatkan keamanan dan privasi</li>
            </ul>
          </div>

          <div className="privacy-section p-6 bg-gray-800 bg-opacity-50 rounded-lg">
            <div className="text-2xl text-[var(--primary)] mb-4">
              <FaLock />
            </div>
            <h2 className="text-2xl font-bold mb-4">Keamanan</h2>
            <p className="text-gray-400 mb-2">
              Meskipun kami tidak mengumpulkan data pribadi, kami tetap mengimplementasikan praktik keamanan standar untuk melindungi aplikasi kami dari ancaman eksternal.
            </p>
            <ul className="list-disc list-inside text-gray-400 ml-4 space-y-2">
              <li>Transmisi data menggunakan HTTPS</li>
              <li>Pembaruan keamanan diterapkan secara teratur</li>
              <li>Pemantauan aktif untuk potensi kerentanan</li>
            </ul>
          </div>
        </div>

        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-6 text-center text-[var(--primary)]">Perubahan pada Kebijakan Privasi</h2>
          <p className="text-gray-300 mb-4">
            Kami dapat memperbarui kebijakan privasi ini dari waktu ke waktu. Kami akan memberi tahu pengguna tentang perubahan dengan memperbarui tanggal "terakhir diperbarui" di bagian atas kebijakan privasi ini.
          </p>
          <p className="text-gray-300 mb-4">
            Kami mendorong pengguna untuk meninjau kebijakan privasi ini secara berkala untuk tetap mendapatkan informasi terbaru tentang praktik privasi kami.
          </p>
        </div>

        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-6 text-center text-[var(--primary)]">Hubungi Kami</h2>
          <p className="text-gray-300 mb-4 text-center">
            Jika Anda memiliki pertanyaan atau masalah tentang kebijakan privasi kami, silakan hubungi kami melalui:
          </p>
          <div className="text-center">
            <a 
              href="mailto:rasya23darkness@gmail.com" 
              className="text-[var(--primary)] hover:underline"
            >
              rasya23darkness@gmail.com
            </a>
          </div>
        </div>

        <div className="flex justify-center gap-4 mt-12">
          <Link href="/" className="btn-primary px-6 py-2 rounded-full">
            Kembali ke Beranda
          </Link>
          <Link href="/about" className="text-[var(--primary)] px-6 py-2 hover:underline">
            Tentang SynthTube
          </Link>
        </div>
      </div>
    </div>
  );
}