const data = require('../../Basic/Data_structure')

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

console.log('code_tree')
code_tree = make_code_tree(leaf_A,leaf_B)
console.log("Tree symbols:")
data.print_list(symbols(code_tree))
console.log("Tree Weight:", weight(code_tree))


// The decoding function
function decode(bits, tree) { I
    function decode_1(bits, current_branch) {
        if (bits === null) {
            return null;
        } else {
            const next_branch = choose_branch(head(bits),current_branch);
            return is_leaf(next_branch)
                ? pair(symbol_leaf(next_branch),decode_1(tail(bits), tree))
                : decode_1(tail(bits), next_branch);
        }
    }
    return decode_1(bits, tree);
}

function choose_branch(bit, branch) {
    return bit === 0
        ? left_branch(branch)
        : bit === 1
        ? right_branch(branch)
        : error(bit, "bad bit -- choose_branch");
}


// Sets of weighted elements
function adjoin_set(x, set) {
    return set === null
        ? data.list(x)
        : weight(x) < weight(data.head(set))
        ? data.pair(x, set)
        : data.pair(data.head(set), adjoin_set(x, data.tail(set)));
}

function make_leaf_set(pairs) {
    if (pairs === null) {
        return null;
    } else {
        const first_pair = data.head(pairs);
        return adjoin_set(
                    make_leaf(data.head(first_pair), // symbol
                                data.head(data.tail(first_pair))), // frequency
                    make_leaf_set(data.tail(pairs)));
        }
}

console.log("\nMake Tree")
test_tree = data.list(data.list("A", 1), data.list("B", 2), data.list("C", 5), data.list("D", 3))
data.print_list(test_tree)



console.log("make_leaf_set")
test_tree = make_leaf_set(test_tree)
//console.log(test_tree)
console.log(weight(data.head(test_tree)))
console.log(is_leaf(data.head(test_tree)))
data.print_list(symbols(data.head(test_tree)))

temp_weight = data.map(weight,test_tree)
data.print_list(temp_weight)

temp_symbols = data.map(symbols,test_tree)
data.print_list(temp_symbols)

// How to make a tree?

// Exercise  2.6.7
const sample_tree = make_code_tree(
    make_leaf("A",4),
    make_code_tree(
        make_leaf("B",2),
        make_code_tree(
            make_leaf("D",1),
            make_leaf("C",1))));

console.log("Exercise 2.6.7")

data.print_list(symbols(sample_tree))


// temp_symbols = data.map(symbols,sample_tree)
// data.print_list(temp_symbols)

const sample_message =
    data.list(0, 1, 1, 0, 0, 1, 0, 1, 0, 1, 1, 1, 0);






