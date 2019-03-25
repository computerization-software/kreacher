module.exports = {
  webpack_mode: 'development',
  webpack_devtool: 'source-map',

  typescript_config_path: `${__dirname}/../configs/tsconfig.json`,
  html_webpack_plugin_options: {
    react_js_path: `./../node_modules/react/umd/react.development.js`,
    react_dom_js_path: `./../node_modules/react-dom/umd/react-dom.development.js`
  }
};
