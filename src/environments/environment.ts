// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { NgxLoggerLevel } from 'ngx-logger';

export const environment = {
  production: false,
  firebase: {
    options: {
      apiKey: 'AIzaSyCsYAJyhUd1xDPHJSt-VQ1yx5bGI8chsDg',
      authDomain: 'irrigation-system-sandbox.firebaseapp.com',
      projectId: 'irrigation-system-sandbox',
      storageBucket: 'irrigation-system-sandbox.appspot.com',
      messagingSenderId: '739320641843',
      appId: '1:739320641843:web:9a577acea69db6aec62646',
      measurementId: 'G-ND92KNYDEG',
    },
    firestore: {
      whereQuery_IN_maxArrayLength: 10,
    },
  },
  ngxLogLevel: NgxLoggerLevel.TRACE,
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
