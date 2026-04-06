import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock } from 'lucide-react';
import logo from '../assets/logo.png';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import ThemeToggle from '../components/ThemeToggle';

export default function LoginPage() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login, loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password) return toast.error('Semua field wajib diisi');
    setLoading(true);
    try {
      await login(form.email, form.password);
      toast.success('Selamat datang kembali!');
      navigate('/home');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login gagal');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--bg-color)] transition-colors duration-300 flex items-center justify-center px-4 relative overflow-hidden">
      <div className="absolute top-6 right-6 z-50">
        <ThemeToggle />
      </div>
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/10 dark:bg-purple-600/15 rounded-full blur-3xl pointer-events-none transition-colors" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-600/10 dark:bg-cyan-600/15 rounded-full blur-3xl pointer-events-none transition-colors" />

      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-6">
            <img src={logo} alt="KaryaNusa Logo" className="w-10 h-10 rounded-xl object-contain" />
            <span className="text-2xl font-bold gradient-text">KaryaNusa</span>
          </Link>
          <h1 className="text-3xl font-bold text-[var(--text-primary)] mb-2">Selamat Datang</h1>
          <p className="text-[var(--text-secondary)]">Masuk ke akun KaryaNusa Anda</p>
        </div>

        <div className="glass rounded-2xl p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">Email</label>
              <div className="relative">
                <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-secondary)] opacity-50" />
                <input
                  type="email" placeholder="nama@email.com"
                  value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
                  className="w-full bg-[var(--card-bg)] border border-[var(--border-color)] rounded-xl pl-10 pr-4 py-3 text-[var(--text-primary)] placeholder-[var(--text-secondary)] opacity-70 focus:opacity-100 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">Password</label>
              <div className="relative">
                <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-secondary)] opacity-50" />
                <input
                  type={show ? 'text' : 'password'} placeholder="Masukkan password"
                  value={form.password} onChange={e => setForm({ ...form, password: e.target.value })}
                  className="w-full bg-[var(--card-bg)] border border-[var(--border-color)] rounded-xl pl-10 pr-12 py-3 text-[var(--text-primary)] placeholder-[var(--text-secondary)] opacity-70 focus:opacity-100 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
                />
                <button type="button" onClick={() => setShow(!show)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] opacity-50 hover:opacity-100 transition-opacity">
                  {show ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button type="submit" disabled={loading}
              className="w-full btn-primary py-3 rounded-xl text-white font-semibold text-base disabled:opacity-60 disabled:cursor-not-allowed">
              {loading ? 'Memproses...' : 'Masuk'}
            </button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[var(--border-color)]"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-[var(--bg-color)] text-[var(--text-secondary)]">Atau masuk dengan</span>
            </div>
          </div>

          <button
            onClick={async () => {
              try {
                await loginWithGoogle();
              } catch (err) {
                toast.error(err.message || 'Gagal login dengan Google');
              }
            }}
            className="w-full flex items-center justify-center gap-3 bg-[var(--card-bg)] hover:bg-[var(--card-hover-bg)] border border-[var(--border-color)] py-3 rounded-xl text-[var(--text-primary)] font-medium transition-all"
          >
            <svg className="w-5 h-5 font-bold" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-1 .67-2.28 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.84z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            Masuk dengan Google
          </button>

          <div className="mt-6 text-center">
            <p className="text-[var(--text-secondary)] text-sm">
              Belum punya akun?{' '}
              <Link to="/register" className="text-purple-500 hover:text-purple-400 font-bold transition-colors">
                Daftar sekarang
              </Link>
            </p>
          </div>
        </div>

        <p className="text-center text-gray-600 text-xs mt-6">
          Dengan masuk, Anda menyetujui Syarat & Ketentuan KaryaNusa
        </p>
      </div>
    </div>
  );
}

