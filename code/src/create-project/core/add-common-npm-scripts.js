const
  fs = require('fs'),
  path = require('path');


/**
 * @return error {string|undefined}
 */
module.exports = runtimeParams => {
  const projectName = runtimeParams.name;
  const projectParentDir = `${process.cwd()}/${runtimeParams.path}/`;
  const projectDir = path.resolve(`${projectParentDir}/${projectName}/`);

  const packageJSON = JSON.parse(fs.readFileSync(`${projectDir}/code/package.json`, 'utf-8'));
  packageJSON.scripts = {
    ...packageJSON.scripts,
    reinstall: 'NPM_SCRIPT=reinstall ./scripts/npm-script.sh',
  };
  fs.writeFileSync(`${projectDir}/code/package.json`, JSON.stringify(packageJSON, null, 2));
};
