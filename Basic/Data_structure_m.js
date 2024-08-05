// Import Basic Functions
const BasicTool = require('./Basic').BasicTool



// Define Queue
class DataStructure_Queue{
    
}

DataStructure_Queue.prototype.make_queue = function(){
    return BasicTool.pair(null,null)
}


DataStructure_Queue.prototype.front_ptr = function(queue){
    return BasicTool.head(queue)
}
DataStructure_Queue.prototype.rear_ptr = function(queue){
    return BasicTool.tail(queue)
}

// item is a pair
DataStructure_Queue.prototype.set_front_ptr = function(queue,item){
    BasicTool.set_head(queue,item)
}
DataStructure_Queue.prototype.set_rear_ptr = function(queue,item){
    BasicTool.set_tail(queue,item)
}

DataStructure_Queue.prototype.is_empty_queue = function(queue){
    return this.front_ptr(queue) === null
        ? true
        : false  
}


DataStructure_Queue.prototype.front_queue= function(queue){
    return this.is_empty_queue(queue)
        ? Error("front_queue called with an empty queue")
        : BasicTool.head(this.front_ptr(queue));
}

DataStructure_Queue.prototype.insert_queue = function(queue, item){
    const new_pair = BasicTool.pair(item, null);
    if (this.is_empty_queue(queue)){
        this.set_front_ptr(queue,new_pair);
        this.set_rear_ptr(queue, new_pair);
    }else{
        BasicTool.set_tail(this.rear_ptr(queue), new_pair);
        this.set_rear_ptr(queue, new_pair)
    }
}

DataStructure_Queue.prototype.delete_queue = function(queue){
    if (this.is_empty_queue(queue)){
        Error("delete_queue called with an empty queue")
    }else{
        this.set_front_ptr(queue, BasicTool.tail(this.front_ptr(queue)));
        return queue;
    }
}

DataStructure_Queue.prototype.print_queue = function(queue){
    temp = this.front_ptr(queue)
    while(temp !== null){
        console.log(BasicTool.head(temp))
        temp = BasicTool.tail(temp)
    }
}




// Define Table
// 3.3.3 Representing Tables
class DataStructer_Table{
    
}

DataStructer_Table.prototype.make_table = function(){
    return BasicTool.list("*table*")
}



DataStructer_Table.prototype.assoc = function(key, records){
    return BasicTool.is_null(records)
        ? undefined
        : BasicTool.equal(key, BasicTool.head(BasicTool.head(records)))
        ? BasicTool.head(records)
        : this.assoc(key, BasicTool.tail(records))
}

DataStructer_Table.prototype.lookup = function(key, table){
    const record = this.assoc(key, BasicTool.tail(table))
    return this.undefined(record)
        ? undefined
        : BasicTool.tail(record)
}


DataStructer_Table.prototype.insert = function(key, value, table){
    const record = this.assoc(key, BasicTool.tail(table))
    if (BasicTool.is_undefined(record)){
        BasicTool.set_tail(table, BasicTool.pair(BasicTool.pair(key, value),
                                                BasicTool.tail(table)));
    }else{
        BasicTool.set_tail(record, value)
    }
    return "OK";
}


//Two-dimensional tables
DataStructer_Table.prototype.insert_two_dimension = function(key_1, key_2, value, table){
    const subtable = this.assoc(key_1, BasicTool.tail(table))
    if (BasicTool.is_undefined(subtable)){
        BasicTool.set_tail(table,
                            BasicTool.pair(BasicTool.list(key_1, BasicTool.pair(key_2, value)),
                                                BasicTool.tail(table)))
    }else{
        const record = this.assoc(key_2, BasicTool.tail(table));
        if(BasicTool.is_undefined(record)){
            BasicTool.set_tail(subtable,
                                BasicTool.pair(BasicTool.pair(key_2, value),
                                    BasicTool.tail(subtable)))
        }else{
            BasicTool.set_tail(record, value)
        }
    }
}

DataStructer_Table.prototype.lookup_two_dimension = function(key_1, key_2, table){
    const subtable = this.assoc(key_1, BasicTool.tail(table))
    if (BasicTool.is_undefined(subtable)){
        return undefined;
    }else{
        const record = this.assoc(key_2, BasicTool.tail(subtable));
        return BasicTool.is_undefined(record)
            ? undefined
            : BasicTool.tail(record)
    }
}

DataStructer_Table.prototype.make_table_local_table = function(){
    const local_table =  BasicTool.list("*table*")

    function assoc(key, records){
        return BasicTool.is_null(records)
            ? undefined
            : BasicTool.equal(key, BasicTool.head(BasicTool.head(records)))
            ? BasicTool.head(records)
            : this.assoc(key, BasicTool.tail(records))
    }

    function lookup(key_1,key_2){
        const subtable = assoc(key_1, BasicTool.tail(local_table))
        if (BasicTool.is_undefined(subtable)){
            return undefined;
        }else{
            const record = assoc(key_2, BasicTool.tail(subtable));
            return BasicTool.is_undefined(record)
                ? undefined
                : BasicTool.tail(record)
        }
    }
    function insert(key_1,key_2,value){
        const subtable = assoc(key_1, BasicTool.tail(local_table))
        if (BasicTool.is_undefined(subtable)){
            BasicTool.set_tail(local_table,
                                BasicTool.pair(BasicTool.list(key_1, BasicTool.pair(key_2, value)),
                                                    BasicTool.tail(local_table)))
        }else{
            const record = assoc(key_2, BasicTool.tail(local_table));
            if(BasicTool.is_undefined(record)){
                BasicTool.set_tail(subtable,
                                    BasicTool.pair(BasicTool.pair(key_2, value),
                                        BasicTool.tail(subtable)))
            }else{
                BasicTool.set_tail(record, value)
            }
        }
    }
    function dispatch(m){
        return m === 'lookup'
            ? lookup
            : m === 'insert'
            ? insert
            : Error(m, "unknown operation -- table")
    }
    return dispatch
}






// Export Data Structure
Structure_Queue = new DataStructure_Queue()
Structure_Table = new DataStructer_Table()

const operation_table = Structure_Table.make_table_local_table()
const get = operation_table('lookup')
const put = operation_table('insert')



module.exports = {
    Structure_Queue,
    Structure_Table,
    operation_table,
    get,
    put
}