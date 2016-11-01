SortCards.Game = function(game) {};

SortCards.Game.prototype = {
	create: function() {
		this.group = this.add.group();
		this.bucketGroup = this.add.group();

		this.storageCtrl = new StorageCtrl();
		this.storageCtrl.generateNewUserId();

		this.progressBar = new ProgressBar(this, Config.TEMPLATES, Config.BUCKETS, this.storageCtrl);

		this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR).onDown.add(this.startNextTemplate, this);

		this.enlargedBucketGroup = this.add.group();
		this.addEnlargedBucketControls();
	},

	createCardSet: function() {
		var cards = [];
		for (var card in Config.CARDS) {
			for (var j = 0; j < Config.CARDS[card][0]; j++) {
				cards.push(new Card(this, card, j));
			} 
		}
		return cards;
	},

	startNextTemplate: function(){
		var isLast = this.progressBar.next(this);

		if (isLast) {
			window.open('file:///storage/emulated/0/Download/TVK3_480.mov', '_blank');
   			this.game.state.start('MainMenu');
		}
	},

	startPreviousTemplate: function(){
		this.progressBar.back(this);
	},

	destroyCards: function(){
		for (var i = 0; i < this.cards.length; ++i){
			this.cards[i].sprite.destroy();
		}
	},

	resetCards: function() {
		for (var i = 0; i < this.cards.length; ++i){
			if(!this.cards[i].bucket) {
				this.cards[i].resetCardPositionAndScale();
				this.cards[i].showCard();
			}
		}
	},

	resetBuckets: function() {
		for (var i = 0; i < this.buckets.length; ++i){
			this.buckets[i].show();
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

	hideAllCards: function() {
		for (var i = 0; i < this.cards.length; ++i){
				this.cards[i].hideCard();
		}
	},

	hideAllBuckets: function() {
		for (var i = 0; i < this.buckets.length; ++i){
				this.buckets[i].hide();
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
	    this.backgroundSprite = this.add.tileSprite(0, 0, 1280, 750, 'background_drop');
	    this.backgroundSprite.tint = 0xffffff;

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
