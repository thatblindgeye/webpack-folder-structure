const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// use for multiple html files and to create output folder structure
// replace plugins in module.exports with "plugins: HtmlPluginEntries"
// const entries = {
//   app: ["/scripts/index.js", "/stylesheets/main.css"],
// };

// const HtmlPluginEntries = Object.keys(entries).map(entryName => {
//   return new HtmlWebpackPlugin({
//     template: `/${entryName}/template.html`,
//     filename: `${entryName}/index.html`,
//     chunks: [entryName],
//     inject: "body",
//     minify: false,
//   });
// });

module.exports = {
  context: path.resolve(__dirname, 'src'),
  entry: {
    app: '/scripts/index.js',
    // use to avoid importing css file inside of js file:
    // import normalize inside style.css to split into its own in head
    // rename normalize so it will be alphabetically first in head
    // app: ["./src/scripts/index.js", "./src/stylesheets/style.css"],
  },
  output: {
    // filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    // new MiniCssExtractPlugin({
    //   filename: 'style-[name].[contenthash].css',
    //   chunkFilename: 'style-[name].[contenthash].css',
    // }),
    new HtmlWebpackPlugin({
      template: '/template.html',
      inject: 'body',
      minify: false,
      // links html to entry
      chunks: ['app'],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: {
              minimize: false,
            },
          },
        ],
      },
      {
        test: /\.css$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '',
            },
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
            },
          },
          {
            loader: 'postcss-loader',
          },
        ],
      },
      // {
      //   test: /\.(png|svg|jpg|jpeg|gif)$/i,
      //   type: 'asset/resource',
      //   generator: {
      //     filename: '[path][name].[contenthash:10][ext]',
      //   },
      // },
      // {
      //   test: /\/fonts\/.*\.(woff|woff2|eot|ttf|otf)$/i,
      //   type: 'asset/resource',
      //   generator: {
      //     filename: '[path][name].[contenthash:10][ext]',
      //   },
      // },
    ],
  },
};
