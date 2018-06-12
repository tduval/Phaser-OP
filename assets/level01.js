var level01 = function(game){
    console.log("%cStarting level01 state", "color:white; background:red");
};

level01.prototype = {
    create: function(){
        // Set the background color to blue
        this.game.stage.backgroundColor = '#74b4ed';

        // Start the Arcade physics system (for movements and collisions)
        this.game.physics.startSystem(Phaser.Physics.ARCADE);

        // Add the physics engine to all game objects
        this.game.world.enableBody = true;

        // Variable to store the arrow key pressed
        this.cursor = this.game.input.keyboard.createCursorKeys();

        // Create the player in the middle of the game
        this.player = this.game.add.sprite(game.world.centerX/2, game.world.centerY, 'myPlayerSprite');

        // Add gravity to make it fall
        this.player.body.gravity.y = 600;

        // Create 3 groups that will contain our objects
        this.walls = this.game.add.group();
        this.coins = this.game.add.group();
        this.enemies = this.game.add.group();

        // Design the level. x = wall, o = coin, ! = lava.
        var level = [
            '                      ',
            '                      ',
            '                      ',
            '                      ',
            '                      ',
            '                      ',
            'x              x     x',
            'xxxxxxxxxxxxxxxxxxxxxx',
        ];
        // Create the level by going through the array
        for (var i = 0; i < level.length; i++) {
            for (var j = 0; j < level[i].length; j++) {
                // Create a wall and add it to the 'walls' group
                if (level[i][j] == 'x') {
                    var wall = this.game.add.sprite(30+20*j, 30+20*i, 'myTilesetSprite', 'rocks_1');
                    this.walls.add(wall);
                    wall.body.immovable = true;
                }
            }
        }


    },
    update: function(){
        // Make the player and the walls collide
        this.game.physics.arcade.collide(this.player, this.walls);

        // Call the 'takeCoin' function when the player takes a coin
        this.game.physics.arcade.overlap(this.player, this.coins, this.takeCoin, null, this);

        // Call the 'restart' function when the player touches the enemy
        this.game.physics.arcade.overlap(this.player, this.enemies, this.restart, null, this);

        // Move the player when an arrow key is pressed
        if (this.cursor.left.isDown){
            this.player.body.velocity.x = -200;
        }
        else if (this.cursor.right.isDown){
            this.player.body.velocity.x = 200;
        }
        else{
            this.player.body.velocity.x = 0;
        }
        // Make the player jump if he is touching the ground
        if (this.cursor.up.isDown && this.player.body.touching.down) {
            this.player.body.velocity.y = -250;
        }
    },

}
