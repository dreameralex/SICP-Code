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

class MathTools {

}


MathTools.prototype.is_divisible = function(x, y) { return x % y === 0;}

MathTools.prototype.is_even = function(n){
    return n%2 === 0
        ? true
        : false
}

function is_even(n){
    return n % 2 === 0
        ? true
        : false
}




MathTools.prototype.expmod = function(base, exp, m){
    // console.log(1)
    if (exp === 0){
        return 1;
    }else{
        if(is_even(exp)){
            const half_exp = this.expmod(base, exp/2, m);
            return half_exp *  half_exp % m;
        }else{
            return base * this.expmod(base, exp-1, m) % m; 
        }
    }
}


MathTools.prototype.fermat_test = function(n){
    expmod = this.expmod
    function try_it(a){
        return expmod(a, n, n) === a;
    }
    // console.log("fermat_test",n,try_it(1 + Math.floor(Math.random() * (n - 1))))
    return try_it(1 + Math.floor(Math.random() * (n - 1)));
}

MathTools.prototype.fast_is_prime = function(n, times){
    // console.log("fast_is_prime",n, times,this.prototype)
    return times === 0
        ? true
        : this.fermat_test(n)
        ? this.fast_is_prime(n, times -1)
        : false;
}

MathTools.prototype.isPrime = function(n){
    times = 20
    result = this.fast_is_prime(n,times)
    return result
}

MathTools.prototype.square = function(n){
    return n*n
}



MathTool = new MathTools()

// console.log("Test if queue is empty: ",Structure.is_empty_queue(queue))



module.exports = {
    MathTool
}








