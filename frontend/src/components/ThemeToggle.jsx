import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 glass rounded-xl hover:bg-white/10 dark:hover:bg-white/5 transition-all duration-300 group"
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? (
        <Sun size={20} className="text-yellow-400 group-hover:rotate-45 transition-transform" />
      ) : (
        <Moon size={20} className="text-slate-700 group-hover:-rotate-12 transition-transform" />
      )}
    </button>
  );
}
