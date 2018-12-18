const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
module.exports = {
  mode: "production",
  plugins: [
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: "[name].css",
      chunkFilename: "[id].css"
    })
  ],
  entry: [
    '@babel/polyfill', './src/js/index.jsx'
  ],
  output: {
    path: __dirname + '/docs/',
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use:['style-loader', 'css-loader', MiniCssExtractPlugin.loader]
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.sass$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.js?$/,
        exclude: /(node_modules)/,
        use: 'babel-loader'
      },
      {
        test: /\.jsx$/,
        exclude: /(node_modules)/,
        use: 'babel-loader'
      }
    ]
  },
  optimization: {
    splitChunks: {
      chunks: 'all'
    },
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true // set to true if you want JS source maps
      }),
      new OptimizeCSSAssetsPlugin({})
    ]
  },
  devServer: {
    contentBase: __dirname + '/docs',
    publicPath: '/'
  }
}
