var Router = Ember.Router.extend();

Router.map(function () {
  this.resource('user', function () {
    this.route('edit');
  });
  this.resource('basket');
});

export default Router;
