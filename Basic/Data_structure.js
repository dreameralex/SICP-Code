// See as below 3.3.1
// function pair(x,y){
//     function dispatch(m){
//         return m === 0
//             ? x
//             : m === 1
//             ? y
//             : console.error(m,'argument not 0 or 1 -- pair');
//     }
//     return dispatch;
// }

function head(z){
    return z(0);
}

function tail(z){
    return z(1);
}

function map(fun, items){
    return items === null
        ? null
        : pair(fun(head(items)),
            map(fun, tail(items))
        )
}




// List
function list(...rest){
    function make_list(list_input){
        var a = list_input.shift()
        return list_input.length === 0
            ? pair(a,null)
            : pair(a,make_list(rest))
    }
    return make_list(rest)
}

// function print_list(items){
//     temp = items
//     while( temp!== null){
//         console.log(head(temp))
//         temp = tail(temp)
//     }
// }
function print_list_temp(items){
    temp = items
    while( temp!== null){
        console.log(head(temp))
        temp = tail(temp)
    }
}



// function print_list(items){
//     if(tail(items)!==null){
//         if(head(items).name === "dispatch"){
//             print_list(head(items))
//             console.log("~")
//         }else{
//             console.log(head(items))
//             // process.stdout.write(head(items) + ", ")
//         }
//         print_list(tail(items))
//     }else{
//         if(head(items).name === "dispatch"){
//             print_list(head(items))
//             console.log("~")
//         }else{
//             console.log(head(items))
//             // process.stdout.write(head(items) + " ")
//         }
//     }
// }

function print_list(items){
    var arr = []
    function temp(items){
        if(tail(items)!==null){
            if(head(items).name === "dispatch"){
                temp(head(items))
                arr.push("~")
            }else{
                arr.push(head(items))
            }
            temp(tail(items))
        }else{
            if(head(items).name === "dispatch"){
                temp(head(items))
                arr.push("~")
            }else{
                arr.push(head(items))
            }
        }
    }
    temp(items)
    console.log(arr)
}


// function append(list1, list2){
//     return list1 === null
//         ? list2
//         : pair(head(list1), append(tail(list1),list2))
// }

function append(list1, list2){
    if (typeof(list1) !== 'function'){
        list1 = list(list1)
    }
    if (list2.name !== 'function'){
        list2 = list(list2)
    }
    
    function append_process(list1,list2){
        return list1 === null
        ? list2
        : pair(head(list1), append_process(tail(list1),list2))
    }
    return append_process(list1,list2)
}

function filter(predicate, sequence){
    return sequence === null
        ? null
        : predicate(head(sequence))
        ? pair(head(sequence),
            filter(predicate, tail(sequence)))
        : filter(predicate, tail(sequence))
}

function accumulate(op, initial, sequence){
    return sequence === null
        ? initial
        : op(head(sequence),
                accumulate(op, initial, tail(sequence)))
}
//accumulate(plus, 0, list_accumulate)


function enumerate_interval(low, high){
    return low > high
        ? null
        : pair(low,
            enumerate_interval(low + 1, high)
        )
}
//console.log('Enumerate interval:')
//print_list(enumerate_interval(1,10))



/// 3.3.1 Mutable List Structure
function pair(x, y) {
    function set_x(v) { x = v; }
    function set_y(v) { y = v; }
    return m => m === "head"
        ? x
        : m === "tail"
        ? y
        : m === "set_head"
        ? set_x
        : m === "set_tail"
        ? set_y
        : error(m, "undefined operation -- pair");
    }

function head(z) { return z("head"); }

function tail(z) { return z("tail"); }

function set_head(z, new_value) {
    z("set_head")(new_value);
    return z;
}


function set_tail(z, new_value) {
    z("set_tail")(new_value);
    return z;
    }
// Table
/// 3.3.3 Representing Tables
function make_table() {
    const local_table = list("*table*");
    function lookup(key_1, key_2) {
        const subtable = assoc(key_1, tail(local_table));
        if (is_undefined(subtable)) {
            return undefined;
        } else {
            const record = assoc(key_2, tail(subtable));
            return is_undefined(record)
                    ? undefined
                    : tail(record);
        }
    }
    function insert(key_1, key_2, value) {
        const subtable = assoc(key_1, tail(local_table));
        if (is_undefined(subtable)) {
            set_tail(local_table,
            pair(list(key_1, pair(key_2, value)),
            tail(local_table)));
        } else {
            const record = assoc(key_2, tail(subtable));
            if (is_undefined(record)) {
                set_tail(subtable,
                pair(pair(key_2, value),
                tail(subtable)));
            } else {
                set_tail(record, value);
                }
        }
    }
    function dispatch(m) {
        return m === "lookup"
        ? lookup
        : m === "insert"
        ? insert
        : error(m, "unknown operation -- table");
    }
    return dispatch;
}

function assoc(key, records){
    return is_null(records)
        ? undefined
        : equal(key, head(head(records)))
        ? head(records)
        : assoc(key, tail(records))
}

// for data-directed programming
const operation_table = make_table()
const get = operation_table("lookup")
const put = operation_table("insert")

// Basic
function is_undefined(x){
    return x === undefined
        ? true
        : false
}

function is_null(x){
    return x === null
        ? true
        : false
}

function equal(A,B){
    return A === B
        ? true
        : false
}

module.exports = {
    pair,
    list,
    head,
    tail,
    append,
    map,
    print_list,


    /// 3.3.3 Representing Tables
    make_table,
    /// for data-directed programming
    get,
    put
}