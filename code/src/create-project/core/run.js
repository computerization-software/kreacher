// require dependencies
const
  validateRuntimeParams = require('./validate-runtime-params'),
  createNewDirectoryForProject = require('./create-new-directory-for-project'),
  createProjectStructure = require('./create-project-structure'),
  initProjectTypeSpecificFeatures = require('./init-project-type-specific-features'),
  addCommonNPMScripts = require('./add-common-npm-scripts');

const run = runtimeParams => {
  // validate runtime params
  const runtimeParamsValidationError = validateRuntimeParams(runtimeParams);
  if (runtimeParamsValidationError) return runtimeParamsValidationError;

  // create new directory for project
  const createNewDirectoryForProjectError = createNewDirectoryForProject(runtimeParams);
  if (createNewDirectoryForProjectError) return createNewDirectoryForProjectError;

  // create project structure
  const createProjectStructureError = createProjectStructure(runtimeParams);
  if (createProjectStructureError) return createProjectStructureError;

  // initialize project type specific features
  const initProjectTypeSpecificFeaturesError = initProjectTypeSpecificFeatures(runtimeParams);
  if (initProjectTypeSpecificFeaturesError) return initProjectTypeSpecificFeaturesError;

  // add common npm scripts
  const addCommonNPMScriptsError = addCommonNPMScripts(runtimeParams);
  if (addCommonNPMScriptsError) return addCommonNPMScriptsError;
}

module.exports = ({runtimeParams, onComplete}) => {
  const runtimeErrors = run(runtimeParams);
  onComplete(runtimeErrors);
};
