const functions = require('firebase-functions');
const admin = require('firebase-admin');
const express = require('express');
const cors = require('cors');
const generateRandomId = require('./helpers/id-generator.helper');

const app = express();
app.use(cors({ origin: true }));

const serviceAccount = require('./permissions.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://soil-test-api.firebaseio.com',
});
const db = admin.firestore();

// create
app.post('/api/create', (req, res) => {
  (async () => {
    try {
      await db
        .collection('results')
        .doc('/' + generateRandomId() + '/')
        .create({
          pH: req.body.pH,
          moisture: req.body.moisture,
          temperature: req.body.temperature,
        });
      return res.status(200).send();
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  })();
});

exports.app = functions.https.onRequest(app);
