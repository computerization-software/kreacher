module.exports = runtimeError => {
  console.log(runtimeError ? `Error: ${runtimeError}` : 'project successfully created');
  process.exit(runtimeError ? 1 : 0);
}
