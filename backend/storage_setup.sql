-- =======================================================
-- SCRIPT SETUP STORAGE BUCKET "products" DI SUPABASE
-- =======================================================
-- Deskripsi:
-- Berhubung backend (Node.js) Anda saat ini beroperasi menggunakan 
-- Anon Key (Tanpa Service Role), sistem tidak diizinkan secara otomatis 
-- membuat Bucket Storage untuk pertama kali karena alasan keamanan keamanan Server.
--
-- CARA PENGGUNAAN:
-- 1. Buka Dashboard Supabase Anda (https://supabase.com/dashboard)
-- 2. Pilih Project Anda ("projek1 - supabase" atau sejenisnya)
-- 3. Pergi ke menu "SQL Editor" di bilah kiri.
-- 4. Klik "New query" dan salin/tempelkan SEMUA kode SQL di bawah ini.
-- 5. Klik tombol RUN (atau tekan CMD/CTRL + Enter).
-- =======================================================

-- 1. Buat bucket baru: 'products', 'avatars', dan 'shops'
INSERT INTO storage.buckets (id, name, public) 
VALUES 
  ('products', 'products', true),
  ('avatars', 'avatars', true),
  ('shops', 'shops', true)
ON CONFLICT (id) DO NOTHING;

-- 2. Kebijakan UNTUK BUCKET 'products'
DROP POLICY IF EXISTS "Public Access Products" ON storage.objects;
CREATE POLICY "Public Access Products" ON storage.objects FOR SELECT USING (bucket_id = 'products');

DROP POLICY IF EXISTS "Auth Users Upload Products" ON storage.objects;
CREATE POLICY "Auth Users Upload Products" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'products' AND auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Users manage own product images" ON storage.objects;
CREATE POLICY "Users manage own product images" ON storage.objects FOR ALL USING (bucket_id = 'products' AND auth.uid()::text = (string_to_array(name, '/'))[1]);

-- 3. Kebijakan UNTUK BUCKET 'avatars' (Foto Profil)
DROP POLICY IF EXISTS "Public Access Avatars" ON storage.objects;
CREATE POLICY "Public Access Avatars" ON storage.objects FOR SELECT USING (bucket_id = 'avatars');

DROP POLICY IF EXISTS "Users can upload own avatar" ON storage.objects;
CREATE POLICY "Users can upload own avatar" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'avatars' AND auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Users can manage own avatar" ON storage.objects;
CREATE POLICY "Users can manage own avatar" ON storage.objects FOR ALL USING (bucket_id = 'avatars' AND auth.uid()::text = (string_to_array(name, '/'))[1]);

-- 4. Kebijakan UNTUK BUCKET 'shops' (Logo & Banner Toko)
DROP POLICY IF EXISTS "Public Access Shops" ON storage.objects;
CREATE POLICY "Public Access Shops" ON storage.objects FOR SELECT USING (bucket_id = 'shops');

DROP POLICY IF EXISTS "Sellers can upload shop assets" ON storage.objects;
CREATE POLICY "Sellers can upload shop assets" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'shops' AND auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Sellers can manage shop assets" ON storage.objects;
CREATE POLICY "Sellers can manage shop assets" ON storage.objects FOR ALL USING (bucket_id = 'shops' AND auth.uid()::text = (string_to_array(name, '/'))[1]);

-- Selesai! Setelah SQL ini berhasil dijalankan, Anda bisa menggunakan
-- fitur Foto Profil, Logo Toko, dan Produk tanpa error!
