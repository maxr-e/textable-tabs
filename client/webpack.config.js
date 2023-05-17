const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

// TODO: Add and configure workbox plugins for a service worker and manifest file.
// TODO: Add CSS loaders and babel to webpack.

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      //create index.html
      new HtmlWebpackPlugin({
        template: './index.html',
        title: 'J.A.T.E.',
      }),
      //create service worker (sw)
      new InjectManifest({
        swSrc: './src-sw.js',
        swDest: 'src-sw.js',
      }),
      //create manifest.json
      new WebpackPwaManifest({
        fingerprints: false,
        inject: true,
        name: 'J.A.T.E.',
        short_name: 'J.A.T.E.',
        description: 'Just another text editor',
        start_url: './',
        publicPath: './',
        icons: [
          {
            src: path.resolve('src/images/logo.png'),
            sizes: [96, 128, 192, 256, 384, 512],
            destination: path.join('assets', 'icons'),
          },
        ],
      }),
      
    ],

    module: {
      rules: [
        {
          //CSS rules
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
        {
          //babel rules
          test: /\.m?js$/,
          exclude: /node_modules/,
          
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: ['@babel/plugin-proposal-object-rest-spread', '@babel/transform-runtime'],
            },
          },
        },
      ],
    },
  };
};
