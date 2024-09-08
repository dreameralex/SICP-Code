const BasicTool = require('../Basic/Basic').BasicTool


pair_test = BasicTool.pair(1,2)


console.log(pair_test.name)
// console.log(pair_test.bind(this))


function test(){
    this.name = "test1"
}
a = test()
console.log("test name is ",test.name)
console.log("pair name is ",BasicTool.pair.name)
console.log("pair name is ",BasicTool.name)