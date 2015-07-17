/*
 * grunt-pretest
 * https://github.com/gamtiq/grunt-pretest
 *
 * Copyright (c) 2013-2015 Denis Sikuler
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {
    
    grunt.registerMultiTask('pretest', 'Run specified task(s) only when test is passed (condition is true)', function() {
        var sDefaultConnect = 'and',
            options = this.options({
                test: true, 
                testConnect: sDefaultConnect
            }),
            testList = options.test,
            task = options.task,
            sConnector = options.testConnect,
            bRun = true,
            bAnd, nI, nL, result, test;
        
        grunt.log.writeln('pretest start');
        grunt.verbose.writeln('pretest: test - ' + testList);
        grunt.verbose.writeln('pretest: test connector - ' + sConnector);
        grunt.verbose.writeln('pretest: task - ' + task);
        if (testList && task) {
            if (! Array.isArray(testList)) {
                testList = [testList];
            }
            if (typeof sConnector !== 'string') {
                sConnector = sDefaultConnect;
            }
            else {
                sConnector = sConnector.toLowerCase();
            }
            if (sConnector !== 'and' && sConnector !== 'or') {
                sConnector = sDefaultConnect;
            }
            bAnd = sConnector === 'and';
            
            grunt.log.writeln('pretest: do test(s)');
            for (nI = 0, nL = testList.length; nI < nL; nI++) {
                test = testList[nI];
                if (! Boolean( result = (typeof test === 'function' ? test(task, this, grunt) : test) )) {
                    grunt.log.writeln([
                                       'pretest: test #', 
                                       (nI + 1), 
                                       ' is not passed. test result - ', 
                                       result
                                       ].join(''));
                    grunt.verbose.writeln([
                                           'pretest: test #', 
                                           (nI + 1), 
                                           ' - ', 
                                           test
                                           ].join(''));
                    bRun = false;
                    if (bAnd) {
                        break;
                    }
                }
                else if (! bAnd) {
                    bRun = true;
                    break;
                }
            }
            
            if (bRun) {
                grunt.log.writeln('pretest: run task(s)');
                if (typeof task === 'function') {
                    task(this, grunt);
                }
                else {
                    grunt.task.run(task);
                }
            }
        }
    });
    
};
