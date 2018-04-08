const Drone = require("./DroneAPI.js")
const chalk = require('chalk');

class FakeDrone extends Drone {
    constructor(id, init_location) {
        super(id, init_location, true)
        this.currentBattery = 10
    }

    goto(location) {
        console.log('123')
        this.location = location
        console.log(this.bdbDrone);
        this.setStateBigchain()
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
