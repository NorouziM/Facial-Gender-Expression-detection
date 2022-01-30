const withTM = require('next-transpile-modules')([
  '@fullcalendar/common',
  '@fullcalendar/daygrid',
  '@fullcalendar/interaction',
  '@fullcalendar/list',
  '@fullcalendar/react',
  '@fullcalendar/timegrid',
  '@fullcalendar/timeline',
]);

module.exports = withTM({
  swcMinify: false,
  trailingSlash: true,
  env: {
    HOST_API_KEY: 'https://minimal-assets-api.vercel.app',
    // FIREBASE AUTH
    FIREBASE_API_KEY: 'AIzaSyAjHdem_ko55hxx0FCCPKG8rCKswjVEoYU',
    FIREBASE_AUTH_DOMAIN: 'emotion-detection-f34d1.firebaseapp.com',
    FIREBASE_PROJECT_ID: 'emotion-detection-f34d1',
    FIREBASE_STORAGE_BUCKET: 'emotion-detection-f34d1.appspot.com',
    FIREBASE_MESSAGING_SENDER_ID: '933955916911',
    FIREBASE_APPID: '1:933955916911:web:a8bfc8812f3f9ed698a99a',
    FIREBASE_MEASUREMENT_ID: 'G-H7Q5ZPC17P',
  },
});
