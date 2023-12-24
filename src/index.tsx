import ReactDOM from 'react-dom/client';
import { CssBaseline } from '@mui/material';
import { Provider } from 'react-redux';
import React from 'react';
import { ConnectedRouter } from 'connected-react-router';
import { withRouter } from 'react-router-dom';
import { store } from 'store/store';
import { history } from 'utils';

import './index.css';
import reportWebVitals from './reportWebVitals';
import AppManagement from './pages/AppManagement';

class ScrollToTop extends React.Component<any> {
  public componentDidUpdate(prevProps: any) {
    if (this.props.location !== prevProps.location) {
      window.scrollTo(0, 0);
    }
  }
  public render() {
    const { children, location } = this.props;
    return React.cloneElement(children as any, {
      location
    });
  }
}

const ScrollToTopHandler = withRouter(ScrollToTop);

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <CssBaseline />
      <ScrollToTopHandler>
        <AppManagement />
      </ScrollToTopHandler>
    </ConnectedRouter>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
