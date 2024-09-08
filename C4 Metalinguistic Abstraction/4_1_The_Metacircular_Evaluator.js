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
                                             unassigneds,
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
    return is_tagged_list(component, "literal")
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
function operator_combination_to_application(component){
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
function is_truthy(x){
    return BasicTool.is_bollean(x)
        ? x
        : Error(x, "boolean expected, received");
}

//Representing functions
function make_function(parameters, body, env) { I
    return BasicTool.list("compound_function",
    parameters, body, env);
}
function is_compound_function(f) {
    return is_tagged_list(f, "compound_function");
}
function function_parameters(f) {
    return BasicTool.list_ref(f, 1);
}
function function_body(f) {
    return BasicTool.list_ref(f, 2);
}
function function_environment(f) {
    return BasicTool.list_ref(f, 3);
}

//Representing return values
function make_return_value(content) { I
    return BasicTool.list("return_value", content);
}

function is_return_value(value) {
    return is_tagged_list(value, "return_value");
}

function return_value_content(value) {
    return BasicTool.head(BasicTool.tail(value));
}

//Operations on Environments
function enclosing_environment(env) { I
    return BasicTool.tail(env);
}
function first_frame(env) {
    return BasicTool.head(env);
}
const the_empty_environment = null;

function make_frame(symbols, values) { I
    return BasicTool.pair(symbols, values);
}
function frame_symbols(frame) {
    return BasicTool.head(frame);
}
function frame_values(frame) {
    return BasicTool.tail(frame);
}

function extend_environment(symbols, vals, base_env){
    return BasicTool.length(symbols) === BasicTool.length(vals)
        ? BasicTool.pair(make_frame(symbols, vals), base_env)
        : Error(BasicTool.pair(symbols, vals), 
                                BasicTool.length(symbols) < BasicTool.length(vals)
                                ? "too many arguments supplied"
                                :  "too few arguments supplied" )
}

function lookup_symbol_value(symbol, env){
    function env_loop(env){
        function scan(symbols, vals){
            return BasicTool.is_null(symbols)
                ? env_loop(enclosing_environment(env))
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

function assign_symbol_value(symbol, val, env){
    function env_loop(env){
        function scan(symbols, vals){
            return BasicTool.is_null(symbols)
            ? env_loop(enclosing_environment(env))
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

//4.1.4 Running the Evaluator as a Program
function setup_environment(){
    return extend_environment(
        BasicTool.append(primitive_function_symbols,
                            primitive_cosnt_symbols),
        BasicTool.append(primitive_function_objects,
                            primitive_cosnt_values),
        the_empty_environment             
    )
}


function is_primitive_function(fun) { I
    return is_tagged_list(fun, "primitive");
    }

function primitive_implementation(fun) {
    return head(tail(fun));
}



const input_prompt = "M-evaluate input: "; 
const output_prompt = "M-evaluate value: ";

function driver_loop(env) {
    const input = user_read(input_prompt);
    if (is_null(input)) {
    display("evaluator terminated");
    } else {
    const program = parse(input);
    const locals = scan_out_declarations(program);
    const unassigneds = list_of_unassigned(locals);
    const program_env = extend_environment(locals, unassigneds, env);
    const output = evaluate(program, program_env);
    user_print(output_prompt, output);
    return driver_loop(program_env);
    }
}

function user_read(prompt_string) {
    return prompt(prompt_string);
}

function user_print(string, object) {
    function prepare(object) {
    return is_compound_function(object)
    ? "< compound-function >"
    : is_primitive_function(object)
    ? "< primitive-function >"
    : is_pair(object)
    ? pair(prepare(head(object)),
    prepare(tail(object)))
    : object;
    }
    display(string + " " + stringify(prepare(object)));
}

function apply_primitive_function(fun, arglist) { I
    return apply_in_underlying_javascript(
    primitive_implementation(fun),
    arglist);
}