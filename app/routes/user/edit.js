export default Ember.Route.extend({
  model: function () {
    return this.get('user').getProperties('name', 'email');
  },

  actions: {
    save: function () {
      var user = this.get('user'),
          model = this.modelFor('user.edit');

      user.mutate(model);

      this.transitionTo('index');
    },

    cancel: function () {
      this.transitionTo('index');
    }
  }
});
