module.exports = {
  mode: "production",
  entry: {
    main: './src/js/index.jsx'
  },
  output: {
    path: __dirname + '/docs/',
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use:['style-loader', 'css-loader']
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
  devServer: {
    contentBase: __dirname + '/docs',
    publicPath: '/'
  }
}
