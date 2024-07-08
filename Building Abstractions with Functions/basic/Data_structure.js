function pair(x,y){
    function dispatch(m){
        return m === 0
            ? x
            : m === 1
            ? y
            : console.error(m,'argument not 0 or 1 -- pair');
    }
    return dispatch;
}

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



function print_list(items){
    if(tail(items)!==null){
        if(head(items).name === "dispatch"){
            print_list(head(items))
            console.log("~")
        }else{
            console.log(head(items))
        }
        print_list(tail(items))
    }else{
        if(head(items).name === "dispatch"){
            print_list(head(items))
            console.log("~")
        }else{
            console.log(head(items))
        }  
    }
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


module.exports = {
    list,
    head,
    tail,
    append,
    print_list
}