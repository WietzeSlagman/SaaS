const sumo = require("node-sumo")
const dbinterface = require("../BigchainDB/Interface")
const chalk = require('chalk');

class Drone {
    constructor(id, init_location) {
        this.drone = sumo.createClient()
        this.id = id

        this.location = init_location
        this.history = []

        this.directions = ["N", "E", "S", "W"]

        // Initial facing north
        this.facing = this.directions[0]

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
                    forward: () => {
                        this.drone.forward(speed)
                    },
                    backward: () => {
                        this.drone.backward(speed)
                    },
                    right: () => {
                        return new Promise(function(resolve, reject) {
                            var current = this.directions.indexOf(this.facing)
                            var next = current + 1;

                            // if greater than length then 0
                            if (next >= this.directions.length) {
                                next = 0
                            }

                            this.facing = this.directions[next]

                            this.drone.right(speed)

                            setTimeout(() => {
                                this.drone.stop()

                                setTimeout(() => {
                                    resolve()
                                }, 100)
                            }, 350) // magic number; almost left

                        }.bind(this));
                    },
                    left: () => {
                        return new Promise(function(resolve, reject) {
                            var current = this.directions.indexOf(this.facing)
                            var next = current -= 1

                            // if less than 0 then 0
                            if (next < 0) {
                                next = 0
                            }

                            this.facing = this.directions[next]
                            this.drone.left(speed)

                            setTimeout(() => {
                                this.drone.stop()

                                setTimeout(() => {
                                    resolve()
                                }, 100)
                            }, 350) // magic number; almost left

                        });
                    },
                    stop: () => { this.drone.stop() },
                })
            })
        }.bind(this));
    }
}

var d  = new Drone("test", {x: 0, y:0})

d.movement.then(movement => {
    movement.right().then(() => {
        console.log(d.facing);
        movement.right().then(() => {
            console.log(d.facing);

            movement.right().then(() => {
                console.log(d.facing);

                movement.right().then(() => {
                    console.log(d.facing);
                })
            // })
        })
    });


    // console.log("facing", d.facing);
    //
    // setTimeout(() => {
    //     movement.left();
    //     console.log("facing", d.facing);
    // }, 500) // magic number; almost left
    //
    //
    // movement.right();
    // console.log("facing", d.facing);
    //
    // movement.right();
    // console.log("facing", d.facing);

    // setTimeout(function() {
    //     // movement.stop();
    //
    // }, 1000);
})

module.exports = Drone
