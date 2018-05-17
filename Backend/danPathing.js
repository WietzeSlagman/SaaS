const DroneAPI = require("./AgentModel/FakeDroneAPI.js")
const sleep = require('sleep');

start_coord = [{x: 20, y:20}, {x: 20, y:50}, {x: 50, y:40}]

var drones = start_coord.map(coord => {
    return new DroneAPI("DAN", coord, true)
})


function chain(promises) {
    return new Promise(function(resolve, reject) {
        function closure(prom, promises) {
            console.log(prom, promises);
        
            if (promises.length == 0) {
                prom.then(() => {
                    resolve()
                }).catch(console.log)
            } else {
                // sleep.sleep(5);
                prom.then(() => {
                    var new_prom = promises.pop() 
                    closure(new_prom, promises)
        
                }).catch(console.log)
            }
        }

        var prom = promises.pop()
        closure(prom, promises)
    });
}

function chain_funcs(func_tuples) {
    return new Promise(function(resolve, reject) {
        function closure(func_tuple, func_tuples) {
            var [func, args] = func_tuple
            if (func_tuples.length == 0) {
                func(...args).then(resolve)
            } else {
                func(...args).then(() => {
                    func_tuple = func_tuples.pop()
                    sleep.sleep(1)
                    closure(func_tuple, func_tuples)
                })
            }
        }

        var func_tuple = func_tuples.pop()
        closure(func_tuple, func_tuples)
    });
}

var create = drones.map(drone => drone.creation_prom )


chain(create).then(() => {
    console.log("schijt1");

    var init_set = drones.map(drone => {
        return new Promise(function(resolve, reject) {
            drone.setStateBigchain()
            resolve()
        });
    })

    chain(init_set).then(() => {
        console.log("schijt2");
        var [A, B, C] = drones
        
        var moves = [[A.goto, [{x:10, y:10}]], [B.goto, [{x:40, y:50}]], [C.goto, [{x:40, y:30}]]]

        chain_funcs(moves).then(() => {
            console.log("schijt3");
        })
    })
})