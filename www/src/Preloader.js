SortCards.Preloader = function(game) {};

SortCards.Preloader.prototype = {
	preload: function() {
		this.load.image('card', 'img/card.png');
	},
	create: function() {
		this.game.state.start('Game');
	}
};
