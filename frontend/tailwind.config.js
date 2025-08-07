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
          // Main brand colors - Monochromatic greys
          primary: '#374151',
          primaryDark: '#1f2937',
          primaryLight: '#6b7280',
          
          // Background colors - Clean whites and light greys
          dark: '#ffffff',
          darker: '#f9fafb',
          light: '#f3f4f6',
          lighter: '#e5e7eb',
          
          // Text colors - Grey scale hierarchy
          text: '#111827',
          textSecondary: '#6b7280',
          textMuted: '#9ca3af',
          
          // Border colors - Subtle grey borders
          border: '#e5e7eb',
          borderLight: '#f3f4f6',
          
          // Status colors - Monochromatic versions
          success: '#374151',
          warning: '#6b7280',
          error: '#374151',
          info: '#9ca3af',
          
          // Blue colors for interactive elements
          blue: '#3b82f6',
          blueDark: '#2563eb',
          blueLight: '#60a5fa',
          
          // Glass effect colors - Pure whites and greys
          glass: 'rgba(255, 255, 255, 0.8)',
          glassDark: 'rgba(255, 255, 255, 0.6)',
          glassLight: 'rgba(255, 255, 255, 0.95)',
          glassBorder: 'rgba(0, 0, 0, 0.1)',
          glassOverlay: 'rgba(0, 0, 0, 0.05)',
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

