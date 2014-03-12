var AncientOak = Ember.Object.extend(Ember.Array, Ember.Enumerable, {
  versions: null,
  current: Em.computed.oneWay('versions.lastObject'),
  canRollback: Em.computed.gt('versions.length', 1),

  init: function (value) {
    this.set('versions', [I(value || {})]);
  },

  unknownProperty: function (key) {
    return oakOrPrimitive(this.get('current')(key));
  },

  dump: function () {
    return this.get('current').dump();
  },

  length: function () {
    return this.get('current').reduce(function (a) { return a + 1 }, 0);
  }.property('current'),

  objectAt: function (index) {
    return oakOrPrimitive(this.get('current')(index));
  },

  mutate: function (diff) {
    var newVersion = this.get('current').patch(diff);
    this.get('versions').pushObject(newVersion);
    Em.keys(diff).forEach(function (key) {
      this.notifyPropertyChange(key);
    }, this);
  },

  rollback: function () {
    var keys = new Ember.Set();
    this.get('current').forEach(function(_, key) { keys.add(key) });
    this.get('versions').popObject();
    this.get('current').forEach(function(_, key) { keys.add(key) });

    keys.forEach(function(key) {
      this.notifyPropertyChange(key);
    }, this);
  }
});

AncientOak[Ember.NAME_KEY] = 'AncientOak';

function oakOrPrimitive(obj) {
  if (isAncient(obj)) {
    return new AncientOak(obj);
  } else {
    return obj;
  }
}

function isAncient(obj) {
  return obj instanceof IC;
}

var IC = I({}).constructor;

export default AncientOak;
