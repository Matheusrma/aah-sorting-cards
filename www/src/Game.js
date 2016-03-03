Bucket = function(x,y,w,h,game) {
	this.rect = new Phaser.Rectangle(x,y,w,h);
	this.cards = [];

	var graphics = game.add.graphics();

	graphics.lineStyle(2, 0x0000FF, 1);
  graphics.drawRect(x, y, w, h);
};

Bucket.prototype = {
	isInside: function(pos) {
		var topLeft = this.rect.topLeft;
		var bottomRight = this.rect.bottomRight;

		return pos.x > topLeft.x && pos.y > topLeft.y && pos.x < bottomRight.x && pos.y < bottomRight.y;
	},

	hasCardId: function(id) {
		return this.cards.indexOf(id) >= 0;
	},

	add: function(cardId){
		this.cards.push(cardId);
	},

	remove: function(cardId){
		var index = this.cards.indexOf(cardId);

		if (index >= 0)
			this.cards.splice(index, 1);
	}
}

Card = function(game, index, x, y){
	this.game = game;
	this.id = 'card_' + index;

	this.sprite = this.game.add.sprite(x, y, 'card');
	this.sprite.z = 1;

	this.sprite.anchor.set(0.5);

	this.sprite.inputEnabled = true;
	this.sprite.input.enableDrag();
	this.sprite.events.onDragStart.add(this.onDragStart, this);
	this.sprite.events.onDragStop.add(this.onDragStop, this);
}

Card.prototype = {
	onDragStart : function(sprite, pointer) {
		sprite.scale.x = sprite.scale.y = 1.1;
		this.sprite.z = 4;

		console.log(this.sprite)

		var bucketIndex = this.game.getBucketById(this.id);

		if (bucketIndex != -1) {
			this.game.removeFromBucket(bucketIndex, this.id);
		}
	},

	onDragStop: function(sprite, pointer) {
		sprite.scale.x = sprite.scale.y = 1;
		this.sprite.z = 1;

		var bucketIndex = this.game.getBucketByPosition(pointer.position);

		if (bucketIndex != -1) {
			this.game.addToBucket(bucketIndex, this.id);
	  }
	},
}

SortCards.Game = function(game) {};

SortCards.Game.prototype = {
	preload: function(){
		this.load.image('card', 'img/card.png');
	},

	create: function() {
		for (var i = 0; i < 10; ++i){
			new Card(this, i, i * 120, 500);
		}

		this.buckets = [
			new Bucket(100,70,300,300, this.game),
			new Bucket(700,70,300,300, this.game)
		]
	},

	getBucketByPosition : function(pos) {
		for (var i = 0; i < this.buckets.length; ++i){
			if (this.buckets[i].isInside(pos)) return i;
		}

		return -1;
	},

	getBucketById : function(id){
		for (var i = 0; i < this.buckets.length; ++i){
			if (this.buckets[i].hasCardId(id)) return i;
		}

		return -1;
	},

	addToBucket: function(bucketIndex, cardId){
		this.buckets[bucketIndex].add(cardId);
	},

	removeFromBucket: function(bucketIndex, cardId){
		this.buckets[bucketIndex].remove(cardId);
	}
};
