-- =======================================================
-- SCRIPT UPDATE SCHEMA PROFILE (Supabase)
-- =======================================================
-- Menambahkan kolom baru ke tabel profiles untuk mendukung role Buyer dan Seller
-- Jalankan script ini di SQL Editor Supabase Anda.

-- Tambahkan kolom untuk Buyer
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS username TEXT;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS email TEXT;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS phone_number TEXT;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS avatar TEXT;

-- Tambahkan kolom untuk Seller
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS shop_description TEXT;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS shop_logo_url TEXT;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS shop_banner_url TEXT;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS shop_address TEXT;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS shop_contact TEXT;

-- Buat Tabel Wishlist (opsional, jika belum ada)
CREATE TABLE IF NOT EXISTS wishlist (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  product_id UUID REFERENCES products(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- RLS Wishlist
ALTER TABLE wishlist ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage own wishlist" ON wishlist FOR ALL USING (auth.uid() = user_id);

-- Opsional: Perbarui role lama jika tidak sesuai (hanya jika diperlukan)
-- UPDATE profiles SET role = 'buyer' WHERE role IS NULL;
