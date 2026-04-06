import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, ArrowLeft, Package, ImageIcon } from 'lucide-react';
import api from '../api/axios';
import Navbar from '../components/Navbar';
import CartDrawer from '../components/CartDrawer';
import toast from 'react-hot-toast';

const CATEGORIES = ['Electronics', 'Fashion', 'Home', 'Books', 'Sports', 'Kitchen', 'Other'];

export default function CreateProductPage() {
  const [form, setForm] = useState({ name: '', price: '', description: '', category: 'NFT', stock: '' });
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState('');
  const [loading, setLoading] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const fileRef = useRef();
  const navigate = useNavigate();

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) return toast.error('Ukuran gambar maksimal 5MB');
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.price || !form.description) return toast.error('Nama, harga, dan deskripsi wajib diisi');
    setLoading(true);
    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => fd.append(k, v));
      if (image) fd.append('image', image);
      await api.post('/products', fd, { headers: { 'Content-Type': 'multipart/form-data' } });
      toast.success('Produk berhasil dibuat!');
      navigate('/home');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Gagal membuat produk');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--bg-color)] transition-colors duration-300">
      <Navbar onCartOpen={() => setCartOpen(true)} />
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />

      <div className="pt-20 max-w-2xl mx-auto px-4 sm:px-6 pb-12">
        <div className="py-8 flex items-center gap-4">
          <button onClick={() => navigate('/home')} className="p-2 glass rounded-xl hover:bg-white/10 transition-colors">
            <ArrowLeft size={20} className="text-gray-400" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-[var(--text-primary)]">Buat Produk</h1>
            <p className="text-[var(--text-secondary)] text-sm">Jual produk Anda di KaryaNusa</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Image Upload */}
          <div className="glass rounded-2xl p-6 border border-[var(--border-color)]">
            <h2 className="font-semibold text-[var(--text-primary)] mb-4 flex items-center gap-2">
              <ImageIcon size={18} className="text-purple-400" /> Gambar Produk
            </h2>
            <div
              onClick={() => fileRef.current.click()}
              className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all ${
                preview ? 'border-purple-500/50' : 'border-[var(--border-color)] hover:border-purple-500/50'
              }`}>
              {preview ? (
                <img src={preview} alt="preview" className="max-h-48 mx-auto rounded-lg object-cover" />
              ) : (
                <div>
                  <Upload size={40} className="text-gray-600 mx-auto mb-3" />
                  <p className="text-gray-400">Klik untuk upload gambar</p>
                  <p className="text-gray-600 text-sm mt-1">PNG, JPG, WEBP · Maks 5MB</p>
                </div>
              )}
            </div>
            <input ref={fileRef} type="file" accept="image/*" onChange={handleImage} className="hidden" />
            {preview && (
              <button type="button" onClick={() => { setImage(null); setPreview(''); }}
                className="mt-2 text-xs text-red-400 hover:text-red-300">
                Hapus gambar
              </button>
            )}
          </div>

          {/* Product Info */}
          <div className="glass rounded-2xl p-6 space-y-4">
            <h2 className="font-semibold text-white flex items-center gap-2">
              <Package size={18} className="text-purple-400" /> Informasi Produk
            </h2>

            <div>
              <label className="block text-sm text-[var(--text-secondary)] mb-2">Nama Produk *</label>
              <input type="text" placeholder="Nama produk Anda"
                value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
                className="w-full bg-[var(--card-bg)] border border-[var(--border-color)] rounded-xl px-4 py-3 text-[var(--text-primary)] placeholder-[var(--text-secondary)] opacity-70 focus:opacity-100 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-400 mb-2">Harga (IDR) *</label>
                <input type="number" placeholder="0" min="0"
                  value={form.price} onChange={e => setForm({ ...form, price: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors" />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Stok</label>
                <input type="number" placeholder="99" min="1"
                  value={form.stock} onChange={e => setForm({ ...form, stock: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors" />
              </div>
            </div>

            <div>
              <label className="block text-sm text-[var(--text-secondary)] mb-2">Kategori</label>
              <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}
                className="w-full bg-[var(--card-bg)] border border-[var(--border-color)] rounded-xl px-4 py-3 text-[var(--text-primary)] focus:outline-none focus:border-purple-500 cursor-pointer">
                {CATEGORIES.map(c => <option key={c} value={c} className="bg-[var(--bg-color)]">{c}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-sm text-[var(--text-secondary)] mb-2">Deskripsi Produk *</label>
              <textarea rows={4} placeholder="Jelaskan produk Anda secara detail..."
                value={form.description} onChange={e => setForm({ ...form, description: e.target.value })}
                className="w-full bg-[var(--card-bg)] border border-[var(--border-color)] rounded-xl px-4 py-3 text-[var(--text-primary)] placeholder-[var(--text-secondary)] opacity-70 focus:opacity-100 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 resize-none transition-all" />
            </div>
          </div>

          <button type="submit" disabled={loading}
            className="w-full btn-primary py-4 rounded-xl text-white font-semibold text-base disabled:opacity-60 disabled:cursor-not-allowed">
            {loading ? 'Mempublikasikan...' : 'Publikasikan Produk'}
          </button>
        </form>
      </div>
    </div>
  );
}

