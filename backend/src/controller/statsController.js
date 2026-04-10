import { supabase } from '../config/supabaseClient.js';

// Get Seller Stats
export const getSellerStats = async (req, res) => {
  try {
    // 1. Total Penjualan & Produk Terlaris (dari tabel products)
    const { data: products, error: productsError } = await supabase
      .from('products')
      .select('name, price, sold, stock')
      .eq('seller_id', req.user.id);

    if (productsError) throw productsError;

    const totalSold = products.reduce((sum, p) => sum + (p.sold || 0), 0);
    const totalRevenue = products.reduce((sum, p) => sum + ((p.sold || 0) * p.price), 0);
    const bestSellers = [...products].sort((a, b) => b.sold - a.sold).slice(0, 5);

    // 2. Count Active Orders
    const { count: activeOrders, error: ordersError } = await supabase
      .from('orders')
      .select('id', { count: 'exact', head: true })
      .neq('status', 'delivered')
      .neq('status', 'cancelled');

    if (ordersError) throw ordersError;

    res.json({
      totalSold,
      totalRevenue,
      bestSellers,
      activeOrders: activeOrders || 0,
      totalProducts: products.length
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
