// Enemy starting Y-axis values corresponding to three rows of stones
var enemiesY = [65, 145, 225];

// Enemies our player must avoid
var Enemy = function() {

    // Enemy starting position x-axis value
    this.x = 0;
    // Enemy starting position y-axis value. Y-axis value is chosen randomly from three rows of stones
    this.y = enemiesY[Math.floor(Math.random() * enemiesY.length)];
    // Enemy speed, varies from > 100 to < 600
    this.speed = (Math.random() * 500) + 100;
    // The image/sprite for our enemies, this uses a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';

};


// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {

    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for all computers.
    this.x += this.speed * dt;

    // Reset enemy position and speed if it rolls off the end on the right side
    if (this.x > 505) {
        this.x = -100;
        this.y = enemiesY[Math.floor(Math.random() * enemiesY.length)];
        this.speed = (Math.random() * 500) + 100;
    }

    // Reset player to starting position if hit by enemy
    if (this.x > player.x - 75 && this.x < player.x + 80 && this.y + 60 > player.y && this.y < player.y + 60) {
        player.x = 101 * 2;
        player.y = 5 * 82;
    }

};


// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {

    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

};


// Now write your own player class
// This class requires an update(), render() and a handleInput() method.
var Player = function() {

    // Player starting position x-axis value
    this.x = 101 * 2;
    // Player starting position y-axis value
    this.y = 5 * 82;

    // The image/sprite for our enemies, this uses a helper we've provided to easily load images
    this.sprite = 'images/char-boy.png';

};


// Update Player's position and restrict movement accordingly
Player.prototype.update = function() {

    if (this.x < 2) {    //Player reaches left boundry, prevent Player from moving further left
        this.x = 2;
    } else if (this.x > 402) {  //Player reaches right boundry, prevent Player from moving further right
        this.x = 402;
    } else if(this.y < 70) {    //Player reaches water/top, reset Player to starting position
        this.x = 101 * 2;
        this.y = 5 * 82;
    } else if (this.y > 410) {  //Player reaches bottom boundry, prevent Player from moving further down
        this.y = 410;
    }

};


// Draw the Player on the screen
Player.prototype.render = function() {

    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

};


// Move player accordingly (left, right, up, down) in response to key presses
Player.prototype.handleInput = function(keyPressed) {

    switch (keyPressed) {
        case 'left':
            this.x -= 100;      // Move player left
            break;
        case 'right':
            this.x += 100;      // Move player right
            break;
        case 'up':
            this.y -= 85;      // Move player up
            break;
        case 'down':
            this.y += 85;      // Move player down
    }

};


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
var allEnemies = [new Enemy(), new Enemy(), new Enemy()];

// Place the player object in a variable called player
var player = new Player();


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
