'use strict';

import baseConfig from './base';

let config = {
  appEnv: 'dev',
  api: 'http://localhost:8002'
};

module.exports = Object.freeze(Object.assign({}, baseConfig, config));
