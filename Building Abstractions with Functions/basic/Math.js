// Oter
function gcd(a,b){
    return b === 0 ? a : gcd(b, a % b);
}

function is_even(x){
    return x%2 === 0
        ? true
        : false
}

function plus(x1,x2){
    return x1 + x2
}

function times(x1,x2){
    return x1 * x2
}

function fib(n){
    return n === 0
        ? 0
        : n === 1
        ? 1
        : fib(n-1) + fib(n-2);
}