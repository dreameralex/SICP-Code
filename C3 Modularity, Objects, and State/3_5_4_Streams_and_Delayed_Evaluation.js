const BasicTool = require('../Basic/Basic').BasicTool
const Stream = require('../Basic/Stream').Structure_Stream
const MathTool = require('../Basic/Math').MathTool


function integral(delayed_integrand, initial_value, dt){
    const integ = BasicTool.pair(initial_value,
                                    ()=>{
                                        const integrand = delayed_integrand();
                                        return Stream.add_streams(Stream.scale_stream(integrand, dt), integ);
                                    }
    );
    return integ;
}

function solve(f, y0, dt){
    const y = integral(()=>dy, y0, dt);
    const dy = Stream.stream_map(f, y);
    return y;
}

answer = Stream.stream_ref(solve(y=>y, 1, 0.001), 100);
console.log(answer)
// 性能有问题，答案还不对！