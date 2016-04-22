var SortCards = {};

SortCards.Boot = function(game) {};

SortCards.Boot.prototype = {
	preload: function() {
	},
	create: function() {
		this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		this.game.scale.pageAlignHorizontally = true;
		this.game.scale.pageAlignVertically = true;
    
    this.game.MAX_FOOD_CARDS = 4;

		this.game.state.start('Preloader');
	}
};
