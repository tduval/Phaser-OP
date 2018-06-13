
var config = {
    type: Phaser.AUTO,
    width: 500,
    height: 200,
    parent: document.getElementById("divPhaser"),
    physicsConfig: { arcade: true },
};

var player;

var game = new Phaser.Game(config);
console.log("Init Game Config... ", game);

//Add different state stage to the Game object
game.state.add("boot",boot);
game.state.add("preload",preload);
game.state.add("level01", level01);

//Start the first State stage as Boot
game.state.start("boot");
