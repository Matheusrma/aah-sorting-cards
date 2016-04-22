 SortCards.Game = function(game) {};

SortCards.Game.prototype = {
	create: function() {

		this.templateTitleStyle = { font: "bold 32px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" };
		this.stage.backgroundColor = "#aaa";

		this.currentTemplateIndex = -1;
		this.templates = [
			{
				title: 'What food does your family like to eat? [1]',
				cardSet: 'food'
			},
			{
				title: 'What food does your family like to eat? [2]',
				cardSet: 'food'
			}
		]

		this.buckets = [
			new Bucket(0,80,640,380, this.game),
			new Bucket(640,80,640,380, this.game)
		]

		this.cards = [];

		for (var i = 0; i < 10; ++i){
			this.cards.push(new Card(this, i, 80 + i * 120, 640));
		}

		this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR).onDown.add(this.startNextTemplate, this);

		this.buildTemplateGUI();
		this.startNextTemplate();
	},

	startNextTemplate: function(){
		this.currentTemplateIndex++;

		this.clearBuckets();

		if (this.currentTemplateIndex >= this.templates.length){
			this.templateTitle.text = 'THE END';			
			this.nextTemplateButton.destroy();
			this.destroyCards();
		}
		else {
			this.templateTitle.text = this.templates[this.currentTemplateIndex].title;
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
			this.cards[i].sprite.position.x = 80 + i * 120,
			this.cards[i].sprite.position.y = 640;
		}
	},

	clearBuckets: function(){
		for (var i = 0; i < this.buckets.length; ++i){
			this.buckets[i].clear();
		}
	},

	buildTemplateGUI: function(){
		var titleBar = this.add.graphics();
		titleBar.beginFill("#0000FF", 1);
		titleBar.drawRect(0, 0, 1280, 80);

    this.templateTitle = this.add.text(0, 0, '', this.templateTitleStyle);
    this.templateTitle.setShadow(3, 3, 'rgba(0,0,0,0.5)', 2);
    this.templateTitle.setTextBounds(0, 00, 1280, 80);

		this.nextTemplateButton = this.add.button(this.world.centerX + 500, 20, 'nextArrow', this.startNextTemplate, this);
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
