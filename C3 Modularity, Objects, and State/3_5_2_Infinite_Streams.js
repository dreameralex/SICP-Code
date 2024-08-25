const BasicTool = require('../Basic/Basic').BasicTool
const Stream = require('../Basic/Stream').Structure_Stream
const MathTool = require('../Basic/Math').MathTool






console.log("integers starting from")
function integers_starting_from(n) {
    return BasicTool.pair(n, () => integers_starting_from(n + 1));
}

integers_32 = integers_starting_from(32)
Stream.display_InfinityStream(integers_32, 8)

const ones = BasicTool.pair(1, () => ones);
const integers = BasicTool.pair(1, () => Stream.add_streams(ones, integers));


console.log("No Seven")
function is_divisible(x, y) { return x % y === 0; }
// Stream.display_stream(ones)
// Stream.display_stream(integers)
const no_sevens = Stream.stream_filter(x => ! is_divisible(x, 7), integers);
                                                    
Stream.display_InfinityStream(no_sevens, 8)

console.log("No Seven 100: ",Stream.stream_ref(no_sevens, 100) )

console.log("Fib")
const fibs = BasicTool.pair(0,
                            ()=>BasicTool.pair(1,
                                                ()=>Stream.add_streams(Stream.stream_tail(fibs),
                                                    fibs))
                            )
Stream.display_InfinityStream(fibs, 8)

console.log("Primes Stream")
function isPrime(n){
    times = 20
    return BasicTool.fast_is_prime(n,times)
}




const primes = BasicTool.pair(2,
                            ()=> Stream.stream_filter(
                                isPrime,
                                integers_starting_from(3)
                            )
)



Stream.display_InfinityStream(primes, 8)
 
console.log("Exercise 3.53")
const s = BasicTool.pair(1, () => Stream.add_streams(s, s));
Stream.display_InfinityStream(s, 8)

console.log("Exercise 3.54")
const factorials = BasicTool.pair(1, () => Stream.mul_streams(factorials,integers))
Stream.display_InfinityStream(factorials, 8)

console.log("Exercise 3.55")

function partial_sums(stream){
    return BasicTool.pair(BasicTool.head(stream),
                            ()=>Stream.add_streams(Stream.stream_tail(stream),
                                                    partial_sums(stream)))
}

partial_sums_result = partial_sums(integers)
Stream.display_InfinityStream(partial_sums_result, 8)

console.log("Exercise 3.56")
function merge(s1, s2){
    if (BasicTool.is_null(s1)){
        return s2;
    }else if(BasicTool.is_null(s2)){
        return s1;
    }else{
        const s1head = BasicTool.head(s1);
        const s2head = BasicTool.head(s2);
        return s1head < s2head
            ? BasicTool.pair(s1head,
                            ()=>merge(Stream.stream_tail(s1), s2))
            : s1head > s2head
            ? BasicTool.pair(s2head,
                            ()=>merge(s1,Stream.stream_tail(s2)))
            : BasicTool.pair(s1head,
                            ()=>merge(Stream.stream_tail(s1), Stream.stream_tail(s2)))
    }
}

S  = BasicTool.pair(1, ()=>merge(Stream.scale_stream(s, 2),
                                    merge(Stream.scale_stream(s, 3),Stream.scale_stream(s, 5))))

Stream.display_InfinityStream(S, 20)

console.log("Exercise 3.59")
function integrate_series(s){
    function helper(ss, iter){
        return BasicTool.pair(BasicTool.head(ss)/iter, ()=>helper(Stream.stream_tail(ss), iter+1))
    }
    return helper(s, 1);
}


exp_series = BasicTool.pair(1, ()=>integrate_series(exp_series))
Stream.display_InfinityStream(exp_series, 20)      



cos_series = BasicTool.pair(1, ()=>integrate_series(
    BasicTool.pair(0, 
        ()=>Stream.stream_map(
            (x) => (-x), integrate_series(cos_series)
                            )
                    )
    )
)

Stream.display_InfinityStream(cos_series, 20)                            

console.log("Sin:")
sin_series = BasicTool.pair(0, ()=>integrate_series(
    BasicTool.pair(1, 
        ()=>Stream.stream_map(
            (x) => (-x), sin_series
                            )
                    )
    )
)
Stream.display_InfinityStream(sin_series, 20)       

console.log("Exercise 3.60")

function mul_series(s1,s2){
    BasicTool.pair(BasicTool.head(s1)*BasicTool.head(s2),
                                ()=>Stream.add_streams(
                                    mul_series(Stream.stream_tail(s1),s2),
                                    Stream.scale_stream(Stream.stream_tail(s2),BasicTool.head(s1))
                                ))
}


// integers_1 = integers_starting_from(1)
// integers_2 = integers_starting_from(2)
mul = mul_series(cos_series, cos_series)
Stream.display_InfinityStream(mul, 20)
//有问题！



