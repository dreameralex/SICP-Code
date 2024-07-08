//Sequence Operations
function filter(predicate, sequence){
    return sequence === null
        ? null
        : predicate(head(sequence))
        ? pair(head(sequence),
            filter(predicate, tail(sequence)))
        : filter(predicate, tail(sequence))
}


function square(x){
    return x*x
}

function is_odd(x){
    return x%2 === 0
        ? false
        : true
}

const list1 = list(1,2,3,4)
console.log('Before filter')
print_list(list1)
const list2 = filter(is_odd, list1)
console.log('After filter')
print_list(list2)


//Accmulate
console.log('Accmulate:')

function accumulate(op, initial, sequence){
    return sequence === null
        ? initial
        : op(head(sequence),
                accumulate(op, initial, tail(sequence)))
}

function plus(x1,x2){
    return x1 + x2
}
function times(x1,x2){
    return x1 * x2
}
const list_accumulate = list(1,2,3,4,5)
console.log('plus',accumulate(plus, 0, list_accumulate))
console.log('accumulate',accumulate(times, 1, list_accumulate))

// Enumerate interval
function enumerate_interval(low, high){
    return low > high
        ? null
        : pair(low,
            enumerate_interval(low + 1, high)
        )
}
console.log('Enumerate interval:')
print_list(enumerate_interval(1,10))

// Even fib
function enven_fibs(n){
    return accumulate(pair,
                null,
                filter(is_even,
                    map(fib,
                        enumerate_interval(0, n))))
}

function is_even(x){
    return x%2 === 0
        ? true
        : false
}

function fib(n){
    return n === 0
        ? 0
        : n === 1
        ? 1
        : fib(n-1) + fib(n-2);
}

console.log('Even fib:')
print_list(enven_fibs(10))

console.log('List fib squares:')
function list_fib_squares(n){
    return accumulate(pair,
        null,
        map(square,
            map(fib,
                enumerate_interval(1,n)
            )
        )
    )
}
print_list(list_fib_squares(10))

// Nest Mappings
console.log('Nest Mappings:')
function flatmap(f, seq){
    return accumulate(append, null, map(f, seq))
}

function is_prime_sum(pair){
    return is_prime_sum(head(pair) + head(tail(pair)))
}

function make_pair_sum(pair){
    return list(head(pair), head(tail(pair)),
                head(pair)+ head(tail(pair)))
}

function prime_sum_pairs(n){
    return map(make_pair_sum,
        filter(is_prime_sum,
            flatmap(i=>map(j=>list(i,j),
                    enumerate_interval(1,i-1)),
                enumerate_interval(1, n))))
}
prime_sum_pairs(10)


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

function map(fun, items){
    return items === null
        ? null
        : pair(fun(head(items)),
            map(fun, tail(items))
        )
}

// Oter
function gcd(a,b){
    return b === 0 ? a : gcd(b, a % b);
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

function print_list(items){
    temp = items
    while( temp!== null){
        console.log(head(temp))
        temp = tail(temp)
    }
}

function append(list1, list2){
    return list1 === null
        ? list2
        : pair(head(list1), append(tail(list1),list2))
}


// Oter
function gcd(a,b){
    return b === 0 ? a : gcd(b, a % b);
}


