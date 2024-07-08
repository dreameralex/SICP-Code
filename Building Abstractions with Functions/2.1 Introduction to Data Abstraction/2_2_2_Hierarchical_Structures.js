//count leaves
function count_leaves(x){
    return x === null
        ? 0
        : !is_pair(x)
        ? 1
        : count_leaves(head(x)) + 
            count_leaves(tail(x))
}
x = pair(1,2)

function is_pair(x){
    return x.name  === "dispatch"
        ? true
        : false
}
console.log('Is pair:')
console.log(is_pair(x))

// Mapping over trees
function scale_tree(tree, factor){
    return tree === null
        ? null
        : is_pair(tree)
        ? tree *factor
        : pair(scale_tree(head(tree),factor),
            scale_tree(tail(tree),factor))
}

tree = list(1, list(2, list(3, 4), 5), list(6, 7))

function print_list(items){
    temp = items
    while( temp!== null){
        console.log(head(temp))
        temp = tail(temp)
    }
}

function print_tree(tree){
    while( tree !== null){
        if(  is_pair(head(tree))){
            console.log('<')
            print_tree(head(tree))
            console.log('>')
        }else{
            console.log(head(tree),' ')
            if(typeof tail(tree) === 'function'){
            }
        }
        tree = tail(tree)
    }
}
console.log('Print tree')
print_tree(tree)

//Count leaves
function count_leaves(x){
    return x === null
        ? 0
        : !is_pair(x)
        ? 1
        : count_leaves(head(x)) + 
            count_leaves(tail(x))
}
console.log('count_leaves')
console.log(count_leaves(tree))

// Exercise 2.27
function reverse(x){

}






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
// Oter
function gcd(a,b){
    return b === 0 ? a : gcd(b, a % b);
}



function list(...rest){
    function make_list(list_input){
        var a = list_input.shift()
        return list_input.length === 0
            ? pair(a,null)
            : pair(a,make_list(rest))
    }
    return make_list(rest)
}