const path = require('path');
const webpack = require('webpack');
const resolve = p => path.resolve(__dirname, '../', p)
const { VueLoaderPlugin } = require('vue-loader');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const isProd = process.env.NODE_ENV === 'production';

const baseConfig = {
  stats:   {
    assets:   true,
    children: true,
  },
  devtool: isProd ? false : '#eval-source-map',
  resolve: {
    extensions: ['*', '.ts', '.js', '.vue', '.json', '.node', '.scss', '.css'],
    alias: {
      '@': resolve('src'),
      '~': resolve(__dirname, 'src'),
    },
    modules:    [
      path.join(__dirname, '..', 'src'),
      path.join(__dirname, '..', 'node_modules'),
    ],
  },
  module:  {
    rules: [
      {
        test:    /\.ts$/,
        loader:  'ts-loader',
        include: [path.join(__dirname, '..', 'src')],
        exclude: /node_modules/,
        options: {
          appendTsSuffixTo: [/\.vue$/],
          transpileOnly:    true,
        },
      },
      {
        test:   /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.scss$/,
        use:  [
          'vue-style-loader',
          {
            loader:  'css-loader',
            options: {
              modules:        true,
              importLoaders:  1,
              localIdentName: '[local]_[hash:base64:8]',
            },
          },
          {
            loader:  'postcss-loader',
            options: {
              ident:   'postcss',
              plugins: () => [
                require('autoprefixer')({ browsers: ['last 2 versions', 'ie >= 11'] }),
                require('css-mqpacker')(),
                require('cssnano')({
                                     discardComments: {
                                       removeAll: true,
                                     },
                                     zindex:          false,
                                   }),
              ],
            },
          },
          {
            loader: 'sass-loader',
          },
        ],
      },
      {
        test: /\.sass$/,
        use:  [
          'vue-style-loader',
          {
            loader:  'css-loader',
            options: {
              modules:        true,
              importLoaders:  1,
              localIdentName: '[local]_[hash:base64:8]',
            },
          },
          {
            loader:  'postcss-loader',
            options: {
              ident:   'postcss',
              plugins: () => [
                require('autoprefixer')({ browsers: ['last 2 versions', 'ie >= 11'] }),
                require('css-mqpacker')(),
                require('cssnano')({
                                     discardComments: {
                                       removeAll: true,
                                     },
                                     zindex:          false,
                                   }),
              ],
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          {
            loader:  'css-loader',
            options: {
              modules:        false,
              importLoaders:  1,
              localIdentName: '[local]_[hash:base64:8]',
            },
          },
          {
            loader:  'postcss-loader',
            options: {
              ident:   'postcss',
              plugins: () => [
                require('autoprefixer')({ browsers: ['last 2 versions', 'ie >= 11'] }),
                require('css-mqpacker')(),
                require('cssnano')({
                  discardComments: {
                    removeAll: true,
                  },
                  zindex:          false,
                }),
              ],
            },
          },
        ],
      },
      {
        test: /\.(png|jpg|jpeg|gif|eot|ttf|woff|woff2|svg|svgz)(\?.+)?$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 100000
          }
        }]
      }
    ],
  },
  plugins: [
    new VueLoaderPlugin(),
    new webpack.DefinePlugin({ PRODUCTION: isProd, DEVELOPMENT: !isProd, TEST: false }),
    new ForkTsCheckerWebpackPlugin({ tslint: true, vue: true }),
  ],
};

if (process.env.ANALYZE) {
  baseConfig.plugins.push(
    new BundleAnalyzerPlugin({ analyzerMode: 'static' }),
  );
}

module.exports = baseConfig;
