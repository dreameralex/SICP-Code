const data = require('../basic/Data_structure')

function make_leaf(symbol, weight){
    return data.list('leaf', symbol, weight)
}

function is_leaf(object){
    return data.head(object) === 'leaf'
}

function symbol_leaf(x){
    return data.head(data.tail(x))
}

function weight_leaf(x){
    return data.head(data.tail(data.tail(x)))
}

function make_code_tree(left, right){
    return data.list("code_tree", left, right,
        data.append(symbols(left), symbols(right)),
        weight(left) + weight(right))
}

function left_branch(){
    return data.head(data.tail(tree))
}

function left_branch(){
    return data.head(data.tail(data.tail(tree)))
}

function symbols(tree){
    return is_leaf(tree)
        ? data.list(symbol_leaf(tree))
        : data.head(data.tail(data.tail(data.tail(tree))))
}

function weight(tree){
    return is_leaf(tree)
        ? weight_leaf(tree)
        : data.head(data.tail(data.tail(data.tail(data.tail(tree)))))
}

leaf_A = make_leaf('A',1)
leaf_B = make_leaf('B',1)
console.log("Leaf A: ", symbol_leaf(leaf_A))


console.log(weight(leaf_A))
console.log(is_leaf(leaf_A))
console.log('Symbols: ', data.print_list(symbols(leaf_A)))
console.log("SymbolS Leaf: ")
symbols(leaf_A)

data.print_list(symbols(leaf_A))

console.log("SymbolS Leaf End: ")



//console.log("Make: Tree:")
code_tree = make_code_tree(leaf_A,leaf_B)
console.log("Tree symbols:")
data.print_list(symbols(code_tree))
console.log("Tree SymbolS End: ")



// data.print_list(data.append("A", "B"))

// console.log("Append:")

console.log("Tree Weight:", weight(code_tree))

