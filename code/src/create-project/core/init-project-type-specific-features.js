/**
 * @return error {string|undefined}
 */
module.exports = runtimeParams => {
  const type = runtimeParams.type;
  switch(type) {
    case 'website': return require('./projects/website/init')(runtimeParams);
    case 'webapp': return require('./projects/webapp/init')(runtimeParams);
    default: return 'unsupported project type'
  }
};
