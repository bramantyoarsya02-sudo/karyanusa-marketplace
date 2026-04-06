import { Link } from 'react-router-dom';
import { ShoppingBag, Shield, Zap, Globe, ArrowRight, Lock, Truck, HeadphonesIcon, Tag } from 'lucide-react';
import logo from '../assets/logo.png';
import ayoBelanja from '../assets/ayobelanja.jpg';
import keluargaBelanja from '../assets/keluarga_belanja.jpg';
import koleksiLengkap from '../assets/koleksi_lengkap.jpg';
import web3Showcase from '../assets/web3promosi.jpg';
import ThemeToggle from '../components/ThemeToggle';

const features = [
  { Icon: Shield, title: 'Transaksi Aman', desc: 'Setiap transaksi dilindungi enkripsi dan sistem verifikasi berlapis untuk keamanan Anda.' },
  { Icon: Truck, title: 'Pengiriman Cepat', desc: 'Bekerja sama dengan berbagai jasa pengiriman terpercaya untuk memastikan produk sampai tepat waktu.' },
  { Icon: HeadphonesIcon, title: 'Dukungan 24/7', desc: 'Tim customer service kami siap membantu Anda kapan saja melalui chat, email, maupun telepon.' },
  { Icon: Tag, title: 'Harga Terbaik', desc: 'Temukan produk berkualitas dengan harga kompetitif langsung dari penjual terpercaya.' },
];

const highlights = [
  { Icon: Lock, title: 'Akun Terverifikasi', desc: 'Setiap penjual melalui proses verifikasi identitas sebelum bisa berjualan di platform kami.' },
  { Icon: ShoppingBag, title: 'Produk Beragam', desc: 'Dari elektronik, fashion, peralatan rumah, hingga buku — semua tersedia dalam satu tempat.' },
  { Icon: Globe, title: 'Jangkauan Luas', desc: 'Platform dapat diakses dari seluruh Indonesia dengan tampilan yang responsif di semua perangkat.' },
  { Icon: Zap, title: 'Checkout Mudah', desc: 'Proses pembelian yang simpel dan cepat, dari pilih produk hingga konfirmasi pesanan.' },
];

