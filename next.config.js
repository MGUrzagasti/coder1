// next.config.js

const nextConfig = {
  experimental: {
    webpackBuildWorker: true,
  },
  webpack: (config, { isServer }) => {
    // Configuración de Webpack aquí, por ejemplo, manejo de alias
    if (!isServer) {
      config.resolve.alias['@'] = __dirname;
    }

    return config;
  },
};

module.exports = nextConfig;
