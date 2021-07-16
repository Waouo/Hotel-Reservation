const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const Dotenv = require('dotenv-webpack')
const isDev = true
const BundleAnalyzerPlugin =
  require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const PreloadWebpackPlugin = require('preload-webpack-plugin')
const webpack = require('webpack')
const { WebpackManifestPlugin } = require('webpack-manifest-plugin')

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  devtool: isDev ? 'source-map' : false,
  output: {
    publicPath: '/',
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    assetModuleFilename: 'images/[name][ext]',
  },
  module: {
    rules: [
      {
        test: /\.(png|jpeg|gif|svg)$/i,
        type: 'asset/resource',
        // use: [
        //   {
        //     loader: 'file-loader',
        //     options: {
        //       name: './images/[name].[ext]',
        //     },
        //   },
        // ],
      },
      {
        test: /\.(s[ac]ss)$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../',
            },
          },
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[local]__[hash:5]',
              },
              sourceMap: true,
            },
          },
          { loader: 'sass-loader', options: { sourceMap: true } },
        ],
      },
      {
        test: /\.(css)$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../',
            },
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },

      {
        test: /\.(js|jsx)$/i,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
    }),
    new PreloadWebpackPlugin(),
    new CleanWebpackPlugin(),
    new Dotenv({ path: '../.env' }),
    //分析網頁使用資料大小
    new webpack.HotModuleReplacementPlugin(),
    new WebpackManifestPlugin(),
    // new BundleAnalyzerPlugin(),
  ],
  devServer: {
    port: 8000,
    open: false,
    historyApiFallback: true,
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json', 'scss'],
  },
}
