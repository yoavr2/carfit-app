// components/ResponsiveBox.js
import * as React from 'react';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { ReactNode } from 'react';

const ResponsiveBox = ({children} : {children : ReactNode}) => {
  const theme = useTheme();
  const matchesSm = useMediaQuery(theme.breakpoints.up('sm'));
  const matchesMd = useMediaQuery(theme.breakpoints.up('md'));
  const matchesLg = useMediaQuery(theme.breakpoints.up('lg'));
  const matchesXl = useMediaQuery(theme.breakpoints.up('xl'));

  let width = '100%';
  let height = '200px';
  if (matchesXl) {
    width = '50%';
    height = '270px';
  } else if (matchesLg) {
    width = '40%';
    height = '500px';
  } else if (matchesMd) {
    width = '60%';
    height = '400px';
  } else if (matchesSm) {
    width = '80%';
    height = '230px';
  }

  return (
    <Box
    flexShrink={0} 
      sx={{
        width,
        height,
        background:'linear-gradient(to right, rgba(253, 253, 253, 0.60), rgba(228, 228, 228, 0.60))', 
        position:'relative', 
        alignItems:'center', 
        display:'flex', 
        flexDirection:'column'
      }}
    >
      {children}
    </Box>
  );
};

export default ResponsiveBox;
