import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { Copyright } from 'components';
import { Toolbar } from '@mui/material';

export default function DashboardManagement() {
  return (
    <Box sx={{ display: 'flex' }}>
      <Box
        component="main"
        sx={{
          backgroundColor: theme =>
            theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[900],
          flexGrow: 1,
          height: '100vh',
          overflow: 'auto'
        }}
      >
        <Toolbar />
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Copyright sx={{ pt: 4 }} />
        </Container>
      </Box>
    </Box>
  );
}
