const path = require('path');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const TerserWebpackPlugin = require("terser-webpack-plugin");

// const isDev = process.env.NODE_ENV === 'development';
const isProd = process.env.NODE_ENV === 'production';

const optimization = () => {
  const config = {
    splitChunks: {
      chunks: 'all',
    }
  };

  if(isProd) {
    config.minimizer = [
      new TerserWebpackPlugin(),
    ]
  }
 return config;
}

module.exports = {
  context: path.resolve(__dirname, 'src'),
  mode: 'development',
  entry: {
    main: [ './index.js'],
  },
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist')
  },
  target: 'node',
  resolve: {
    extensions: ['.js', '.json'],
    alias: {
      '@models': path.resolve(__dirname, 'src/models'),
      '@': path.resolve(__dirname, 'src')
    }
  },
  optimization: optimization(),
  devServer: {
    port: 4200,
    open: true
  },
  plugins: [
    // new HTMLWebpackPlugin({
    //   template: './index.html',
    //   minify: {
    //     collapseWhitespace: isProd,
    //   }
    // }),
    new CleanWebpackPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ['@babel/preset-env']
          }
        },
      }
    ]
  }
}