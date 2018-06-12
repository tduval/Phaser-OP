var boot = function(game){
	console.log("%cStarting boot state", "color:white; background:red");
};

boot.prototype = {
	preload: function(){
        console.log("boot preload()");
        this.game.load.image("loading","./assets/images/loading.png");
	},
  	create: function(){
        console.log("boot create()");
		this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		this.scale.pageAlignHorizontally = true;
		//this.scale.setScreenSize();
		this.game.state.start("preload");
	}
}
