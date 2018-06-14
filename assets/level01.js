var level01 = function(game){
    console.log("%cStarting level01 state", "color:white; background:red");
};

level01.prototype = {
    create: function(){
        // Set the background color to blue
        this.game.stage.backgroundColor = '#74b4ed';

        //  The scrolling background
        bg_clouds = game.add.tileSprite(0, 40, game.world.width, 50, 'clouds');
        bg_sea = game.add.tileSprite(0, game.world.height-110, game.world.width, 100, 'sea');
        bg_islands = game.add.tileSprite(0, game.world.centerY/3, game.world.width, 112, 'islands');

        // Start the Arcade physics system (for movements and collisions)
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        // Add the physics engine to all game objects
        this.game.world.enableBody = true;

        // Variable to store the arrow key pressed
        this.cursor = this.game.input.keyboard.createCursorKeys();

        // Create the player in the middle of the game
        this.player = this.game.add.sprite(game.world.width/3, game.world.centerY, 'myPlayerSprite');
        this.player.scale.x *= -1; //flipx the sprite symmetrically to make it look on the right
        // Add gravity to make it fall
        this.player.body.gravity.y = 600;

        // Create 3 groups that will contain our objects
        this.grounds = this.game.add.group();
        this.coins = this.game.add.group();
        this.enemies = this.game.add.group();

        createInitialGroundTile(this.grounds);
        console.log("Grounds[] = ", this.grounds);

        //Create all the character animation based on JSON atlas file
        for (var i = 0; i < animList.length; i++) {
            var ani = this.player.animations.add(animList[i], Phaser.Animation.generateFrameNames(animList[i]+'-',0,99), 12, false); //name, frames, frameRate, loop
        }

        this.player.play('run_side');

    },
    update: function(){
        // Make the player and the grounds collide
        this.game.physics.arcade.collide(this.player, this.grounds);

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
            this.player.play('atk_gatling_side');
        }
        else{
            this.player.body.velocity.x = 0;
        }
        // Make the player jump if he is touching the ground
        if (this.cursor.up.isDown && this.player.body.touching.down) {
            this.player.body.velocity.y = -250;
            this.player.play('atk_stamp_side');
        }


        this.player.animations.currentAnim.onComplete.add(playerIdleAnim, this);
        //  Scroll the background
        bg_clouds.tilePosition.x -= 0.1;
        bg_sea.tilePosition.x -= 0.25;
        bg_islands.tilePosition.x -= 0.5;
        this.grounds.x -= 0.6;

        // Sprite debug info
        this.game.debug.spriteInfo(bg_clouds, 32, 32);
        //this.game.debug.spriteBounds(bg_clouds);
        //this.game.debug.scale(10, 15)

    },

}

function playerIdleAnim(){
    //console.log("Current Anim : ",this.player.animations.currentAnim);
    this.player.play('run_side', true);
}


function createInitialGroundTile(grounds){
    var tileWidth = 48;
    var tileHeight = 38;
    var tilesPerGameWidth = (this.game.world.width / tileWidth) + 1;
    for(var i = 0; i < tilesPerGameWidth; i++) {
        var ground = this.game.add.sprite(i * tileWidth, this.game.world.height - tileHeight, 'myTilesetSprite', 'rocks_6'); //48x38 (WxH)
        ground.body.immovable = true;
        grounds.add(ground);
    }
}
