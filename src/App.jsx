import { CssBaseline } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import ErrorBoundary from './base/_common/ErrorBoundary';
import Popup from './base/layout/componetns/Dialog';
import Routes from './pages';
import ProfileProvider from './providers/ProfileProvider';
import configureStore from './store';
import MuiTheme from './styles/MuiTheme';
import Notifier from './base/layout/componetns/Notifier';
import NotificationProvider from './providers/NotificationProvider';
import httpService from './api/interceptor';

const store = configureStore();

const history = createBrowserHistory();
httpService.setupInterceptors(store, history);

function App() {
  return (
    <ThemeProvider theme={MuiTheme}>
      <ErrorBoundary>
        <CssBaseline />
        <Provider store={store}>
          <BrowserRouter>
            <NotificationProvider>
              <ProfileProvider>
                <Notifier />
                <Popup />
                <Routes />
              </ProfileProvider>
            </NotificationProvider>
          </BrowserRouter>
        </Provider>
      </ErrorBoundary>
    </ThemeProvider>
  );
}

export default App;
