import VersionedObject from 'versioned-object';

export default Ember.Route.extend({
  model: function() {
    return VersionedObject.create({
      who: 'World'
    })
  }
});
