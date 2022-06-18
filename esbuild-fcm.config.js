const envPlugin = require('./plugins/esbuild-env.plugin');
require('dotenv').config();
require('esbuild').build({
  // the entry point file described above
  entryPoints: ['src/fcm.ts'],
  // the build folder location described above
  outfile: 'dist/fcm.js',
  platform: 'browser',
  bundle: true,
  define: { 
    "process.env.NODE_ENV": "\"production\"", 
    "process.env.FIREBASE_apiKey": `"${process.env.FIREBASE_apiKey}"`, 
    "process.env.FIREBASE_authDomain": `"${process.env.FIREBASE_authDomain}"`, 
    "process.env.FIREBASE_projectId": `"${process.env.FIREBASE_projectId}"`, 
    "process.env.FIREBASE_storageBucket": `"${process.env.FIREBASE_storageBucket}"`, 
    "process.env.FIREBASE_messagingSenderId": `"${process.env.FIREBASE_messagingSenderId}"`, 
    "process.env.FIREBASE_appId": `"${process.env.FIREBASE_appId}"`,
    "process.env.FIREBASE_MESSAGING_SW_JS_FILE_PATH": `"${process.env.FIREBASE_MESSAGING_SW_JS_FILE_PATH}"`,
  },
  // Replace with the browser versions you need to target
  target: ['chrome60', 'firefox60', 'safari11', 'edge20'],
  // Optional and for development only. This provides the ability to
  // map the built code back to the original source format when debugging.
  sourcemap: 'inline',
  minify: true,
  plugins: [envPlugin],
}).catch(() => process.exit(1));
