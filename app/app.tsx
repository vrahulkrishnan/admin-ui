import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';

// Import all the third party stuff
import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { MantineProvider, createEmotionCache } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import { NotificationsProvider } from '@mantine/notifications';
import { ConnectedRouter } from 'connected-react-router';
import { withRouter } from 'react-router-dom';
import FontFaceObserver from 'fontfaceobserver';
import { history } from 'utils/history';
import 'sanitize.css/sanitize.css';
import AppManagement from 'pages/AppManagement';

import { theme } from './theme';
// Import root app

// Load the favicon and the .htaccess file
import 'file-loader?name=.htaccess!./.htaccess';

import configureStore from './configureStore';

// Observe loading of Open Sans (to remove open sans, remove the <link> tag in
// the index.html file and this observer)
const montserratObserver = new FontFaceObserver('Montserrat', {});

// When Open Sans is loaded, add a font-family using Open Sans to the body
montserratObserver.load().then(() => {
  document.body.classList.add('fontLoaded');
});

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

// Create redux store with history
const initialState = {};
const store = configureStore(initialState, history);
const MOUNT_NODE = document.getElementById('app') as HTMLElement;

const root = createRoot(MOUNT_NODE);

const render = (Component = AppManagement) => {
  root.render(
    // tslint:disable-next-line:jsx-wrap-multiline
    <MantineProvider theme={theme} emotionCache={createEmotionCache({ key: 'pv' })} withGlobalStyles withNormalizeCSS>
      <Provider store={store}>
        <NotificationsProvider position="top-right" autoClose={4000}>
          <ModalsProvider>
            <ConnectedRouter history={history}>
              <ScrollToTopHandler>
                <Component />
              </ScrollToTopHandler>
            </ConnectedRouter>
          </ModalsProvider>
        </NotificationsProvider>
      </Provider>
    </MantineProvider>
  );
};

render();
if (module.hot) {
  module.hot.accept('./pages/AppManagement', () => {
    // tslint:disable-next-line:max-line-length
    const AppManagement = require('./pages/AppManagement').default; // https://github.com/webpack/webpack-dev-server/issues/100
    render(AppManagement);
  });
}
