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
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
        },
        hackerrank: {
          // Main brand colors - HackerRank green
          green: '#00ea64',
          greenDark: '#00c853',
          greenLight: '#00ff6b',
          
          // Background colors - Clean, modern grays
          dark: '#0f1419',
          darker: '#0a0e13',
          light: '#1a1f2e',
          lighter: '#2a2f3e',
          
          // Text colors - Better contrast
          text: '#ffffff',
          textSecondary: '#a0aec0',
          textMuted: '#718096',
          
          // Border colors - Subtle and modern
          border: '#2d3748',
          borderLight: '#4a5568',
          
          // Accent colors
          blue: '#3182ce',
          blueLight: '#63b3ed',
          yellow: '#d69e2e',
          yellowLight: '#f6e05e',
          red: '#e53e3e',
          redLight: '#fc8181',
          
          // Status colors
          success: '#00ea64',
          warning: '#f6ad55',
          error: '#fc8181',
          info: '#63b3ed',
        }
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'Fira Code', 'Consolas', 'monospace'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'hackerrank': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'hackerrank-lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
}

