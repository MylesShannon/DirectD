'use strict';

import baseConfig from './base';

let config = {
  appEnv: 'test',
  api: 'http://localhost:8002'
};

module.exports = Object.freeze(Object.assign(baseConfig, config));
