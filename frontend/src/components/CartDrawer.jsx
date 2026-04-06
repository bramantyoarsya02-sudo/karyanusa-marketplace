import { X, Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

const formatPrice = (p) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(p);

export default function CartDrawer({ open, onClose }) {
  const { cart, updateCart, removeFromCart, cartTotal } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    onClose();
    navigate('/checkout');
  };

  return (
    <>
      {open && <div className="fixed inset-0 bg-black/60 z-40 backdrop-blur-sm" onClick={onClose} />}
      <div className={`fixed top-0 right-0 h-full w-full sm:w-96 z-50 glass border-l border-[var(--border-color)] flex flex-col transition-transform duration-300 ${open ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex items-center justify-between p-5 border-b border-[var(--border-color)]">
          <h2 className="text-lg font-bold text-[var(--text-primary)] flex items-center gap-2">
            <ShoppingBag size={20} className="text-purple-400" /> Keranjang
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-[var(--card-hover-bg)] rounded-lg transition-colors">
            <X size={20} className="text-[var(--text-secondary)]" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <ShoppingBag size={48} className="text-[var(--text-secondary)] opacity-30 mb-4" />
              <p className="text-[var(--text-secondary)]">Keranjang masih kosong</p>
              <p className="text-[var(--text-secondary)] opacity-50 text-sm mt-1">Tambahkan produk untuk mulai belanja</p>
            </div>
          ) : (
            cart.map(item => (
              <div key={item.productId} className="flex gap-3 p-3 bg-[var(--card-bg)] rounded-xl border border-[var(--border-color)]">
                <img src={item.image} alt={item.name}
                  className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
                  onError={e => { e.target.src = 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400'; }} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-[var(--text-primary)] line-clamp-1">{item.name}</p>
                  <p className="text-purple-400 text-sm font-semibold">{formatPrice(item.price)}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <button onClick={() => updateCart(item.productId, item.quantity - 1)}
                      className="w-6 h-6 bg-[var(--card-hover-bg)] rounded-md flex items-center justify-center hover:bg-purple-500/20 transition-colors">
                      <Minus size={12} className="text-[var(--text-primary)]" />
                    </button>
                    <span className="text-sm text-[var(--text-primary)] w-6 text-center">{item.quantity}</span>
                    <button onClick={() => updateCart(item.productId, item.quantity + 1)}
                      className="w-6 h-6 bg-[var(--card-hover-bg)] rounded-md flex items-center justify-center hover:bg-purple-500/20 transition-colors">
                      <Plus size={12} className="text-[var(--text-primary)]" />
                    </button>
                    <button onClick={() => removeFromCart(item.productId)}
                      className="ml-auto p-1 text-red-400 hover:text-red-300 transition-colors">
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div className="p-4 border-t border-[var(--border-color)]">
            <div className="flex justify-between items-center mb-4">
              <span className="text-[var(--text-secondary)]">Total</span>
              <span className="text-xl font-bold gradient-text">{formatPrice(cartTotal)}</span>
            </div>
            <button onClick={handleCheckout}
              className="w-full btn-primary py-3 rounded-xl text-white font-semibold">
              Lanjut ke Pembayaran
            </button>
          </div>
        )}
      </div>
    </>
  );
}
