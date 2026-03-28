/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Strict Retro OS Palette (Windows 98 Style)
        background: '#c0c0c0',
        panel: '#e0e0e0',
        primary: '#000080',
        text: '#000000',
        // Semantic mapping for the retro system
        window: '#c0c0c0',
        'window-light': '#ffffff',
        'window-dark': '#808080',
        'title-bar': '#000080',
        'title-text': '#ffffff',
        // Aliases to prevent breaking components that still use old class names
        dark: {
          900: '#c0c0c0', // bg
          800: '#e0e0e0', // panel
          700: '#808080', // window-dark
        },
        neon: {
          cyan: '#000080', // primary
          purple: '#000080',
          blue: '#000080',
        },

      },
      borderRadius: {
        'none': '0px',
        DEFAULT: '0px',
        sm: '0px',
        md: '0px',
        lg: '0px',
        xl: '0px',
        '2xl': '0px',
        '3xl': '0px',
        full: '0px',
      },
      borderWidth: {
        DEFAULT: '1px',
        '1': '1px',
        '2': '2px',
      },
      boxShadow: {
        // Classic Win98 3D borders
        'retro-out': '1px 1px 0 #ffffff inset, -1px -1px 0 #808080 inset',
        'retro-in': '1px 1px 0 #808080 inset, -1px -1px 0 #ffffff inset',
        'none': 'none',
      },
      backgroundImage: {
        'none': 'none',
      },
      backdropBlur: {
        'none': '0',
      },
    },
  },
  plugins: [],
}