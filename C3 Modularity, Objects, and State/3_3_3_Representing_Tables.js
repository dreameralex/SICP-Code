const Table = require('../Basic/Data_structure_m').Structure_Table
const BasicTool = require('../Basic/Basic').BasicTool

const get = require('../Basic/Data_structure_m').get
const put = require('../Basic/Data_structure_m').put


table = Table.make_table()

Table.insert(1,1,table)

table_two = Table.make_table()


Table.insert_two_dimension("math","+",43,table_two)
Table.insert_two_dimension("math","-",45,table_two)
Table.insert_two_dimension("math","*",40,table_two)

result = Table.lookup_two_dimension("math","*",table_two)
console.log(result)

put("math","+",99999)
console.log(get("math","+"))



