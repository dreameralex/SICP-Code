"use strict";

var BasicTool = require('../Basic/Basic').BasicTool;

var Queue = require('../Basic/Data_structure_m').Structure_Queue; //Primitive function boxes


var inverter_delay = 2;
var and_gate_delay = 3;
var or_gate_delay = 5;
var the_agenda = make_agenda();
console.log("Basic Parts:");

function inverter(input, output) {
  function invert_input() {
    var new_value = logical_not(get_signal(input));
    after_delay(inverter_delay, function () {
      return set_signal(output, new_value);
    });
  }

  add_action(input, invert_input);
  return "ok";
}

function logical_not(s) {
  return s === 0 ? 1 : s === 1 ? 0 : error(s, "invalid signal");
}

function and_gate(a1, a2, output) {
  function and_action_function() {
    var new_value = logical_and(get_signal(a1), get_signal(a2)); // console.log(new_value)

    after_delay(and_gate_delay, function () {
      return set_signal(output, new_value);
    });
  } // console.log("a1:")


  add_action(a1, and_action_function); // console.log("a2:")

  add_action(a2, and_action_function);
  return "ok";
}

function logical_and(a, b) {
  return a === 1 && b === 1 ? 1 : a == 0 && (b === 0 || b === 1) ? 0 : b === 0 && (a === 0 || a === 1) ? 0 : Error(a, b, "invalid signal");
}

function or_gate(a1, a2, output) {
  function or_action_function() {
    var new_value = logical_or(get_signal(a1), get_signal(a2));
    after_delay(or_gate_delay, function () {
      return set_signal(output, new_value);
    });
  }

  add_action(a1, or_action_function);
  add_action(a2, or_action_function);
}

function logical_or(a, b) {
  return a === 0 && b === 0 ? 0 : a == 1 && (b === 0 || b === 1) ? 1 : b === 1 && (a === 0 || a === 1) ? 1 : Error(a, b, "invalid signal");
}

function half_adder(a, b, s, c) {
  var d = make_wire();
  var e = make_wire();
  or_gate(a, b, d);
  and_gate(a, b, c);
  inverter(c, e);
  and_gate(d, e, s);
  return "ok";
} // console.log(logical_and(1,1))
// console.log(logical_and(0,1))
// console.log(logical_and(1,0))
// console.log(logical_and(0,0))
// //console.log(logical_and("a",0))


var a = make_wire();
var b = make_wire();
var c = make_wire();
var d = make_wire();
var e = make_wire();
var s = make_wire();
or_gate(a, b, d);
or_gate(a, b, c);
inverter(c, e);
and_gate(d, e, s);
console.log("Basic Parts End:"); //Representing wires

function make_wire() {
  var signal_value = 0;
  var action_functions = null;

  function set_my_signal(new_value) {
    if (signal_value !== new_value) {
      signal_value = new_value;
      return call_each(action_functions);
    } else {
      return "done";
    }
  }

  function accept_action_function(fun) {
    action_functions = BasicTool.pair(fun, action_functions);
    fun();
  }

  function dispatch(m) {
    return m === 'get_signal' ? signal_value : m === "set_signal" ? set_my_signal : m === "add_action" ? accept_action_function : Error(m, "unknown operation -- wire");
  }

  return dispatch;
} //it runs each of the action functions, using the following function call_each,
//which calls each of the items in a list of no-argument functions


function call_each(functions) {
  if (BasicTool.is_null(functions)) {
    return "done";
  } else {
    BasicTool.head(functions)();
    return call_each(BasicTool.tail(functions));
  }
}

function get_signal(wire) {
  return wire("get_signal");
}

function set_signal(wire, new_value) {
  return wire("set_signal")(new_value);
}

function add_action(wire, action_function) {
  return wire("add_action")(action_function);
} // The agenda


function after_delay(delay, action) {
  // console.log("after_delay",delay,current_time(the_agenda))
  add_to_agenda(delay + current_time(the_agenda), action, the_agenda);
}

function propagate() {
  if (is_empty_agenda(the_agenda)) {
    console.log("done");
    return "done";
  } else {
    var first_item = first_agenda_item(the_agenda);
    first_item();
    remove_first_agenda_item(the_agenda);
    return propagate();
  }
} // A Sample simulation


