const BigchainDB    = require('../BigchainDB/ORMInterface');

class Grid {
    constructor(type, size, drones={}) {
        this.keypair = BigchainDB.createKeyPair();
        this.type = type;
        this.sizeX = size.x;
        this.sizeY = size.y;
        this.drones = drones;
        this.grid = this.createGrid(size);

        this.data = {
            type: this.type,
            size: this.size,
            grid: this.grid,
            name: 'Weekveel',
            drones: drones
        }

        // console.log(this.data)
        console.log(this.keypair)
        BigchainDB.create(this.keypair, this.data, 'gridModel').then((grid) => {
            this.id = grid.id
            console.log(grid.data, grid.id, grid)


        }).catch((e) => {
            console.log(e)
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
        this.drones.id = location;

        this.data.drones = this.drones;
        this.data.grid = this.grid;
        BigchainDB.append(this.id, this.keypair, this.data, 'gridModel');
    }

    addObstacle(location) {
        this.grid[location.x][location.y].obstacle = true;
        
        this.data.grid = this.grid;
        BigchainDB.append(this.id, this.keypair, this.data, 'gridModel');
    }

    addObject(id, location) {
        this.grid[location.x][location.y].object = id;

        this.data.grid = this.grid;
        BigchainDB.append(this.id, this.keypair, this.data, 'gridModel');
    }

    moveDrone(id, location) {
        var drone = this.drones.id;
        this.grid[drone.x][drone.y].drone = null;

        this.drones.id.x = x;
        this.drones.id.y = y;
        this.grid[location.x][location.y].drone = id;

        this.data.grid = this.grid;
        this.data.drones = this.drones;
        BigchainDB.append(this.id, this.keypair, this.data, 'gridModel');
    }
}

module.exports = Grid;