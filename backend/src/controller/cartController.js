import { supabase } from '../config/supabaseClient.js';

// 1. Get user cart
export const getCart = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('cart')
      .select('*, products(*)')
      .eq('user_id', req.user.id);

    if (error) throw error;
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 2. Add item to cart
export const addCartItem = async (req, res) => {
  try {
    const { product_id, quantity } = req.body;

    // Check if item already exists
    const { data: existing, error: checkError } = await supabase
      .from('cart')
      .select('*')
      .eq('user_id', req.user.id)
      .eq('product_id', product_id)
      .maybeSingle();

    if (checkError) throw checkError;

    if (existing) {
      // Update quantity
      const { data, error } = await supabase
        .from('cart')
        .update({ quantity: existing.quantity + Number(quantity) })
        .eq('id', existing.id)
        .select();
      if (error) throw error;
      res.json(data[0]);
    } else {
      // Insert new
      const { data, error } = await supabase
        .from('cart')
        .insert([{
          user_id: req.user.id,
          product_id,
          quantity: Number(quantity)
        }])
        .select();
      if (error) throw error;
      res.status(201).json(data[0]);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 3. Update cart item quantity
export const updateCartItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;

    const { data, error } = await supabase
      .from('cart')
      .update({ quantity: Number(quantity) })
      .eq('id', id)
      .eq('user_id', req.user.id)
      .select();

    if (error) throw error;
    res.json(data[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 4. Remove item from cart
export const removeCartItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { error } = await supabase
      .from('cart')
      .delete()
      .eq('id', id)
      .eq('user_id', req.user.id);

    if (error) throw error;
    res.json({ message: "Produk berhasil dihapus dari keranjang" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
