const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const DirectoryNamedWebpackPlugin = require('directory-named-webpack-plugin');

const config = {
  entry: {
    polyfill: 'babel-polyfill',
    app: path.join(__dirname, './src/app.js')
  },
  output: {
    path: __dirname,
    filename: 'dist/scripts/[name].bundle.js',
    chunkFilename: 'dist/scripts/[name].chunk.js'
  },
  module: {
    rules: [{
      test: /\.vue$/,
      use: [
        { loader: 'vue-loader' }
      ]
    }, {
      test: /\.js$/,
      exclude: /node_modules/,
      use: [
        { loader: 'babel-loader' }]
    }, {
      test: /\.scss$/,
      use: [
        { loader: MiniCssExtractPlugin.loader },
        { loader: 'css-loader' },
        { loader: 'sass-loader' },
        { loader: 'postcss-loader' }
      ]
    }]
  },
  plugins: [
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      filename: 'dist/styles/[name].css'
    })
  ],
  resolve: {
    alias: {
      '@root': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@modules': path.resolve(__dirname, './src/modules')
    },
    extensions: ['.js', '.vue'],
    plugins: [
      new DirectoryNamedWebpackPlugin(true)
    ]
  }
};

module.exports = config;
