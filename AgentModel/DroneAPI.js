const sumo = require("node-sumo")
const dbinterface = require("../BigChainDBInterface/interface")
const chalk = require('chalk');

class Drone {
    constructor(id, init_location) {
        this.drone = sumo.createClient()
        this.id = id

        this.location = init_location
        this.history = []

        this.keypair = dbinterface.createKeyPair()
        this.connected = new Promise(function(resolve, reject) {
            this.drone.connect(() => {
                console.log(chalk.blue(`Connected to drone ${id}`));
                resolve()
            })
        }.bind(this));

        this.currentBattery = 100
        this.getBatteryLifePromise().then(battery => {
            this.currentBattery = battery
        })

        // fixed speed 50
        this.movement = this.createMovementControls(50)
    }

    getBatteryLifePromise() {
        return new Promise(function(resolve, reject) {
            this.drone.on("battery", battery => {
                console.log(chalk.green(`Battery-life: ${battery}`));
                resolve(battery)
            })
        }.bind(this));
    }

    newStateTransaction() {
        this.getBatteryLifePromise().then(battery => {
            this.currentBattery = battery

            assetdata = {
                location: this.location,
                action: this.action,

                object_detected: this.object_detected,
                battery: battery,
                cost: this.currentBattery - battery,
            }

        })
    }

    createMovementControls(speed) {
        return new Promise(function(resolve, reject) {
            this.connected.then(() => {
                resolve({
                    forward: () => { this.drone.forward(speed) },
                    backwards: () => { this.drone.backwards(speed) },
                    right: () => {this.drone.right(speed) },
                    left: () => { this.drone.left(speed) },
                    stop: () => { this.drone.stop() },
                })
            })
        }.bind(this));
    }
}

var d  = new Drone("test", {x: 0, y:0})

d.movement.then(movement => {
    console.log(movement);
    movement.forward()

    setTimeout(function() {
        movement.stop();
    }, 1000);
})

module.exports = Drone
