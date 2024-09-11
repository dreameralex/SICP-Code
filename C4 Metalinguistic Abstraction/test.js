const BasicTool = require('../Basic/Basic').BasicTool


pair_test = BasicTool.pair(1,2)


console.log(pair_test.name)
// console.log(pair_test.bind(this))


function test(){
    this.name = "test1"
}
a = test()
console.log("test name is ",test.name)
console.log("pair name is ",BasicTool.pair.prototype)
console.log("pair name is ",BasicTool.prototype)



class test_pair{
    constructor(){
        this.name = "test_pair pair"
    }
}

test_pair.prototype.pair = function(x,y){
    this.test = "test"
    this.name = "pair11111"
    function set_x(v){x = v}
    function set_y(v){y = v}
    return m => m === 'head'
        ? x 
        : m === "tail"
        ? y
        : m === "set_head"
        ? set_x
        : m === "set_tail"
        ? set_y
        : Error("undefined operation -- pair");
}

out_pair = new test_pair()

console.log("\npair class name is: ",out_pair.name)
console.log("pair function name is: ",out_pair.pair.__proto__)
console.log("pair function name is: ",out_pair.pair.name)
console.log("pair function name is: ",out_pair.__proto__.name)
console.log("pair function name is: ",test_pair.prototype.name)
