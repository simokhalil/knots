/*
 * Knots
 * Copyright 2018 data.world, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * This product includes software developed at
 * data.world, Inc. (http://data.world/).
 */

const router = require('express').Router();

const { getTargets, addTarget, addTargetConfig } = require('../targets');

router.get('/', (req, res) => {
  getTargets()
    .then((targets) => res.json({ targets }))
    .catch((error) => {
      res.status(500).json({ message: error.message });
    });
});

router.post('/', (req, res) => {
  addTargetConfig(req.body.fieldValues, req.body.knot)
    .then(() => res.json({}))
    .catch((error) => {
      res.status(500).json({ message: error.message });
    });
});

router.post('/select', (req, res) => {
  addTarget(req.body.target, req.body.knot)
    .then(() => {
      res.json({});
    })
    .catch((error) => {
      res.status(500).json({ message: error.message });
    });
});

module.exports = router;