const path = require('path');

module.exports = {
  entry: './src/index.jsx',
  // transpile先のfile_nameとdirectory
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.jsx$/,
        use: {
          loader: 'babel-loader',
          options: {
            "cacheDirectory": true,
          }
        },
      }
    ],
  }
};