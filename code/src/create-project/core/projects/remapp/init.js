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
  execSync(
    `
      cp -a "${__dirname}/files/." "${projectDir}/code/";
      cd "${projectDir}/code";
      mkdir src/;
      mkdir src/models;
      mkdir src/views;
      mkdir src/controllers;
      mkdir src/utils;
      npm init --yes;
      npm install --save \
        express body-parser morgan \
        typescript;
      npm install --save-dev \
        @types/node @types/express @types/sinon @types/mocha \
        mocha sinon;
    `,
    {stdio: 'inherit'}
  );

  const packageJSON = JSON.parse(fs.readFileSync(`${projectDir}/code/package.json`, 'utf-8'));
  packageJSON.scripts = {
    build: 'NPM_SCRIPT=build ./scripts/npm-script.sh',
    dev: 'NPM_SCRIPT=dev ./scripts/npm-script.sh',
    test: 'NPM_SCRIPT=test ./scripts/npm-script.sh',
  };

  packageJSON.name = projectName;
  delete packageJSON.main;

  fs.writeFileSync(`${projectDir}/code/package.json`, JSON.stringify(packageJSON, null, 2));
};
