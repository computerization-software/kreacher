# !/bin/bash

rm -rf tmp/;
mkdir tmp;
cd tmp;
npm init --yes;
npm install `cd ..; pwd`;
npx kreacher create-project -t webapp -n test-app -p .;
