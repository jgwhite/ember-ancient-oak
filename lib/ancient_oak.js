export default Ember.Object.extend({
  versions: Em.computed.oneWay('_versions.length'),

  init: function () {
    this._current = I({});
    this._versions = Em.A([this._current]);
  },

  rollback: function () {
    if (this._versions.length <= 1) return;

    var keys = new Em.Set();

    this._current.forEach(function (_, key) { keys.add(key) });

    this._versions.popObject();
    this._current = Em.get(this._versions, 'lastObject');

    this._current.forEach(function (_, key) { keys.add(key) });

    keys.forEach(function (key) {
      this.notifyPropertyChange(key);
    }, this);
  },

  unknownProperty: function (key) {
    return this._current(key);
  },

  setUnknownProperty: function (key, value) {
    this._current = this._current.set(key, value);
    this._storeVersion();
    this.notifyPropertyChange(key);
  },

  setProperties: function (properties) {
    this._current = this._current.patch(properties);
    Em.keys(properties).forEach(function (key) {
      this.notifyPropertyChange(key);
    }, this);
    this._storeVersion();
  },

  _storeVersion: function () {
    this._versions.addObject(this._current);
  }
});
