import { useState } from 'react';
import { X, Star, ShoppingCart, Package, User, Heart, Plus, Minus, MessageCircle, Share2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import api from '../api/axios';

const formatPrice = (p) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(p);

export default function ProductModal({ product, onClose, initialWishlisted = false }) {
  const { addToCart } = useCart();
  const { user } = useAuth();
  const [isWishlisted, setIsWishlisted] = useState(initialWishlisted);
  const [wishlistLoading, setWishlistLoading] = useState(false);
  const [qty, setQty] = useState(1);
  const [activeTab, setActiveTab] = useState('detail');

  if (!product) return null;

  // Defensive values to prevent crashes if API data is incomplete
  const ratings = product.ratings || [];
  const avgRating = product.avgRating || 0;
  const sold = product.sold || 0;
  const stock = product.stock || 0;
  const description = product.description || '';

  const handleAddToCart = async () => {
    if (!user) return toast.error('Login terlebih dahulu');
    try {
      await addToCart(product.id, qty);
      toast.success(`${qty} produk ditambahkan ke keranjang!`);
      onClose();
    } catch {
      toast.error('Gagal menambahkan ke keranjang');
    }
  };

  const handleWishlist = async (e) => {
    e.stopPropagation();
    if (!user) return toast.error('Login terlebih dahulu');
    if (wishlistLoading) return;

    setWishlistLoading(true);
    try {
      const { data } = await api.post('/wishlist/toggle', { productId: product.id });
      setIsWishlisted(data.active);
      toast.success(data.message);
    } catch {
      toast.error('Gagal memperbarui wishlist');
    } finally {
      setWishlistLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-hidden" onClick={onClose}>
      <div 
        className="bg-[var(--bg-color)] rounded-[2.5rem] max-w-6xl w-full max-h-[92vh] overflow-y-auto border border-[var(--border-color)] shadow-2xl relative" 
        onClick={e => e.stopPropagation()}
      >
        {/* Close Button */}
        <button onClick={onClose}
          className="absolute top-6 right-6 z-10 p-2.5 bg-[var(--card-bg)] hover:bg-red-500/20 hover:text-red-500 rounded-full text-[var(--text-secondary)] transition-all border border-[var(--border-color)]">
          <X size={20} />
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 lg:p-10">
          
          {/* Kolom Kiri: Galeri Foto (4/12) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="aspect-square rounded-3xl overflow-hidden glass border border-[var(--border-color)] shadow-sm">
              <img src={product.image} alt={product.name}
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                onError={e => { e.target.src = 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400'; }} />
            </div>
          </div>

          {/* Kolom Tengah: Info Utama (5/12) */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <h2 className="text-3xl font-black text-[var(--text-primary)] leading-tight mb-2">{product.name}</h2>
              <div className="flex items-center gap-3 text-sm flex-wrap">
                <div className="flex items-center gap-1.5 px-2.5 py-1 bg-yellow-500/10 text-yellow-500 rounded-lg">
                  <Star size={14} className="fill-yellow-500" />
                  <span className="font-bold">{avgRating.toFixed(1)}</span>
                  <span className="opacity-60 font-normal">({ratings.length} Rating)</span>
                </div>
                <div className="w-1 h-1 rounded-full bg-[var(--border-color)]" />
                <span className="text-[var(--text-secondary)] font-medium">Terjual <span className="text-[var(--text-primary)]">{sold}</span></span>
              </div>
            </div>

            <div className="py-4 border-y border-[var(--border-color)]">
                <p className="text-4xl font-black gradient-text tracking-tight">{formatPrice(product.price)}</p>
            </div>

            {/* Content Tabs */}
            <div className="space-y-4">
               <div className="flex gap-6 border-b border-[var(--border-color)]">
                  <button 
                    onClick={() => setActiveTab('detail')}
                    className={`pb-3 text-sm font-bold transition-all relative ${activeTab === 'detail' ? 'text-purple-500' : 'text-[var(--text-secondary)]'}`}
                  >
                    Detail Produk
                    {activeTab === 'detail' && <div className="absolute bottom-0 left-0 right-0 h-1 bg-purple-500 rounded-full" />}
                  </button>
                  <button 
                    onClick={() => setActiveTab('ulasan')}
                    className={`pb-3 text-sm font-bold transition-all relative ${activeTab === 'ulasan' ? 'text-purple-500' : 'text-[var(--text-secondary)]'}`}
                  >
                    Ulasan ({ratings.length})
                    {activeTab === 'ulasan' && <div className="absolute bottom-0 left-0 right-0 h-1 bg-purple-500 rounded-full" />}
                  </button>
               </div>

               {activeTab === 'detail' ? (
                 <div className="space-y-4 animate-in fade-in duration-300">
                    <div className="grid grid-cols-2 gap-y-2 text-sm">
                      <span className="text-[var(--text-secondary)]">Kondisi</span>
                      <span className="text-[var(--text-primary)] font-medium text-right lg:text-left">Baru</span>
                      <span className="text-[var(--text-secondary)]">Toko</span>
                      <span className="text-[var(--text-primary)] font-medium text-right lg:text-left">
                        {product.sellerName}
                      </span>
                    </div>
                    <div className="pt-2">
                       <p className="text-[var(--text-secondary)] leading-relaxed whitespace-pre-wrap text-[15px]">
                          {description}
                       </p>
                    </div>
                 </div>
               ) : (
                 <div className="space-y-4 animate-in fade-in duration-300">
                   {ratings.length === 0 ? (
                     <div className="py-8 text-center bg-[var(--card-bg)] rounded-3xl border border-[var(--border-color)]">
                        <MessageCircle size={32} className="mx-auto text-[var(--border-color)] mb-2" />
                        <p className="text-[var(--text-secondary)] text-sm">Belum ada ulasan untuk produk ini.</p>
                     </div>
                   ) : (
                     <div className="space-y-3">
                        {ratings.map((r, i) => (
                          <div key={i} className="p-4 bg-[var(--card-bg)] rounded-2xl border border-[var(--border-color)]">
                            <div className="flex items-center gap-2 mb-2">
                              <div className="w-8 h-8 btn-primary rounded-full flex items-center justify-center text-xs text-white">
                                {r.user[0].toUpperCase()}
                              </div>
                              <span className="font-bold text-sm text-[var(--text-primary)]">{r.user}</span>
                              <div className="flex gap-0.5 ml-auto">
                                {[1,2,3,4,5].map(s => <Star key={s} size={10} className={s <= r.score ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600'} />)}
                              </div>
                            </div>
                            <p className="text-sm text-[var(--text-secondary)]">{r.comment}</p>
                          </div>
                        ))}
                     </div>
                   )}
                 </div>
               )}
            </div>
          </div>

          {/* Kolom Kanan: Checkout Card (3/12) */}
          <div className="lg:col-span-3">
             <div className="glass rounded-[2rem] p-6 border border-[var(--border-color)] shadow-xl sticky top-0">
               <h3 className="font-black text-[var(--text-primary)] mb-6 text-lg">Atur jumlah dan catatan</h3>
               
               <div className="space-y-6">
                 {/* Qty Selector */}
                 <div className="flex items-center gap-4">
                    <div className="flex items-center bg-[var(--card-bg)] rounded-xl border border-[var(--border-color)] p-1">
                      <button 
                        onClick={() => setQty(Math.max(1, qty - 1))}
                        className="p-2 hover:bg-white/5 rounded-lg transition-colors text-purple-500 disabled:opacity-30"
                        disabled={qty <= 1}
                      >
                        <Minus size={16} />
                      </button>
                      <input 
                        type="number" 
                        value={qty}
                        onChange={(e) => setQty(Math.max(1, Math.min(stock, parseInt(e.target.value) || 1)))}
                        className="w-12 text-center bg-transparent border-none focus:ring-0 font-bold text-[var(--text-primary)]"
                      />
                      <button 
                        onClick={() => setQty(Math.min(stock, qty + 1))}
                        className="p-2 hover:bg-white/5 rounded-lg transition-colors text-purple-500 disabled:opacity-30"
                        disabled={qty >= stock}
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                    <p className="text-sm text-[var(--text-secondary)] font-medium">Stok Total: <span className="text-[var(--text-primary)] font-bold">{stock}</span></p>
                 </div>

                 {/* Price Calculation */}
                 <div className="flex items-center justify-between py-4 border-t border-[var(--border-color)]">
                    <span className="text-[var(--text-secondary)] font-medium">Subtotal</span>
                    <span className="text-xl font-black text-[var(--text-primary)]">{formatPrice(product.price * qty)}</span>
                 </div>

                 {/* Action Buttons */}
                 <div className="space-y-3">
                    <button 
                      onClick={handleAddToCart}
                      className="w-full btn-primary py-3.5 rounded-2xl text-white font-black shadow-lg shadow-purple-500/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2"
                    >
                      <Plus size={18} /> Keranjang
                    </button>
                    <button className="w-full py-3.5 rounded-2xl border-2 border-purple-500/50 text-purple-500 font-bold hover:bg-purple-500 hover:text-white transition-all">
                      Beli Langsung
                    </button>
                 </div>

                 {/* Auxiliary Actions - Wishlist Only for Buyers */}
                 {user?.role === 'buyer' && (
                   <div className="flex items-center justify-center pt-4 border-t border-[var(--border-color)]">
                    <button 
                      onClick={handleWishlist}
                      className={`flex items-center gap-2 text-sm font-bold transition-colors ${isWishlisted ? 'text-red-500' : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'}`}
                    >
                       <Heart size={16} fill={isWishlisted ? 'currentColor' : 'none'} /> 
                       {isWishlisted ? 'Hapus dari Wishlist' : 'Tambah ke Wishlist'}
                    </button>
                   </div>
                 )}
               </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}

