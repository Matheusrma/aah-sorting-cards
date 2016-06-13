SortCards.Game = function(game) {};

SortCards.Game.prototype = {
	create: function() {

		var templates_ = [
			new TitleBar('Which foods are you most likely to feed your youngest child?', ProgressBar.CARD_SET_TYPE.FOOD),
			new TitleBar('Which foods are easiest to get year-round?', ProgressBar.CARD_SET_TYPE.FOOD),
			new TitleBar('Which foods are easily available to buy on the market?', ProgressBar.CARD_SET_TYPE.FOOD),
			new TitleBar('The End', ProgressBar.CARD_SET_TYPE.END),
		]

		this.storageCtrl = new StorageCtrl();
		this.progressBar = new ProgressBar(this, templates_);
		this.stage.backgroundColor = "#aaa";

		this.buckets = [
			new Bucket(0,130,640,340, this.game),
			new Bucket(640,130,640,340, this.game)
		]

		this.cards = [];

		for (var i = 0; i < 18; ++i){
			this.cards.push(new Card(this, i));
		}

		this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR).onDown.add(this.startNextTemplate, this);
		
		this.testButton = this.game.add.button(this.game.world.centerX, 600,
            'arrow_right_base',
            this.testRecover.bind(this),
            this.game);

 		var style = { 
    	font: "bold 15px Arial", 
    	fill: "#fff", 
    	boundsAlignH: "center", 
    	boundsAlignV: "middle" 
  	};

		this.testText = this.game.add.text(0, 0, 'NOTHING', style);

		this.resetCardsAndBuckets();
	},

	testRecover: function(){
		var t = this.storageCtrl.recoverAllTemplateResults();
		this.testText.text = JSON.stringify(t)
	},

	startNextTemplate: function(){
		this.storageCtrl.saveTemplateResult(0, this.buckets);

		this.resetCardsAndBuckets();
		
		var isLast = this.progressBar.next(this);

		if (isLast) {
			this.destroyCards();
		}
	},

	startPreviousTemplate: function(){
		this.resetCardsAndBuckets();
		this.progressBar.back(this);
	},
	
	resetCardsAndBuckets: function() {
		this.clearBuckets();
		this.resetCardsPosition();
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
