const CracoLessPlugin = require('craco-less');

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              '@primary-color': '#4C12A1',
              '@border-radius-base': '8px',
              '@body-background': '#E5E5E5',
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
