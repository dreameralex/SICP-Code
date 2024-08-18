const BasicTool = require('../Basic/Basic').BasicTool
const Stream = require('../Basic/Stream').Structure_Stream
const MathTool = require('../Basic/Math').MathTool


console.log(MathTool.isPrime(13))



const ones = BasicTool.pair(1, () => ones);
const integers = BasicTool.pair(1, () => Stream.add_streams(ones, integers));


// Stream.display_stream(ones)
Stream.display_stream(integers)


