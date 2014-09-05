'use strict';

// Development specific configuration
// ==================================
module.exports = {
  ip:       process.env.OPENSHIFT_NODEJS_IP ||
            process.env.IP ||
            process.env.INTERNAL_IP ||
            undefined,

  // Server port
  port:     process.env.OPENSHIFT_NODEJS_PORT ||
            process.env.PORT ||
            8080,
  // MongoDB connection options
  mongo: {
    uri: 'mongodb://localhost/yokel-dev'
  },

  seedDB: true
};
