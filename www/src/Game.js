SortCards.Game = function(game) {};

SortCards.Game.prototype = {
	preload: function(){
		this.load.image('card', 'img/card.png');
	},
	create: function() {
		var card = this.add.sprite(150, 223, 'card');

    //  Enable input and allow for dragging
    card.inputEnabled = true;
    card.input.enableDrag();
    card.events.onDragStart.add(onDragStart, this);
    card.events.onDragStop.add(onDragStop, this);
	},

	onDragStart : function(sprite, pointer) {

	},

	onDragStop: function(sprite, pointer) {

	},
};
