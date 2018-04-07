const Drone 		= require('./AgentModel/DroneAPI.js');
const BigchainDB	= require('./BigchainDB/ORMInterface');

class DroneWrapper {
	constructor(id = 'SEARCHANDRESCUE_TEST', simulated = true) {
		if (!simulated) {
			this.drone = new Drone('SEARCHANDRESCUE_TEST', {x: 0, y: 0});
		} else {
			this.drone = {
				location: {
					x: 100,
					y: 50,
				},
				currentBattery: 0,
				id: 'SEARCHANDRESCUE_TEST',
				action: 'EXPLORE',
				keypair: BigchainDB.createKeyPair()
			}

			this.createDroneBigchain();
		}
		this.action = 'EXPLORE';
		this.mission = this.getMission(this.drone.id);

		this.listenForActions();
	}

	createDroneBigchain() {
        var data = {
            id: this.id,
            type: "create_drone"
        }

        BigchainDB.create(this.drone.keypair, data, "droneModel").then((drone) => {
        	this.dbid = drone.id
        	console.log(this.dbid, drone.data, drone._schema.id())

        });
    }


	listenForActions() {
		console.log('listener called')
		let prom =  new Promise((resolve, reject) => { 
			BigchainDB.retrieve('', 'droneModel').then(drones => {
				console.log('we retrievin')
				const detected = this.checkDetected(drones);
				if (this.drone.currentBattery < 10) {
					console.log('Low battery');
					resolve();
				} else if (detected) {
					console.log('Detected');
					const closest = this.checkClosest(drones, detected);

					if (closest) {
						this.drone.goTo(detected).then(() => {
							resolve();
						}).catch(e => reject(e));
					}

					resolve();
				} else {
					console.log('what')
					switch(drone.action) {
						case "EXPLORE": 
							// generate move
							console.log('Exploring');
							resolve();
						default:
							console.log('No action found');
							reject('No action found');
					}
				}

			});
		});

		const fun = this.listenForActions.bind(this)
		setTimeout(fun, 1000 * 10);
	}

	calcDistance(location1, location2) {
		var x = location1.x  - location2.x;
		var y = location1.y - location2.y;
		return Math.sqrt(x*x + y*y);
	}

	checkDetected(drones, objectLocation) {
		drones.map((drone) => {
			if (drone.object_detected === true) {
				objectLocation = drone.location;
			}
		});

		return objectLocation;
	}

	getMission(droneId) {
		const mission = droneId.split('_');

		if (mission.length === 1) {
			console.log('No mission specified');
			return 'No mission specified';
		} else {
			return mission[0];
		}
	}

	checkClosest(drones, objectLocation) {
		const distance = this.calcDistance(this.drone.location, objectLocation);
		var closest = true;

		drones.map((drone) => {
			if (distance > this.calcDistance(drone.location, objectLocation) && this.mission === this.getMission(drone.id)) {
				closest = false;
			}
		});

		return closest;
	}
}

const bla = new DroneWrapper()

