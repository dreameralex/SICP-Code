const BasicTool = require('../Basic/Basic').BasicTool
const Stream = require('../Basic/Stream').Structure_Stream


test = BasicTool.fast_is_prime(10,10)
// test = BasicTool.expmod(2,3,6)

console.log(test)

function sum_primes(a, b){
    function iter(count, accum){
        return count > b
            ? accum
            : BasicTool.fast_is_prime(count,20)
            ? iter(count + 1, count + accum)
            : iter(count + 1, accum)
    }
    return iter(a, 0)
}
console.log("sum_primes")
sum_primes_result = sum_primes(1,100)
console.log(sum_primes_result)

//Streams in action
console.log("Streams in action")
StreamInterval = Stream.stream_enumerate_interval(1,199)

Stream.display_stream(StreamInterval)

console.log("stream_ref", Stream.stream_ref(StreamInterval,38))

console.log("Stream Map:")
StreamInterval_map = Stream.stream_map((x)=>x*x, StreamInterval)
Stream.display_stream(StreamInterval_map)

console.log("Stream filter:")
function isPrime(n){
    times = 20
    return BasicTool.fast_is_prime(n,times)
}

StreamInterval_prime = Stream.stream_filter(isPrime, StreamInterval)
Stream.display_stream(StreamInterval_prime)

//An optimization
console.log("Stream Map optimization:")
StreamInterval_map2 = Stream.stream_map((x)=>x + 999, StreamInterval)
Stream.display_stream(StreamInterval_map2)