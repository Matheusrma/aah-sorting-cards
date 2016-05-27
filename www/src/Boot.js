var SortCards = {};

SortCards.constants = {
  CARD_TYPE_COUNT:4,
  FRUIT_COUNT:2,
  VEGETABLE_COUNT:23,
  MEAT_COUNT:6,
  LEGUME_COUNT:2
};

SortCards.Boot = function(game) {};

SortCards.Boot.prototype = {
	preload: function() {
	},
	create: function() {
		this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		this.game.scale.pageAlignHorizontally = true;
		this.game.scale.pageAlignVertically = true;

		this.game.state.start('Preloader');
	}
};
