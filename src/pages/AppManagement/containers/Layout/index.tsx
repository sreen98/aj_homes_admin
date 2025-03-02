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
import ApartmentIcon from '@mui/icons-material/Apartment';
import SchoolIcon from '@mui/icons-material/School';
import ReceiptIcon from '@mui/icons-material/Receipt';
import OtherHousesIcon from '@mui/icons-material/OtherHouses';
import { ListItemButton, ListItemIcon, ListItemText, Collapse } from '@mui/material';
import HouseIcon from '@mui/icons-material/House';
import FeedbackIcon from '@mui/icons-material/Feedback';

import { getEncodedQueryParams, localRedirect } from 'utils';
import { mainList } from 'config';
import { AppBar, Drawer } from 'components';

import messages from './messages';
import { logoutUser } from 'pages/AuthenticationManagement/slice';
import { ExpandLess, ExpandMore } from '@mui/icons-material';

export default function Layout({ children }: Readonly<{ children: any }>) {
  const [open, setOpen] = React.useState(false);
  const [propertiesOpen, setPropertiesOpen] = React.useState(true);

  const dispatch = useDispatch();
  const toggleDrawer = () => {
    setOpen(!open);
  };

  const onClickDrawerItem = (id: string) => {
    localRedirect(`/admin/${id}`);
  };

  const onClickPropertyItem = (id: string) => {
    const search = getEncodedQueryParams({ category: id });
    localRedirect(`/admin/properties`, { search });
  };

  const DrawerIcon = (data: { icon: string }) => {
    switch (data.icon) {
      case 'properties':
        return <HouseIcon />;
      case 'enquiries':
        return <FeedbackIcon />;
      case 'forSale':
        return <ReceiptIcon />;
      case 'studentLettings':
        return <SchoolIcon />;
      case 'residentialLettings':
        return <ApartmentIcon />;
      case 'all':
        return <OtherHousesIcon />;
      default:
        return null;
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
              <>
                {item?.subList?.length && (
                  <>
                    <ListItemButton onClick={() => setPropertiesOpen(!propertiesOpen)}>
                      <ListItemIcon>
                        <DrawerIcon icon={item.id} />
                      </ListItemIcon>
                      <ListItemText primary={item.name} />
                      {propertiesOpen ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <Collapse in={propertiesOpen} timeout="auto" unmountOnExit>
                      <List component="div" disablePadding>
                        {item?.subList?.map(ele => (
                          <ListItemButton sx={{ pl: 4 }} key={ele.id} onClick={() => onClickPropertyItem(ele.id)}>
                            <ListItemIcon>
                              <DrawerIcon icon={ele.id} />
                            </ListItemIcon>
                            <ListItemText primary={ele.name} />
                          </ListItemButton>
                        ))}
                      </List>
                    </Collapse>
                  </>
                )}
                {!item?.subList?.length && (
                  <ListItemButton onClick={() => onClickDrawerItem(item.id)} key={item.id}>
                    <ListItemIcon>
                      <DrawerIcon icon={item.id} />
                    </ListItemIcon>
                    <ListItemText primary={item.name} />
                  </ListItemButton>
                )}
              </>
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
          overflowX: 'hidden',
          minHeight: '100vh'
        }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
}
