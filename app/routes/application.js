export default Ember.Route.extend({
  actions: {
    rollback: function () {
      this.get('user').rollback();
    }
  }
});
