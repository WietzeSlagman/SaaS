const DroneAPI = require("./AgentModel/FakeDroneAPI.js")
const sleep = require('sleep');

start_coord = [{x: 20, y:20}, {x: 20, y:50}, {x: 50, y:40}]
drones = start_coord.map(coord => new DroneAPI("DAN", coord, true))

let [A, B, C] = drones


function chain(prom, promises, timeout=1000) {
    console.log(prom, promises);

    if (promises.length == 0) {
        prom.then(() => {
            return
        })
    } else {
        sleep.sleep(5);
        var new_prom = promises.pop() 
        prom.then(chain(new_prom, promises))
    }
}

var create = drones.map(drone => {
    return new Promise(function(resolve, reject) {
        drone.setStateBigchain()
        resolve()
    });
})

var moves = [A.goto({x:10, y:10}), B.goto({x:40, y:50}), C.goto({x:40, y:30})]

var all = create.concat(moves)

var prom = all.pop() 
chain(prom, all)
