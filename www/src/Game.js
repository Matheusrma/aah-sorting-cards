Bucket = function(x,y,w,h,game) {
	this.rect = new Phaser.Rectangle(x,y,w,h);
	this.cards = [];

	var graphics = game.add.graphics();

	graphics.lineStyle(2, 0x000, 1);
	graphics.beginFill(0xAAA, 0.2);
  graphics.drawRect(x, y, w, h);

	var style = { font: "bold 40px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" };

	var copy = x < 100 ? "Doesn't like to eat":"Likes to eat";
	var text = game.add.text(0, 0, copy, style);
	text.setShadow(3, 3, 'rgba(0,0,0,0.5)', 2);

	//  We'll set the bounds to be from x0, y100 and be 800px wide by 100px high
	text.setTextBounds(x, y, w, h);

	style = { font: "bold 15px Arial", fill: "#fff", boundsAlignH: "left", boundsAlignV: "middle" };

	copy = 'Cards: 0';
	this.scoreText = game.add.text(0, 0, copy, style);

	//  We'll set the bounds to be from x0, y100 and be 800px wide by 100px high
	this.scoreText.setTextBounds(x, y, w, 100);
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
		this.updateScoreText();
	},

	remove: function(cardId){
		var index = this.cards.indexOf(cardId);

		if (index >= 0) this.cards.splice(index, 1);

		this.updateScoreText();
	},

	updateScoreText: function(){
		this.scoreText.text = 'Cards: ' + this.cards.length;
	}
}

Card = function(game, index, x, y){
	this.game = game;
	this.id = 'card_' + index;

	this.sprite = this.game.add.sprite(x, y, 'card');

	this.sprite.anchor.set(0.5);

	this.sprite.inputEnabled = true;
	this.sprite.input.enableDrag();
	this.sprite.events.onDragStart.add(this.onDragStart, this);
	this.sprite.events.onDragStop.add(this.onDragStop, this);
}

Card.prototype = {
	onDragStart : function(sprite, pointer) {
		sprite.scale.x = sprite.scale.y = 1.1;

		var bucketIndex = this.game.getBucketById(this.id);

		if (bucketIndex != -1) {
			this.game.removeFromBucket(bucketIndex, this.id);
		}
	},

	onDragStop: function(sprite, pointer) {
		sprite.scale.x = sprite.scale.y = 1;

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
		this.buildGUI();

		this.buckets = [
			new Bucket(0,80,640,380, this.game),
			new Bucket(640,80,640,380, this.game)
		]

		for (var i = 0; i < 10; ++i){
			new Card(this, i, 80 + i * 120, 640);
		}
	},

	buildGUI: function(){
		this.stage.backgroundColor = "#aaa";

		var titleBar = this.add.graphics();
		titleBar.beginFill("#0000FF", 1);
		titleBar.drawRect(0, 0, 1280, 80);

		var style = { font: "bold 32px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" };

    //  The Text is positioned at 0, 100
    var text = this.add.text(0, 0, "What food does your family like to eat?", style);
    text.setShadow(3, 3, 'rgba(0,0,0,0.5)', 2);

    //  We'll set the bounds to be from x0, y100 and be 800px wide by 100px high
    text.setTextBounds(0, 00, 1280, 80);
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
