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
