const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const DirectoryNamedWebpackPlugin = require('directory-named-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanObsoleteChunks = require('webpack-clean-obsolete-chunks');

const config = {
  entry: {
    polyfill: 'babel-polyfill',
    app: path.join(__dirname, './src/app.js')
  },
  output: {
    path: __dirname,
    filename: 'dist/scripts/[name].bundle.[contenthash].js',
    chunkFilename: 'dist/scripts/[name].chunk.[contenthash].js'
  },
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        }
      }
    }
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
    new ManifestPlugin(),
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      filename: 'dist/styles/[name].[contenthash].css'
    }),
    new HtmlWebpackPlugin({
      title: 'VueJS App',
      template: 'index.ejs'
    }),
    new CleanObsoleteChunks()
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
