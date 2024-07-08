//2.1 Introduction to Data Abstraction
function add_rat(x,y){
return make_rate(numer(x) * denom(y) + numer(y) * denom(x),
                 denom(x) * denom(y));
}
function sub_rat(x,y){
return make_rate(numer(x) * denom(y) - numer(y) * denom(x),
                 denom(x) * denom(y));       
}
function mul_rat(x,y){
return make_rate(numer(x) * numer(y),
                 denom(x) * denom(y));       
}
function div_rat(x,y){
return make_rate(numer(x) * denom(y),
                 denom(x) * numer(y));       
}
function equal_rat(x,y){
return numer(x) * denom(y) === numer(y) * denom(x);     
} 

//function make_rate(n,d){ return pair(n,d); }
function make_rate(n,d){
    const g = gcd(n,d);
    return pair(n/g,d/g)
}


function numer(x){ return head(x); }
function denom(x){ return tail(x); }

function print_rat(x){
    return console.log(head(x).toString() + '/' + denom(x).toString());
}

const x = pair(1,2)
print_rat(x)
const one_third = make_rate(1,3);
const one_half = make_rate(1,2);
print_rat(mul_rat(one_half,one_third));
print_rat(add_rat(one_half,one_third));
print_rat(add_rat(one_third,one_third));

// 2.1.2 Abstraction Barriers



// 2.1.3 What Is Meant by Data
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