import { useState } from 'react';
import { Star, ShoppingCart, Package, Heart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import api from '../api/axios';

const formatPrice = (p) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(p);

export default function ProductCard({ product, onClick, onDelete, initialWishlisted = false }) {
  const { addToCart } = useCart();
  const { user } = useAuth();
  const [isWishlisted, setIsWishlisted] = useState(initialWishlisted);
  const [wishlistLoading, setWishlistLoading] = useState(false);

  const handleAddToCart = async (e) => {
    e.stopPropagation();
    if (!user) return toast.error('Login terlebih dahulu');
    try {
      await addToCart(product.id);
      toast.success('Ditambahkan ke keranjang!');
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
    <div onClick={onClick} className="glass rounded-2xl overflow-hidden card-hover cursor-pointer group border border-[var(--border-color)]">
      <div className="relative overflow-hidden h-48">
        <img src={product.image} alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={e => { e.target.src = 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400'; }} />
        <div className="absolute top-3 left-3 flex flex-col gap-2">
        </div>

        <div className="absolute top-3 right-3 flex flex-col gap-2">
          {/* Wishlist Heart - Only for Buyers */}
          {user?.role === 'buyer' && (
            <button
              onClick={handleWishlist}
              disabled={wishlistLoading}
              className={`p-2 backdrop-blur-md rounded-full transition-all ${
                isWishlisted 
                ? 'bg-red-500 text-white shadow-lg' 
                : 'bg-black/20 text-white hover:bg-white/20'
              }`}
            >
              <Heart size={16} fill={isWishlisted ? "currentColor" : "none"} />
            </button>
          )}
          
          {/* Delete Button (for Owner) */}
          {user?.id === product.seller_id && (
            <button
              onClick={async (e) => {
                e.stopPropagation();
                const confirmed = window.confirm('Apakah Anda yakin ingin menghapus ini?');
                if (confirmed && typeof onDelete === 'function') {
                  onDelete(product.id);
                }
              }}
              className="p-2 bg-red-500/80 hover:bg-red-600 backdrop-blur-sm rounded-full text-white transition-colors"
              title="Hapus Produk Ini"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path></svg>
            </button>
          )}
        </div>
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-[var(--text-primary)] mb-1 line-clamp-1">{product.name}</h3>
        <p className="text-[var(--text-secondary)] text-xs mb-3 line-clamp-2">{product.description}</p>

        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center gap-1">
            {[1,2,3,4,5].map(i => (
              <Star key={i} size={12}
                className={i <= Math.round(product.avgRating) ? 'text-yellow-400 fill-yellow-400' : 'text-[var(--text-secondary)] opacity-30'} />
            ))}
          </div>
          <span className="text-xs text-[var(--text-secondary)]">
            {product.avgRating > 0 ? product.avgRating.toFixed(1) : 'Belum ada'} · {product.sold} terjual
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <p className="text-lg font-bold gradient-text">{formatPrice(product.price)}</p>
            <p className="text-xs text-[var(--text-secondary)] opacity-70 flex items-center gap-1">
              {product.sellerName}
            </p>
          </div>
          <button onClick={handleAddToCart}
            className="p-2.5 btn-primary rounded-xl text-white hover:opacity-90 transition-opacity">
            <ShoppingCart size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
