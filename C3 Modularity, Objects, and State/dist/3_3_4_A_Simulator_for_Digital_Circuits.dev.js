"use strict";

var BasicTool = require('../Basic/Basic').BasicTool; //Primitive function boxes


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
    var new_value = logical_and(get_signal(a1), get_signal(a2));
    after_delay(and_gate_delay, function () {
      return set_signal(output, new_value);
    });
  }

  add_action(a1, and_action_function);
  add_action(a2, and_action_function);
} //Representing wires


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
  }

  function dispatch(m) {
    return m === 'get_signal' ? signal_value : m === "set_signal" ? set_my_signal : m === "add_action" ? accept_action_function : Error(m, "unknown operation -- wire");
  }

  dispatch;
}

function call_each(functions) {
  if (BasicTool.is_null()) {
    return "done";
  } else {
    BasicTool.head(functions)();
    return call_each(BasicTool.tail(functions));
  }
}

function get_signal(wire) {
  return wire("get_siganl");
}

function set_signal(wire, new_value) {
  return wire("set_signal")(new_value);
}

function add_action(wire, action_function) {
  return wire("add_action")(action_function);
}