const { merge } = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'production',
  output: {
    filename: "[name].[contenthash].js",
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "style-[name].[contenthash].css",
      chunkFilename: 'style-[name].[contenthash].css',
    }),
    new CleanWebpackPlugin({
      cleanAfterEveryBuildPatterns: ['dist/'],
      dry: false,
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
        generator: {
          filename: '[path][name].[contenthash:10][ext]',
        },
      },
      {
        test: /\/fonts\/.*\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
        generator: {
          filename: '[path][name].[contenthash:10][ext]',
        },
      },
    ],
  },
  optimization: {
    minimize: true,
    minimizer: [
      `...`,
      new CssMinimizerPlugin(),
      new ImageMinimizerPlugin({
        // Only apply to files equal to or over 8192 bytes
        filter: (source) => {
          if (source.byteLength >= 8192) {
            return true;
          }
          return false;
        },
        minimizerOptions: {
          plugins: [
            ['jpegtran', { progressive: true }],
            ['optipng', { optimizationLevel: 5 }],
            ['gif2webp', { quality: 80, minimize: true, method: 5 }],
          ],
        },
      }),
      new ImageMinimizerPlugin({
        // Only apply to files under 8192
        filter: (source) => {
          if (source.byteLength < 8192) {
            return true;
          }
          return false;
        },
        minimizerOptions: {
          plugins: [
            ['jpegtran', { progressive: false }],
            ['optipng', { optimizationLevel: 3 }],
            ['gif2webp', { quality: 100, minimize: false, method: 3 }],
          ],
        },
      }),
      new ImageMinimizerPlugin({
        // Apply to all files
        minimizerOptions: {
          plugins: [
            ['svgo', {}],
          ],
        },
      }),
    ],
    // use for multiple entries on a page
    // runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
          enforce: true
        },
        normalizeCSS: {
          test: /normalize\.s?css$/,
          name: 'normalize',
          chunks: 'all',
          enforce: true
        }
      }
    },
  },
});