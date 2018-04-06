class Grid {
    constructor(type, size, drones={}) {
        this.type = type;
        this.sizeX = size.x;
        this.sizeY = size.y;
        this.drones = drones;
        this.grid = createGrid(size);
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
        this.grd[location.x][location.y].drone = id;
    }

    addObstacle(location) {
        this.grd[location.x][location.y].obstacle = true;
    }

    addObject(id, location) {
        this.grd[location.x][location.y].object = id;
    }

    moveDrone(id, location) {
        var drone = this.drones.id;
        this.grid[drone.x][drone.y].drone = null;

        this.drones.id.x = x;
        this.drones.id.y = y;
        this.grid[location.x][location.y].drone = id;
    }
}
