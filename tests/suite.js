function run() {
  var regex = /_test$/;

  Em.keys(requirejs._eak_seen).forEach(function(key) {
    if (regex.test(key)) require(key, null, null, true);
  });
}

export { run };
