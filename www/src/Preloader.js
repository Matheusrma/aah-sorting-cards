SortCards.Preloader = function(game) {};

SortCards.Preloader.prototype = {
	preload: function() {
		for (var i = 0; i < this.game.MAX_FOOD_CARDS; ++i){
      this.load.image('food_card_' + i, 'img/food_card_' + i + '.JPG');
    }
    
    this.load.image('nextArrow', 'img/arrow.png');
	},

	create: function() {
		this.game.state.start('Game');
	}
};
