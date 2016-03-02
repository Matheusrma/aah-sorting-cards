Bucket = function(x,y,w,h,game) {
	this.rect = new Phaser.Rectangle(x,y,w,h);

	var graphics = game.add.graphics();

	graphics.lineStyle(2, 0x0000FF, 1);
  graphics.drawRect(x, y, w, h);
};

Bucket.prototype = {
	isInside: function(pos) {
		var topLeft = this.rect.topLeft;
		var bottomRight = this.rect.bottomRight;

		return pos.x > topLeft.x && pos.y > topLeft.y && pos.x < bottomRight.x && pos.y < bottomRight.y;
	}
}

Card = function(game, x, y){
	this.game = game;

	this.cardSprite = this.game.add.sprite(x, y, 'card');

	this.cardSprite.anchor.set(0.5)

	this.cardSprite.inputEnabled = true;
	this.cardSprite.input.enableDrag();
	this.cardSprite.events.onDragStart.add(this.onDragStart, this);
	this.cardSprite.events.onDragStop.add(this.onDragStop, this);
}

Card.prototype = {
	onDragStart : function(sprite, pointer) {
		sprite.scale.x = sprite.scale.y = 1.1;
	},

	onDragStop: function(sprite, pointer) {
		sprite.scale.x = sprite.scale.y = 1;

		if (this.game.checkForBucket(pointer.position) >= 0 ||
			 this.game.checkForBucket(sprite.position) >= 0)
			sprite.destroy()
	},
}

SortCards.Game = function(game) {};

SortCards.Game.prototype = {
	preload: function(){
		this.load.image('card', 'img/card.png');
	},

	create: function() {
		for (var i = 0; i < 10; ++i){
			new Card(this, i * 120, 500);
		}

		this.buckets = [
			new Bucket(100,100,200,200, this.game)
		]
	},

	checkForBucket : function(pos) {
		for (var i = 0; i < this.buckets.length; ++i){
			if (this.buckets[i].isInside(pos)) return i;
		}

		return -1;
	}
};
