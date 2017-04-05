'use strict';

import baseConfig from './base';

let config = {
  appEnv: 'dev',
  api: 'http://localhost:8002',
  redirect: 'http://localhost:8080'
};

module.exports = Object.freeze(Object.assign({}, baseConfig, config));
