const BasicTool = require('../Basic/Basic').BasicTool
const Queue = require('../Basic/Data_structure_m').Structure_Queue


//Using the constraint system

const C = make_connector(); 
const F = make_connector();
celsius_fahrenheit_converter(C, F);

function celsius_fahrenheit_converter(c, f) { 
    const u = make_connector();
    const v = make_connector();
    const w = make_connector();
    const x = make_connector();
    const y = make_connector();
    multiplier(c, w, u);
    multiplier(v, x, u);
    adder(v, y, f);
    constant(9, w);
    constant(5, x);
    constant(32, y);
    return "ok";
}
probe("Celsius temp", C); 
probe("Fahrenheit temp", F);
set_value(C, 25, "user"); 
set_value(F, 212, "user");

forget_value(C, "user");

set_value(F, 212, "user");








//Implementing the constraint system

// – has_value(connector)
// tells whether the connector has a value.
// – get_value(connector)
// returns the connector’s current value.
// – set_value(connector, new-value, informant)
// indicates that the informant is requesting the connector to set its value to the new value.
// – forget_value(connector, retractor)
// tells the connector that the retractor is requesting it to forget its value.
// – connect(connector, new-constraint)
// tells the connector to participate in the new constraint.


function adder(a1, a2, sum){
    function process_new_value(){
        if(has_value(a1) && has_value(a2)){
            set_value(sum,
                    get_value(a1) + get_value(a2),
                    me);
        }else if(has_value(a1) && has_value(sum)){
            set_value(a2,
                get_value(sum) - get_value(a1),
                me);
        }else if(has_value(a2) && has_value(sum)){
            set_value(a1,
                get_value(sum) - get_value(a2),
                me);
        }else{}
    }
    function process_forget_value(){
        forget_value(sum,me);
        forget_value(a1,me);
        forget_value(a2,me);
        process_new_value()
    }
    //The function me, which represents the adder, acts as a dispatch to the local functions.
    function me(request){
        if (request === "I_have_a_value") {
                process_new_value();
            } else if (request === "I_lost_my_value") {
                process_forget_value();
            } else {
                Error(request, "unknown request -- adder");
        }
    }
    connect(a1, me);
    connect(a2, me);
    connect(sum, me);
    return me;
}
function inform_about_value(constraint) {
    return constraint("I_have_a_value");
}
function inform_about_no_value(constraint) {
    return constraint("I_lost_my_value");
}


function multiplier(m1, m2, product){
    function process_new_value(){
        if((has_value(m1) && get_value(m1) === 0)||
            (has_value(m2) && get_value(m2) === 0)){
            set_value(product, 0, me);
        }else if(has_value(m1) && has_value(m2)){
            set_value(product,
                get_value(m1) * get_value(m2),
                me)
        }else if(has_value(m1) && has_value(product)){
            set_value(m2,
                get_value(product) / get_value(m1),
                me);
        }else if(has_value(m2) && has_value(product)){
            set_value(m1,
                get_value(product) / get_value(m2),
                me);
        }else{}
    }
    function process_forget_value(){
        forget_value(product,me);
        forget_value(m1,me);
        forget_value(m2,me);
        process_new_value()
    }
    //The function me, which represents the adder, acts as a dispatch to the local functions.
    function me(request){
        if (request === "I_have_a_value") {
                process_new_value();
            } else if (request === "I_lost_my_value") {
                process_forget_value();
            } else {
                Error(request, "unknown request -- adder");
        }
    }
    connect(m1, me);
    connect(m2, me);
    connect(product, me);
    return me;
}

//Aconstant constructor simply sets the value of the designated connector. Any "I_have_a_value"
// or "I_lost_my_value" message sent to the constant box will produce an error.
function constant(value, connector) {
    function me(request) {
        Error(request, "unknown request -- constant");
    }
    connect(connector, me);
    set_value(connector, value, me);
    return me;
}

function probe(name, connector){
    function print_prob(value){
        console.log("Probe: " + name + " = " + BasicTool.stringfy(value))
    }
    function process_new_value(){
        print_prob(get_value(connector))
    }
    function process_forget_value(){
        print_prob("?")
    }
    function me(request){
        return request === "I_have_a_value"
                ? process_new_value()
                : request === "I_lost_my_value"
                ? process_forget_value()
                : Error(request, "unknown request -- probe");
    }
    connect(connector, me)
    return me;
}

//Representing connectors
function make_connector(){
    let value = false;
    let informant =  false;
    let constraints = null;
    function set_my_value(newval, setter){
        if(!has_value(me)){
            value = newval;
            informant = setter;
            return for_each_except(setter,
                                    inform_about_value,
                                    constraints
            )
        }else if(value !== newval){
            Error(BasicTool.list(value, newval), "contradiction");
        }else{
            console("ignored")
            return "ignored";
        }
    }
    function forget_my_value(retractor){
        if(retractor === informant){
            informant = false;
            return for_each_except(retractor,
                                    inform_about_no_value,
                                    constraints
            )
        }else{
            console.log("ignored")
            return "ignored";
        }
    }
    function connect(new_contraint){
        if(BasicTool.is_null(BasicTool.member(new_contraint,constraints))){
            constraints = BasicTool.pair(new_contraint, constraints)
        }else{

        }
        if(has_value(me)){
            inform_about_value(new_contraint)
        }else{

        }
        // console.log("done")
        return "done"
    }
    function me(request){
        if (request === "has_value") {
                return informant !== false;
            } else if (request === "value") {
                return value;
            } else if (request === "set_value") {
                return set_my_value;
            } else if (request === "forget") {
                return forget_my_value;
            } else if (request === "connect") {
                return connect;
            } else {
                Error(request, "unknown operation -- connector");
            }
    }
    return me;
}

function for_each_except(exception, fun, list){
    function loop(itmes){
        if(BasicTool.is_null(itmes)){
            // console.log("for_each_except done")
            return "done"
        }else if(BasicTool.head(itmes) === exception){
            return loop(BasicTool.tail(itmes));
        }else{
            fun(BasicTool.head(itmes));
            return loop(BasicTool.tail(itmes));
        }
    }
    return loop(list)
}

function has_value(connector) { 
    return connector("has_value");
}
function get_value(connector) {
    return connector("value");
}
function set_value(connector, new_value, informant) {
    return connector("set_value")(new_value, informant);
}
function forget_value(connector, retractor) {
    return connector("forget")(retractor);
}
function connect(connector, new_constraint) {
    return connector("connect")(new_constraint);
}











