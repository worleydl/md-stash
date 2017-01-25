'use strict';

describe('Service: stash', function () {

  // load the service's module
  beforeEach(module('mdPadApp'));

  // instantiate service
  var stash;
  beforeEach(inject(function (_stash_) {
    stash = _stash_;
  }));

  it('should do something', function () {
    expect(!!stash).toBe(true);
  });

});
