var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BASE_API: '"http://easy-mock.com/mock/596f19c3a1d30433d837adbb/vue-admin"',
})
