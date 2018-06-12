var preload = function(game){
    console.log("%cStarting preload state", "color:white; background:red");
};

preload.prototype = {
	preload: function(){
        console.log("preload preload()");
        var loadingBar = this.add.sprite(game.width/2, game.height/2,"loading");
        loadingBar.anchor.setTo(0.5,0.5);
        this.load.setPreloadSprite(loadingBar);

        game.load.onFileComplete.add(function (progress, key, success, loaded, total) {
            loadingBar.width = game.width * (progress / 100);
            loadingBar.x = game.world.centerX - loadingBar.width / 2;

            console.log('progress: ' + progress);
            console.log('key: ' + key);
            console.log('success: ' + success);
            console.log('loaded: ' + loaded + '\/' + total);
            console.log('**********');

        }, this);
        // this.game.load.image("gametitle","../simple-game/assets/gametitle.png");
        // this.game.load.image("play","../simple-game/assets/play.png");
        // this.game.load.image("gameover","../simple-game/assets/gameover.png");
        //  this.game.load.image('player', '../simple-game/assets/player.png');
        // this.game.load.image('wall', '../simple-game/assets/wall.png');
        // this.game.load.image('coin', '../simple-game/assets/coin.png');
        // this.game.load.image('lava', '../simple-game/assets/lava.png');
        this.load.image('sky', './assets/images/sky.png'); // 112x304
        this.load.image('clouds', './assets/images/clouds.png'); // 544x236
        this.load.image('sea', './assets/images/sea.png'); // 112x96
        this.load.image('islands', './assets/images/island-1.png'); // 689x112
        this.load.image('far-grounds', './assets/images/far-grounds.png'); // 616x110

        this.load.atlas('myTilesetSprite', './assets/images/tileset.png', './assets/images/tileset.json');
        this.load.atlas('myPlayerSprite', './assets/images/luffy_spritesheet.png', './assets/images/luffy_spritesheet.json');
	},
  	create: function(){
        console.log("preload create()");
		this.game.state.start("level01");
	}
}
