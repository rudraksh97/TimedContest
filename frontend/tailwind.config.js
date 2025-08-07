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
          50: '#fef7f0',
          100: '#fdecd4',
          200: '#fbd5a8',
          300: '#f8b871',
          400: '#f59338',
          500: '#f2751a',
          600: '#e35a0f',
          700: '#bc4310',
          800: '#963614',
          900: '#792e14',
        },
        meta: {
          // Main brand colors - Warm brown
          blue: '#d97706',
          blueDark: '#b45309',
          blueLight: '#f59e0b',
          
          // Background colors - Light, warm whites and creams
          dark: '#fefefe',
          darker: '#fafaf9',
          light: '#fefcfb',
          lighter: '#fef3f2',
          
          // Text colors - Rich browns and grays
          text: '#292524',
          textSecondary: '#57534e',
          textMuted: '#78716c',
          
          // Border colors - Soft, warm borders
          border: '#e7e5e4',
          borderLight: '#f3f4f6',
          
          // Accent colors - Warm, earthy tones
          purple: '#a855f7',
          purpleLight: '#c084fc',
          yellow: '#f59e0b',
          yellowLight: '#fbbf24',
          red: '#ef4444',
          redLight: '#f87171',
          
          // Status colors - Muted, warm versions
          success: '#059669',
          warning: '#d97706',
          error: '#dc2626',
          info: '#2563eb',
        }
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'Fira Code', 'Consolas', 'monospace'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'meta': '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
        'meta-lg': '0 10px 15px -3px rgba(0, 0, 0, 0.05), 0 4px 6px -2px rgba(0, 0, 0, 0.03)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
}

