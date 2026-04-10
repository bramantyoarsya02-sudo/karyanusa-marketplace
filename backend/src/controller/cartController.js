import { getAuthClient } from '../config/supabaseClient.js';

// Helper to fetch full cart with products - now accepts scoped client
const getFullCart = async (supabase, userId) => {
  const { data, error } = await supabase
    .from('cart')
    .select('*, products(*)')
    .eq('user_id', userId);
  if (error) throw error;
  return data || [];
};

// 1. Get user cart
export const getCart = async (req, res) => {
  try {
    const supabase = getAuthClient(req);
    const data = await getFullCart(supabase, req.user.id);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 2. Add item to cart
export const addCartItem = async (req, res) => {
  try {
    const { product_id, quantity } = req.body;
    const supabase = getAuthClient(req);

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
      const { error } = await supabase
        .from('cart')
        .update({ quantity: existing.quantity + Number(quantity) })
        .eq('id', existing.id);
      if (error) throw error;
    } else {
      // Insert new
      const { error } = await supabase
        .from('cart')
        .insert([{
          user_id: req.user.id,
          product_id,
          quantity: Number(quantity)
        }]);
      if (error) throw error;
    }

    // Always return full updated cart using the scoped client
    const fullCart = await getFullCart(supabase, req.user.id);
    res.status(existing ? 200 : 201).json(fullCart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 3. Update cart item quantity
export const updateCartItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;
    const supabase = getAuthClient(req);

    const { error } = await supabase
      .from('cart')
      .update({ quantity: Number(quantity) })
      .eq('id', id)
      .eq('user_id', req.user.id);

    if (error) throw error;

    // Return full updated cart
    const fullCart = await getFullCart(supabase, req.user.id);
    res.json(fullCart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 4. Remove item from cart
export const removeCartItem = async (req, res) => {
  try {
    const { id } = req.params;
    const supabase = getAuthClient(req);

    const { error } = await supabase
      .from('cart')
      .delete()
      .eq('id', id)
      .eq('user_id', req.user.id);

    if (error) throw error;

    // Return full updated cart
    const fullCart = await getFullCart(supabase, req.user.id);
    res.json(fullCart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

