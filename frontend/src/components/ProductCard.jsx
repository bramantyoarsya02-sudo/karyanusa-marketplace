import { Star, ShoppingCart, Package } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const formatPrice = (p) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(p);

export default function ProductCard({ product, onClick }) {
  const { addToCart } = useCart();
  const { user } = useAuth();

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

  return (
    <div onClick={onClick} className="glass rounded-2xl overflow-hidden card-hover cursor-pointer group border border-[var(--border-color)]">
      <div className="relative overflow-hidden h-48">
        <img src={product.image} alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={e => { e.target.src = 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400'; }} />
        <div className="absolute top-3 left-3">
          <span className="px-2 py-1 bg-purple-600/80 backdrop-blur-sm rounded-full text-xs text-white font-medium">
            {product.category}
          </span>
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
              <Package size={10} /> {product.sellerName}
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
