const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.config');
const HTMLPlugin = require('html-webpack-plugin');
const ServiceWorkerWebpackPlugin = require('serviceworker-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');

const clientConfig = merge(baseConfig, {
  entry:        {
    app: './src/client/index',
  },
  output:       {
    path:          path.join(__dirname, '..', 'dist', 'client'),
    filename:      '[name].[chunkHash].js',
    publicPath:    '/client/',
    chunkFilename: '[name].[id].[chunkhash].js',
  },
  optimization: {
    splitChunks:  {
      cacheGroups: {
        commons: {
          test:   /[\\/]node_modules[\\/]/,
          name:   'vendor',
          chunks: 'all',
        },
      },
    },
    runtimeChunk: 'single',
  },
  performance:  {
    /*hints:             'warning',
    maxEntrypointSize: 318000,
    maxAssetSize:      267000,*/
    hints: "warning", // 枚举
    maxAssetSize: 30000000, // 整数类型（以字节为单位）
    maxEntrypointSize: 50000000, // 整数类型（以字节为单位）
    assetFilter: function(assetFilename) {
      // 提供资源文件名的断言函数
      return assetFilename.endsWith('.css') || assetFilename.endsWith('.js');
    }
  },
  plugins:      [
    new webpack.DefinePlugin({ CLIENT: true, SERVER: false }),
    new HTMLPlugin({ template: 'src/index.template.html', spa: false }),
  ],
});

if (process.env.NODE_ENV === 'production') {
  clientConfig.plugins = (clientConfig.plugins || [])
  .concat([
            new ServiceWorkerWebpackPlugin({ entry: path.join(__dirname, '..', 'src/client/sw.ts') }),
            new CompressionPlugin({ algorithm: 'gzip', test: /\.js$|\.css$|\.html$/, threshold: 0, minRatio: 1 }),
          ]);
  clientConfig.performance.hints = 'error';
}

module.exports = clientConfig;
