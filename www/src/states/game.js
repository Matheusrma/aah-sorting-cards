SortCards.Game = function(game) {};

SortCards.Game.prototype = {
	create: function() {
		this.group = this.add.group();
		this.bucketGroup = this.add.group();
		this.progressBar = new ProgressBar(this, Config.TEMPLATES, Config.BUCKETS);

		this.storageCtrl = new StorageCtrl();
		this.storageCtrl.generateNewUserId();
		this.cards = [];

		for (var card in Config.CARDS) {
			for (var j = 0; j < Config.CARDS[card][0]; j++) {
				this.cards.push(new Card(this, card, j));
			} 
		}

		this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR).onDown.add(this.startNextTemplate, this);

		this.resetCardsAndBuckets();
		this.enlargedBucketGroup = this.add.group();
		this.addEnlargedBucketControls();
	},

	startNextTemplate: function(){
		this.storageCtrl.saveTemplateResult(0, this.buckets);

		var isLast = this.progressBar.next(this);

		if (isLast) {
			this.game.state.start('End');
		}
		else this.resetCardsAndBuckets();
	},

	startPreviousTemplate: function(){
		this.resetCardsAndBuckets();
		this.progressBar.back(this);
	},
	
	resetCardsAndBuckets: function() {
		this.clearBuckets();
		this.resetCards();
	},

	destroyCards: function(){
		for (var i = 0; i < this.cards.length; ++i){
			this.cards[i].sprite.destroy();
		}
	},

	resetCards: function() {
		for (var i = 0; i < this.cards.length; ++i){
			this.cards[i].resetCardPositionAndScale();
			this.cards[i].showCard();
		}
	},

	showCardsWithoutBuckets: function() {
		for (var i = 0; i < this.cards.length; ++i){
			if(!this.cards[i].bucket) {
				this.cards[i].showCard();
			}
		}
	},

	hideCardsWithoutBuckets: function() {
		for (var i = 0; i < this.cards.length; ++i){
			if(!this.cards[i].bucket) {
				this.cards[i].hideCard();
			}
		}
	},

	clearBuckets: function(){
		for (var i = 0; i < this.buckets.length; ++i){
			this.buckets[i].clear();
		}
	},

	getBucketByPosition : function(pos) {
		for (var i = 0; i < this.buckets.length; ++i){
			if (this.buckets[i].isInside(pos)) {
				return this.buckets[i];
			}
		}

		return null;
	},

	addToBucket: function(bucket, card){
		bucket.add(card);
	},

	removeFromBucket: function(bucket, card){
		bucket.remove(card);
	},

	dispatchBucketScaleUp: function(bucket){
		bucket.scaleUp();
	},

	dispatchBucketScaleDown: function(){
		for(var i = 0; i< this.buckets.length; i++) {
			this.buckets[i].scaleDown();
		}
	},

	addEnlargedBucketControls: function() {
	    this.backgroundSprite = this.add.tileSprite(0, 0, 1280, 800, 'background_drop');
	    this.backgroundSprite.tint = 0xffffff;
	    this.backgroundSprite.height = window.screen.height;
	    this.backgroundSprite.width = window.screen.width;

	    this.closeBackgroundSprite = this.make.button(0, 0,
            'close_button',
            this.closeEnlargedBucket,
            this);
	    this.enlargedBucketGroup.add(this.backgroundSprite);
	    this.enlargedBucketGroup.add(this.closeBackgroundSprite);

    	this.enlargedBucketGroup.visible = false;
	},

	closeEnlargedBucket: function() {
		for (var i = 0; i < this.buckets.length; i++) {
			this.buckets[i].scaleDownToEarth();
		}
	}
};

SortCards.SCREEN_SIZE = 1280;
