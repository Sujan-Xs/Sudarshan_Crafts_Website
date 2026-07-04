/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          bg: '#F8F4EE',         // Primary Background: warm luxury white
          secondary: '#E8DED0',  // Secondary Background: warm stone secondary
          sandstone: '#D6C2A8',  // Sacred Sandstone
          text: '#1E1A17',       // Primary Text: deep rich charcoal-brown
          charcoal: '#1E1A17',   // Alias for text
          sand: '#E8DED0',       // Alias for secondary background
          bronze: '#9A7652',     // Bronze Accent
          deepbrown: '#4A3728',  // Deep Temple Brown
          dark: '#111111',       // Luxury Dark
          saffron: '#C97D42',    // Muted saffron-gold used very sparingly
          grey: '#726B63',       // Refined Muted Stone Grey
        }
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', '"Playfair Display"', 'serif'],
        sans: ['Inter', 'sans-serif'],
      },
      letterSpacing: {
        widest: '0.25em',
        luxury: '0.15em',
      },
      backgroundImage: {
        'stone-gradient': 'linear-gradient(135deg, #F6F2EA 0%, #E7DED1 100%)',
        'dark-stone': 'linear-gradient(135deg, #1A1A17 0%, #111111 100%)',
        'bronze-shimmer': 'linear-gradient(90deg, #9C7B52 0%, #C5A880 50%, #9C7B52 100%)',
      },
      animation: {
        'fade-in-up': 'fadeInUp 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'fade-in': 'fadeIn 1s ease-out forwards',
        'pulse-subtle': 'pulseSubtle 3s ease-in-out infinite',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '0.8' },
          '50%': { opacity: '1' },
        }
      }
    },
  },
  plugins: [],
}
