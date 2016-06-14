

Card = function(gameState, index){
	this.gameState = gameState;
	this.id = 'card_' + index;
	this.positionIndex = index;
	this.bucketId = -1;

	var cardSprite = '';

	switch (index % SortCards.constants.CARD_TYPE_COUNT){
		case 0:
			cardSprite = 'card_fruit_' + (index % SortCards.constants.FRUIT_COUNT);
			break;
		case 1:
			cardSprite = 'card_vegetable_' + (index % SortCards.constants.VEGETABLE_COUNT);
			break;
		case 2:
			cardSprite = 'card_meat_' + (index % SortCards.constants.MEAT_COUNT);
			break;
		case 3:
			cardSprite = 'card_legume_' + (index % SortCards.constants.LEGUME_COUNT);
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

Card.prototype = {
	onDragStart : function(sprite, pointer) {
		this.sprite.scale.setTo(1.1, 1.1);

		if (this.bucketId != -1) {
			this.gameState.removeFromBucket(this.bucketId, this);
			this.bucketId = -1;
		}
	},

	onDragStop: function(sprite, pointer) {
		this.sprite.scale.setTo(1, 1);

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
		} else {
			this.gameState.dispatchBucketScaleDown();
		}
	},

	resetCardPositionAndScale: function() {
		this.sprite.position.x = 130 + this.positionIndex * 60,
		this.sprite.position.y = 650;
		this.sprite.scale.setTo(1, 1);
		this.sprite.alpha = 1;
		this.sprite.visible = true;
	},

	setCardInABucket: function(index, bucketX, bucketY, bucketRadius) {
		this.showCard();
		this.sprite.scale.setTo(0.5, 0.5);
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