const path = require('path');
const { merge } = require('webpack-merge');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  output: {
    filename: "[name].js",
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "style-[name].css",
      chunkFilename: 'style-[name].css',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
        generator: {
          filename: '[path][name][ext]',
        },
      },
      {
        test: /\/fonts\/.*\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
        generator: {
          filename: '[path][name][ext]',
        },
      },
    ],
  },
  devtool: 'inline-source-map',
  target: 'web',
  devServer: {
    contentBase: path.join(__dirname, 'src'),
    compress: true,
    port: 9050,
    watchContentBase: true,
  },
});
