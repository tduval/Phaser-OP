const playerCharacter =   {
        name: 'Luffy',
        spriteName: 'myPlayerSprite',
        srcSprite: './assets/images/luffy_spritesheet.png',
        srcJson: './assets/images/luffy_spritesheet.json',
        attacks: [
            {
                name: 'Punch',
                animName: 'atk_punch_side',
                unlockRank: 0,
                damage: 2,
            },
            {
                name: 'Kick',
                animName: 'atk_kick_side',
                unlockRank: 1,
                damage: 4,
            },
            {
                name: 'Powerful Punch',
                animName: 'run_atk_side',
                unlockRank: 2,
                damage: 10,
            },
            {
                name: 'Gomu Gomu no Pistol',
                animName: 'atk_pistol_side',
                unlockRank: 3,
                damage: 20,
            },
            {
                name: 'Gomu Gomu no Head-butt',
                animName: 'atk_head_side',
                unlockRank: 4,
                damage: 50,
            },
            {
                name: 'Gomu Gomu no Stamp',
                animName: 'atk_stamp_side',
                unlockRank: 5,
                damage: 100,
            },
            {
                name: 'Gomu Gomu no Gatling',
                animName: 'atk_gatling_side',
                unlockRank: 6,
                damage: 200,
            },
            {
                name: 'Gomu Gomu no Bazooka',
                animName: 'atk_bazooka_side',
                unlockRank: 7,
                damage: 500,
            },

        ],
    }

const enemies = [
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

const ranks= [
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
        player: playerCharacter,
        enemies: enemies,
        ranks: ranks,
        bounty: 0,
        continueTravel: true,
        isEnemySpawnAllowed: true,
        currentEnemy: null,
    },
    mutations: {
        incrementBounty (state, amount){
            state.bounty += amount
            console.log("%cIncrement Bounty by : " + amount, "color:yellow; background:gray")
        },
        setContinueTravel (state, value){
            state.continueTravel = value
            console.log("%cset ContinueTravel to : " + value, value ? "background:green" : "background:red")
        },
        setIsEnemySpawnAllowed (state, value){
            state.isEnemySpawnAllowed = value
            console.log("%cset isEnemySpawnAllowed to : " + value, "color:white; background:gray")
        },
        setCurrentEnemy (state, enemy){
            state.currentEnemy = enemy
            console.log("%cset CurrentEnemy to : " + enemy.spriteName, "color:red; background:gray")
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
    },
    getters: {
        currentRank: state => {
            let rank_obj = state.ranks.filter(r => r.bounty <= state.bounty) // get all rank objects under bounty value
            return rank_obj[rank_obj.length-1] // select only the last one
        },
    },
})
