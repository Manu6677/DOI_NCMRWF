/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    screens: {
      xs: '450px',
      typeAnimate: '510px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
    fontFamily: {
      inter: ['Inter', 'sans-serif'],
      'edu-sa': ['Edu SA Beginner', 'cursive'],
      mono: ['Roboto Mono', 'monospace'],
    },
    colors: {
      white: '#fff',
      black: '#000',
      transparent: '#ffffff00',
      light: {
        default: '#f6f9fc', // Added light color
      },
      socialMedia: {
        instagram: {
          purple: '#A13584',
          pink: '#F55945',
          orange: '#F6D06B',
        },
        facebook: '#1877F2',
        x: {
          dark: '#14171A',
          light: '#1DA1F2',
        },
        youtube: '#FF0000',
      },
      richblack: {
        5: '#F1F2FF',
        25: '#DBDDEA',
        50: '#C5C7D4',
        75: '#C4C6BD',
        100: '#AFB2BF',
        200: '#999DAA',
        300: '#838894',
        400: '#6E727F',
        500: '#585D69',
        600: '#424854',
        700: '#2C333F',
        800: '#161D29',
        900: '#000814',
      },
      blue: {
        50: '#e0f2ff', // Lightest blue
        100: '#b3e0ff', // Light blue
        200: '#80b3ff', // Sky blue
        300: '#4da6ff', // Medium blue
        400: '#1a8cff', // Bright blue
        500: '#023a73', // Dark Blue
        600: '#0a2d57', // Deeper blue
        700: '#003244', // Even deeper blue
        800: '#00203f', // Dark navy blue
        900: '#00172a', // Almost black blue
      },
      slate: {
        50: '#f0f4f8', // Very light slate
        100: '#c9d2dc', // Light slate
        200: '#a0b2c5', // Slate blue
        300: '#7c92af', // Light Slate Blue
        400: '#5b738e', // Medium slate
        500: '#475e7d', // Dark slate
        600: '#354759', // Deeper slate
        700: '#2a3743', // Dark navy slate
        800: '#1d2328', // Very dark slate
        900: '#14181b', // Almost black slate
      },
      orange: {
        50: '#fff4e0', // Lightest orange
        100: '#ffe0b3', // Lighter orange
        200: '#ffcc80', // Light orange
        300: '#ffb84d', // Medium light orange
        400: '#ffa31a', // Bright orange
        500: '#e48022', // Dark orange (your provided color)
        600: '#cc6e1f', // Deeper orange
        700: '#b35b1a', // Darker orange
        800: '#994916', // Deep dark orange
        900: '#803713', // Almost burnt orange
      },
      aquaGreen: '#00C9A7',
      customRed: {
        DEFAULT: '#BC1F1A', // Main color
        50: '#FFEBEE', // Lightest
        100: '#FFCDD2',
        200: '#EF9A9A',
        300: '#E57373',
        400: '#EF5350',
        500: '#BC1F1A', // Main color
        600: '#C62828',
        700: '#B71C1C',
        800: '#A50000',
        900: '#7E0000', // Darkest
      },
      red: {
        50: '#FFEBEE', // Lightest
        100: '#FFCDD2',
        200: '#EF9A9A',
        300: '#E57373',
        400: '#EF5350',
        500: '#BC1F1A', // Main color
        600: '#C62828',
        700: '#B71C1C',
        800: '#A50000',
        900: '#7E0000', // Darkest
      },
      green: {
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
    },
    extend: {},
  },
  plugins: [],
};
