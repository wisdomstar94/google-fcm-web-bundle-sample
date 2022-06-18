require('dotenv').config();

const envPlugin = {
  name: 'env',
  setup(build) {
    build.onResolve({ filter: /^env$/ }, args => {
      console.log('args', args);

      return {
        path: args.path,
        namespace: 'env-ns',
      };
    });

    build.onLoad({ filter: /.*/, namespace: 'env-ns' }, () => ({
      contents: JSON.stringify(process.env),
      loader: 'json',
    }));
  },
};

module.exports = envPlugin;