const categories = ['Electronics', 'Fashion', 'Home', 'Books', 'Sports', 'Kitchen'];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[var(--bg-color)] text-[var(--text-primary)]">

      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 glass border-b border-[var(--border-color)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <img src={logo} alt="KaryaNusa Logo" className="w-9 h-9 rounded-lg object-contain" />
            <span className="text-xl font-bold gradient-text">KaryaNusa</span>
          </div>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Link to="/login" className="px-4 py-2 text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
              Login
            </Link>
            <Link to="/register" className="px-4 py-2 text-sm btn-primary text-white rounded-lg font-medium">
              Register
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero — teks kiri, gambar kanan */}
      <section className="pt-28 pb-16 px-4 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-purple-600/10 dark:bg-purple-600/20 rounded-full blur-3xl transition-colors" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-600/10 dark:bg-cyan-600/20 rounded-full blur-3xl transition-colors" />
        </div>
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full text-sm text-purple-300 mb-6">
                <ShoppingBag size={14} /> Marketplace Online Terpercaya
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-5 leading-tight">
                Belanja <span className="gradient-text">Lebih Mudah</span> dan Aman
              </h1>
              <p className="text-lg text-[var(--text-secondary)] mb-8 max-w-lg">
                Temukan ribuan produk pilihan dari penjual terpercaya. Belanja nyaman, aman, dan langsung dari rumah Anda.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/register" className="btn-primary px-8 py-4 rounded-xl text-white font-semibold flex items-center justify-center gap-2 text-lg">
                  Mulai Belanja <ArrowRight size={20} />
                </Link>
                <Link to="/login" className="px-8 py-4 rounded-xl glass text-[var(--text-primary)] font-semibold flex items-center justify-center gap-2 text-lg hover:bg-[var(--card-hover-bg)] transition-colors">
                  Masuk ke Akun
                </Link>
              </div>
            </div>
            {/* Hero image */}
            <div className="relative">
              <div className="rounded-3xl overflow-hidden shadow-2xl shadow-purple-900/40 aspect-4/3">
                <img
                  src={ayoBelanja}
                  alt="Ayo Belanja di KaryaNusa"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-t from-[#0a0a1a]/50 to-transparent" />
              </div>
              <div className="absolute bottom-5 left-5 glass rounded-2xl px-4 py-3 border border-white/20">
                <p className="text-white font-semibold text-sm">Ribuan Produk Tersedia</p>
                <p className="text-purple-200 text-xs">Dikirim ke seluruh Indonesia</p>
              </div>
              <div className="absolute -top-3 -right-3 glass rounded-2xl px-4 py-3 shadow-lg border border-white/20">
                <p className="text-xs text-white opacity-70">Penjual Aktif</p>
                <p className="text-white font-bold text-xl">10K+</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="py-14 px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-5">
          {highlights.map((item) => (
            <div key={item.title} className="glass rounded-2xl p-6 text-center card-hover">
              <item.Icon size={28} className="text-purple-400 mx-auto mb-3" />
              <div className="text-sm font-semibold text-[var(--text-primary)] mb-1">{item.title}</div>
              <div className="text-[var(--text-secondary)] text-xs leading-relaxed">{item.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Showcase — 3 gambar besar berdampingan */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-bold mb-3">Temukan <span className="gradient-text">Produk Terbaik</span></h2>
            <p className="text-[var(--text-secondary)] max-w-lg mx-auto">Dari kebutuhan sehari-hari hingga produk pilihan, semua ada di KaryaNusa.</p>
          </div>
          {/* Layout: 1 besar kiri + 2 kecil kanan */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-auto lg:h-[480px]">
            {/* Gambar besar */}
            <Link to="/register" className="group relative rounded-3xl overflow-hidden lg:col-span-2 shadow-xl">
              <img
                src={keluargaBelanja}
                alt="Belanja untuk Keluarga"
                className="w-full h-64 lg:h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/10 to-transparent" />
              <div className="absolute bottom-6 left-6">
                <span className="text-xs text-purple-200 uppercase tracking-widest font-bold">Untuk Keluarga</span>
                <p className="text-white font-bold text-2xl mt-1">Belanja Bersama</p>
                <p className="text-white opacity-80 text-sm mt-1">Produk lengkap untuk semua anggota keluarga</p>
              </div>
            </Link>
            {/* 2 gambar kecil */}
            <div className="flex flex-col gap-4">
              <Link to="/register" className="group relative rounded-3xl overflow-hidden flex-1 shadow-xl">
                <img
                  src={koleksiLengkap}
                  alt="Koleksi Lengkap"
                  className="w-full h-48 lg:h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/10 to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <span className="text-xs text-cyan-300 uppercase tracking-widest">Koleksi</span>
                  <p className="text-[var(--text-primary)] font-bold text-lg mt-0.5">Ribuan Pilihan</p>
                </div>
              </Link>
              <Link to="/register" className="group relative rounded-3xl overflow-hidden flex-1 shadow-xl">
                <img
                  src={web3Showcase}
                  alt="KaryaNusa Showcase"
                  className="w-full h-48 lg:h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/10 to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <span className="text-xs text-purple-200 uppercase tracking-widest font-bold">Platform</span>
                  <p className="text-white font-bold text-lg mt-0.5">KaryaNusa</p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-3">Mengapa <span className="gradient-text">KaryaNusa?</span></h2>
            <p className="text-[var(--text-secondary)] max-w-xl mx-auto">Kami menghadirkan pengalaman belanja online yang mudah, aman, dan menyenangkan.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {features.map((item) => (
              <div key={item.title} className="glass rounded-2xl p-6 card-hover">
                <div className="w-12 h-12 btn-primary rounded-xl flex items-center justify-center mb-4">
                  <item.Icon size={22} className="text-[var(--text-primary)]" />
                </div>
                <h3 className="font-semibold text-[var(--text-primary)] mb-2">{item.title}</h3>
                <p className="text-[var(--text-secondary)] text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Keluarga — gambar kiri, teks kanan */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-10 items-center">
          <div className="rounded-3xl overflow-hidden shadow-xl shadow-purple-900/20 aspect-4/3">
            <img src={keluargaBelanja} alt="Keluarga Belanja" className="w-full h-full object-cover" />
          </div>
          <div>
            <p className="text-purple-400 text-sm font-medium uppercase tracking-widest mb-3">Untuk Semua</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-[var(--text-primary)] mb-4">
              Belanja Bersama <span className="gradient-text">Keluarga</span>
            </h2>
            <p className="text-[var(--text-secondary)] leading-relaxed mb-6">
              KaryaNusa hadir untuk memenuhi kebutuhan seluruh anggota keluarga. Dari produk anak-anak, kebutuhan dapur, hingga elektronik rumah tangga — semua tersedia dengan harga terjangkau.
            </p>
            <div className="flex flex-col gap-3 mb-8">
              {['Produk aman dan terverifikasi', 'Pengiriman ke seluruh Indonesia', 'Garansi kepuasan pelanggan'].map(item => (
                <div key={item} className="flex items-center gap-3 text-[var(--text-secondary)] text-sm">
                  <div className="w-5 h-5 rounded-full btn-primary flex items-center justify-center shrink-0">
                    <span className="text-white text-[xs]">✓</span>
                  </div>
                  {item}
                </div>
              ))}
            </div>
            <Link to="/register" className="btn-primary px-7 py-3 rounded-xl text-[var(--text-primary)] font-semibold inline-flex items-center gap-2">
              Mulai Belanja <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* Koleksi — teks kiri, gambar kanan */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-10 items-center">
          <div className="order-2 lg:order-1">
            <p className="text-cyan-400 text-sm font-medium uppercase tracking-widest mb-3">Koleksi Terlengkap</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-[var(--text-primary)] mb-4">
              Ribuan Pilihan <span className="gradient-text">Produk</span>
            </h2>
            <p className="text-[var(--text-secondary)] leading-relaxed mb-6">
              Temukan koleksi produk terlengkap dari berbagai kategori. Penjual terpercaya kami menghadirkan produk berkualitas dengan harga yang bersaing.
            </p>
            <Link to="/register" className="btn-primary px-7 py-3 rounded-xl text-[var(--text-primary)] font-semibold inline-flex items-center gap-2">
              Jelajahi Koleksi <ArrowRight size={18} />
            </Link>
          </div>
          <div className="rounded-3xl overflow-hidden shadow-xl shadow-cyan-900/20 aspect-4/3 order-1 lg:order-2">
            <img src={koleksiLengkap} alt="Koleksi Lengkap" className="w-full h-full object-cover" />
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-14 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-3">Kategori <span className="gradient-text">Produk</span></h2>
          <p className="text-[var(--text-secondary)] mb-8">Jelajahi berbagai kategori produk yang tersedia di platform kami</p>
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map(cat => (
              <Link key={cat} to="/register"
                className="px-6 py-3 glass rounded-full text-sm font-medium hover:bg-purple-600/30 transition-all">
                {cat}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto text-center glass rounded-3xl p-12 relative overflow-hidden">
          <div className="absolute inset-0 bg-linear-to-br from-purple-600/20 to-cyan-600/20 rounded-3xl" />
          <div className="relative z-10">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Siap Mulai Belanja?</h2>
            <p className="text-[var(--text-secondary)] mb-8">Buat akun gratis sekarang dan nikmati kemudahan berbelanja di KaryaNusa.</p>
            <Link to="/register" className="btn-primary px-10 py-4 rounded-xl text-[var(--text-primary)] font-semibold inline-flex items-center gap-2 text-lg">
              Daftar Gratis <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[var(--border-color)] py-12 px-4 text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <img src={logo} alt="KaryaNusa Logo" className="w-8 h-8 rounded-lg object-contain" />
          <span className="text-xl font-bold gradient-text">KaryaNusa</span>
        </div>
        <p className="text-[var(--text-secondary)] mb-2">© 2025 KaryaNusa. Marketplace Online Terpercaya di Nusantara.</p>
        <p className="text-[var(--text-secondary)] opacity-50 text-xs">Dibuat dengan dedikasi untuk memajukan ekonomi digital Indonesia.</p>
      </footer>

    </div>
  );
}

