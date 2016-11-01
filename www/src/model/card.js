

Card = function(gameState, cardConfigName, cardIndex){
	this.gameState = gameState;
	this.bucket = null;

	var cardSprite = Config.CARDS[cardConfigName][1] + cardIndex;
	this.id = cardSprite;
	this.cardIndex = cardIndex;
	this.cardConfigName = cardConfigName;

	this.sprite = this.gameState.add.sprite(0, 0, cardSprite);

	this.sprite.anchor.set(0.5);

	// register event listeners.
	this.sprite.inputEnabled = true;
	this.sprite.input.enableDrag();
	this.sprite.events.onDragStart.add(this.onDragStart, this);
	this.sprite.events.onDragStop.add(this.onDragStop, this);
	this.sprite.events.onDragUpdate.add(this.onDragUpdate, this);
};

Card.GAP_BETWEEN_CARDS = 1000 / Object.keys(Config.CARDS).length;
Card.SAME_CATEGORY_CARD_BUFFER = 0;

Card.prototype = {
	onDragStart : function(sprite, pointer) {
		if (this.bucket) {
			this.gameState.removeFromBucket(this.bucket, this);
			this.lastBucket = this.bucket;
			this.bucket = null;
			this.removingFromBucket = true;
		}
	},

	onDragStop: function(sprite, pointer) {
	    if (Bucket.scaledBeyond) {
	    	if(Bucket.isInsideDropZone(pointer.position.x, pointer.position.y)) {
				this.resetCardPositionAndScale();
				this.hideCard();
			} else {
				this.bucket = this.lastBucket;
				this.gameState.addToBucket(this.bucket, this);
			}
			this.removingFromBucket = false;	
			return;	
	    }
		this.bucket = this.gameState.getBucketByPosition(pointer.position);
		if (this.bucket) {
			if (this.bucket.scaledBeyond) {
				return;
			}
			this.gameState.addToBucket(this.bucket, this);
			this.gameState.dispatchBucketScaleDown();
			this.gameState.add.tween(sprite).to( {
				alpha: 0,
				visible: false
			}, 100, Phaser.Easing.Linear.None, true);
		} else if (this.removingFromBucket) {
			this.resetCardPositionAndScale();
		}
		this.removingFromBucket = false;
	},

	onDragUpdate: function(sprite, pointer) {
		var bucket = this.gameState.getBucketByPosition(pointer.position);

		if (bucket) {
			this.gameState.dispatchBucketScaleUp(bucket);
			this.scaleCardDownWithAnimation();
		} else {
			this.gameState.dispatchBucketScaleDown();
			this.scaleCardUpWithAnimation();
		}
	},

	resetCardPositionAndScale: function() {
		this.sprite.position.x = (Card.GAP_BETWEEN_CARDS + Config.CARDS[this.cardConfigName][3] * Card.GAP_BETWEEN_CARDS) + Card.SAME_CATEGORY_CARD_BUFFER * this.cardIndex;
		this.sprite.position.y = 625 + Card.SAME_CATEGORY_CARD_BUFFER * this.cardIndex;
		this.bucket = null;
		this.sprite.scale.setTo(1, 1);
		this.showCard();
	},

	repositionCardInScaledBeyondWindow: function(index) {
		this.sprite.position.x = 650 + 140 * (index % 5);
		this.sprite.position.y = 150 + 200 * Math.floor(index / 5);
		this.sprite.scale.setTo(1, 1);
		this.bringToTop();
		this.showCard();
	},

	scaleCardDownSlowly: function() {
     this.gameState.add.tween(
        this.sprite.scale).to( { x: 0.7, y: 0.7 },
        200, Phaser.Easing.Linear.None, true);
	},

	scaleCardDownWithAnimation: function() {
     this.gameState.add.tween(
        this.sprite.scale).to( { x: 0.7, y: 0.7 },
        150, Phaser.Easing.Linear.None, true);
	},

	scaleCardUpWithAnimation: function() {
    this.gameState.add.tween(
        this.sprite.scale).to( { x: 1, y: 1 },
        150, Phaser.Easing.Linear.None, true);
	},

	hideCard: function() {
		this.gameState.add.tween(this.sprite).to( {
				alpha: 0,
				visible: false
			}, 100, Phaser.Easing.Linear.None, true);
	},

	showCard: function() {
		this.sprite.alpha = 1;
		this.gameState.add.tween(this.sprite).to( {
				alpha: 1,
				visible: true
			}, 100, Phaser.Easing.Linear.None, true);
	},

	bringToTop: function() {
		this.sprite.bringToTop();
		this.scaleCardUpWithAnimation();
	}
};
