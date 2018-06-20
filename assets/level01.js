var level01 = function(game){
    console.log("%cStarting level01 state", "color:white; background:red");
};

level01.prototype = {
    preload: function(){
      this.game.time.advancedTiming = true;
    },
    create: function(){
        // Set the background color to blue
        this.game.stage.backgroundColor = '#74b4ed';

        //  The scrolling background
        this.isBackgroundMoving = true; //set to true to engage the update loop, set to false to stop the update loop for moving bg and player
        continueTravel = true; //need to implement this, still using the keyboard

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
        player = this.game.add.sprite(game.world.width/3, game.world.centerY, 'myPlayerSprite');
        player.scale.x *= -1; //flipx the sprite symmetrically to make it look on the right
        player.body.collideWorldBounds = true;
        // Add gravity to make it fall
        player.body.gravity.y = 600;
        player.anchor.x = 1;

        // Create 3 groups that will contain our objects
        this.grounds = this.game.add.group();
        this.trees = this.game.add.group();
        this.coins = this.game.add.group();
        this.enemies = this.game.add.group();
        createInitialDecorationTile(this.trees, 10) //create 20 trees
        createInitialGroundTile(this.grounds);

        //Create all the character animation based on JSON atlas file
        for (var i = 0; i < animPlayerList.length; i++) {
            var ani = player.animations.add(animPlayerList[i], Phaser.Animation.generateFrameNames(animPlayerList[i]+'-',0,99), 12, false); //name, frames, frameRate, loop
        }

        player.play('run_side');

        createEnemies(this.enemies);
        console.log("Enemies Group = ", this.enemies);
    },
    update: function(){
        // Make the player and the grounds collide
        this.game.physics.arcade.collide(player, this.grounds);

        // Call the 'takeCoin' function when the player takes a coin
        this.game.physics.arcade.overlap(player, this.coins, this.takeCoin, null, this);

        // Call the 'restart' function when the player touches the enemy
        //this.game.physics.arcade.overlap(player, this.enemies, hitEnemy(), null, this);
        this.game.physics.arcade.collide(player, this.enemies.children, hitEnemy);

        if (continueTravel) {
            console.log("%ccontinue travel... TRUE", "background:green");
            //player.body.velocity.x = 200;
            bg_clouds.tilePosition.x -= 0.1;
            bg_sea.tilePosition.x -= 0.25;
            bg_islands.tilePosition.x -= 0.3;
            createScrollingDecorationTile(this.trees);
            createScrollingGroundTile(this.grounds);

            player.animations.currentAnim.onComplete.add(playerIdleAnim, this);
        } else {
            console.log("%ccontinue travel... FALSE", "background:red");
            player.body.velocity.x = 0;
            player.animations.currentAnim.onComplete.add(playerIdleAnim, this);
        }


        if (this.cursor.left.isDown){
            continueTravel = false;
        }else if (this.cursor.right.isDown){
            continueTravel = true;
        }

        for (var j = 0; j < this.enemies.length; j++) {
            var enemy = this.enemies.getChildAt(j);
            if (enemy.x <= player.x +150) {
                console.log("enemy stop");
                continueTravel = false;
                enemy.body.velocity.x = 0;
                enemy.animations.stop(null, true);;
            }else {
                console.log("enemy run");
                enemy.body.velocity.x = -100;
            }
        }

        player.bringToTop();
    },
    render: function(){
        // render FPS on the top-right corner of the screen
        this.game.debug.text(this.game.time.fps || '--', this.game.world.width-30, 20, "#00ff00", "20px Courier");

        // Sprite debug info
        this.game.debug.spriteInfo(player, 1, 10);
        this.game.debug.spriteCoords(this.enemies.getFirstExists(), 1, 84, 'red');
        this.game.debug.spriteBounds(player, 'blue', false);
        this.game.debug.spriteBounds(this.enemies, 'red', false);
        //this.game.debug.text('Anchor X: ' + player.anchor.x.toFixed(1) + ' Y: ' + player.anchor.y.toFixed(1), 32, 32);
        //this.game.debug.text('player X: ' + player.x + ' Y: ' + player.y, 32, 64);

    }

}

function playerIdleAnim(){
    if(continueTravel){
        player.play('run_side', true);
    }else{
        player.play('idle_front', true);
    }

}

function createInitialGroundTile(grounds){
    var tileWidth = 48;
    var tileHeight = 38;
    var tilesPerGameWidth = (this.game.world.width / tileWidth) + 1;
    for(var i = 0; i < tilesPerGameWidth; i++) {
        var ground = this.game.add.sprite(i * (tileWidth-1), this.game.world.height - tileHeight, 'myTilesetSprite', 'rocks_6'); //(tileWidth-1) due to 1pixel offset
        ground.body.immovable = true;
        grounds.add(ground);
    }
}

function createInitialDecorationTile(trees, total){
    for(var i = 0; i < total; i++) {
        var tree = this.game.add.sprite(this.game.rnd.integerInRange(0, this.game.width), (this.game.world.height - 38) - 110, 'tree');
        trees.add(tree);
    }
}

function createEnemies(enemies) {
    caverman = this.game.add.sprite(game.world.width, game.world.centerY, 'npcCavermanSprite');
    //caverman2 = this.game.add.sprite(game.world.width-30, game.world.centerY, 'npcCaverman2Sprite');
    caverman.scale.x *= -1; //flipx the sprite symmetrically to make it look on the left
    //caverman2.scale.x *= -1; //flipx the sprite symmetrically to make it look on the left

    enemies.add(caverman);
    //enemies.add(caverman2);
    //enemies.body.gravity.y = 600;

    //Create all the character animation based on JSON atlas file
    for (var j = 0; j < enemies.length; j++) {
        var enemy = enemies.getChildAt(j);
        for (var i = 0; i < animEnemyList.length; i++) {
            var ani = enemy.animations.add(animEnemyList[i], Phaser.Animation.generateFrameNames(animEnemyList[i],0,99), 12, true); //name, frames, frameRate, loop
        }
        enemy.play('run', true);
        //this.game.physics.arcade.moveToObject(enemy, player);
        enemy.body.collideWorldBounds = true;
        enemy.body.bounce.set(0.3);
    }
}


function createScrollingGroundTile(grounds) {
    var tileWidth = 48;
    var tileHeight = 38;
    var tileScrollingX = 0.8;
    var tilesPerGameWidth = (this.game.world.width / tileWidth) + 1;
    var ground;

    for (var i = 0; i < grounds.length; i++) {
        ground = grounds.getChildAt(i);

        if (ground.position.x < 0-tileWidth) {
            ground.position.x = (0-tileWidth) + (tileWidth * tilesPerGameWidth);
            ground.bringToTop();
        }
        //scroll each tile of the group to -tileScrollingX (pixel)
        ground.position.x -= tileScrollingX;
    }
}

function createScrollingDecorationTile(trees) {
    var tileWidth = 123;
    var tileHeight = 114;
    var tileScrollingX = 0.8;
    var tree;
    for (var i = 0; i < trees.length; i++) {
        tree = trees.getChildAt(i);

        if (tree.x < 0-tileWidth) {
            if(Math.random() < 0.01) {
                tree.x = this.game.world.width + tileWidth;
                tree.y = (this.game.world.height - 38) - 110;
                if(Math.random() < 0.5) {
                    tree.scale.x *= -1;
                }
            }
        }else {
            //scroll each tile of the group to -tileScrollingX (pixel)
            tree.x -= tileScrollingX;
        }
    }
}

function hitEnemy() {
    this.enem
}

function moveEnemies(enemies) {

}
