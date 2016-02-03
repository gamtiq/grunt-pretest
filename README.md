# grunt-pretest

> Grunt plugin to run task only when specified tests are passed.

[![NPM version](https://badge.fury.io/js/grunt-pretest.png)](http://badge.fury.io/js/grunt-pretest)
[![License](https://img.shields.io/github/license/gamtiq/grunt-pretest.svg)](https://raw.githubusercontent.com/gamtiq/grunt-pretest/master/LICENSE-MIT)

## Getting Started
This plugin requires Grunt `~0.4.2`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-pretest --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-pretest');
```

## The "pretest" task

### Overview
The `pretest` task is multi task.

In your project's Gruntfile, add a section named `pretest` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  pretest: {
    options: {
      // Task-specific options go here.
    },
    your_target: {
      options: {
        // Target-specific options go here.
      }
    },
  },
});
```

### Options

#### options.test
Type: any  
Default value: `true`

Specifies test or array of tests that should be passed to run a task.
Any test that is not a function is converted to boolean value.
If test is a function, its result is used as test value.
The following parameters are passed into the function:

* value of `task` option (see below)
* reference to the object that represents the processed `pretest` task (see [Inside Tasks](http://gruntjs.com/api/inside-tasks) for available properties)
* reference to `grunt` object

If test function returns a non-empty string, a non-empty array or a function,
the returned value will be used as task that should be run instead of `task` option.

The task described in `task` option or returned from a test function will be run only if:

* results of all tests have `true` value when `testConnect` option is `and`
* result of any test has `true` value when `testConnect` option is `or`

#### options.testConnect
Type: `String`  
Default value: `and`

A boolean connector that should be used when array of tests is specified in `test` option.
Valid values are the following: `and`, `or` (case-insensitive). Any other value is treated as `and`.

#### options.task
Type: `String` | `Array of String` | `Function`

Describes task(s) that should be run when test is passed.
This option can be omitted if test function returns the necessary task(s).
Each string should specify task in usual format (e.g. `concat:foo`, `bar:testing:123`).
If a function is set as task, the following parameters will be passed into the function:

* reference to the object that represents the processed `pretest` task (see [Inside Tasks](http://gruntjs.com/api/inside-tasks) for available properties)
* reference to `grunt` object

If task function returns a non-empty string or a non-empty array, the returned value will be used as argument for `grunt.task.run`
(i.e. defines task(s) that should be run after the processed `pretest` task).

### Usage Example

In this example, the `concat` task will be run only if directory specified by `configDir` configuration parameter exists.

```js
grunt.initConfig({
    pretest: {
        test: function(task, preTask, grunt) {
            return grunt.file.isDir(grunt.config.get("configDir"));
        },
        task: 'concat:config_files'
    }
});
```

In the following example, the test function returns a task that should be run depending on value of `target` option.

```js
grunt.initConfig({
    pretest: {
        test: function(task, preTask, grunt) {
            var target = grunt.option("target");
            return target
                    ? "prepare:" + (target === "prod" ? "product" : "dev")
                    : false;
        }
    }
});
```

See `Gruntfile.js` for more examples.

## Related projects

* [grunt-init-pack](https://github.com/gamtiq/grunt-init-pack)
* [grunt-uniator](https://github.com/gamtiq/grunt-uniator)

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_
