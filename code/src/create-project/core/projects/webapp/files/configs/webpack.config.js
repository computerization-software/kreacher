const
  TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin'),
  HtmlWebpackPlugin   = require('html-webpack-plugin');
  APP_CONFIG          = require(`${__dirname}/app.${process.env['NODE_ENV'] || 'development'}.config`);


module.exports = {
  mode: APP_CONFIG['webpack_mode'],
  entry: './src/index.ts',
  output: {
    filename: '[name]-[hash].js',
    path: __dirname + '/../build'
  },

  devtool: APP_CONFIG['webpack_devtool'],

  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
    plugins: [new TsconfigPathsPlugin({configFile: APP_CONFIG['typescript_config_path']})]
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'awesome-typescript-loader',
        options: { configFileName: APP_CONFIG['typescript_config_path'] }
      },

      // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
      { enforce: 'pre', test: /\.js$/, loader: 'source-map-loader' },
      
      { test: /\.css/, use: [ 'style-loader', 'css-loader' ] },

      { test: /\.(png|svg|jpg|gif)$/, use: [ 'file-loader' ] }
    ]
  },

  // When importing a module whose path matches one of the following, just
  // assume a corresponding global variable exists and use that instead.
  // This is important because it allows us to avoid bundling all of our
  // dependencies, which allows browsers to cache those libraries between builds.
  externals: {
    'react': 'React',
    'react-dom': 'ReactDOM'
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: `${__dirname}/../src/static/index.html`,
      inject: true,

      ...APP_CONFIG['html_webpack_plugin_options']
    })
  ]
};
