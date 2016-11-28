'use strict';

import baseConfig from './base';

let config = {
  appEnv: 'dist',
  api: 'https://api.mylesshannon.me:8002'
};

module.exports = Object.freeze(Object.assign({}, baseConfig, config));
