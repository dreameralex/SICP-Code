"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Basic = function Basic() {
  _classCallCheck(this, Basic);
}; // Basic.prototype.pair = function(x,y){
//     function dispatch(m){
//         return m === 0
//             ? x
//             : m === 1
//             ? y
//             : Error(m,'argument not 0 or 1 -- pair');
//     }
//     return dispatch;
// }


Basic.prototype.get_new_pair = function () {
  return;
};

Basic.prototype.pair = function (x, y) {
  this.name = "pair11111";

  function set_x(v) {
    x = v;
  }

  function set_y(v) {
    y = v;
  }

  return function (m) {
    return m === 'head' ? x : m === "tail" ? y : m === "set_head" ? set_x : m === "set_tail" ? set_y : Error("undefined operation -- pair");
  };
};

Basic.prototype.head = function (z) {
  return z("head");
};

Basic.prototype.tail = function (z) {
  return z("tail");
};

Basic.prototype.set_head = function (z, new_value) {
  z("set_head")(new_value);
  return z;
};

Basic.prototype.set_tail = function (z, new_value) {
  z("set_tail")(new_value);
  return z;
};

Basic.prototype.map = function (fun, items) {
  return items === null ? null : this.pair(fun(this.head(items)), this.map(fun, this.tail(items)));
}; // List


Basic.prototype.list = function () {
  for (var _len = arguments.length, rest = new Array(_len), _key = 0; _key < _len; _key++) {
    rest[_key] = arguments[_key];
  }

  temp = new Basic();

  function make_list(list_input) {
    var a = list_input.shift();
    return list_input.length === 0 ? temp.pair(a, null) : temp.pair(a, make_list(rest));
  }

  return make_list(rest);
};

Basic.prototype.test = function (x, y) {
  return this.pair(x, y);
};

Basic.prototype.list_ref = function (items, n) {
  return n === 0 ? this.head(items) : this.list_ref(this.tail(items), n - 1);
};

Basic.prototype.length = function (items) {
  return this.is_null(items) ? 0 : 1 + this.length(this.tail(items));
}; // To tell whether x in itmes, itme is a list


Basic.prototype.member = function (item, x) {
  return this.is_null(x) ? null : item === this.head(item) ? x : this.member(item, this.tail(x));
};

Basic.prototype.print_list_temp = function (items) {
  temp = items;

  while (temp !== null) {
    console.log(this.head(temp));
    temp = this.tail(temp);
  }
};

Basic.prototype.print_list = function (items) {
  if (this.tail(items) !== null) {
    if (this.head(items).name === "dispatch") {
      print_list(this.head(items));
      console.log("~");
    } else {
      console.log(this.head(items));
    }

    this.tail(items);
  } else {
    if (this.head(items).name === "dispatch") {
      print_list(this.head(items));
      console.log("~");
    } else {
      console.log(this.head(items));
    }
  }
}; // function append(list1, list2){
//     return list1 === null
//         ? list2
//         : pair(head(list1), append(tail(list1),list2))
// }


Basic.prototype.append = function (list1, list2) {
  if (typeof list1 !== 'function') {
    list1 = this.list(list1);
  }

  if (list2.name !== 'function') {
    list2 = this.list(list2);
  }

  function append_process(list1, list2) {
    console.log(1);
    return list1 === null ? list2 : this.pair(this.head(list1), append_process(this.tail(list1), list2));
  }

  return append_process(list1, list2);
};

Basic.prototype.filter = function (predicate, sequence) {
  return sequence === null ? null : predicate(this.head(sequence)) ? this.pair(this.head(sequence), filter(predicate, this.tail(sequence))) : filter(predicate, this.tail(sequence));
};

Basic.prototype.accumulate = function (op, initial, sequence) {
  return sequence === null ? initial : op(head(sequence), accumulate(op, initial, tail(sequence)));
}; //accumulate(plus, 0, list_accumulate)


Basic.prototype.enumerate_interval = function (low, high) {
  return low > high ? null : pair(low, enumerate_interval(low + 1, high));
}; //console.log('Enumerate interval:')
//print_list(enumerate_interval(1,10))


Basic.prototype.is_null = function (item) {
  return item === null ? true : false;
};

Basic.prototype.is_bollean = function (item) {
  return item === 1 || item === 0 ? true : false;
};

Basic.prototype.is_undefined = function (item) {
  return item === undefined ? true : false;
};

Basic.prototype.equal = function (item1, item2) {
  return item1 === item2 ? true : false;
};

Basic.prototype.stringfy = function (item) {
  return item.toString();
};

Basic.prototype.display = function (item) {
  console.log(item);
}; // Math


Basic.prototype.is_even = function (n) {
  return n % 2 === 0 ? true : false;
};

function is_even(n) {
  return n % 2 === 0 ? true : false;
}

Basic.prototype.expmod = function (base, exp, m) {
  // console.log(1)
  if (exp === 0) {
    return 1;
  } else {
    if (is_even(exp)) {
      var half_exp = this.expmod(base, exp / 2, m);
      return half_exp * half_exp % m;
    } else {
      return base * this.expmod(base, exp - 1, m) % m;
    }
  }
};

Basic.prototype.fermat_test = function (n) {
  expmod = this.expmod;

  function try_it(a) {
    return expmod(a, n, n) === a;
  } // console.log("fermat_test",n,try_it(1 + Math.floor(Math.random() * (n - 1))))


  return try_it(1 + Math.floor(Math.random() * (n - 1)));
};

Basic.prototype.fast_is_prime = function (n, times) {
  // console.log("fast_is_prime",n, times,this.prototype)
  return times === 0 ? true : this.fermat_test(n) ? this.fast_is_prime(n, times - 1) : false;
};

BasicTool = new Basic(); // console.log("Test if queue is empty: ",Structure.is_empty_queue(queue))

module.exports = {
  BasicTool: BasicTool
};