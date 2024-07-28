"use strict";

var Tools = require('../Basic/test');

queue = Tools.Structure.make_queue();
Queue = Tools.Structure;
console.log("Test if queue is empty: ", Tools.Structure.is_empty_queue(queue));
console.log("Front_queue: ", Tools.Structure.front_queue(queue));