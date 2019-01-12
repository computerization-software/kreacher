const fs = require('fs');
const path = require('path');

/**
 * @return error {string|undefined}
 */
module.exports = runtimeParams => {
  // project type validation
  const inputType = (runtimeParams.type || '').toLowerCase();
  const allowedProjectTypes = ['website', 'webapp', 'remapp', 'cli'];
  if (typeof inputType !== 'string') return 'Create project error: please specify a project type';
  if (!~allowedProjectTypes.indexOf(inputType)) return `Unknown type. Allowed types: ${allowedProjectTypes.join('|')}`;

  // project name validation
  const projectName = runtimeParams.name;
  if (typeof projectName !== 'string') return 'Create project error: please specify a project name';

  // project parent directory validation
  if (typeof runtimeParams.path !== 'string') return 'Create project error: please specify a project parent directory';
  const projectParentDir = `${process.cwd()}/${runtimeParams.path}/`;
  try {
    if(!fs.lstatSync(projectParentDir).isDirectory()) return `"${projectPath}" it's not a directory`;
  } catch(err) {
    return `directory "${projectParentDir}" doesn't exists`;
  }

  // project directory validation
  const projectDir = path.resolve(`${projectParentDir}/${projectName}/`);
  try {
    const isDir = fs.lstatSync(projectDir).isDirectory();
    if (!runtimeParams.force && isDir) return `directory "${projectDir}" already exists`;
  } catch(err) {}
};
