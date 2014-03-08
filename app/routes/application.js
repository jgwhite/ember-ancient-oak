import AncientOak from 'ancient_oak';

export default Ember.Route.extend({
  model: function () {
    return new AncientOak({ who: 'World', why: { reason: 'okay!' } });
  }
});
