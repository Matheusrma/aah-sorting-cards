

Card = function(gameState, index){
	this.gameState = gameState;
	this.id = 'card_' + index;

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
		sprite.scale.x = sprite.scale.y = 1.1;

		var bucketIndex = this.gameState.getBucketById(this.id);

		if (bucketIndex != -1) {
			this.gameState.removeFromBucket(bucketIndex, this.id);
		}
	},

	onDragStop: function(sprite, pointer) {
		sprite.scale.x = sprite.scale.y = 1;

		var bucketIndex = this.gameState.getBucketByPosition(pointer.position);

		if (bucketIndex != -1) {
			this.gameState.addToBucket(bucketIndex, this.id);
			this.gameState.dispatchBucketScaleDown();
			// sprite.visible = false;
			this.gameState.add.tween(sprite).to( {
				alpha: 0,
				visible: false
			}, 500, Phaser.Easing.Linear.None, true);
		}
	},

	onDragUpdate: function(sprite, pointer) {
		var bucketIndex = this.gameState.getBucketByPosition(pointer.position);

		if (bucketIndex != -1) {
			this.gameState.dispatchBucketScaleUp(bucketIndex);
		} else {
			this.gameState.dispatchBucketScaleDown();
		}
	}
};