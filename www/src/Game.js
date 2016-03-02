Bucket = function(x,y,w,h) {
	this.rect = new Phaser.Rectangle(x,y,w,h);
};

Bucket.prototype = {
	isInside: function(pos) {
		var topLeft = this.rect.topLeft;
		var bottomRight = this.rect.bottomRight;

		return pos.x > topLeft.x && pos.y > topLeft.y && pos.x < bottomRight.x && pos.y < bottomRight.y;
	}
}

SortCards.Game = function(game) {};

SortCards.Game.prototype = {
	preload: function(){
		this.load.image('card', 'img/card.png');
	},

	create: function() {
		for (var i = 0; i < 10; ++i){
			var card = this.add.sprite(i * 100, 500, 'card');

	    card.inputEnabled = true;
	    card.input.enableDrag();
	    card.events.onDragStart.add(this.onDragStart, this);
	    card.events.onDragStop.add(this.onDragStop, this);
		}

		this.buckets = [
			new Bucket(100,100,200,200)
		]
	},

	onDragStart : function(sprite, pointer) {

	},

	onDragStop: function(sprite, pointer) {
		if (this.checkForBucket(sprite.position) >= 0)
			sprite.destroy()
	},

	checkForBucket : function(pos) {
		for (var i = 0; i < this.buckets.length; ++i){
			if (this.buckets[i].isInside(pos)) return i;
		}

		return -1;
	}
};
