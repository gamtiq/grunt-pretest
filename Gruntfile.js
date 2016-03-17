/*
 * grunt-pretest
 * https://github.com/gamtiq/grunt-pretest
 *
 * Copyright (c) 2013-2016 Denis Sikuler
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {
    var fs = require('fs'),
        path = require('path');

    // Project configuration.
    grunt.initConfig({
        jshint: {
            all: [
                'Gruntfile.js',
                'tasks/*.js',
                '<%= nodeunit.tests %>',
                ],
            options: {
                jshintrc: '.jshintrc',
            }
        },
    
        // Configuration parameters for tests
        p_no_test: {},
        p_true: '',
        p_false: 'skip',
        p_pass: '',
        p_fail: 'fail',
        p_func_pass: false,
        p_func_fail: false,
        p_list_and_pass: 10,
        p_list_and_fail: 10,
        p_list_or_pass: null,
        p_list_or_fail: null,
        p_no_task: 'no-task',
        p_return_task: '',
        p_override_task: 'original',
        p_return_task_list: 123,
        p_return_task_func: null,
        p_return_func_return_task: 'e1',
        p_task_return_task: '',
        p_task_return_task_list: 0,
        p_source_file: 0,
        p_source_exists: 0,
        p_source_not_found: 'not found',
        p_source_empty: 0,
        
        // Configuration to be run (and then tested).
        pretest: {
            test_no_test: {
                options: {
                    task: 'set-param:p_no_test:changed'
                }
            },
            
            test_true: {
                options: {
                    test: 1,
                    task: 'set-param:p_true:abc'
                }
            },
            
            test_false: {
                options: {
                    test: null,
                    task: 'set-param:p_false:done'
                }
            },
            
            test_pass: {
                options: {
                    test: '<%= p_true %>',
                    task: 'set-param:p_pass:pass'
                }
            },
            
            test_fail: {
                options: {
                    test: '<%= (p_true === "true") || "" %>',
                    task: 'set-param:p_fail:pass'
                }
            },
            
            test_func_pass: {
                options: {
                    data: 1,
                    test: function(data, grunt) {
                        return data.options.data === 1 && grunt.config.get('p_true') === 'abc';
                    },
                    task: function(data, grunt) {
                        grunt.config.set('p_func_pass', 'ok');
                    }
                }
            },
            
            test_func_fail: {
                options: {
                    test: function(data, grunt) {
                        return grunt.config.get('p_func_fail');
                    },
                    task: 'set-param:p_func_fail:ok'
                }
            },
            
            test_list_and_pass: {
                options: {
                    data: true,
                    test: [
                            1,
                            {},
                            '<%= p_true %>',
                            function(data, grunt) {
                                return data.options.data;
                            },
                            function(data, grunt) {
                                return grunt.config.get('p_false') === 'skip';
                            }
                           ],
                    task: ['set-param:p_list_and_pass:one', 'set-param:p_list_and_pass:two', 'set-param:p_list_and_pass:three']
                }
            },
            
            test_list_and_fail: {
                options: {
                    test: [
                           true,
                           function(data, grunt) {
                               return data.task === 'set-param';
                           },
                           'true'
                           ],
                    task: 'set-param:p_list_and_fail:ok'
                }
            },
            
            test_list_or_pass: {
                options: {
                    test: [
                            '',
                            0,
                            '<%= grunt.config.get("p_true_true_true") || "" %>',
                            function(data, grunt) {
                                return data.options.test.length > 3;
                            },
                            false
                           ],
                    testConnect: 'or',
                    task: 'set-param:p_list_or_pass:done'
                }
            },
            
            test_list_or_fail: {
                options: {
                    test: [
                           function(data, grunt) {
                               return grunt.config.get('undefined-config-param');
                           },
                           false,
                           '',
                           0
                           ],
                    testConnect: 'or',
                    task: 'set-param:p_list_or_fail:value'
                }
            },
            
            test_no_task: {
                options: {
                    test: function(data, grunt) {
                        return true;
                    }
                }
            },
            
            test_return_task: {
                options: {
                    test: function(data, grunt) {
                        return 'set-param:p_return_task:ok';
                    }
                }
            },
            
            test_override_task: {
                options: {
                    test: function(data, grunt) {
                        return 'set-param:p_override_task:from-test';
                    },
                    task: 'set-param:p_override_task:usual'
                }
            },
            
            test_return_task_list: {
                options: {
                    test: [
                            function(data, grunt) {
                                return 'set-param:p_return_task_list:a1';
                            },
                            function(data, grunt) {
                                return true;
                            },
                            function(data, grunt) {
                                return ['set-param:p_return_task_list:b2', 'set-param:p_return_task_list:c3'];
                            },
                            function(data, grunt) {
                                return [];
                            },
                            function(data, grunt) {
                                return 1;
                            }
                           ]
                },
            },
            
            test_return_task_func: {
                options: {
                    test: [
                            function(data, grunt) {
                                return '';
                            },
                            function(data, grunt) {
                                return null;
                            },
                            function(data, grunt) {
                                return function setParam(data, grunt) {
                                    grunt.config.set('p_return_task_func', 101);
                                };
                            },
                            function(data, grunt) {
                                return [];
                            },
                            function(data, grunt) {
                                return -5;
                            }
                           ],
                    testConnect: 'or'
                }
            },
            
            test_return_func_return_task: {
                options: {
                    test: function(data, grunt) {
                        return function getTaskList(data, grunt) {
                            return ['set-param:p_return_func_return_task:e2', 'set-param:p_return_func_return_task:e4'];
                        };
                    }
                }
            },
            
            test_task_return_task: {
                options: {
                    test: function(data, grunt) {
                        return true;
                    },
                    task: function(data, grunt) {
                        return 'set-param:p_task_return_task:value';
                    }
                }
            },
            
            test_task_return_task_list: {
                options: {
                    test: function(data, grunt) {
                        return true;
                    },
                    task: function(data, grunt) {
                        return ['set-param:p_task_return_task_list:one', 'set-param:p_task_return_task_list:two'];
                    }
                }
            },
            
            test_source_file: {
                src: ['*', '.*'],
                options: {
                    test: function(data, grunt) {
                        var sSource = data.source,
                            sExt = path.extname(sSource);
                        return sExt.substring(0, 3) === '.js' || sSource.substring(0, 3) === '.js';
                    },
                    task: function(data, grunt) {
                        grunt.config.set('p_source_file', grunt.config.get('p_source_file') + 1);
                    }
                }
            },
            
            test_source_exists: {
                src: ['test', 'abcde', 'package.json', 'non-existent', 'Gruntfile.js', 'tasks', 'json.json'],
                options: {
                    test: function(data, grunt) {
                        var bResult = true;
                        try {
                            fs.statSync(data.source);
                        }
                        catch (e) {
                            bResult = false;
                        }
                        return bResult;
                    },
                    task: function(data, grunt) {
                        grunt.config.set('p_source_exists', grunt.config.get('p_source_exists') + 1);
                    }
                }
            },
            
            test_source_not_found: {
                src: ['*.abcde'],
                options: {
                    test: function(data, grunt) {
                        return true;
                    },
                    task: function(data, grunt) {
                        grunt.config.set('p_source_not_found', 'found');
                    }
                }
            },
            
            test_source_empty: {
                src: [],
                options: {
                    test: function(data, grunt) {
                        return true;
                    },
                    task: function(data, grunt) {
                        grunt.config.set('p_source_empty', 'run');
                    }
                }
            }
        },
    
        // Unit tests.
        nodeunit: {
            tests: ['test/*_test.js'],
        }
    
    });

    // Actually load this plugin's task(s).
    grunt.loadTasks('tasks');
    
    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-nodeunit');
    
    grunt.registerTask('set-param', 'Set value of config parameter', function(sName, sValue) {
        grunt.config.set(sName, sValue);
    });
    
    // Whenever the "test" task is run, first run this
    // plugin's task(s), then test the result.
    grunt.registerTask('test', ['pretest', 'nodeunit']);
    
    // By default, lint and run all tests.
    grunt.registerTask('default', ['jshint', 'test']);
    
    // For Travis CI service
    grunt.registerTask("travis", ["default"]);

};