function prob(name, wire) {
  add_action(wire, function () {
    return BasicTool.display(name + " " + BasicTool.stringfy(current_time(the_agenda)) + ", new value = " + BasicTool.stringfy(get_signal(wire)));
  });
} // const the_agenda = make_agenda()


BasicTool.display("\nA Sample simulation"); // const inverter_delay = 2;
// const and_gate_delay = 3;
// const or_gate_delay = 5;

var input_1 = make_wire();
var input_2 = make_wire();
var sum = make_wire();
var carry = make_wire();
prob("sum", sum);
prob("carry", sum);
console.log("Finish prob");
half_adder(input_1, input_2, sum, carry);
set_signal(input_1, 1); // propagate();

set_signal(input_2, 1);
propagate(); //结果不太对，我也不知道为啥......

BasicTool.display("A Sample simulation End"); // Implemnetin the agenda

function make_time_segment(time, queue) {
  return BasicTool.pair(time, queue);
}

function segment_time(s) {
  // console.log("segment_time",s)
  return BasicTool.head(s);
}

function segment_queue(s) {
  return BasicTool.tail(s);
}

function make_agenda() {
  return BasicTool.list(0);
}

function print_agenda(agenda) {
  BasicTool.print_list(agenda);
}

function current_time(agenda) {
  return BasicTool.head(agenda);
}

function set_current_time(agenda, time) {
  BasicTool.set_head(agenda, time);
}

function segments(agenda) {
  return BasicTool.tail(agenda);
}

function set_segments(agenda, segs) {
  BasicTool.set_tail(agenda, segs);
}

function first_segment(agenda) {
  return BasicTool.head(segments(agenda));
}

function rest_segments(agenda) {
  return BasicTool.tail(segments(agenda));
}

function is_empty_agenda(agenda) {
  return BasicTool.is_null(segments(agenda));
}

function add_to_agenda(time, action, agenda) {
  function belongs_before(segs) {
    // console.log("belongs_before",time,BasicTool.is_null(segs) ||
    //                     time < segment_time(BasicTool.head(segs)))
    return BasicTool.is_null(segs) || time < segment_time(BasicTool.head(segs));
  }

  function make_new_time_segment(time, action) {
    // console.log("make_new_time_segment")
    var q = Queue.make_queue();
    Queue.insert_queue(q, action);
    return make_time_segment(time, q);
  }

  function add_to_segments(segs) {
    // console.log("segs",BasicTool.head(BasicTool.head(segs)))
    if (segment_time(BasicTool.head(segs)) === time) {
      // console.log("add to segments1")
      Queue.insert_queue(segment_queue(BasicTool.head(segs)), action);
    } else {
      var rest = BasicTool.tail(segs); // console.log("add to segments2")

      if (belongs_before(rest)) {
        BasicTool.set_tail(segs, BasicTool.pair(make_new_time_segment(time, action), BasicTool.tail(segs)));
      } else {
        // console.log("add to segments2 else")
        add_to_segments(rest);
      }
    }
  }

  var segs = segments(agenda);

  if (belongs_before(segs)) {
    // console.log("belongs_before(segs)")
    set_segments(agenda, BasicTool.pair(make_new_time_segment(time, action), segs));
  } else {
    // console.log("belongs_before(segs) else")
    add_to_segments(segs);
  }
}

function remove_first_agenda_item(agenda) {
  var q = segment_queue(first_segment(agenda));
  Queue.delete_queue(q);

  if (Queue.is_empty_queue(q)) {
    set_segments(agenda, rest_segments(agenda));
  } else {}
}

function first_agenda_item(agenda) {
  if (is_empty_agenda(agenda)) {
    Error("agenda is empty -- first_agenda_item");
  } else {
    var first_seg = first_segment(agenda); // console.log("first_agenda_item:",first_seg)

    set_current_time(agenda, segment_time(first_seg)); // console.log("first_agenda_item:",segment_queue(first_seg),BasicTool.head(segment_queue(first_seg)))

    return Queue.front_queue(segment_queue(first_seg));
  }
} // Make agenda


console.log("\nMake a agenda:");
agenda = make_agenda();
print_agenda(agenda);
console.log("Is the agenda empty? ", is_empty_agenda(agenda)); // Set time

console.log("set time: ");
set_current_time(agenda, 10);
print_agenda(agenda);
console.log('current time', current_time(agenda)); // Add item

console.log("Add itme");
add_to_agenda(11, "test", agenda);