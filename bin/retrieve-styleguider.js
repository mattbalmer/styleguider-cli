var resolve = require('resolve').sync,
    findup = require('findup-sync'),
    path = require('path');

var DEBUG_REQUIRE_PATH = '../../styleguider';

module.exports = function(basedir, options, args) {
    var styleguider, sgPath;

    console.log('basedir', basedir);

    if(options.debug == true) {
        styleguider = require(DEBUG_REQUIRE_PATH);
    } else {
        try {
            sgPath = resolve('styleguider', { basedir: basedir });
            styleguider = require(sgPath);
        } catch (e) {
            sgPath = path.join(basedir, 'node_modules', 'styleguider');
            styleguider = require(sgPath);

            if(!styleguider) {
                sgPath = findup('lib/styleguider.js');

                console.log('sgPath', sgPath);

                if(sgPath) {
                    styleguider = require(sgPath);
                } else {
                    console.log('Cannot find local styleguider install. Trying global.');
                    styleguider = require('styleguider');
                    if(!styleguider) {
                        console.log('No version of styleguider could be loaded');
                        process.exit(1);
                    }
                }
            }
        }
    }

    return styleguider(basedir);
};