module.exports = {
  template: require("./scripts/helpers/template"),
  dimensions: false,
  svgoConfig: {
    plugins: [
      {
        name: "preset-default",
        params: {
          overrides: {
            removeViewBox: false,
            cleanupIds: {
              // cleanUpIds minification seems to sometimes generate duplicate IDs.
              // We disabled this so it now only uses the id that was in the SVG to begin with.
              minify: false,
              // Don't remove unused IDs, as sometimes they are applied later on via CSS.
              remove: false
            },
          }
        }
      }
    ],
  },
  index: false,
};
