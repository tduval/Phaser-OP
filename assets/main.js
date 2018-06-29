
var config = {
    type: Phaser.AUTO,
    width: 500,
    height: 200,
    parent: document.getElementById("divPhaser"),
    physicsConfig: { arcade: true },
};

var player  = null;
var enemy = null;
var debugMode = false;

var game = new Phaser.Game(config);
console.log("Init Game Config... ", game);

//Add different state stage to the Game object
game.state.add("boot",boot);
game.state.add("preload",preload);
game.state.add("level01", level01);

//Start the first State stage as Boot
game.state.start("boot");

var animPlayerList = ['idle_front',
                    'run_side',
                    'jump_front',
                    'crouch_side',
                    'atk_punch_side',
                    'atk_kick_side',
                    'atk_pistol_side',
                    'atk_gatling_side',
                    'run_atk_side',
                    'atk_bazooka_side',
                    'atk_stamp_side',
                    'atk_head_side',
                    'shout_win_side',
                    'jump_win_side'
                    ];

var animEnemyList = ['idle',
                    'run',
                    'attack',
                    'die',
                    ];

var enemyHP = null;
