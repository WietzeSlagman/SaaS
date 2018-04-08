const Drone 		= require('./AgentModel/DroneAPI.js');
const BigchainDB	= require('./BigchainDB/ORMInterface');

class DroneWrapper {
	constructor(id = 'SEARCHANDRESCUE_TEST', simulated = true, location= {x: Math.random()*100, y:Math.random()*100}) {
		this.createDroneBigchain = this.createDroneBigchain.bind(this);
		this.listenForActions = this.listenForActions.bind(this);
		this.checkClosest = this.checkClosest.bind(this);
		this.done = false;


		if (!simulated) {
			this.drone = new Drone('SEARCHANDRESCUE_TEST', location);
		} else {
			var goTo = (location) => {
				console.log('gogo', location)
				this.drone.location = location;
				console.log('whatsupmetdata', {
						location: location,
						currentBattery: this.drone.currentBattery,
						id: this.drone.id,
						action: this.drone.action,
						keypair: this.drone.keypair
					})
				this.bdbDrone.append({
	                toPublicKey: this.drone.keypair.publicKey,
	                keypair: this.drone.keypair,
	                data:  {
						location: location,
						currentBattery: this.drone.currentBattery,
						id: this.drone.id,
						action: this.drone.action,
						keypair: this.drone.keypair
					}
	            }).then((updatedDrone) => {
	            	console.log('updatedDrone', updatedDrone.data)
	            	this.bdbDrone = updatedDrone;
	            }).catch((e) => {
	            	console.log('whyyyyy', e)
	            })

				// this.bdbDrone.append(this.drone.dbid, this.drone.keypair, {
				// 	location: location,
				// 	currentBattery: this.drone.currentBattery,
				// 	id: this.drone.id,
				// 	action: this.drone.action,
				// 	keypair: this.drone.keypair
				// }, 'droneModel').then((bla) => {
				// 	console.log('hoi', bla)
				// })
 			}

			this.drone = {
				location: location,
				currentBattery: 10,
				id: 'SEARCHANDRESCUE_TEST',
				action: 'EXPLORE',
				goTo: goTo.bind(this),
				keypair: BigchainDB.createKeyPair()
			}

			this.createDroneBigchain();
		}
		this.action = 'EXPLORE';
		this.mission = this.getMission(this.drone.id);

		this.done = true;
		this.listenForActions();
	}

	createDroneBigchain() {
        var data = {
            id: this.drone.id,
            type: "create_drone"
        }

        console.log(this.drone.keypair, data)

        BigchainDB.create(this.drone.keypair, data, "droneModel").then((drone) => {
        	// if (drone.hasOwnProperty('errno') && errno == 'ECONNRESET') {
        	// 	console.log('shit fucked')
        	// } else {
        		
	        // 	this.dbid = drone.id
	        // 	this.bdbDrone = drone;
	        // 	console.log(this.dbid, drone.data, drone._schema.id())
        	// }

        }).catch((e) => {
        	console.log('hmmm', e)
        });
    }


	listenForActions() {
		const fun = this.listenForActions.bind(this)

		if (this.done === false) {
			console.log('not done')
			setTimeout(fun, 1000 * 1);
			return null;
		}


		console.log('listener called', this.dbid)
		this.done = false;
		let prom =  new Promise((resolve, reject) => { 
			BigchainDB.retrieve('', 'droneModel').then(drones => {
				var detected = false;
				if (drones.hasOwnProperty('errno') && drones.errno == 'ECONNRESET') {
					console.log('feestje')
					detected = false;
				} else {
					console.log('niet feestje')
					detected = this.checkDetected(drones);
				}

				console.log('we retrievin', detected)
				if (this.drone.currentBattery < 10) {
					console.log('Low battery');
					resolve();
				} else if (detected) {
					console.log('Detected');

					if (this.action !== 'DETECTED') {
						if (this.drone.location.x > detected.x) {
							this.drone.location.x -= 1
						} else if (this.drone.location.x < detected.x) {
							this.drone.location.x += 1
						} else if (this.drone.location.y > detected.y) {
							this.drone.location.y -= 1
						}  else if (this.drone.location.y < detected.y) {
							this.drone.location.y += 1
						}
					}

					resolve();
				} else {
					console.log('what', this.drone.action)
					if (this.drone.action == 'EXPLORE') {
						// generate move
						console.log('Exploring');
						if (Math.random() > 0.5) {
							var newX = this.drone.location.x + 1;
							console.log('we moving to ', newX)
							if (newX < 100) {
								this.drone.goTo({x: this.drone.location.x + 1, y: this.drone.location.y})
							} else {
								this.drone.goTo({x: this.drone.location.x - 2, y: this.drone.location.y})
							}
						} else {
							var newY = this.drone.location.y + 1;
							console.log('we moving to ', newY)

							if (newY < 100) {
								this.drone.goTo({x: this.drone.location.x, y: this.drone.location.y + 1})
							} else {
								this.drone.goTo({x: this.drone.location.x, y: this.drone.location.y - 2})
							}
						}
						resolve();
					} else {
						console.log('No action found', this.drone.action);
						reject('No action found');
					}
				}

			});
		}).then(() => {
			console.log('Listener done');
			this.done = true
		}).catch((e) => {
			BigchainDB.retrieve(this.bdbDrone.id).then((drone) => {
				this.done = true;
				this.bdbDrone = drone;
			});
		});

		if (this.done) {
			setTimeout(fun, 1000 * 10);
		} else {
			console.log('not done')
			setTimeout(fun, 1000 * 1);
		}
	}

	calcDistance(location1, location2) {
		var x = location1.x  - location2.x;
		var y = location1.y - location2.y;
		return Math.sqrt(x*x + y*y);
	}

	checkDetected(drones) {
		var objectLocation = false;
		console.log('hier input', drones.errno);

		drones.map((drone) => {
			console.log(drone);
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

// for (var i = 0; i < 10; i++) {
// 	var newDrone = new DroneWrapper();
// }


