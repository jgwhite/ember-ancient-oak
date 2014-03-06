import AncientOak from 'ancient_oak';

export default Ember.Route.extend({
  model: function () {
    var o = new AncientOak();
    o.set('who', 'World');
    return o;
  }
});
