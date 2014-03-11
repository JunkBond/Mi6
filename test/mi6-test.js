var expect = require('expect.js');

var mi6 = require('../');

describe('mi6', function() {
  it('exposes the Spy class', function() {
    expect(mi6.Spy).to.be.a(Function);
  });

  it('instantiates spys when called with a function', function() {
    var fn = function() {};
    expect(mi6(fn).calls).to.be.a(Function);
  });

  describe('target and object', function() {
    it('overwrites a function on an object', function() {
      var obj = {
        fn: function() { }
      };
      var spy = mi6(obj, 'fn');
      expect(obj.fn).to.be(spy);
    });

    it('maintains context', function() {
      var obj = {
        name: 'Tom',
        fnA: function() { this.fnB(this.name); },
        fnB: function(name) { }
      };

      mi6(obj, 'fnA').callsThrough();
      var fnB = mi6(obj, 'fnB').callsThrough();
      obj.fnA();
      expect(fnB.calledWith()).to.eql(['Tom']);
    });

    it('exposes a restore method on a spy', function() {
      var obj = {
        fn: function() { }
      };
      var original = obj.fn;
      var spy = mi6(obj, 'fn');
      spy.restore();
      expect(obj.fn).to.be(original);
    });
  });
});
