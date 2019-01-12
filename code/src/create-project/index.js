// require dependencies
const
  cli  = require('./cli'),
  run  = require('./core/run');
  exit = require('./core/exit');


run({
  runtimeParams: cli.runtimeParams,
  onComplete: exit
});
