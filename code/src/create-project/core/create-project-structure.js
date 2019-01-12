const
  fs = require('fs'),
  execSync = require('child_process').execSync,
  path = require('path');


/**
 * @return error {string|undefined}
 */
module.exports = runtimeParams => {
  const projectName = runtimeParams.name;
  const changelogTitle = `${projectName} changelog`;
  const projectParentDir = `${process.cwd()}/${runtimeParams.path}/`;
  const projectDir = path.resolve(`${projectParentDir}/${projectName}/`);

  fs.writeFileSync(`${projectDir}/README.md`, `${projectName}\n${projectName.replace(/./g, '=')}`);
  fs.writeFileSync(`${projectDir}/CHANGELOG.md`, `${changelogTitle}\n${changelogTitle.replace(/./g, '=')}`);

  if (!runtimeParams.codeOnly) {
    fs.mkdirSync(`${projectDir}/docs`);
    fs.mkdirSync(`${projectDir}/design`);
    fs.mkdirSync(`${projectDir}/code`);
    fs.mkdirSync(`${projectDir}/code/src`);
    fs.mkdirSync(`${projectDir}/code/scripts`);
    fs.mkdirSync(`${projectDir}/code/configs`);
    fs.mkdirSync(`${projectDir}/code/build`);
  } else {
    fs.mkdirSync(`${projectDir}/src`);
    fs.mkdirSync(`${projectDir}/scripts`);
    fs.mkdirSync(`${projectDir}/configs`);
    fs.mkdirSync(`${projectDir}/build`);
  }

  execSync(`cp -a "${__dirname}/files/configs/." "${projectDir}/code/configs"`);
  execSync(`cp -a "${__dirname}/files/scripts/." "${projectDir}/code/scripts"`);
};
