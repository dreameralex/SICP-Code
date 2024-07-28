"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

// class Basic {
// }
// Basic.prototype.print = function(){
//     console.log("print")
// }
// Basic.prototype.print1 = function(){
//     Basicprint()
// }
// test = new Basic()
var Basic =
/*#__PURE__*/
function () {
  function Basic() {
    _classCallCheck(this, Basic);
  }

  _createClass(Basic, [{
    key: "print",
    value: function print() {
      console.log("print1");
    }
  }, {
    key: "print1",
    value: function print1() {
      this.print();
    }
  }]);

  return Basic;
}();

test = new Basic();
test.print();
test.print1();