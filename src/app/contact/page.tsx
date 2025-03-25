'use client';

import { useState } from 'react';
import { FaEnvelope, FaPaperPlane, FaUser, FaComment, FaGithub, FaTwitter, FaInstagram } from 'react-icons/fa';
import Link from 'next/link';

export default function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Validasi sederhana
    if (!name.trim() || !email.trim() || !message.trim()) {
      setError('Mohon isi semua kolom yang diperlukan');
      setLoading(false);
      return;
    }

    if (!email.includes('@') || !email.includes('.')) {
      setError('Mohon masukkan alamat email yang valid');
      setLoading(false);
      return;
    }

    // Simulasi pengiriman form
    setTimeout(() => {
      setSubmitted(true);
      setLoading(false);
      // Reset form
      setName('');
      setEmail('');
      setMessage('');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 neon-text">Hubungi Kami</h1>
          <div className="text-[var(--primary)] text-6xl mb-6">
          </div>
          <p className="text-lg text-gray-300 mb-4">
            Ada pertanyaan atau saran? Jangan ragu untuk menghubungi kami
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-2xl font-bold mb-6 text-[var(--primary)]">Kirim Pesan</h2>
            
            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block mb-1 text-gray-300">Nama</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
                      <FaUser />
                    </div>
                    <input
                      type="text"
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="bg-gray-800 bg-opacity-50 border border-gray-700 text-gray-300 text-sm rounded-lg block w-full pl-10 p-3 focus:ring-[var(--primary)] focus:border-[var(--primary)] outline-none"
                      placeholder="Masukkan nama Anda"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="email" className="block mb-1 text-gray-300">Email</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
                      <FaEnvelope />
                    </div>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-gray-800 bg-opacity-50 border border-gray-700 text-gray-300 text-sm rounded-lg block w-full pl-10 p-3 focus:ring-[var(--primary)] focus:border-[var(--primary)] outline-none"
                      placeholder="email@example.com"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="message" className="block mb-1 text-gray-300">Pesan</label>
                  <div className="relative">
                    <div className="absolute top-3 left-3 pointer-events-none text-gray-500">
                      <FaComment />
                    </div>
                    <textarea
                      id="message"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      rows={5}
                      className="bg-gray-800 bg-opacity-50 border border-gray-700 text-gray-300 text-sm rounded-lg block w-full pl-10 p-3 focus:ring-[var(--primary)] focus:border-[var(--primary)] outline-none"
                      placeholder="Ketik pesan Anda di sini..."
                      required
                    ></textarea>
                  </div>
                </div>
                
                {error && (
                  <div className="text-red-500 p-3 bg-red-900 bg-opacity-20 rounded-lg">
                    {error}
                  </div>
                )}
                
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary py-3 px-6 rounded-full flex items-center justify-center w-full"
                >
                  {loading ? (
                    <span className="inline-flex items-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Mengirim...
                    </span>
                  ) : (
                    <span className="inline-flex items-center">
                      <FaPaperPlane className="mr-2" /> Kirim Pesan
                    </span>
                  )}
                </button>
              </form>
            ) : (
              <div className="text-center p-8 bg-[var(--primary)] bg-opacity-20 rounded-lg">
                <div className="text-5xl mb-4 text-[var(--primary)]">
                  <FaPaperPlane />
                </div>
                <h3 className="text-xl font-bold mb-2">Terima Kasih!</h3>
                <p className="text-gray-300 mb-4">
                  Pesan Anda telah dikirim. Kami akan menghubungi Anda secepatnya.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="btn-primary py-2 px-4 rounded-full mt-2"
                >
                  Kirim Pesan Lain
                </button>
              </div>
            )}
          </div>
          
          <div>
            <h2 className="text-2xl font-bold mb-6 text-[var(--primary)]">Informasi Kontak</h2>
            
            <div className="space-y-6">
              <div className="p-6 bg-gray-800 bg-opacity-50 rounded-lg">
                <h3 className="font-bold mb-2">Email</h3>
                <a href="mailto:contact@synthtube.com" className="text-[var(--primary)] hover:underline flex items-center">
                  <FaEnvelope className="mr-2" /> rasya23darkness@gmail.com
                </a>
              </div>
              
              <div className="p-6 bg-gray-800 bg-opacity-50 rounded-lg">
                <h3 className="font-bold mb-4">Media Sosial</h3>
                <div className="flex space-x-4">
                  <a href="https://github.com/rasya-ramadhan" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-[var(--primary)]">
                    <FaGithub size={24} />
                  </a>
                  <a href="https://twitter.com/synthtube" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-[var(--primary)]">
                    <FaTwitter size={24} />
                  </a>
                  <a href="https://instagram.com/synthtube" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-[var(--primary)]">
                    <FaInstagram size={24} />
                  </a>
                </div>
              </div>
              
              <div className="p-6 bg-gray-800 bg-opacity-50 rounded-lg">
                <h3 className="font-bold mb-2">Waktu Respons</h3>
                <p className="text-gray-400">
                  Kami biasanya merespons pesan dalam waktu 24-48 jam pada hari kerja.
                </p>
              </div>
              
              <div className="p-6 bg-gray-800 bg-opacity-50 rounded-lg">
                <h3 className="font-bold mb-2">Bantuan & Dukungan</h3>
                <p className="text-gray-400 mb-2">
                  Untuk bantuan teknis atau bug reporting, kunjungi:
                </p>
                <a href="https://github.com/rasya-ramadhan/synthtube/issues" target="_blank" rel="noopener noreferrer" className="text-[var(--primary)] hover:underline flex items-center">
                  <FaGithub className="mr-2" /> GitHub Issues
                </a>
              </div>
            </div>
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