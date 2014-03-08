export default Ember.ObjectController.extend({
  disableRollback: Em.computed.lte('versions', 1),

  actions: {
    rollback: function () {
      this.get('model').rollback();
    }
  }
});
