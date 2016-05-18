 SortCards.Game = function(game) {};

SortCards.Game.prototype = {
	create: function() {

		this.game.add.tileSprite(0, 0, 1280, 800, 'background');

		this.templateTitleStyle = { font: "bold 32px Arial", 
																fill: "#fff", 
																boundsAlignH: "center", 
																boundsAlignV: "middle" 
															};

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
			new Bucket(0,140,640,340, this.game),
			new Bucket(640,140,640,340, this.game)
		]

		this.cards = [];

		for (var i = 0; i < 10; ++i){
			this.cards.push(new Card(this, i));
		}

		this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR).onDown.add(this.startNextTemplate, this);

		this.buildTemplateGUI();
		this.startNextTemplate();
	},

	startPreviousTemplate: function(){
		if (this.currentTemplateIndex == 0) return;

		this.currentTemplateIndex--;

		this.clearBuckets();

		this.templateTitle.text = this.templates[this.currentTemplateIndex].title;
		this.resetCardsPosition();
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
			this.cards[i].sprite.position.x = 100 + i * 120,
			this.cards[i].sprite.position.y = 650;
		}
	},

	clearBuckets: function(){
		for (var i = 0; i < this.buckets.length; ++i){
			this.buckets[i].clear();
		}
	},

	buildTemplateGUI: function(){
		var titleBar = this.add.graphics();
		titleBar.beginFill("#0000FF", 0.4);
		titleBar.drawRect(0, 0, 1280, 140);

    this.templateTitle = this.add.text(0, 20, '', this.templateTitleStyle);
    this.templateTitle.setShadow(3, 3, 'rgba(0,0,0,0.5)', 2);
    this.templateTitle.setTextBounds(0, 00, 1280, 120);

		this.nextTemplateButton = this.add.button(this.world.centerX + 510, 20, 
																							'arrow_right_base', 
																							this.startNextTemplate, 
																							this);

		this.previousTemplateButton = this.add.button(this.world.centerX - 620, 20, 
																									'arrow_left_base', 
																									this.startPreviousTemplate, 
																									this);
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
