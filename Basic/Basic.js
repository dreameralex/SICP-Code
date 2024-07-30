class Basic {

}

// Basic.prototype.pair = function(x,y){
//     function dispatch(m){
//         return m === 0
//             ? x
//             : m === 1
//             ? y
//             : Error(m,'argument not 0 or 1 -- pair');
//     }
//     return dispatch;
// }


Basic.prototype.get_new_pair = function(){
    return
}

Basic.prototype.pair = function(x,y){
    function set_x(v){x = v}
    function set_y(v){y = v}
    return m => m === 'head'
        ? x 
        : m === "tail"
        ? y
        : m === "set_head"
        ? set_x
        : m === "set_tail"
        ? set_y
        : Error("undefined operation -- pair");
}



Basic.prototype.head = function(z){
    return z("head")
}

Basic.prototype.tail = function(z){
    return z("tail")
}

Basic.prototype.set_head = function(z, new_value){
    z("set_head")(new_value)
    return z
}

Basic.prototype.set_tail = function(z, new_value){
    z("set_tail")(new_value)
    return z
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
    temp = new Basic()
    function make_list(list_input){
        var a = list_input.shift()
        return list_input.length === 0
            ? temp.pair(a,null)
            : temp.pair(a,make_list(rest))
    }
    return make_list(rest)
}

Basic.prototype.test = function(x,y){
    return this.pair(x,y)
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



Basic.prototype.is_null = function(item){
    return item === null
        ? true
        : false
}

Basic.prototype.is_undefined = function(item){
    return item === undefined
        ? true
        : false
}

Basic.prototype.equal = function(item1,item2){
    return item1 === item2
        ? true
        : false
}










BasicTool = new Basic()

// console.log("Test if queue is empty: ",Structure.is_empty_queue(queue))



module.exports = {
    BasicTool
}