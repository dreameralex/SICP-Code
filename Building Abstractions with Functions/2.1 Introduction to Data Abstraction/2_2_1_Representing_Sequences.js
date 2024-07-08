// 2.2.1 Representing Sequences

function list(...rest){
    function make_list(list_input){
        var a = list_input.shift()
        return list_input.length === 0
            ? pair(a,null)
            : pair(a,make_list(rest))
    }
    return make_list(rest)
}
console.log('Make List:\n')
console.log(list)

function list_ref(items,n){
    return n === 0
        ? head(items)
        : list_ref(tail(items),n - 1)
}



function print_list(items){
    temp = items
    while( temp!== null){
        console.log(head(temp))
        temp = tail(temp)
    }
}

const squares = list(1,4,9,16,2,99)

//print_list(squares)

console.log('list_ref')
console.log(list_ref(squares,0))



// Test list length
function length(items){
    console.log(3)
    function length_iter(a, count){
        return a === null
            ? count
            : length_iter(tail(a),count + 1);
    }
    return length_iter(items,0);
}
console.log('Length')
const length_list = length(squares,0)
console.log('Length is: ',length_list)

// Append
function append(list1, list2){
    return list1 === null
        ? list2
        : pair(head(list1), append(tail(list1),list2))
}

const list1 = list(1,2,3,4)
const list2 = list(2,4,6,8)
list3 = append(list1, list2)
print_list(list3)

// Exercise2.17
function last_pair(items){
    return tail(items) === null
        ? head(items)
        : last_pair(tail(items))
}
console.log('Show last item of list3:')
console.log(last_pair(list3))

// Exercise 2.18
function reverse(items){
    temp = null
    function reverse_temp(temp, items){
        return items === null
            ? temp
            : reverse_temp(pair(head(items), temp), tail(items))
    }
    temp = reverse_temp(temp,items)
    return temp
}

console.log('reverse list: ')
list3 = reverse(list3)
print_list(list3)

// Exercise 2.19
const us_coins = list(100, 50, 25, 10, 5, 1);
const uk_coins = list(100, 50, 25, 10, 5, 2, 1);

function cc(amount, coin_values){
    return amount === 0
        ? 1
        : amount < 0 || no_more(coin_values)
        ? 0
        : cc(amount,
                except_first_denomination(coin_values)
                +
                cc(amount - first_denomination(coin_values),
                    coin_values)
        )
}

// Exercise 2.20
function plus_curried(x){
    return y => x + y;
}
console.log('Exercise 2.20')
function brooks(plus_curried, items){
    
}

console.log(plus_curried(3)(4))

// brooks_curried(list(plus_curried, 3, 4))

// brooks_curried(list(brooks_curried, 
//                 list(plus_curried, 3, 4)))


// Mapping over lists
function scale_list(items, factor){
    return items === null
        ? null
        : pair(head(items) * factor, 
        scale_list(tail(items), factor))
}
console.log('Mapping over lists')
print_list(scale_list(list1, 4))

function map(fun, items){
    return items === null
    ? null
    : pair( fun(head(items)), 
        map(fun, tail(items)))
}
console.log('map')
print_list(map(x => x * x, list1))

// Exercise 2.21
function square_list1(items){
    return items === null
        ? null
        : pair(head(items) ** 2, square_list1(tail(items)))
}
console.log('Exercise 2.21 A')
print_list(square_list1(list1))

function square_list2(items){
    return map( x => x**2, items)
}
console.log('Exercise 2.21 B')
print_list(square_list2(list1))

// Exercise 2.22
function square_list3(items){
    function iter(things, answer){
        return things === null
            ? answer
            : iter(tail(things),
                pair(square(head(things)),answer))
    }
    return iter(items,null)
}

function square(x){
    return 1
}
console.log('Exercise 2.22')
print_list(square_list3(list1))



















// Basic
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

// Oter
function gcd(a,b){
    return b === 0 ? a : gcd(b, a % b);
}


