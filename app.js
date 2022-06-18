require('dotenv').config();
const path = require('path');
const createError = require('http-errors');
const express = require('express');

const app = express();

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: false, limit: '50mb' }));
app.use(express.raw());
app.use(express.text());

app.get('/', (req, res, next) => res.sendFile(path.join(__dirname, 'dist', 'index.html')));
app.use('/fcm.js', express.static(path.join(__dirname, 'dist', 'fcm.js')));
app.use(process.env.FIREBASE_MESSAGING_SW_JS_FILE_PATH, express.static(path.join(__dirname, 'dist', 'firebase-messaging-sw.js')));

app.use(function(req, res, next) {
  console.log('req.url', req.url);
  next(createError(404));
});

app.use(function(err, req, res, next) {
  console.error('error!', err.stack);
  res.json({ result: 'failure' });
  return;
});

app.listen(process.env.PORT, function() {
  console.log(`${process.env.PORT} port listening..`);
});
