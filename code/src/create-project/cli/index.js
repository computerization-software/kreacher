const cli = require('commander');

const helpText = require('./help-text');


cli
  .command('kreacher\u2002create-project')
  .version('1.0.0')
  .description('Create and set up new project')
  .option('-n, --name <project-name>', 'a project name')
  .option('-t, --type <project-type>', 'a project type (see "Project types" section)')
  .option('-p, --path <project-path>', 'a project parent directory path')
  .option('-f, --force', 'overwrite project if it already exists')
  .option('-c, --code-only', 'set up only code folder stuff and place it directly into root of project')
  .on('--help', () => console.log(helpText))
  .parse(process.argv);


module.exports = { runtimeParams: cli.commands[0] };
