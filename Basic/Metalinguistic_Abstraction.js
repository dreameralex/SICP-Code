const BasicTool = require('../Basic/Basic').BasicTool


class Metalinguistic_Model {

}

Metalinguistic_Model.prototype.evaluate = function(component, env){
    return this.is_literal(component)
        ? literal_value(component)
        : is_name(component)
        ? lookup_symbol_value(symbol_of_name(component), env)
        : is_application(component)
        ? this.apply(evaluate(function_expression(component), env),
                this.list_of_values(arg_expressions(component), env))
        : is_operator_combination(component)
        ? evaluate(this.operator_combination_to_application(component), env)
        : is_conditional(component)
        ? this.eval_conditional(component, env)
        : is_lambda_expression(component)
        ? make_function(this.lambda_parameter_symbols(component),
                            lambda_body(component), env)
        : is_sequence(component)
        ? this.eval_sequence(sequence_statements(component), env)
        : is_block(component)
        ? this.eval_block(component, env)
        : is_return_statement(component)
        ? this.eval_return_statement(component)
        : is_function_declaration(component)
        ? evaluate(function_decl_to_constant_decl(component), env)
        : this.is_declaration(component, env)
        ? this.eval_declaration(component, env)
        : is_assignment(component)
        ? this.eval_assignment(component, env)
        : Error(component, "unknown syntax -- evaluate");
}


//Apply
Metalinguistic_Model.prototype.apply = function(fun, args){
    if(is_primitive_function(fun)){
        return apply_primitive_function(fun, args);
    } else if(is_compound_function(fun)){
        const result = this.evaluate(function_body(fun),
                                    extend_environment(
                                        function_parameters(cun),
                                        args,
                                        function_environment(fun)
                                    ))
        return is_return_value(result)
            ? return_value_content(result)
            : undefined
    }else{
        Error(fun, "unknown function type --apply");
    }
}

// Function arguments
Metalinguistic_Model.prototype.list_of_values = function(exps, env){
    return BasicTool.map(arg => this.evaluate(arg, env), exps);
}

// Conditional
Metalinguistic_Model.prototype.eval_conditional = function(component, env){
    return is_truthy(this.evaluate(conditional_predicate(component), env))
            ? this.evaluate(conditional_consequent(component), env)
            : this.evaluate(conditional_alternative(component), env);
}

// Sequences
Metalinguistic_Model.prototype.eval_sequence = function(stmts, env){
    if(this.is_empty_sequence(stmts)){
        return undefined;
    }else if(if_last_statement(stmts)){
        return this.evaluate(this.first_statement(stmts), env)
    }else{
        const first_stmt_value = 
            this.evaluate(this.first_statement(stmts), env);
        if(is_return_value(first_stmt_value)){
            return first_stmt_value;
        }else{
            return this.eval_sequence(
                this.rest_statements(stmts), env
            )
        }
    }
}

// Block
Metalinguistic_Model.prototype.eval_block = function(component, env){
    const body = block_body(component);
    const locals = this.scan_out_declarations(body);
    const unassigneds = this.list_of_unassigned(locals);
    return this.evaluate(body, extend_environment(locals,
                                                unassigneds,
                                                env
    ))
}

Metalinguistic_Model.prototype.list_of_unassigned = function(symbols){
    return BasicTool.map(symbol => "*unassigned*", symbols);
}

Metalinguistic_Model.prototype.scan_out_declarations = function(component){
    return is_sequence(component)
        ? BasicTool.accumulate(
            BasicTool.append,
            null,
            BasicTool.map(this.scan_out_declarations,
                sequence_statements(component)
            )
        )
        : this.is_declaration(component)
        ? BasicTool.list(this.declaration_symbol(component))
        : null
}

Metalinguistic_Model.prototype.eval_return_statement = function(component, env){
    return make_return_value(
        this.evaluate(return_expression(component), env)
    )
}

// Assignments and declarations
Metalinguistic_Model.prototype.eval_assignment = function(component, env){
    const value = this.evaluate(assignment_value_expression(component), env);
    assign_symbol_value(this.assignment_symbol(component), value, env);
    return value;
}

Metalinguistic_Model.prototype.eval_declaration = function(component, env){
    assign_symbol_value(this.declaration_symbol(component),
                        this.evaluate(this.declaration_value_expression(component),env),
                        env)
    return undefined;
}

// Literal Expression
Metalinguistic_Model.prototype.is_literal = function(component){
    return this.is_tagged_list(component, "literal")
}

Metalinguistic_Model.prototype.is_tagged_list = function(component, the_tag){
    return BasicTool.is_pair(component) && BasicTool.head(component) === the_tag;
}

Metalinguistic_Model.prototype.literal_value = function(component){
    return BasicTool.head(BasicTool.tail(component))
}

Metalinguistic_Model.prototype.make_literal = function(value){
    return BasicTool.list("literal", value);
}

// Name
Metalinguistic_Model.prototype.make_name = function(symbol){
    return BasicTool.list("name", symbol);
}

// Function applications
Metalinguistic_Model.prototype.make_application = function(function_expression, argument_expressions){
    return BasicTool.list("application", function_expression, argument_expressions);
}

// Lambda expressions
Metalinguistic_Model.prototype.lambda_parameter_symbols = function(component){
    return BasicTool.map(symbol_of_name, BasicTool.head(BasicTool.tail(component)))
}

Metalinguistic_Model.prototype.make_lambda_expression = function(parameters, body){
    return BasicTool.list("lambda_expression", parameters, body);
}

