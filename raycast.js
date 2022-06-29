const TILE_SIZE = 32;
const map_num_rows = 11;
const map_num_cols = 15;

const window_width = map_num_cols * TILE_SIZE;
const window_height = map_num_rows * TILE_SIZE;
class Map {
    constructor () {
        this.grid = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 1],
            [1, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
        ]
    }
    hasWallAt(x, y) {
        if (x < 0 || x > window_width || y < 0 || window_height < y)
            return true;
        var mapGridIndexX = Math.floor(x / TILE_SIZE);
        var mapGridIndexY = Math.floor(y / TILE_SIZE);
        if (this.grid[mapGridIndexX,mapGridIndexY] != 0)
            return (true)
        return (false);
        
    }
    render() {
        noStroke();
        for (var i = 0; i < map_num_rows; i++) {
            for(var j = 0;j < map_num_cols; j++) {
                var tileX = j * TILE_SIZE;
                var tileY = i * TILE_SIZE;
                var tileColor = this.grid[i][j] == 1 ? "#222" : "#fff";
                fill(tileColor);
                rect(tileX, tileY, TILE_SIZE, TILE_SIZE);
            }
        }
    }
}
var grid = new Map();
class Player {
    constructor () {
    this.x = window_width / 2;
    this.y = window_height / 2;
    this.radius = 3; // for the player representation -like a cercle-
    this.turnDirection = 0;  // -1 if left, +1 if right
    this.walkDirection = 0;  // -1 if back, +1 if front
    this.rotationAngle = Math.PI / 2;
    this.moveSpeed = 1;
    this.rotationSpeed = 2 * (Math.PI / 180); // convert to radian
    }

    update() {
        //TODO: update player position based on turnDirection and walkDirection
        this.rotationAngle += this.turnDirection * this.rotationSpeed;
        var moveStep = this.walkDirection * this.moveSpeed;

        var newX = this.x + Math.cos(this.rotationAngle) * moveStep;
        var newY = this.y + Math.sin(this.rotationAngle) * moveStep;
        
        // only set new player position if it is not colliding with the map walls
        
        if (!grid.hasWallAt(newX, newY)) {
            this.x = newX;
            this.y = newY;
        }
        
    }
    render() {
        fill("red");
        circle(this.x, this.y, this.radius);
        stroke("red");
        line(this.x,
             this.y,
             this.x + Math.cos(this.rotationAngle) * 30 ,
             this.y + Math.sin(this.rotationAngle) * 30
            );
    }
}


var player = new Player();

function keyPressed() { // Defined on p5.js
    if(keyCode == UP_ARROW) {
        player.walkDirection = +1;
    }
    else if (keyCode == DOWN_ARROW ) {
        player.walkDirection = -1;
    }
    else if (keyCode == RIGHT_ARROW) {
        player.turnDirection = +1;
    }
    else if (keyCode == LEFT_ARROW) {
        player.turnDirection = -1;
    }
}

function keyReleased() {
    if(keyCode == UP_ARROW) {
        player.walkDirection = 0;
    }
    else if (keyCode == DOWN_ARROW ) {
        player.walkDirection = 0;
    }
    else if (keyCode == RIGHT_ARROW) {
        player.turnDirection = 0;
    }
    else if (keyCode == LEFT_ARROW) {
        player.turnDirection = 0;
    }
}
function setup() {
    // TODO: initialize all objects
    createCanvas(window_width, window_height);
}

function update() {
    // TODO: update all game objects before we render the next frame
    player.update();
}

function draw() { // Defined on p5.js
    // TODO: render all objects frame by frame
    update();
    grid.render();
    player.render();
}