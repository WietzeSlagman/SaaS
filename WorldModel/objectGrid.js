class Grid {
    constructor(type, x, y, drones={}) {
        this.type = type;
        this.sizeX = x;
        this.sizeY = y;
        this.drones = drones;
        this.grid = createGrid(x, y);
    }

    createGrid(x, y) {
        var grid = new Array(x);

        for (var i = 0; i < grid.length; i++) {
            grid[i] = new Array();

            for(var j = 0; j < grid[i].length; j++) {
                grid[i].push({'drone':null, 'obstacle':null,  'object':null});
            }
        }

        return grid;
    }

    addDrone(id, x, y) {
        this.grd[x][y].drone = id;
    }

    addObstacle(x, y) {
        this.grd[x][y].obstacle = true;
    }

    addObject(id, x, y) {
        this.grd[x][y].object = id;
    }

    moveDrone(id, x, y) {
        drone = this.drones.id;
        this.grid[drone.x][drone.y].drone = null;

        this.drones.id.x = x;
        this.drones.id.y = y;
        this.grid[x][y].drone = id;
    }
}
