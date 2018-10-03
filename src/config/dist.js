'use strict';

import baseConfig from './base';

let config = {
  appEnv: 'dist',
  api: 'http://api.mylesshannon.me',
  redirect: 'http://directd.mylesshannon.me'
};

module.exports = Object.freeze(Object.assign({}, baseConfig, config));
