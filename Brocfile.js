module.exports = function (broccoli) {
  var filterTemplates = require('broccoli-template')
  var compileES6 = require('broccoli-es6-concatenator')
  var pickFiles = require('broccoli-static-compiler')
  var env = require('broccoli-env').getEnv()

  function preprocess (tree) {
    tree = filterTemplates(tree, {
      extensions: ['hbs', 'handlebars'],
      compileFunction: 'Ember.Handlebars.compile'
    })
    return tree
  }

  var app = broccoli.makeTree('app')
  app = pickFiles(app, {
    srcDir: '/',
    destDir: 'appkit'
  })
  app = preprocess(app)

  var lib = broccoli.makeTree('lib')
  var vendor = broccoli.makeTree('vendor')

  var sourceTrees = [app, lib, vendor]
  sourceTrees = sourceTrees.concat(broccoli.bowerTrees())

  var appAndDependencies = new broccoli.MergedTree(sourceTrees)

  var appJs = compileES6(appAndDependencies, {
    loaderFile: 'loader.js',
    ignoredModules: [
      'ember/resolver'
    ],
    inputFiles: [
      'appkit/**/*.js'
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

  return [appJs, publicFiles]
}