// Sequence
Metalinguistic_Model.prototype.first_statement = function(stmts){
    return BasicTool.head(stmts)
}

Metalinguistic_Model.prototype.rest_statements = function(stmts){
    return BasicTool.tail(stmts)
}

Metalinguistic_Model.prototype.is_empty_sequence = function(stmts){
    return BasicTool.is_null(stmts)
}

Metalinguistic_Model.prototype.is_last_statement = function(stmts){
    return BasicTool.is_null(BasicTool.tail(stmts));
}

// Assignments
Metalinguistic_Model.prototype.assignment_symbol = function(component){
    return symbol_of_name(BasicTool.head(BasicTool.tail(component)))
}

// Constant, variable, and function declarations
Metalinguistic_Model.prototype.declaration_symbol = function(component){
    return symbol_of_name(BasicTool.head(BasicTool.tail(component)))
}

Metalinguistic_Model.prototype.declaration_value_expression = function(component){
    return BasicTool.head(BasicTool.tail(BasicTool.tail(component)));
}

Metalinguistic_Model.prototype.make_constant_declaration = function(name, value_expression){
    return BasicTool.list("constant_declaration", name, value_expression);
}

Metalinguistic_Model.prototype.is_declaration = function(component){
    return is_tagged_list(component, "constant_declaration") || 
            is_tagged_list(component, "variable_declaration") || 
            is_tagged_list(component, "function_declaration"); 
}

Metalinguistic_Model.prototype.operator_combination_to_application = function(component){
    const operator = operator_symbol(component);
    return is_unary_operator_combination(component)
        ? make_application(make_name(operator),
                            BasicTool.list(first_operand(component)))
        : make_application(make_name(operator),
                            BasicTool.list(first_operand(component),
                                            second_operand(component)))
}

//4.1.3 Evaluator Data Structures
//Testing of predicates

Metalinguistic_Model.prototype.is_truthy = function(x){
    return BasicTool.is_bollean(x)
        ? x
        : Error(x, "boolean expected, received");
}

//Representing functions
Metalinguistic_Model.prototype.is_truthy = 
function make_function(parameters, body, env) { I
    return BasicTool.list("compound_function",
    parameters, body, env);
}

Metalinguistic_Model.prototype.is_compound_function =  function(f) {
    return is_tagged_list(f, "compound_function");
}

Metalinguistic_Model.prototype.function_parameters = function(f) {
    return BasicTool.list_ref(f, 1);
}

Metalinguistic_Model.prototype.function_body = function(f) {
    return BasicTool.list_ref(f, 2);
}

Metalinguistic_Model.prototype.function_environment = function(f) {
    return BasicTool.list_ref(f, 3);
}

//Representing return values

Metalinguistic_Model.prototype.make_return_value = function(content) { I
    return BasicTool.list("return_value", content);
}

Metalinguistic_Model.prototype.is_return_value = function(value) {
    return this.is_tagged_list(value, "return_value");
}

Metalinguistic_Model.prototype.return_value_content = function(value) {
    return BasicTool.head(BasicTool.tail(value));
}

//Operations on Environments
Metalinguistic_Model.prototype.enclosing_environment = function(env) { I
    return BasicTool.tail(env);
}

Metalinguistic_Model.prototype.first_frame = function(env) {
    return BasicTool.head(env);
}

const the_empty_environment = null;

Metalinguistic_Model.prototype.make_frame = function(symbols, values) { I
    return BasicTool.pair(symbols, values);
}

Metalinguistic_Model.prototype.frame_symbols = function(frame) {
    return BasicTool.head(frame);
}

Metalinguistic_Model.prototype.frame_values = function(frame) {
    return BasicTool.tail(frame);
}

Metalinguistic_Model.prototype.extend_environment = function(symbols, vals, base_env){
    return BasicTool.length(symbols) === BasicTool.length(vals)
        ? BasicTool.pair(make_frame(symbols, vals), base_env)
        : Error(BasicTool.pair(symbols, vals), 
                                BasicTool.length(symbols) < BasicTool.length(vals)
                                ? "too many arguments supplied"
                                :  "too few arguments supplied" )
}

Metalinguistic_Model.prototype.lookup_symbol_value = function(symbol, env){
    function env_loop(env){
        function scan(symbols, vals){
            return BasicTool.is_null(symbols)
                ? env_loop(this.enclosing_environment(env))
                : symbol === BasicTool.head(symbols)
                ? BasicTool.head(vals)
                : scan(BasicTool.tail(symbols), BasicTool.tail(vals))
        }
        if(env === the_empty_environment){
            Error(symbol, "unbound name")
        }else{
            const frame = first_frame(env);
            return scan(frame_symbols(frame),
                        frame_values(frame))
        }
    }
    return env_loop(env);
}

Metalinguistic_Model.prototype.assign_symbol_value = function(symbol, val, env){
    function env_loop(env){
        function scan(symbols, vals){
            return BasicTool.is_null(symbols)
            ? env_loop(this.enclosing_environment(env))
            : symbol === BasicTool.head(symbols)
            ? BasicTool.set_head(vals, val)
            : scan(BasicTool.tail(symbols), BasicTool.tail(vals))
        }
        if(env === the_empty_environment){
            Error(symbol, "unbound name -- assignment")
        }else{
            const frame = first_frame(env);
            return scan(frame_symbols(frame),
                        frame_values(frame))
        }
    }
    return env_loop(env);
}






Metalinguistic = new Metalinguistic_Model()
module.exports = {
    Metalinguistic
}