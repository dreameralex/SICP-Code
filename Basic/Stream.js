const BasicTool = require('../Basic/Basic').BasicTool


// Define Queue
class DataStructure_Stream{
    
}

DataStructure_Stream.prototype.stream_tail = function(s){
    return BasicTool.tail(s)();
}

// Out the stream's nth item
DataStructure_Stream.prototype.stream_ref = function(stream, n){
    return n === 0
        ? BasicTool.head(stream)
        : this.stream_ref(this.stream_tail(stream), n - 1)
}

// 遍历steam并执行，但改变stram
// DataStructure_Stream.prototype.stream_map = function(fun, stream){
//     return BasicTool.is_null(stream)
//         ? null
//         : BasicTool.pair(fun(BasicTool.head(stream)),
//             ()=> this.strem_map(fun, this.stream_tail(stream)))
// }

// 遍历steam并执行，但不改变stram
DataStructure_Stream.prototype.stream_for_each = function(fun, stream){
    if(BasicTool.is_null(stream)){
        return true
    }else{
        fun(BasicTool.head(stream));
        return this.stream_for_each(fun, this.stream_tail(stream))
    }
}

DataStructure_Stream.prototype.display_stream = function(s){
    return this.stream_for_each(BasicTool.display, s);
}


DataStructure_Stream.prototype.display_InfinityStream = function(s,number){
    while(number>=0){
        console.log(BasicTool.head(s))
        s = this.stream_tail(s)
        number--
    }
}






DataStructure_Stream.prototype.stream_enumerate_interval = function(low, high){
    return low > high
        ? null
        : BasicTool.pair(low,
            () => this.stream_enumerate_interval(low+1,high));
}

DataStructure_Stream.prototype.stream_filter = function(func, stream){
    return BasicTool.is_null(stream)
        ? null
        : func(BasicTool.head(stream))
        ? BasicTool.pair(BasicTool.head(stream),
                        () => this.stream_filter(func, this.stream_tail(stream)))
        : this.stream_filter(func, this.stream_tail(stream));
}






// implement the construction of stream pairs as a memoized function similar to the one described in exercise
DataStructure_Stream.prototype.memo = function(func){
    let already_run = false;
    let result = undefined;
    return () => {
        if(!already_run){
            result = func();
            already_run = true;
            return result;
        }else{
            return result;
        }
    }
}

DataStructure_Stream.prototype.stream_map = function(func, stream){
    return BasicTool.is_null(stream)
        ? null
        : BasicTool.pair(func(BasicTool.head(stream)),
                                ()=>this.stream_map(func, this.stream_tail(stream)))
}

DataStructure_Stream.prototype.stream_map_optimized = function(func, stream){
    return BasicTool.is_null(stream)
        ? null
        : BasicTool.pair(func(BasicTool.head(stream)),
                                this.memo(()=>this.stream_map_optimized(func, this.stream_tail(stream))))
}

//Exercise 3.50

DataStructure_Stream.prototype.stream_map_2 = function(f, s1, s2){
    return BasicTool.is_null(s1) && BasicTool.is_null(s2)
        ? null
        : BasicTool.is_null(s1) || BasicTool.is_null(s2)
        ? Error(null, "unexpected argument -- stream_map_2")
        : BasicTool.pair(f(BasicTool.head(s1),BasicTool.head(s2)), 
               this.memo(() => this.stream_map_2(f, this.stream_tail(s1),
                                                this.stream_tail(s2))));
}

DataStructure_Stream.prototype.mergeStream = function(s1, s2){
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

//
DataStructure_Stream.prototype.add_streams = function(s1, s2){
    return this.stream_map_2((x1, x2) => x1 + x2, s1, s2);
}

DataStructure_Stream.prototype.mul_streams = function(s1, s2){
    return this.stream_map_2((x1, x2) => x1 * x2, s1, s2);
}

DataStructure_Stream.prototype.scale_stream = function(stream, factor){
    return this.stream_map(x => x * factor, stream);
}


// Export Data Structure
Structure_Stream = new DataStructure_Stream()

module.exports = {
    Structure_Stream
}