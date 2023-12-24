import * as React from 'react';
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
import { useDispatch } from 'react-redux';
import { logout } from 'pages/AuthenticationManagement/slice';
import { secondaryListItems } from 'pages/AppManagement/components';
import { AppBar, Drawer } from 'components';
import { mainList } from 'pages/AppManagement/components/ListItems';
import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import PersonIcon from '@mui/icons-material/Person';
import HouseIcon from '@mui/icons-material/House';
import { localRedirect } from 'utils';
import messages from './messages';

export default function Layout({ children }: { children: any }) {
  const [open, setOpen] = React.useState(false);
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
    } else if (data.icon === 'customers') {
      return <PeopleIcon />;
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
            pr: '24px' // keep right padding when drawer closed
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
          <IconButton color="inherit" onClick={() => dispatch(logout())}>
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
          {secondaryListItems}
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
