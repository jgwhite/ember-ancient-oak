import AncientOak from 'ancient_oak';

module('AncientOak');

test('set', function () {
  var obj = new AncientOak();

  obj.set('foo', 'bar');

  equal('bar', obj.get('foo'));
  equal(obj.get('versions'), 2);
});

test('setProperties', function () {
  var obj = new AncientOak();

  obj.setProperties({
    foo: 'bar',
    baz: 'qux'
  });

  equal('bar', obj.get('foo'));
  equal('qux', obj.get('baz'));
  equal(obj.get('versions'), 2);
});

test('bindings', function () {
  var obj = new AncientOak();
  var proxy = Ember.ObjectProxy.create({ content: obj });

  obj.set('foo', 'bar');

  equal(proxy.get('foo'), 'bar');
});

test('rollback', function () {
  var obj = new AncientOak();

  obj.set('foo', 'bar');
  obj.set('foo', 'baz');

  obj.rollback();

  equal(obj.get('foo'), 'bar');
});
