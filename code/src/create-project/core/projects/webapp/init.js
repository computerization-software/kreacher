const 
  path = require('path'),
  fs = require('fs'),
  execSync = require('child_process').execSync;

/**
 * @return error {string|undefined}
 */
module.exports = runtimeParams => {
  const projectName = runtimeParams.name;
  const projectParentDir = `${process.cwd()}/${runtimeParams.path}/`;
  const projectDir = path.resolve(`${projectParentDir}/${projectName}/`);
  
  // create react app --typescript
  execSync(`
    cd "${projectDir}/";
    npx create-react-app ${projectName} --typescript;
    cp -r ${projectName}/* code/;
    rm -rf ${projectName};
    cd code/;
    npm install --save onion-context;
    npm install --save-dev @types/react;
  `);

  // copy files
  execSync(`cp -a "${__dirname}/files/scripts/entrypoints/." "${projectDir}/code/scripts/entrypoints"`);
  execSync(`cp -a "${__dirname}/files/gitignore" "${projectDir}/.gitignore"`);

  // add npm scripts
  const packageJSON = JSON.parse(fs.readFileSync(`${projectDir}/code/package.json`, 'utf-8'));
  packageJSON.scripts = {
    ...packageJSON.scripts,
    build: 'NPM_SCRIPT=build ./scripts/npm-script.sh',
    dev: 'NPM_SCRIPT=dev ./scripts/npm-script.sh',
  };

  // delete unused npm scripts
  delete packageJSON.scripts.eject;
  delete packageJSON.scripts.test;
  delete packageJSON.scripts.start;

  fs.writeFileSync(`${projectDir}/code/package.json`, JSON.stringify(packageJSON, null, 2));
};
