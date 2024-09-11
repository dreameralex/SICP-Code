const BasicTool = require('../Basic/Basic').BasicTool
const Stream = require('../Basic/Stream').Structure_Stream
const MathTool = require('../Basic/Math').MathTool
const MetalinguisticTool = require('../Basic/Metalinguistic_Abstraction').Metalinguistic
let the_global_environment = MetalinguisticTool.setup_environment();

MetalinguisticTool.driver_loop(the_global_environment);


