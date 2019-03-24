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
      cd "${projectDir}/code";
      npm init --yes;
      npm install --save onion-context react react-dom;
      npm install --save-dev \
        webpack \
        webpack-cli \
        typescript \
        @types/react @types/react-dom \
        awesome-typescript-loader \
        tsconfig-paths-webpack-plugin \
        html-webpack-plugin \
        source-map-loader;
    `,
    {stdio: 'inherit'}
  );

  // copy files
  execSync(`cp -a "${__dirname}/files/scripts/entrypoints/." "${projectDir}/code/scripts/entrypoints"`);
  execSync(`cp -a "${__dirname}/files/configs/." "${projectDir}/code/configs"`);
  execSync(`cp -a "${__dirname}/files/src/." "${projectDir}/code/src"`);
  execSync(`cp -a "${__dirname}/files/gitignore" "${projectDir}/.gitignore"`);

  // add npm scripts
  const packageJSON = JSON.parse(fs.readFileSync(`${projectDir}/code/package.json`, 'utf-8'));
  packageJSON.scripts = {
    build: 'NPM_SCRIPT=build ./scripts/npm-script.sh',
    dev: 'NPM_SCRIPT=dev ./scripts/npm-script.sh',
  };
  packageJSON.name = projectName;
  delete packageJSON.main;

  fs.writeFileSync(`${projectDir}/code/package.json`, JSON.stringify(packageJSON, null, 2));
};
