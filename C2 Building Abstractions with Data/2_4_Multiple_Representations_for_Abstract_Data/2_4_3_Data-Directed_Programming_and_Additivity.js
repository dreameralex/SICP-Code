const data = require('../../Basic/Data_structure')



const operation_table = data.make_table()
const get = operation_table("lookup")
const put = operation_table("insert")



function install_rectangular_package() {
    // internal functions
    function real_part(z) { return data.head(z); }
    function imag_part(z) { return data.tail(z); }
    function make_from_real_imag(x, y) { return data.pair(x, y); }
    function magnitude(z) {
        return math_sqrt(square(real_part(z)) +
                                    square(imag_part(z)));
        }
    function angle(z) {
        return math_atan(imag_part(z), real_part(z));
        }
    function make_from_mag_ang(r, a) {
        return data.pair(r * math_cos(a), r * math_sin(a));
        }
    // interface to the rest of the system
    function tag(x) {
        return attach_tag("rectangular", x);
        }
    put("real_part", data.list("rectangular"), real_part);
    put("imag_part", data.list("rectangular"), imag_part);
    put("magnitude", data.list("rectangular"), magnitude);
    put("angle", data.list("rectangular"), angle);
    put("make_from_real_imag", "rectangular",
        (x, y) => tag(make_from_real_imag(x, y)));
    put("make_from_mag_ang", "rectangular",
        (r, a) => tag(make_from_mag_ang(r, a)));
    return "done";
}

const test = install_rectangular_package()
put('test',data.list("Test"),'test')

a = get('test',"test")

