const path = require('path');
module.exports = {
  // The Webpack config to use when compiling your react app for development or production.
  webpack: function (config, env) {
    // set resolve.fallback
    config.resolve.fallback = {
      fs: false,
      path: false,
      crypto: false,
    };
    // Configuración para desactivar la generación de mapas de origen
    if (env === 'production') {
      config.devtool = false;
    }

    return config;
  },
};
