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
  return items === null ? null : this.pair(this.fun(head(items)), map(fun, tail(items)));
}; // List


Basic.prototype.list = function () {
  for (var _len = arguments.length, rest = new Array(_len), _key = 0; _key < _len; _key++) {
    rest[_key] = arguments[_key];
  }

  function make_list(list_input) {
    var a = list_input.shift();
    return list_input.length === 0 ? this.pair(a, null) : this.pair(a, make_list(rest));
  }

  return make_list(rest);
};

Basic.prototype.print_list_temp = function (items) {
  temp = items;

  while (temp !== null) {
    console.log(this.head(temp));
    temp = this.tail(temp);
  }
};

Basic.prototype.print_list = function (items) {
  if (tail(items) !== null) {
    if (head(items).name === "dispatch") {
      print_list(this.head(items));
      console.log("~");
    } else {
      console.log(this.head(items));
    }

    print_list(tail(items));
  } else {
    if (head(items).name === "dispatch") {
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


BasicTool = new Basic();

var DataStructer_Queue = function DataStructer_Queue() {
  _classCallCheck(this, DataStructer_Queue);
};

DataStructer_Queue.prototype.make_queue = function () {
  return BasicTool.pair(null, null);
};

DataStructer_Queue.prototype.front_ptr = function (queue) {
  return BasicTool.head(queue);
};

DataStructer_Queue.prototype.rear_ptr = function (queue) {
  return BasicTool.tail(queue);
}; // item is a pair


DataStructer_Queue.prototype.set_front_ptr = function (queue, item) {
  BasicTool.set_head(queue, item);
};

DataStructer_Queue.prototype.set_rear_ptr = function (queue, item) {
  BasicTool.set_tail(queue, item);
};

DataStructer_Queue.prototype.is_empty_queue = function (queue) {
  return this.front_ptr(queue) === null && this.rear_ptr(queue) == null ? true : false;
};

DataStructer_Queue.prototype.front_queue = function (queue) {
  return this.is_empty_queue(queue) ? Error("front_queue called with an empty queue") : BasicTool.head(this.front_ptr(queue));
};

DataStructer_Queue.prototype.insert_queue = function (queue, item) {
  var new_pair = BasicTool.pair(item, null);

  if (this.is_empty_queue(queue)) {
    this.set_front_ptr(queue, new_pair);
    this.set_rear_ptr(queue, new_pair);
  } else {
    BasicTool.set_tail(this.rear_ptr(queue), new_pair);
    this.set_rear_ptr(queue, new_pair);
  }
};

DataStructer_Queue.prototype.delete_queue = function (queue) {
  if (this.is_empty_queue(queue)) {
    Error("delete_queue called with an empty queue");
  } else {
    this.set_front_ptr(queue, BasicTool.tail(this.front_ptr(queue)));
    return queue;
  }
};

DataStructer_Queue.prototype.print_queue = function (queue) {
  temp = this.front_ptr(queue);

  while (temp !== null) {
    console.log(BasicTool.head(temp));
    temp = BasicTool.tail(temp);
  }
};

Structure_Queue = new DataStructer_Queue(); // console.log("Test if queue is empty: ",Structure.is_empty_queue(queue))

console.log(Structure_Queue.prototype);
module.exports = {
  BasicTool: BasicTool,
  Structure_Queue: Structure_Queue
};