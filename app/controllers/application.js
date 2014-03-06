export default Ember.ObjectController.extend({
  actions: {
    rollback: function () {
      this.get('model').rollback();
    }
  }
});
