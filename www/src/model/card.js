

Card = function(gameState, index){
	this.gameState = gameState;
	this.id = 'card_' + index;
	this.positionIndex = index;
	this.bucketId = -1;

	var cardSprite = '';
	var cardIndex = Math.floor(index / SortCards.constants.CARD_TYPE_COUNT);

	switch (index % SortCards.constants.CARD_TYPE_COUNT){
		case 0:
			cardSprite = 'card_vegetable_' + cardIndex;
			break;
		case 1:
			cardSprite = 'card_fruit_' + cardIndex;
			break;
		case 2:
			cardSprite = 'card_meat_' + cardIndex;
			break;
		case 3:
			cardSprite = 'card_legume_' + cardIndex;
			break;
	}

	this.sprite = this.gameState.add.sprite(0, 0, cardSprite);

	this.sprite.anchor.set(0.5);

	// register event listeners.
	this.sprite.inputEnabled = true;
	this.sprite.input.enableDrag();
	this.sprite.events.onDragStart.add(this.onDragStart, this);
	this.sprite.events.onDragStop.add(this.onDragStop, this);
	this.sprite.events.onDragUpdate.add(this.onDragUpdate, this);
};

Card.GAP_BETWEEN_CARDS = 1000 / SortCards.constants.TOTAL_CARDS_COUNT;

Card.prototype = {
	onDragStart : function(sprite, pointer) {
		if (this.bucketId != -1) {
			this.gameState.removeFromBucket(this.bucketId, this);
			this.bucketId = -1;
		}
	},

	onDragStop: function(sprite, pointer) {
		this.bucketId = this.gameState.getBucketByPosition(pointer.position);
		if (this.bucketId != -1) {
			this.gameState.addToBucket(this.bucketId, this);
			this.gameState.dispatchBucketScaleDown();
			this.gameState.add.tween(sprite).to( {
				alpha: 0,
				visible: false
			}, 500, Phaser.Easing.Linear.None, true);
		} else {
			this.resetCardPositionAndScale();
		}
	},

	onDragUpdate: function(sprite, pointer) {
		var bucketIndex = this.gameState.getBucketByPosition(pointer.position);

		if (bucketIndex != -1) {
			this.gameState.dispatchBucketScaleUp(bucketIndex);
			this.scaleCardDownWithAnimation();
		} else {
			this.gameState.dispatchBucketScaleDown();
			this.scaleCardUpWithAnimation();
		}
	},

	resetCardPositionAndScale: function() {
		this.sprite.position.x = Card.GAP_BETWEEN_CARDS + this.positionIndex * Card.GAP_BETWEEN_CARDS,
		this.sprite.position.y = 650;
		this.sprite.alpha = 1;
		this.sprite.visible = true;
		this.sprite.scale.setTo(1, 1);
	},

	setCardInABucket: function(index, bucketX, bucketY, bucketRadius) {
		this.showCard();
	},

	scaleCardDownWithAnimation: function() {
    this.gameState.add.tween(
        this.sprite.scale).to( { x: 0.5, y: 0.5 },
        150, Phaser.Easing.Linear.None, true);
	},

	scaleCardUpWithAnimation: function() {
    this.gameState.add.tween(
        this.sprite.scale).to( { x: 1, y: 1 },
        150, Phaser.Easing.Linear.None, true);
	},

	hideCard: function() {
		this.sprite.alpha = 0;
		this.sprite.visible = false;
	},

	showCard: function() {
		this.sprite.alpha = 1;
		this.sprite.visible = true;
	}
};