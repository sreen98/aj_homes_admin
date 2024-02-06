import * as React from 'react';
import { useDispatch } from 'react-redux';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import LogoutIcon from '@mui/icons-material/Logout';
import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import HouseIcon from '@mui/icons-material/House';
import FeedbackIcon from '@mui/icons-material/Feedback';

import { localRedirect } from 'utils';
import { mainList } from 'config';
import { AppBar, Drawer } from 'components';

import messages from './messages';
import { logoutUser } from 'pages/AuthenticationManagement/slice';

export default function Layout({ children }: Readonly<{ children: any }>) {
  const [open, setOpen] = React.useState(true);
  const dispatch = useDispatch();
  const toggleDrawer = () => {
    setOpen(!open);
  };

  const onClickDrawerItem = (id: string) => {
    localRedirect(`/${id}`);
  };

  const DrawerIcon = (data: { icon: string }) => {
    if (data.icon === 'properties') {
      return <HouseIcon />;
    } else if (data.icon === 'enquiries') {
      return <FeedbackIcon />;
    } else {
      return <PersonIcon />;
    }
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="absolute" open={open}>
        <Toolbar
          sx={{
            pr: '24px'
          }}
        >
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer}
            sx={{
              marginRight: '36px',
              ...(open && { display: 'none' })
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography component="h1" variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
            {messages.title}
          </Typography>
          <IconButton color="inherit" onClick={() => dispatch(logoutUser())}>
            <LogoutIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <Toolbar
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            px: [1]
          }}
        >
          <Typography component="h1" variant="h6" color="inherit" noWrap sx={{ flexGrow: 1, paddingLeft: '2rem' }}>
            {messages.companyName}
          </Typography>
          <IconButton onClick={toggleDrawer}>
            <ChevronLeftIcon />
          </IconButton>
        </Toolbar>
        <Divider />
        <List component="nav">
          {mainList.map(item => {
            return (
              <ListItemButton onClick={() => onClickDrawerItem(item.id)} key={item.id}>
                <ListItemIcon>
                  <DrawerIcon icon={item.id} />
                </ListItemIcon>
                <ListItemText primary={item.name} />
              </ListItemButton>
            );
          })}
          <Divider sx={{ my: 1 }} />
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{
          backgroundColor: theme =>
            theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[900],
          flexGrow: 1,
          overflowX: 'hidden'
        }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
}
