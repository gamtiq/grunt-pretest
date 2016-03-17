/*
 * grunt-pretest
 * https://github.com/gamtiq/grunt-pretest
 *
 * Copyright (c) 2013-2016 Denis Sikuler
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
            sourceTask = options.task,
            sConnector = options.testConnect,
            data = {task: sourceTask, pretest: this, options: options},
            sourceList = this.filesSrc,
            bAnd, bFuncTest, bRun, bSource, nI, nK, nL, nQ, result, sSource, sType, task, test;
        
        grunt.log.writeln('pretest start');
        grunt.verbose.writeln('pretest: test - ' + testList);
        grunt.verbose.writeln('pretest: test connector - ' + sConnector);
        grunt.verbose.writeln('pretest: task - ' + sourceTask);
        if (testList) {
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
            if (sourceList.length > 0 || this.data.src) {
                bSource = true;
            }
            else {
                sourceList = [null];
                bSource = false;
            }
            
            for (nK = 0, nQ = sourceList.length; nK < nQ; nK++) {
                sSource = sourceList[nK];
                task = sourceTask;
                bRun = true;
                if (nK > 0) {
                    grunt.log.writeln();
                }
                if (bSource) {
                    data.source = sSource;
                    grunt.log.writeln('pretest: process source - ' + sSource);
                }
                grunt.log.writeln('pretest: do test(s)');
                for (nI = 0, nL = testList.length; nI < nL; nI++) {
                    test = testList[nI];
                    bFuncTest = typeof test === 'function';
                    if (! Boolean( result = (bFuncTest ? test(data, grunt) : test) )) {
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
                    else {
                        grunt.verbose.writeln([
                                               'pretest: test #',
                                               (nI + 1),
                                               ' is passed. test result - ',
                                               result
                                               ].join(''));
                        sType = typeof result;
                        if (bFuncTest && (sType === 'string' || sType === 'function' || (Array.isArray(result) && result.length))) {
                            task = result;
                        }
                        if (! bAnd) {
                            bRun = true;
                            break;
                        }
                    }
                }
                
                if (bRun && task) {
                    grunt.log.writeln('pretest: run task(s)');
                    if (typeof task === 'function') {
                        task = task(data, grunt);
                    }
                    if ((typeof task === 'string' || Array.isArray(task)) && task.length) {
                        grunt.task.run(task);
                    }
                }
                else if (! task) {
                    grunt.log.writeln('pretest: no task is specified');
                }
            }
        }
    });
    
};
