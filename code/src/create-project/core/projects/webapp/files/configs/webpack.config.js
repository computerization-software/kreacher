const
  TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin'),
  HtmlWebpackPlugin = require('html-webpack-plugin');


const TS_CONFIG_PATH = `${__dirname}/../configs/tsconfig.json`;
 

module.exports = {
  mode: 'development',
  entry: './src/index.ts',
  output: {
    filename: '[name]-[hash].js',
    path: __dirname + '/../build'
  },

  // Enable sourcemaps for debugging webpack's output.
  devtool: 'source-map',

  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: ['.ts', '.tsx', '.js', '.json'],
    plugins: [new TsconfigPathsPlugin({configFile: TS_CONFIG_PATH})]
  },

  module: {
    rules: [
      // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
      {
        test: /\.tsx?$/,
        loader: 'awesome-typescript-loader',
        options: { configFileName: TS_CONFIG_PATH }
      },

      // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
      { enforce: 'pre', test: /\.js$/, loader: 'source-map-loader' }
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
      inject: true
    })
  ]
};
