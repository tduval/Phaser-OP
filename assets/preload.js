var preload = function(game){
    console.log("%cStarting preload state", "color:white; background:red");
};

preload.prototype = {
	preload: function(){
        console.log("preload preload()");
        var loadingBar = this.add.sprite(game.width/2, game.height/2,"loading");
        loadingBar.anchor.setTo(0.5,0.5);
        this.load.setPreloadSprite(loadingBar);

        //load all the assets : images/sprites/spritesheet/atlas/tileset
        this.load.image('sky', './assets/images/sky.png'); // 112x304
        this.load.image('clouds', './assets/images/clouds-1.png'); //800x421
        this.load.image('sea', './assets/images/sea-1.png'); // 800x215
        this.load.image('islands', './assets/images/island-1.png'); // 689x112
        this.load.image('far-grounds', './assets/images/far-grounds.png'); // 616x110

        this.load.image('tree', './assets/images/tree.png'); // 123x114
        this.load.atlas('myTilesetSprite', './assets/images/tileset.png', './assets/images/tileset.json');
        this.load.atlas('myPlayerSprite', './assets/images/luffy_spritesheet.png', './assets/images/luffy_spritesheet.json');

        //load enemies npc
        this.load.atlas('npcCavermanSprite', './assets/images/npc/caverman.png', './assets/images/npc/npc.json');
        this.load.atlas('npcCaverman2Sprite', './assets/images/npc/caverman-2.png', './assets/images/npc/npc.json');

	},
  	create: function(){
        console.log("preload create()");
		this.game.state.start("level01");
	}
}
