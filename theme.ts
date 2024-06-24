'use client';
import { Roboto } from 'next/font/google';
import { createTheme } from '@mui/material/styles';

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
});

const theme = createTheme({
  typography: {
    fontFamily: roboto.style.fontFamily,
    fontSize: 17,
    h1: {
      fontFamily: roboto.style.fontFamily,
      fontWeight:500,
      fontSize: '3rem',
      '@media (min-width:600px)': {
        fontSize: '2rem',
      },
      '@media (min-width:960px)': {
        fontSize: '3rem',
      },
      '@media (min-width:1280px)': {
        fontSize: '4rem',
      },
    },
    h2: {
      fontFamily: roboto.style.fontFamily,
      fontWeight:500,
      fontSize: '2.5rem',
      '@media (min-width:600px)': {
        fontSize: '1.5rem',
      },
      '@media (min-width:960px)': {
        fontSize: '2.5rem',
      },
      '@media (min-width:1280px)': {
        fontSize: '3rem',
      },
  },
  },
  palette: {
    primary: {
      main: '#0052cc',
    },
    secondary: {
      main: '#0052cc',
    },
    background: {
      default: 'linear-gradient(to top, rgba(237, 249, 253, 0.67), rgba(132, 183, 200, 0.67))'
    }
  },
  
});

export default theme;
