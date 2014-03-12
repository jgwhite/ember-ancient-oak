module.exports = function (broccoli) {
  var filterTemplates = require('broccoli-template')
  var compileES6 = require('broccoli-es6-concatenator')
  var pickFiles = require('broccoli-static-compiler')
  var env = require('broccoli-env').getEnv()

  var app = broccoli.makeTree('app')
  app = pickFiles(app, {
    srcDir: '',
    destDir: 'app'
  })
  app = filterTemplates(app, {
    extensions: ['hbs', 'handlebars'],
    compileFunction: 'Ember.Handlebars.compile'
  })

  var vendor = broccoli.makeTree('vendor')

  var tests = broccoli.makeTree('tests')
  tests = pickFiles(tests, {
    srcDir: '',
    destDir: 'app/tests'
  })

  var sourceTrees = [app, vendor, tests]
  sourceTrees = sourceTrees.concat(broccoli.bowerTrees())

  var appAndDependencies = new broccoli.MergedTree(sourceTrees)

  var appJs = compileES6(appAndDependencies, {
    loaderFile: 'loader.js',
    ignoredModules: [
      'ember/resolver'
    ],
    inputFiles: [
      'app/**/*.js'
    ],
    legacyFilesToAppend: [
      'jquery.js',
      'handlebars.js',
      'ember.js',
      'ember-resolver.js',
      'ancient-oak-0.0.3.js'
    ],
    wrapInEval: env !== 'production',
    outputFile: '/assets/app.js'
  })

  var publicFiles = broccoli.makeTree('public')

  var qunit = pickFiles(appAndDependencies, {
    srcDir: '',
    files: ['qunit.*'],
    destDir: '/assets'
  })

  return [appJs, publicFiles, qunit]
}
