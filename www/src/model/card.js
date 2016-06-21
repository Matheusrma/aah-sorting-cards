

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

	var cardNameStyle = {
    font: "bold 35px Arial",
    fill: "#fff",
    boundsAlignH: "center",
    boundsAlignV: "middle"
  };

	this.cardName = this.gameState.add.text(0, 0, 'Apple', cardNameStyle);
	this.cardName.anchor.set(0.5);
};

Card.prototype = {
	onDragStart : function(sprite, pointer) {
		this.scaleCard(1.1);

		if (this.bucketId != -1) {
			this.gameState.removeFromBucket(this.bucketId, this);
			this.bucketId = -1;
		}
	},

	onDragStop: function(sprite, pointer) {
		this.scaleCard(1);

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

	update: function() {
		var yOffset = 0.35;

		this.cardName.position.x = Math.floor(this.sprite.x); 
		this.cardName.position.y = Math.floor(this.sprite.y + (yOffset * this.sprite.height));
	},

	scaleCard: function(factor){
		this.sprite.scale.setTo(factor, factor);
		this.cardName.scale.setTo(factor,factor);
	},

	resetCardPositionAndScale: function() {
		this.sprite.position.x = 130 + this.positionIndex * 60,
		this.sprite.position.y = 650;
		
		this.scaleCard(1);

		this.sprite.alpha = 1;
		this.sprite.visible = true;
	},

	setCardInABucket: function(index, bucketX, bucketY, bucketRadius) {
		this.showCard();
		this.scaleCard(0.5);
	},

	hideCard: function() {
		this.sprite.alpha = 0;
		this.sprite.visible = false;

		this.cardName.visible = false;
	},

	showCard: function() {
		this.sprite.alpha = 1;
		this.sprite.visible = true;

		this.cardName.visible = true;
	}
};