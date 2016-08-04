var SortCards = {};

SortCards.constants = {
  CARD_TYPE_COUNT:4,
  FRUIT_COUNT:1,
  VEGETABLE_COUNT:2,
  MEAT_COUNT:1,
  LEGUME_COUNT:1,
  TOTAL_CARDS_COUNT:5
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
