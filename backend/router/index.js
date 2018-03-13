const express = require('express');
const axios = require('axios');
const { taps, targets } = require('../constants');

const router = express.Router();
const {
  getKnots,
  detectDocker,
  addTap,
  addSchema,
  addTarget,
  writeSchema
} = require('../util');

router.get('/knots/', (req, res) => {
  getKnots().then((knots) => res.json(knots));
});

router.get('/taps', (req, res) => {
  res.json(taps);
});

router.post('/taps/', (req, res) => {
  detectDocker()
    .then(() => {
      const { tap, version } = req.body;
      addTap(tap, version).then((config) =>
        res.json({
          docker: true,
          config
        })
      );
    })
    .catch(() => {
      res.json({ docker: false });
    });
});

router.post('/tap/schema/', (req, res) => {
  addSchema(req.body)
    .then((schema) => {
      res.json(schema.streams);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.put('/tap/schema/', (req, res) => {
  writeSchema(req.body)
    .then(() => {
      res.json({ status: 200 });
    })
    .catch((err) => {
      res.json(err);
    });
});

router.get('/targets/', (req, res) => {
  res.json(targets);
});

router.post('/targets/', (req, res) => {
  const { target, version } = req.body;
  addTarget(target, version).then(() =>
    res.json({
      docker: true
    })
  );
});

router.post('/token/', (req, res) => {
  const { code } = req.body;
  const params = {
    code,
    client_id: 'knot-local',
    client_secret: 'iEcKy7joLVrJgtbm6YzzhTuxwsxU.jVb',
    grant_type: 'authorization_code'
  };
  const queryString = Object.keys(params)
    .map((k) => `${k}=${params[k]}`)
    .join('&');
  axios
    .post(`https://data.world/oauth/access_token?${queryString}`)
    .then((response) => {
      if (response.data.access_token) {
        res.json({ token: response.data.access_token });
      }
    });
});

router.post('/target/', (req, res) => {
  console.log('THis is the request body', req.body);
  res.json({ status: 200 });
});

module.exports = router;
