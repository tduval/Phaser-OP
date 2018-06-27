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

const rankList= [
    {
        id: 0,
        name: 'Chore Boy',
        bounty: '0',
    },
    {
        id: 1,
        name: 'Recruit',
        bounty: '50000',
    },
    {
        id: 2,
        name: 'Apprentice',
        bounty: '300000',
    },
    {
        id: 3,
        name: 'First Class',
        bounty: '1000000',
    },
    {
        id: 4,
        name: 'Chief Petty Officer',
        bounty: '2000000',
    },
    {
        id: 5,
        name: 'Warrant Officer',
        bounty: '5000000',
    },
    {
        id: 6,
        name: 'Lieutenant',
        bounty: '7000000',
    },
    {
        id: 7,
        name: 'Commander',
        bounty: '15000000',
    },
    {
        id: 8,
        name: 'Captain',
        bounty: '30000000',
    },
    {
        id: 9,
        name: 'Commodore',
        bounty: '70000000',
    },
    {
        id: 10,
        name: 'Rear-Admiral',
        bounty: '150000000',
    },
    {
        id: 11,
        name: 'Vice-Admiral',
        bounty: '400000000',
    },
    {
        id: 12,
        name: 'Admiral',
        bounty: '7000000000',
    },
    {
        id: 13,
        name: 'Fleet Admiral',
        bounty: '1000000000',
    },
    {
        id: 14,
        name: 'Gorosei',
        bounty: '3000000000',
    },

]

const store = new Vuex.Store({
  state: {
    myPlayer: playerCharacter,
    myEnemies: enemyCharacter,
    rankList: rankList,
    bounty: 0,
  },
  mutations: {
        incrementBounty (state, amount){
            state.bounty += amount
            console.log("Increment Bounty by : ", amount)
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
