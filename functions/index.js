const functions = require('firebase-functions');
const admin = require('firebase-admin');
const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors({ origin: true }));

const serviceAccount = require('./permissions.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://soil-test-api.firebaseio.com',
});
const db = admin.firestore();

app.get('/api', (req, res) => {
  return res.status(200).send('Hello, Welcome to Soil test mediator api!');
});

// create
app.post('/api/create', (req, res) => {
  (async () => {
    try {
      await db
        .collection('items')
        .doc('/' + req.body.id + '/')
        .create({ item: req.body.item });
      return res.status(200).send();
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  })();
});

exports.app = functions.https.onRequest(app);
