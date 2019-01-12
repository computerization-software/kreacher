module.exports = `
Project types:
  website - a static website with html-pages, css-styles and js-scripts
  webapp  - a single-page web application based on React library
  remapp  - a backend app based on REM.js library
  cli     - a command line tool

Examples:
  Create and set up project "me-and-my-cat" that is common website
  in current directory:

    kreacher create-project -t website -n me-and-my-cat -p .

  Create and set up project "todolist" that is frontend webapp in /tmp,
  overwrite it if project already exists:

    kreacher create-project -t webapp -n todolist -p /tmp --force
`;
