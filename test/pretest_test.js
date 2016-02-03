'use strict';

var grunt = require('grunt');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports.pretest = {
    test_no_test: function(test) {
        test.expect(1);
    
        test.strictEqual(grunt.config.get('p_no_test'), 'changed', 'should run task.');
    
        test.done();
    },
    
    test_true: function(test) {
        test.expect(1);
    
        test.strictEqual(grunt.config.get('p_true'), 'abc', 'should run task.');
    
        test.done();
    },
    
    test_false: function(test) {
        test.expect(1);
    
        test.strictEqual(grunt.config.get('p_false'), 'skip', 'should not run task.');
    
        test.done();
    },
    
    test_pass: function(test) {
        test.expect(1);
    
        test.strictEqual(grunt.config.get('p_pass'), 'pass', 'should run task.');
    
        test.done();
    },
    
    test_fail: function(test) {
        test.expect(1);
    
        test.strictEqual(grunt.config.get('p_fail'), 'fail', 'should not run task.');
    
        test.done();
    },
    
    test_func_pass: function(test) {
        test.expect(1);
    
        test.strictEqual(grunt.config.get('p_func_pass'), 'ok', 'should run task.');
    
        test.done();
    },
    
    test_func_fail: function(test) {
        test.expect(1);
    
        test.strictEqual(grunt.config.get('p_func_fail'), false, 'should not run task.');
    
        test.done();
    },
    
    test_list_and_pass: function(test) {
        test.expect(1);
    
        test.strictEqual(grunt.config.get('p_list_and_pass'), 'three', 'should run task.');
    
        test.done();
    },
    
    test_list_and_fail: function(test) {
        test.expect(1);
    
        test.strictEqual(grunt.config.get('p_list_and_fail'), 10, 'should not run task.');
    
        test.done();
    },
    
    test_list_or_pass: function(test) {
        test.expect(1);
    
        test.strictEqual(grunt.config.get('p_list_or_pass'), 'done', 'should run task.');
    
        test.done();
    },
    
    test_list_or_fail: function(test) {
        test.expect(1);
    
        test.strictEqual(grunt.config.get('p_list_or_fail'), null, 'should not run task.');
    
        test.done();
    },
    
    test_no_task: function(test) {
        test.expect(1);
    
        test.strictEqual(grunt.config.get('p_no_task'), 'no-task', 'should not run task.');
    
        test.done();
    },
    
    test_return_task: function(test) {
        test.expect(1);
    
        test.strictEqual(grunt.config.get('p_return_task'), 'ok', 'should run task.');
    
        test.done();
    },
    
    test_override_task: function(test) {
        test.expect(1);
    
        test.strictEqual(grunt.config.get('p_override_task'), 'from-test', 'should run task returned from test.');
    
        test.done();
    },
    
    test_return_task_list: function(test) {
        test.expect(1);
    
        test.strictEqual(grunt.config.get('p_return_task_list'), 'c3', 'should run tasks.');
    
        test.done();
    },
    
    test_return_task_func: function(test) {
        test.expect(1);
    
        test.strictEqual(grunt.config.get('p_return_task_func'), 101, 'should run task.');
    
        test.done();
    },
    
    test_return_func_return_task: function(test) {
        test.expect(1);
    
        test.strictEqual(grunt.config.get('p_return_func_return_task'), 'e4', 'should run tasks.');
    
        test.done();
    }
};
