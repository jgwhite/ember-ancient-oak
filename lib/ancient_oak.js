var AncientOak = Ember.Object.extend({
  versions: Em.computed.oneWay('_versions.length'),

  init: function (data) {
    if (isAncientOak(data)) {
      this._content = data;
    } else if (Em.typeOf(data) === 'object') {
      this._content = I(data);
    } else if (Em.isNone(data)) {
      this._content = I({});
    } else {
      Em.Logger.error('AncientOak objects can be instantiated with immutable trees, POJOs or nothing. The data you passed (%@) has been discarded.'.fmt(data));
      this._content = I({});
    }

    this._versions = [];
    this._storeVersion();
  },

  rollback: function () {
    if (this._versions.length <= 1) return;

    var keys = new Em.Set();

    this._content.forEach(function (_, key) { keys.add(key) });

    this._versions.popObject();
    this._content = Em.get(this._versions, 'lastObject');

    this._content.forEach(function (_, key) { keys.add(key) });

    keys.forEach(function (key) {
      this.notifyPropertyChange(key);
    }, this);
  },

  unknownProperty: function (key) {
    var value = this._content(key);

    if (isAncientOak(value)) {
      return new AncientOak(value);
    } else {
      return value;
    }
  },

  setUnknownProperty: function (key, value) {
    this._content = this._content.set(key, value);
    this._storeVersion();
    this.notifyPropertyChange(key);
  },

  setProperties: function (properties) {
    this._content = this._content.patch(properties);
    this._storeVersion();
    Em.keys(properties).forEach(function (key) {
      this.notifyPropertyChange(key);
    }, this);
  },

  _storeVersion: function () {
    this._versions.pushObject(this._content);
  }
});

var AncientOakConstructor = I({}).constructor;

function isAncientOak(obj) {
  return obj && obj.constructor === AncientOakConstructor;
}

export default AncientOak;
