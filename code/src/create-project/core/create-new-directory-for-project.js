const
  fs = require('fs'),
  path = require('path'),
  rimraf = require('rimraf');


/**
 * @return error {string|undefined}
 */
module.exports = runtimeParams => {
  const projectName = runtimeParams.name;
  const projectParentDir = `${process.cwd()}/${runtimeParams.path}/`;
  const projectDir = path.resolve(`${projectParentDir}/${projectName}/`);

  rimraf.sync(projectDir);
  fs.mkdirSync(projectDir);
};
