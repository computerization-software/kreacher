# !/bin/bash

rm -rf tmp/;
mkdir tmp;
cd tmp;
npm init --yes;
npm install `cd ..; pwd`;
npx kreacher create-project -t remapp -n test-app -p .;
