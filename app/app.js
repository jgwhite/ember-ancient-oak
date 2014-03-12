import Resolver from 'ember/resolver';

var App = Ember.Application.extend({
  modulePrefix: 'app',
  Resolver: Resolver.default
});

App.initializer({
  name: 'user',
  initialize: function (container, app) {
    app.inject('route', 'user', 'model:user');
    app.inject('controller', 'user', 'model:user');
  }
});

export default App;
