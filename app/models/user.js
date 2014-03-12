import AncientOak from 'app/models/ancient_oak';

export default {
  create: function () {
    return new AncientOak({
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
};
