module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        firago: ['glaho', 'regular'],
      },
      gradientColorStops: (theme) => ({
        ...theme('colors'),
        violet: '#801df0',
        violetDark: '#501296',
      }),
      colors: {
        darkBackground: '#0B0B0A',
        darkText: '#C2C2C2',
        darkModal: '#101110',
        darkHover: '#000000',
        darkCard: '#101110',
        darkBorder: '#222222',
        lightBackground: '#f8f9fa',
        lightText: '#212529',
        lightModal: '#f8f9fa',
        lightHover: '#e9ecef',
        lightCard: '#FFFFFF',
        lightBorder: '#e9ecef',
        primary: '#CC9600',
        dark: '#320073',
        warning: '#EDC31A',
        info: '#1AAAED',
        error: '#ED1A1A',
      },
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
      },
    },
  },
  plugins: [],
}
