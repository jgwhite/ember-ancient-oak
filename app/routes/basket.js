export default Ember.Route.extend({
  model: function () {
    return this.get('user.basket');
  },

  setupController: function (controller, model) {
    this._super(controller, model);
    controller.set('newItem', {});
  },

  actions: {
    add: function () {
      var newItem = this.get('controller.newItem');
    }
  }
});
