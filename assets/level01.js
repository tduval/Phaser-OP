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
        //set to true to engage the update loop, set to false to stop the update loop for moving bg and player
        continueTravel = true; //need to implement this, still using the keyboard

        isEnemySpawnAllowed = true;
        time_til_spawn = Math.random()*3000 + 2000;﻿  //Random time between 2 a﻿nd 5 seconds.
        last_spawn_time = game.time.time;

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
        this.game.physics.arcade.enable(player);
        // Add gravity to make it fall
        player.body.gravity.y = 600;
        player.anchor.x = 1;

        //  Also enable sprite for drag
        player.inputEnabled = true;
        player.input.enableDrag();

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

        // createEnemies(this.enemies);
        // console.log("Enemies Group = ", this.enemies);
    },
    update: function(){
        // Make the player and the grounds collide
        this.game.physics.arcade.collide(player, this.grounds);
        this.game.physics.arcade.collide(enemy, this.grounds);

        // Call the 'collide' function when the player touches the enemy
        //this.game.physics.arcade.collide(player, enemy, attackEnemy, null, this);

        if (continueTravel) {
            console.log("%ccontinue travel... TRUE", "background:green");
            bg_clouds.tilePosition.x -= 0.1;
            bg_sea.tilePosition.x -= 0.25;
            bg_islands.tilePosition.x -= 0.3;
            createScrollingDecorationTile(this.trees);
            createScrollingGroundTile(this.grounds);
        } else {
            console.log("%ccontinue travel... FALSE", "background:red");
            attackEnemy();
            if (enemyHP <= 0) {
                enemy.kill();
                continueTravel = true;
                isEnemySpawnAllowed = true;
            }
        }

        player.animations.currentAnim.onComplete.add(playerIdleAnim, this);

        if (this.cursor.left.isDown){
            continueTravel = false;
        }else if (this.cursor.right.isDown){
            continueTravel = true;
        }

        // enemy spawn timer logic
        current_time = game.time.time;
        if((current_time - last_spawn_time > time_til_spawn) && (isEnemySpawnAllowed)) {
          time_til_spawn = Math.random()*3000 + 2000;
          last_spawn_time = current_time;
          createEnemies('pirate');
          isEnemySpawnAllowed = false;
        }﻿

        player.bringToTop();
    },
    render: function(){
        // render FPS on the top-right corner of the screen
        this.game.debug.text(this.game.time.fps || '--', this.game.world.width-30, 20, "#00ff00", "20px Courier");

        // Sprite debug info
        this.game.debug.body(player);this.game.debug.spriteBounds(player, 'blue', false);
        if(enemy != null){this.game.debug.spriteBounds(enemy, 'red', false);this.game.debug.body(enemy);}

        // Display Coordinates of both Player and Enemy in the top-left corner
        this.game.debug.text('player X: ' + Phaser.Math.roundTo(player.x, 0) + ' / Y: ' + Phaser.Math.roundTo(player.y, 0), 1, 11);
        if(enemy != null){this.game.debug.text('Enemy X: ' + Phaser.Math.roundTo(enemy.x, 0) + ' / Y: ' + Phaser.Math.roundTo(enemy.y, 0), 1, 22);}

        // Display Mouse pointer position
        this.game.debug.text('x'+Phaser.Math.roundTo(game.input.mousePointer.x, 0) + '/y' + Phaser.Math.roundTo(game.input.mousePointer.y, 0), game.world.centerX, 20, "black", "15px Courier");

    }

}

function playerIdleAnim(){
    if(continueTravel){
        player.play('run_side', true);
    }else{
        enemyHP -= 30;
        console.log(enemyHP);
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

function createEnemies(enemyType) {
    enemy = this.game.add.sprite(game.world.width, player.y, enemyType);
    enemyHP = 100;
    //Create all the character animation based on JSON atlas file
    for (var i = 0; i < animEnemyList.length; i++) {
        var ani = enemy.animations.add(animEnemyList[i], Phaser.Animation.generateFrameNames(animEnemyList[i]+'-',1,99), 12, false); //name, frames, frameRate, loop
    }
    enemy.play('run', 12, true);
    this.game.physics.arcade.enable(enemy);
    enemy.anchor.x = 1;
    // Add gravity to make it fall
    //enemy.body.gravity.y = 100;
    enemy.body.moveTo(2000, 290, Phaser.ANGLE_LEFT);
    enemy.body.onMoveComplete.add(enemyReadyPhase, this);
    console.log("Enemy Spawned!");
    //  Also enable sprite for drag
    enemy.inputEnabled = true;
    enemy.input.enableDrag();
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

function enemyReadyPhase() {
    continueTravel = false;
    enemy.play('idle', true);
    console.log("Enemy Ready to fight !");
}

function attackEnemy() {
    enemy.play('attack', true);
    player.play('atk_punch_side', true);
    console.log("Attack Phase !");
}

function moveEnemies(enemies) {

}
