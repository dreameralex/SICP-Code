class Basic {

}

Basic.prototype.pair = function(x,y){
    function dispatch(m){
        return m === 0
            ? x
            : m === 1
            ? y
            : console.error(m,'argument not 0 or 1 -- pair');
    }
    return dispatch;
}

Basic.prototype.head = function(z){
    return z(0);
}

Basic.prototype.tail = function(z){
    return z(1);
}

Basic.prototype.set_head = function(pair,item){
    return this.pair(item,this.tail(pair))
}

Basic.prototype.set_tail = function(pair,item){
    return this.pair(this.head(pair),item)
}

Basic.prototype.map = function(fun, items){
    return items === null
        ? null
        : this.pair(this.fun(head(items)),
            map(fun, tail(items))
        )
}
// List
Basic.prototype.list = function(...rest){
    function make_list(list_input){
        var a = list_input.shift()
        return list_input.length === 0
            ? this.pair(a,null)
            : this.pair(a,make_list(rest))
    }
    return make_list(rest)
}


Basic.prototype.print_list_temp = function(items){
    temp = items
    while( temp!== null){
        console.log(this.head(temp))
        temp = this.tail(temp)
    }
}



Basic.prototype.print_list = function(items){
    if(tail(items)!==null){
        if(head(items).name === "dispatch"){
            print_list(this.head(items))
            console.log("~")
        }else{
            console.log(this.head(items))
        }
        print_list(tail(items))
    }else{
        if(head(items).name === "dispatch"){
            print_list(this.head(items))
            console.log("~")
        }else{
            console.log(this.head(items))
        }  
    }
}



// function append(list1, list2){
//     return list1 === null
//         ? list2
//         : pair(head(list1), append(tail(list1),list2))
// }

Basic.prototype.append = function(list1, list2){
    if (typeof(list1) !== 'function'){
        list1 = this.list(list1)
    }
    if (list2.name !== 'function'){
        list2 = this.list(list2)
    }
    
    function append_process(list1,list2){
        return list1 === null
        ? list2
        : this.pair(this.head(list1), append_process(this.tail(list1),list2))
    }
    return append_process(list1,list2)
}

Basic.prototype.filter = function(predicate, sequence){
    return sequence === null
        ? null
        : predicate(this.head(sequence))
        ? this.pair(this.head(sequence),
            filter(predicate, this.tail(sequence)))
        : filter(predicate, this.tail(sequence))
}

Basic.prototype.accumulate = function(op, initial, sequence){
    return sequence === null
        ? initial
        : op(head(sequence),
                accumulate(op, initial, tail(sequence)))
}
//accumulate(plus, 0, list_accumulate)


Basic.prototype.enumerate_interval= function(low, high){
    return low > high
        ? null
        : pair(low,
            enumerate_interval(low + 1, high)
        )
}
//console.log('Enumerate interval:')
//print_list(enumerate_interval(1,10))




BasicTool = new Basic()


class DataStructer{
    
}

DataStructer.prototype.make_queue = function(){
    return BasicTool.pair(null,null)
}
DataStructer.prototype.front_ptr = function(queue){
    return BasicTool.head(queue)
}
DataStructer.prototype.rear_ptr = function(queue){
    return BasicTool.tail(queue)
}
DataStructer.prototype.set_font_ptr = function(queue,item){
    BasicTool.set_head(queue,item)
}
DataStructer.prototype.set_font_ptr = function(queue,item){
    BasicTool.set_tail(queue,item)
}

DataStructer.prototype.is_empty_queue = function(queue){
    return this.front_ptr(queue) === null && this.rear_ptr(queue) == null
        ? true
        : false  
}


DataStructer.prototype.front_queue= function(queue){
    return this.is_empty_queue(queue)
        ? error(queue, "front_queue called with an empty queue")
        : BasicTool.head(this.front_ptr(queue));
}


Structure = new DataStructer()
// console.log("Test if queue is empty: ",Structure.is_empty_queue(queue))

console.log(Structure.prototype)


module.exports = {
    BasicTool,
    Structure
}