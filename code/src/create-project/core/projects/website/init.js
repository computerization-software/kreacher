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
  
  // npm init
  fs.renameSync(`${projectDir}/code`, `${projectDir}/${projectName}`);
  execSync(`cd "${projectDir}/${projectName}"; npm init --yes;`);
  fs.renameSync(`${projectDir}/${projectName}`, `${projectDir}/code`);

  // npm install dependencies
  execSync(`cd "${projectDir}/code"; npm i --save-dev contentica;`);
  execSync(`cd "${projectDir}/code"; npm i --save-dev @babel/cli @babel/core @babel/preset-env`);
  execSync(`cd "${projectDir}/code"; npm i --save-dev webpack webpack-cli`);
  execSync(`cd "${projectDir}/code"; npm i --save-dev babel-loader css-loader`);
  execSync(`cd "${projectDir}/code"; npm i --save-dev mini-css-extract-plugin webpack-manifest-plugin`);
  execSync(`cd "${projectDir}/code"; npm i --save-dev jsdom;`);
  execSync(`cd "${projectDir}/code"; npm i --save-dev chokidar;`);
  execSync(`cd "${projectDir}/code"; npm i --save-dev rimraf;`);
  execSync(`cd "${projectDir}/code"; npm i --save-dev fs-extra;`);
  execSync(`cd "${projectDir}/code"; npm i --save-dev fs-readdir-recursive;`);
  execSync(`cd "${projectDir}/code"; npm i --save-dev html-minifier;`);

  // npm init dependencies
  execSync(`cd "${projectDir}/code"; npx contentica --init;`);
  execSync(`mv "${projectDir}/code/contenticarc.json" "${projectDir}/code/configs/contenticarc.json"`);

  // create project structure
  fs.mkdirSync(`${projectDir}/code/src/blocks`);
  fs.mkdirSync(`${projectDir}/code/templates`);

  fs.writeFileSync(`${projectDir}/code/src/index.js`, '');

  // copy files
  execSync(`cp -a "${__dirname}/files/configs/." "${projectDir}/code/configs"`);
  execSync(`cp -a "${__dirname}/files/scripts/." "${projectDir}/code/scripts"`);
  execSync(`cp -a "${__dirname}/files/templates/." "${projectDir}/code/templates"`);
  execSync(`cp -a "${__dirname}/files/gitignore" "${projectDir}/.gitignore"`);

  // add npm scripts
  const packageJSON = JSON.parse(fs.readFileSync(`${projectDir}/code/package.json`, 'utf-8'));
  packageJSON.scripts = {
    ...packageJSON.scripts,
    build: 'NPM_SCRIPT=build ./scripts/npm-script.sh',
    dev: 'NPM_SCRIPT=dev ./scripts/npm-script.sh',
    nginx: './scripts/start-nginx.sh'
  };
  fs.writeFileSync(`${projectDir}/code/package.json`, JSON.stringify(packageJSON, null, 2));
};
