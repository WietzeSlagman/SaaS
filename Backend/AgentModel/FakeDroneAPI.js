const Drone = require("./DroneAPI.js")
const chalk = require('chalk');

class FakeDrone extends Drone {
    constructor(id, init_location) {
        super(id, init_location, true)
        this.currentBattery = 10
    }

    goto(location) {
        if (JSON.stringify(location) === JSON.stringify(this.location)) {
            return new Promise(function(resolve, reject) {
                resolve()
            });
        }

        if (Math.random() > 0.5) {
            if (location.x > this.location.x) {
                location.x = this.location.x + 5
                location.y = this.location.y
            } else {
                location.x = this.location.x - 5
                location.y = this.location.y
            }
        } else {
            if (location.y > this.location.y) {
                location.y = this.location.y + 5
                location.x = this.location.x
            } else {
                location.y = this.location.y - 5
                location.x = this.location.x
            }
        }

        return new Promise(function(resolve, reject) {
            console.log(chalk.blue("Going to "), this.location);
            this.location = location
            this.setStateBigchain()
            resolve()
        }.bind(this));
    }

    getVideoData() {
        return
    }

    getBatteryLifePromise() {
        return new Promise(function(resolve, reject) {
            resolve(10)
        });
    }
}


module.exports = FakeDrone;
