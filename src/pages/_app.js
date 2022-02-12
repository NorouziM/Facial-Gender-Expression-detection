// i18n
import '../locales/i18n';

// highlight
import '../utils/highlight';

// scroll bar
import 'simplebar/src/simplebar.css';

// lightbox
import 'react-image-lightbox/style.css';

// map
import 'mapbox-gl/dist/mapbox-gl.css';

// lazy image
import 'react-lazy-load-image-component/src/effects/blur.css';
import 'react-lazy-load-image-component/src/effects/opacity.css';
import 'react-lazy-load-image-component/src/effects/black-and-white.css';

// fullcalendar
import '@fullcalendar/common/main.min.css';
import '@fullcalendar/daygrid/main.min.css';

import PropTypes from 'prop-types';
import cookie from 'cookie';
// next
import Head from 'next/head';
import App from 'next/app';
// @mui
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
// utils
import { getSettings } from '../utils/settings';
// contexts
import { SettingsProvider } from '../contexts/SettingsContext';
import { CollapseDrawerProvider } from '../contexts/CollapseDrawerContext';
// theme
import ThemeProvider from '../theme';
// components
import Settings from '../components/settings';
import RtlLayout from '../components/RtlLayout';
import ProgressBar from '../components/ProgressBar';
import ThemeColorPresets from '../components/ThemeColorPresets';
import NotistackProvider from '../components/NotistackProvider';
import ThemeLocalization from '../components/ThemeLocalization';
import MotionLazyContainer from '../components/animate/MotionLazyContainer';

import { AuthProvider } from '../contexts/FirebaseContext';
import IPLocationGuard from '../guards/IPLocationGuard';

// ----------------------------------------------------------------------

MyApp.propTypes = {
  Component: PropTypes.func,
  pageProps: PropTypes.object,
  settings: PropTypes.object,
};

export default function MyApp(props) {
  const { Component, pageProps, settings } = props;

  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <IPLocationGuard>
        <AuthProvider>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <CollapseDrawerProvider>
              <SettingsProvider defaultSettings={settings}>
                <ThemeProvider>
                  <NotistackProvider>
                    <MotionLazyContainer>
                      <ThemeColorPresets>
                        <ThemeLocalization>
                          <RtlLayout>
                            <Settings />
                            <ProgressBar />
                            {getLayout(<Component {...pageProps} />)}
                          </RtlLayout>
                        </ThemeLocalization>
                      </ThemeColorPresets>
                    </MotionLazyContainer>
                  </NotistackProvider>
                </ThemeProvider>
              </SettingsProvider>
            </CollapseDrawerProvider>
          </LocalizationProvider>
        </AuthProvider>
      </IPLocationGuard>
    </>
  );
}

// ----------------------------------------------------------------------

MyApp.getInitialProps = async (context) => {
  const appProps = await App.getInitialProps(context);

  const cookies = cookie.parse(context.ctx.req ? context.ctx.req.headers.cookie || '' : document.cookie);

  const settings = getSettings(cookies);

  return {
    ...appProps,
    settings,
  };
};
