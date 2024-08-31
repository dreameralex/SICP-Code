const BasicTool = require('../Basic/Basic').BasicTool
const Stream = require('../Basic/Stream').Structure_Stream
const MathTool = require('../Basic/Math').MathTool

function evaluate(component, env){
    return is_literal(component)
        ? this.literal_value(component)
        : is_name(component)
        ? lookup_symbol_value(symbol_of_name(component), env)
        : is_application(component)
        ? apply(evaluate(function_expression(component), env),
                list_of_values(arg_expressions(component), env))
        : is_operator_combination(component)
        ? evaluate(operator_combination_to_application(component), env)
        : is_conditional(component)
        ? eval_conditional(component, env)
        : is_lambda_expression(component)
        ? make_function(lambda_parameter_symbols(component),
                            lambda_body(component), env)
        : is_sequence(component)
        ? eval_sequence(sequence_statements(component), env)
        : is_block(component)
        ? eval_block(component, env)
        : is_return_statement(component)
        ? eval_return_statement(component)
        : is_function_declaration(component)
        ? evaluate(function_decl_to_constant_decl(component), env)
        : is_declaration(component, env)
        ? eval_declaration(component, env)
        : is_assignment(component)
        ? eval_assignment(component, env)
        : Error(component, "unknown syntax -- evaluate");
    }

//Apply
function apply(func, args){
    if(is_primitive_function(fun)){
        return apply_primitive_function(fun, args);
    } else if(is_compound_function(fun)){
        const result = evaluate(function_body(fun),
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
function list_of_values(exp, env){
    return Map(arg => evaluate(arg, env), exps);
}

// Conditionals
function eval_conditional(component, env){
    return is_truthy(evaluate(conditional_predicate(component), env))
            ? evaluate(conditional_consequent(component), env)
            : evaluate(conditional_alternative(component), env);
}

// Sequences
function eval_sequence(stmts, env){
    if(is_empty_sequence(stmts)){
        return undefined;
    }else if(if_last_statement(stmts)){
        return evaluate(first_statement(stmts), env)
    }else{
        const first_stmt_value = 
                evaluate(first_statement(stmts), env);
        if(is_return_value(first_stmt_value)){
            return first_stmt_value;
        }else{
            return this.eval_sequence(
                rest_statements(stmts), env
            )
        }
    }
}

//Block
function eval_block(component, env){
    const body = block_body(component);
    const locals = scan_out_declarations(body);
    const unassigneds = list_of_unassigned(locals);
    return evaluate(body, extend_environment(locals,
                                             t   unassigneds,
                                                env
    ))
}

function list_of_unassigned(symbols){
    return Map(symbol => "*unassigned*", symbols);
}

function scan_out_declarations(component){
    return is_sequence(component)
        ? accumulate(
            append,
            null,
            map(scan_out_declarations,
                sequence_statements(componen)
            )
        )
        : is_declaration(component)
        ? list(declaration_symbol(component))
        : null
}

// Return statements
function eval_return_statement(component, env){
    return make_return_value(
        evaluate(return_expression(component), env)
    )
}

// Assignments and declarations
function eval_assignment(component, env){
    const value = evaluate(assignment_value_expression(component), env);
    assign_symbol_value(assignment_symbol(component), value, env);
    return value;
}

function eval_declaration(component, env){
    assign_symbol_value(declaration_symbol(component),
                        evaluate(declaration_value_expression(component),env),
                        env)
    return undefined;
}

//4.1.2 Representing Components
// Literal expression
function is_literal(component){
    return this.is_tagged_list(component, "literal")
}

function is_tagged_list(component, the_tag){
    return BasicTool.is_pair(component) && BasicTool.head(component) === the_tag;
}

function literal_value(component){
    return BasicTool.head(BasicTool.tail(component))
}

function make_literal(value){
    return BasicTool.list("literal", value);
}

//Names
function make_name(symbol){
    return BasicTool.list("name", symbol);
}

// Function applications
function make_application(function_expression, argument_expressions){
    return BasicTool.list("application", function_expression, argument_expressions);
}

// Lambda expressions
function lambda_parameter_symbols(component){
    return map(symbol_of_name, BasicTool.head(BasicTool.tail(component)))
}

function make_lambda_expression(parameters, body){
    return BasicTool.list("lambda_expression", parameters, body);
}

//Sequences
function first_statement(stmts){
    return BasicTool.head(stmts)
}

function rest_statements(stmts){
    return BasicTool.tail(stmts)
}

function is_empty_sequence(stmts){
    return BasicTool.is_null(stmts)
}

function is_last_statement(stmts){
    return BasicTool.is_null(BasicTool.tail(stmts));
}

// Assignments
function assignment_symbol(component){
    return symbol_of_name(BasicTool.head(BasicTool.tail(component)))
}

// Constant, variable, and function declarations
function declaration_symbol(component){
    return symbol_of_name(BasicTool.head(BasicTool.tail(component)))
}
function declaration_value_expression(component){
    return BasicTool.head(BasicTool.tail(BasicTool.tail(component)));
}
function make_constant_declaration(name, value_expression){
    return BasicTool.list("constant_declaration", name, value_expression);
}
function is_declaration(component){
    return is_tagged_list(component, "constant_declaration") || 
            is_tagged_list(component, "variable_declaration") || 
            is_tagged_list(component, "function_declaration"); 
}
function operator_combination_to_application(){
    const operator = operator_symbol(component);
    return is_unary_operator_combination(component)
        ? make_application(make_name(operator),
                            BasicTool.list(first_operand(component)))
        : make_application(make_name(operator),
                            BasicTool.list(first_operand(component),
                                            second_operand(component)))
}

