// class Basic {

// }

// Basic.prototype.print = function(){
//     console.log("print")
// }

// Basic.prototype.print1 = function(){
//     Basicprint()
// }

// test = new Basic()


class Basic {
    print(){
        console.log("print1")
    }
    
    print1(){
        this.print()
    }
}
    
test = new Basic()
test.print()
test.print1()
    