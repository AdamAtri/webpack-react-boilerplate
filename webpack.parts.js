const ExtractTextPlugin = require('extract-text-webpack-plugin');

exports.devServer = ({ host, port} = {}) => ({
  devServer: {
    stats: 'errors-only',
    host,
    port,
    open: true,
    overlay: true // display error info
  }
});

exports.loadCSS = ({include, exclude} = {}) => ({
  module: {
    rules: [
      {
        test: /\.css$/,
        include,
        exclude,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.scss$/,
        include,
        exclude,
        use: ['style-loader', 'css-loader', 'sass-loader']
      }
    ]
  }
});

exports.extractCSS = ({include, exclude, use} = {}) => {
  console.log('extractCSS');
  const plugin = new ExtractTextPlugin({
    allChunks: true,
    filename: '[name].css'
  });
  return {
    module: {
      rules: [
        {
          test: /\.scss$/,
          include,
          exclude,
          use: plugin.extract({ use, fallback: 'style-loader'})
        }
      ]
    },
    plugins: [plugin]
  };
};

exports.loadJSX = ({include} = { }) => ({
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        loaders: ['babel-loader?cacheDirectory'],
        include: include
      }
    ]
  }
});

exports.loadIsparta = ({ include } = {}) => ({
  module: {
    preLoaders: [
      {
        test: /\.(js|jsx)$/,
        loaders: ['isparta'],
        include: include
      }
    ]
  }
});

exports.lintJSX = ({ include } = { }) => ({
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        enforce: 'pre',
        loaders: [ 'eslint-loader' ],
        include: include
      }
    ]
  }
});
