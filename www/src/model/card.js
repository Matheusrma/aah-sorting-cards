

Card = function(gameState, index){
	this.gameState = gameState;
	this.id = 'card_' + index;

	cardSprite = '';

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
	
	this.sprite.inputEnabled = true;
	this.sprite.input.enableDrag();
	this.sprite.events.onDragStart.add(this.onDragStart, this);
	this.sprite.events.onDragStop.add(this.onDragStop, this);
}

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
	  }
	},
}
