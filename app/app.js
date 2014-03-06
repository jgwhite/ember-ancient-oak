import Resolver from 'ember/resolver';

export default Ember.Application.extend({
  modulePrefix: 'app',
  Resolver: Resolver.default
});

Ember.TextField.reopen({
  attributeBindings: ['autofocus']
});
