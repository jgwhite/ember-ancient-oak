export default Ember.Route.extend({
  beforeModel: function () {
    this.get('user').setProperties({
      name: 'Jo Smith',
      email: 'jo.smith@example.com',
      basket: [{
        name: 'T-shirt',
        size: 'xs',
        qty: 1
      }, {
        name: 'Hoodie',
        size: 's',
        qty: 1
      }, {
        name: 'Socks',
        size: 'm',
        qty: 3
      }]
    });
  }
});
