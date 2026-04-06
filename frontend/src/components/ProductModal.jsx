import { X, Star, ShoppingCart, Package, User } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const formatPrice = (p) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(p);

export default function ProductModal({ product, onClose }) {
  const { addToCart } = useCart();
  const { user } = useAuth();

  if (!product) return null;

  const handleAddToCart = async () => {
    if (!user) return toast.error('Login terlebih dahulu');
    try {
      await addToCart(product.id);
      toast.success('Ditambahkan ke keranjang!');
      onClose();
    } catch {
      toast.error('Gagal menambahkan ke keranjang');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm" onClick={onClose}>
      <div className="glass rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-[var(--border-color)]" onClick={e => e.stopPropagation()}>
        <div className="relative">
          <img src={product.image} alt={product.name}
            className="w-full h-64 object-cover rounded-t-2xl"
            onError={e => { e.target.src = 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400'; }} />
          <button onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-black/50 backdrop-blur-sm rounded-full text-white hover:bg-black/70 transition-colors">
            <X size={20} />
          </button>
          <span className="absolute top-4 left-4 px-3 py-1 bg-purple-600/80 backdrop-blur-sm rounded-full text-sm text-white font-medium">
            {product.category}
          </span>
        </div>

        <div className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-1">{product.name}</h2>
              <div className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
                <Package size={14} />
                <span>Dijual oleh <span className="text-purple-400 font-semibold">{product.sellerName}</span></span>
              </div>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold gradient-text">{formatPrice(product.price)}</p>
              <p className="text-xs text-[var(--text-secondary)] opacity-70">Stok: {product.stock}</p>
            </div>
          </div>

          {/* Rating summary */}
          <div className="flex items-center gap-3 mb-4 p-3 bg-[var(--card-bg)] rounded-xl border border-[var(--border-color)]">
            <div className="flex items-center gap-1">
              {[1,2,3,4,5].map(i => (
                <Star key={i} size={16}
                  className={i <= Math.round(product.avgRating) ? 'text-yellow-400 fill-yellow-400' : 'text-[var(--text-secondary)] opacity-30'} />
              ))}
            </div>
            <span className="text-[var(--text-primary)] font-semibold">{product.avgRating > 0 ? product.avgRating.toFixed(1) : '0'}</span>
            <span className="text-[var(--text-secondary)] text-sm">({product.ratings.length} ulasan) · {product.sold} terjual</span>
          </div>

          <div className="mb-6">
            <h3 className="font-semibold text-[var(--text-primary)] mb-2">Deskripsi Produk</h3>
            <p className="text-[var(--text-secondary)] leading-relaxed">{product.description}</p>
          </div>

          {/* Reviews */}
          {product.ratings.length > 0 && (
            <div className="mb-6">
              <h3 className="font-semibold text-[var(--text-primary)] mb-3">Ulasan Pembeli</h3>
              <div className="space-y-3">
                {product.ratings.map((r, i) => (
                  <div key={i} className="p-3 bg-[var(--card-bg)] rounded-xl border border-[var(--border-color)]">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-7 h-7 btn-primary rounded-full flex items-center justify-center">
                        <User size={12} className="text-white" />
                      </div>
                      <span className="text-sm font-medium text-[var(--text-primary)]">{r.user}</span>
                      <div className="flex items-center gap-0.5 ml-auto">
                        {[1,2,3,4,5].map(s => (
                          <Star key={s} size={12}
                            className={s <= r.score ? 'text-yellow-400 fill-yellow-400' : 'text-[var(--text-secondary)] opacity-30'} />
                        ))}
                      </div>
                    </div>
                    <p className="text-[var(--text-secondary)] text-sm">{r.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          <button onClick={handleAddToCart}
            className="w-full btn-primary py-3 rounded-xl text-white font-semibold flex items-center justify-center gap-2">
            <ShoppingCart size={20} /> Tambah ke Keranjang
          </button>
        </div>
      </div>
    </div>
  );
}
