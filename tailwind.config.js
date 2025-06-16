/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      keyframes: {
        'float-slow': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' }
        },
        'float-medium': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-15px)' }
        },
        'float-fast': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' }
        }
      },
      animation: {
        'float-slow': 'float-slow 3s ease-in-out infinite',
        'float-medium': 'float-medium 2.5s ease-in-out infinite',
        'float-fast': 'float-fast 2s ease-in-out infinite'
      }
    },
  },
  plugins: [],
}
