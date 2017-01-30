# react-build
Utility for converting JSX files to JS files + minification + uglification

Example Usage:

react-build --help

//convert JSX to JS
react-build --input source.jsx --output dist.min.js

//convert JSX to JS with minification
react-build --input source.jsx --output dist.min.js --minify

//convert JSX to JS with uglification
react-build --input source.jsx --output dist.min.js --uglify

//convert JSX to JS with minification and uglification
react-build --input source.jsx --output dist.min.js --minify --uglify
