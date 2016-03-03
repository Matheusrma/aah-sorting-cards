SortCards.Game = function(game) {};

SortCards.Game.prototype = {
	create: function() {
		this.buildGUI();

		this.buckets = [
			new Bucket(0,80,640,380, this.game),
			new Bucket(640,80,640,380, this.game)
		]

		for (var i = 0; i < 10; ++i){
			new Card(this, i, 80 + i * 120, 640);
		}
	},

	buildGUI: function(){
		this.stage.backgroundColor = "#aaa";

		var titleBar = this.add.graphics();
		titleBar.beginFill("#0000FF", 1);
		titleBar.drawRect(0, 0, 1280, 80);

		var style = { font: "bold 32px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" };

    //  The Text is positioned at 0, 100
    var text = this.add.text(0, 0, "What food does your family like to eat?", style);
    text.setShadow(3, 3, 'rgba(0,0,0,0.5)', 2);

    //  We'll set the bounds to be from x0, y100 and be 800px wide by 100px high
    text.setTextBounds(0, 00, 1280, 80);
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
