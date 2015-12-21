
## Pre-requisites

* Google Chrome (Official, ie. not Chromium)
* Node.js (see `engines` key in `package.json` for tested version)

_Note that a global installations of Cordova/Grunt are NOT required, as
we will be using project-level installs to ensure consistency._

## Usage

```
npm install
node_modules/.bin/bower install
node_modules/.bin/cordova platform add browser
node_modules/.bin/cordova run browser
node_modules/.bin/cordova plugin add 'https://github.com/katzer/cordova-plugin-local-notifications#0.8.2'
node_modules/.bin/cordova plugin add cordova-plugin-splashscreen
```
