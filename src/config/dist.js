'use strict';

import baseConfig from './base';

let config = {
  appEnv: 'dist',
  api: 'https://api.mylesshannon.me'
};

module.exports = Object.freeze(Object.assign({}, baseConfig, config));
