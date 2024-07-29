"use strict";

var Queue = require('../Basic/test').Structure_Queue;

var BasicTool = require('../Basic/test').BasicTool;

queue = Queue.make_queue();
console.log("Test if queue is empty: ", Queue.is_empty_queue(queue));
Queue.insert_queue(queue, 1);
Queue.insert_queue(queue, 2);
Queue.insert_queue(queue, 3);
Queue.insert_queue(queue, 4);
Queue.insert_queue(queue, 5);
Queue.insert_queue(queue, 6);
console.log("Head of the queue", Queue.front_ptr(queue));
console.log("Rear of the queue", Queue.rear_ptr(queue));
Queue.print_queue(queue);
Queue.delete_queue(queue);
Queue.delete_queue(queue);
Queue.print_queue(queue);