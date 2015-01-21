#!/usr/bin/env node

process.title = 'styleguider';

var optimist = require('optimist'),
    options = optimist.argv,
    args = options._,
    action = args[0],
    basedir = process.cwd(),
    styleguider = require('./bin/retrieve-styleguider')(basedir, options, args);

if(action == 'start') {
    require('./bin/start-webapp')(styleguider);
}
if(action == 'compile') {
    require('./bin/compile-styleguide')(styleguider);
}
if(action == 'dep') {
    action = args[1];
    if(action == 'tree') {
        var tree = styleguider.compiler.dependencies.tree();
        console.log('Dep tree', JSON.stringify(tree));
    }
    if(action == 'link') {
        styleguider.compiler.dependencies.link();
    }
}