/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
        meta: {
          // Main brand colors - Meta blue
          blue: '#0ea5e9',
          blueDark: '#0284c7',
          blueLight: '#38bdf8',
          
          // Background colors - Clean, modern grays
          dark: '#0f172a',
          darker: '#020617',
          light: '#1e293b',
          lighter: '#334155',
          
          // Text colors - Better contrast
          text: '#f8fafc',
          textSecondary: '#cbd5e1',
          textMuted: '#94a3b8',
          
          // Border colors - Subtle and modern
          border: '#334155',
          borderLight: '#475569',
          
          // Accent colors
          purple: '#8b5cf6',
          purpleLight: '#a78bfa',
          yellow: '#f59e0b',
          yellowLight: '#fbbf24',
          red: '#ef4444',
          redLight: '#f87171',
          
          // Status colors
          success: '#10b981',
          warning: '#f59e0b',
          error: '#ef4444',
          info: '#3b82f6',
        }
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'Fira Code', 'Consolas', 'monospace'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'meta': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'meta-lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
}

