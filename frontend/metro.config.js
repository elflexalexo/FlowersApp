const { getDefaultConfig } = require('expo/metro-config');
const { mergeConfig } = require('@react-native/metro-config');

const config = getDefaultConfig(__dirname);

module.exports = mergeConfig(config, {
  // Disable source maps entirely in dev mode to avoid eval-based CSP violations
  transformer: {
    minifierPath: 'metro-minify-terser',
    minifierConfig: {
      compress: {
        unused: true,
      },
      output: {
        comments: false,
      },
    },
  },
  server: {
    enhanceMiddleware: (middleware) => {
      return (req, res, next) => {
        // Disable source maps header for web dev mode
        if (req.url && req.url.includes('source')) {
          res.header('X-Source-Map', 'none');
        }
        middleware(req, res, next);
      };
    },
  },
});
