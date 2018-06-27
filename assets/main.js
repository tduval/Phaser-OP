
var config = {
    type: Phaser.AUTO,
    width: 500,
    height: 200,
    parent: document.getElementById("divPhaser"),
    physicsConfig: { arcade: true },
};

var player, continueTravel, enemy = null, debugMode = false;

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

var enemyRegularList = ['enemy-pirate',
                        'enemy-navy'
                        ];
var enemyHP = 100;

const playerCharacter =   {
        name: 'Luffy',
        attacks: ['atk_punch_side'],
        spriteName: 'myPlayerSprite',
        srcSprite: './assets/images/luffy_spritesheet.png',
        srcJson: './assets/images/luffy_spritesheet.json',
    }

const enemyCharacter = [
    {
        id: 0,
        name: 'Pirate',
        bountyEarn: 10,
        unlock: 0,
        spriteName: 'enemy-pirate',
        srcSprite: './assets/images/npc/enemy-pirate.png',
        srcJson: './assets/images/npc/enemy-pirate.json',
        health: 10,
    },
    {
        id: 1,
        name: 'Navy Soldier',
        bountyEarn: 15,
        unlock: 100,
        spriteName: 'enemy-navy',
        srcSprite: './assets/images/npc/enemy-navy.png',
        srcJson: './assets/images/npc/enemy-navy.json',
        health: 15,
    },
]

const store = new Vuex.Store({
  state: {
    myPlayer: playerCharacter,
    myEnemies: enemyCharacter,
    rank: 0,
    bounty: 0,
  },
  mutations: {
        incrementBounty (state, amount){
            state.bounty += amount
            console.log("Increment Bounty by : ", amount)
        },
        incrementRank (state){
            //todo
            // change rank of the player based on the different bounty level
            console.log("Increment Rank to : ", state.rank)
        },
        // buyVehicle (state, vehicleID){
        //     var vehicle = state.vehicles.find(vehicle => vehicle.id === vehicleID)
        //     if (vehicle.id === vehicleID) {
        //         vehicle.purchased++
        //         state.moneyAmount -= vehicle.costMoney
        //         console.log("Buy vehicle : ", vehicle.name)
        //      }
        // },
        // discoverVehicle (state){
        //     for (let vehicle of state.vehicles) {
        //         if(vehicle.discovered === false && state.moneyAmount >= vehicle.costMoney){
        //             console.log("Discovered : ", vehicle.name)
        //             vehicle.discovered = true
        //         }
        //     }
        // },
        // countMoneyPerSecond (state){
        //     state.moneyPerSecond = 0
        //     for (let vehicle of state.vehicles) {
        //         state.moneyPerSecond += vehicle.moneyPerSeconds * vehicle.purchased
        //     }
        //     return state.moneyPerSecond
        // }
    }
})
