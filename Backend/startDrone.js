const Drone 		= require('./AgentModel/DroneAPI.js');
const FakeDrone		= require('./AgentModel/FakeDroneAPI.js')

const BigchainDB	= require('./BigchainDB/ORMInterface');

class DroneWrapper {
	constructor(id = 'SEARCHANDRESCUE_TEST', simulated = true, location= {x: 0, y:0}) {
		// this.createDroneBigchain = this.createDroneBigchain.bind(this);
		this.listenForActions = this.listenForActions.bind(this);
		this.checkClosest = this.checkClosest.bind(this);
		this.done = true;

		this.counter = 0

		if (!simulated) {
			this.drone = new Drone('SEARCHANDRESCUE_TEST', location);
		} else {
			this.drone = new FakeDrone('SEARCHANDRESCUE_TEST', location)
		}
		this.action = 'EXPLORE';
		this.mission = this.getMission(this.drone.id);

		this.listenForActions();
	}



	listenForActions() {
		const fun = this.listenForActions.bind(this)

		if (this.done == false) {
			console.log('Not done, no double spending frient.');
			setTimeout(fun, 1000 * 10);

			return null
		}


		this.done = false
		console.log('listener called', this.dbid)
		let prom =  new Promise((resolve, reject) => {
			BigchainDB.retrieve('', 'droneModel').then(drones => {
				console.log('we retrievin')
				// const detected = this.checkDetected(drones);
				const detected = false;
				if (this.drone.currentBattery < 10) {
					console.log('Low battery');
					resolve();
				} else if (detected) {
					console.log('Detected');
					const closest = this.checkClosest(drones, detected);

					if (closest) {
						this.drone.goto(detected).then(() => {
							resolve();
						}).catch(e => reject(e));
					}

					resolve();
				} else {
					console.log('what', this.drone.action)
					if (this.drone.action == 'EXPLORE') {
						// generate move
						console.log('Exploring');
						if (Math.random() > 0.5) {
							var newX = this.drone.location.x + 1;

							this.counter += 1

							if (this.counter === 3) {
								this.drone.object_detected = true
								this.drone.drone.animationsSpin()

								setTimeout(() => {
									this.drone.drone.stop()
								}, 500)
							}

							if (newX < 100) {
								this.drone.goto({x: this.drone.location.x + 5, y: this.drone.location.y})
							} else {
								this.drone.goto({x: this.drone.location.x - 5, y: this.drone.location.y})
							}
						} else {
							var newY = this.drone.location.y + 1;

							if (newY < 100) {
								this.drone.goto({x: this.drone.location.x, y: this.drone.location.y + 5})
							} else {
								this.drone.goto({x: this.drone.location.x, y: this.drone.location.y - 5})
							}
						}
						resolve();
					} else {
						console.log('No action found', this.drone.action);
						reject('No action found');
					}
				}

			});
		}).then(() => this.done = true).catch((e) => {
			console.log('Gekke errors dit hoort niet')
		});

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

const bla = new DroneWrapper(null, false)
