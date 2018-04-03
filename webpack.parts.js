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
