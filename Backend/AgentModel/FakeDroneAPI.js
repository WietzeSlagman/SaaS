const Drone = require("./DroneAPI.js")
const chalk = require('chalk');

class FakeDrone extends Drone {
    constructor(id, init_location) {
        super(id, init_location, true)
        this.currentBattery = 10
    }

    goto(location) {
        return new Promise(function(resolve, reject) {
            console.log(chalk.blue("Going to "), location);
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
