SortCards.Preloader = function(game) {};

SortCards.Preloader.prototype = {
	preload: function() {
		this.load.image('card', 'img/card.png');
    this.load.image('nextArrow', 'img/arrow.png');
	},
	create: function() {
		this.game.state.start('Game');
	}
};
