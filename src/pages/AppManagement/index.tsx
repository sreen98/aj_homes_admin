import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Snackbar, ThemeProvider, createTheme } from '@mui/material';
import rtlPlugin from 'stylis-plugin-rtl';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { prefixer } from 'stylis';

import { Routes } from 'routes';
import { hasLoginAccess } from 'config';
import { defaultTheme } from 'theme';

import * as Selectors from './selectors';
import * as Actions from './slice';
import { Layout } from './containers';
import { Alert } from 'components';

const stateSelector = createStructuredSelector({
  loading: Selectors.makeSelectLoading(),
  userData: Selectors.makeSelectUserData(),
  status: Selectors.makeStatusHandler(),
  showStatus: Selectors.makeShowStatus(),
  error: Selectors.makeSelectError(),
  mode: Selectors.makeSelectThemeMode(),
  currentLocale: Selectors.makeSelectCurrentLocale()
});
const AppManagement = (props: any) => {
  const { mode, currentLocale, status, showStatus } = useSelector(stateSelector);
  const dispatch = useDispatch();
  const { palette, ...rest } = defaultTheme;
  const isUserAuthenticated = hasLoginAccess();

  useEffect(() => {
    if (isUserAuthenticated) {
      dispatch(Actions.fetchUser());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isUserAuthenticated]);

  const theme = useMemo(
    () =>
      createTheme({
        palette: { ...palette, mode },
        ...rest,
        direction: currentLocale === 'en' ? 'ltr' : 'rtl'
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [mode, currentLocale, defaultTheme]
  );
  const handleClose = () => {
    dispatch(Actions.closeStatusMessage());
  };

  const cacheRtl = createCache({
    key: 'muirtl',
    stylisPlugins: [prefixer, rtlPlugin]
  });
  const cacheLtr = createCache({ key: 'muiltr', stylisPlugins: [prefixer] });

  return (
    <CacheProvider value={currentLocale === 'en' ? cacheLtr : cacheRtl}>
      <ThemeProvider theme={theme}>
        <Snackbar
          open={showStatus}
          autoHideDuration={5000}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right'
          }}
          sx={{
            position: 'fixed'
          }}
        >
          <Alert onClose={handleClose} severity={status.type ?? 'success'} sx={{ width: '100%' }}>
            {status.message}
          </Alert>
        </Snackbar>
        <Routes
          layout={Layout}
          isAuthenticated={isUserAuthenticated}
          layoutProps={{ dispatch: dispatch, mode, locale: currentLocale }}
        />
      </ThemeProvider>
    </CacheProvider>
  );
};

export default AppManagement;
