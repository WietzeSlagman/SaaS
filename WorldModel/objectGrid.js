class Grid {
    constructor(type, x, y) {
        this.type = type;
        this.sizeX = x;
        this.sizeY = y;
        this.grid = createGrid(x, y);
    }

    createGrid(x, y) {
        var grid = new Array(x);

        for (var i = 0; i < grid.length; i++) {
            grid[i] = new Array();

            for(var j = 0; j < grid[i].length; j++) {
                grid[i].push({'drone':false, 'object':false, 'obstacle':false})
            }
        }

        return grid
    }

    addDrone(id, x, y) {

    }

    addObstacle(x, y) {

    }

    addObject(x, y) {

    }

    moveDrone(id, x, y) {

    }

    dispatchAction(id, object) {

    }
}
