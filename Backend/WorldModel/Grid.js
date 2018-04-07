const BigchainDB    = require('../BigchainDB/ORMInterface');

class Grid {
    constructor(type, size, drones={}) {
        this.keypair = BigchainDB.createKeyPair();
        this.type = type;
        this.sizeX = size.x;
        this.sizeY = size.y;
        this.drones = drones;
        this.grid = this.createGrid(size);

        BigchainDB.create(this.keypair, this, 'gridModel').then((grid) => {
            this.id = grid.id
        }).catch((e) => {
            console.log()
        });
    }

    createGrid(size) {
        var grid = new Array(size.x);

        for (var i = 0; i < grid.length; i++) {
            grid[i] = new Array();

            for(var j = 0; j < size.y; j++) {
                grid[i].push({'drone':null, 'obstacle':null,  'object':null});
            }
        }

        return grid;
    }

    addDrone(id, location) {
        this.grid[location.x][location.y].drone = id;
    }

    addObstacle(location) {
        this.grid[location.x][location.y].obstacle = true;
    }

    addObject(id, location) {
        this.grid[location.x][location.y].object = id;
    }

    moveDrone(id, location) {
        var drone = this.drones.id;
        this.grid[drone.x][drone.y].drone = null;

        this.drones.id.x = x;
        this.drones.id.y = y;
        this.grid[location.x][location.y].drone = id;
    }
}

module.exports = Grid;