SortCards.Game = function(game) {};

SortCards.Game.prototype = {
	create: function() {

		var templates_ =
			[
				new TitleBar('Which foods are you most likely to feed your youngest child?', CARD_SET_TYPE.FOOD),
				new TitleBar('Which foods are easiest to get year-round?', CARD_SET_TYPE.FOOD),
				new TitleBar('Which foods are easily available to buy on the market?', CARD_SET_TYPE.FOOD),
				new TitleBar('The End', CARD_SET_TYPE.END),
			]
		this.progressBar = new ProgressBar(this, templates_);
		
		this.stage.backgroundColor = "#aaa";

		this.buckets = [
			new Bucket(0,140,640,340, this.game),
			new Bucket(640,140,640,340, this.game)
		]

		this.cards = [];

		for (var i = 0; i < 18; ++i){
			this.cards.push(new Card(this, i));
		}

		this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR).onDown.add(this.startNextTemplate, this);

		this.startNextTemplate();
	},

	startPreviousTemplate: function(){
		this.clearBuckets();
		this.resetCardsPosition();
		this.progressBar.back();
	},

	startNextTemplate: function(){
		this.clearBuckets();
		var isLast = this.progressBar.next();
		if (isLast) {
			this.destroyCards();
		} else {
			this.resetCardsPosition();
		}
	},

	destroyCards: function(){
		for (var i = 0; i < this.cards.length; ++i){
			this.cards[i].sprite.destroy();
		}
	},

	resetCardsPosition: function() {
		for (var i = 0; i < this.cards.length; ++i){
			this.cards[i].sprite.position.x = 130 + i * 60,
			this.cards[i].sprite.position.y = 650;
		}
	},

	clearBuckets: function(){
		for (var i = 0; i < this.buckets.length; ++i){
			this.buckets[i].clear();
		}
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
