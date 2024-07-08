const data = require('../basic/Data_structure')

test = data.list('a','b')

//data.print_list(test)



// To tell if x is item's number
function member(item,x){
    console.log(data.head(x))
    return x === null
        ? null
        : item === data.head(x)
        ? x 
        : member(item, data.tail(x))
}

console.log(member('a',test))




