const cli = require('commander');

cli
  .version('1.0.0')
  .command('create-project', 'create and set up new project')
  .parse(process.argv);


module.exports = { runtimeParams: cli.commands[0] };
