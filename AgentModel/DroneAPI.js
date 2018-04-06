const sumo = require("node-sumo")
const dbinterface = require("../BigchainDB/Interface")
const chalk = require('chalk');

const WAITTIME = 100
const STARTUPTIME = 100

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
        this.speed = 50

        this.movement = this.createMovementControls()
    }

    getBatteryLifePromise() {
        return new Promise(function(resolve, reject) {
            this.drone.on("battery", battery => {
                console.log(chalk.green(`Battery-life: ${battery}`));
                resolve(battery)
            })
        }.bind(this));
    }

    setStateBigchain() {
        this.getBatteryLifePromise().then(battery => {
            this.currentBattery = battery

            assetdata = {
                id:                 this.id,
                location:           this.location,
                action:             this.action,

                object_detected:    this.object_detected,
                battery:            battery,
                cost:               this.currentBattery - battery,
            }

            metadata = {}

            var signedTx = dbinterface.makeSignedTx(assetdata, metadata, this.keypair)

            console.log(chalk.yellow(`Posted new transaction: ${signedTx.id}`));
            dbinterface.postTransaction(signedTx)

        })
    }

    _setLocation(distance, multiplier) {
        switch (this.facing) {
            case "N":
                this.location.x -= distance * multiplier
                break;
            case "E":
                this.location.y += distance * multiplier
                break;
            case "S":
                this.location.x += distance * multiplier
                break;
            case "W":
                this.location.y -= distance * multiplier
                break;
            default:
                console.log(chalk.red("IMPOSSIBLE FACING"));
        }

        return this.location
    }

    _forward(time) {
        return new Promise(function(resolve, reject) {
            this.drone.forward(this.speed)

            setTimeout(() => {
                this.drone.stop()
                this._setLocation(time, 1)

                setTimeout(() => {
                    resolve()
                }, WAITTIME)

            }, time + STARTUPTIME)
        }.bind(this));
    }

    _backward(time) {
        return new Promise(function(resolve, reject) {
            this.drone.backward(this.speed)

            setTimeout(() => {
                this.drone.stop()
                this._setLocation(time, -1)

                setTimeout(() => {
                    resolve()
                }, WAITTIME)

            }, time + STARTUPTIME)
        }.bind(this));
    }

    _right() {
        return new Promise(function(resolve, reject) {
            var current = this.directions.indexOf(this.facing)
            var next = current + 1;

            // if greater than length then 0
            if (next >= this.directions.length) {
                next = 0
            }

            this.facing = this.directions[next]

            this.drone.right(this.speed)

            setTimeout(() => {
                this.drone.stop()

                setTimeout(() => {
                    resolve()
                }, WAITTIME)
            }, 350) // magic number; almost right

        }.bind(this));
    }

    _left() {
        return new Promise(function(resolve, reject) {
            var current = this.directions.indexOf(this.facing)
            var next = current -= 1

            // if less than 0 then 0
            if (next < 0) {
                next = 0
            }

            this.facing = this.directions[next]
            this.drone.left(this.speed)

            setTimeout(() => {
                this.drone.stop()

                setTimeout(() => {
                    resolve()
                }, WAITTIME)
            }, 350) // magic number; almost left
        }.bind(this));
    }

    createMovementControls() {
        return new Promise(function(resolve, reject) {
            this.connected.then(() => {
                resolve({
                    forward: this._forward.bind(this),
                    backward: this._backward.bind(this),
                    right: this._right.bind(this),
                    left: this._left.bind(this),
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
        console.log(d.location);

        movement.forward(1000).then(() => {
            console.log(d.facing);
            console.log(d.location);

            movement.right().then(() => {
                console.log(d.facing);
                console.log(d.location);

                movement.forward(1000).then(() => {
                    console.log(d.location);
                    console.log(d.facing);

                    d.setStateBigchain()
                })
            })
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
