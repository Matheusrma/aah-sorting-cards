
Bucket = function(x, bucketText, game) {
  this.cards = [];
  this.game = game;
  this.radius = Bucket.imageDiameter / 2;
  this.y = 140 + this.radius;
  this.x = x + this.radius;

  /* Bucket sprite */
  this.bucketSprite = game.add.sprite(this.x, this.y, 'bucket');
  /* Resize the sprite */
  this.bucketSprite.scale.setTo(Bucket.originalScale, Bucket.originalScale);
  this.bucketSprite.anchor.setTo(0.5, 0.5);

  var bucketTextStyle = {
    font: "bold 40px Arial",
    fill: "#fff",
    boundsAlignH: "center",
    boundsAlignV: "middle",
    wordWrap: true,
    wordWrapWidth: 7*this.radius/4
  };
  var text = game.add.text(0, 0, bucketText, bucketTextStyle);
  text.setShadow(3, 3, 'rgba(0,0,0,0.5)', 2);
  text.setTextBounds(this.x-7*this.radius/8, this.y-7*this.radius/8, 7*this.radius/4, 7*this.radius/4);

  var scoreStyle = {
    font: "bold 15px Arial",
    fill: "#fff",
    boundsAlignH: "left",
    boundsAlignV: "top"
  };

  copy = 'Cards: 0';
  this.scoreText = game.add.text(0, 0, copy, scoreStyle);
  //this.scoreText.setTextBounds(x, y, w, 30);
};

Bucket.originalScale = 0.7;
/* Diameter of the buckets */
Bucket.imageDiameter = 0;

Bucket.imageWidth = 388;

Bucket.createBuckets = function(game, bucketTexts) {
  var totalNumOfBuckets = bucketTexts.length;
  Bucket.imageDiameter = Bucket.imageWidth * Bucket.originalScale; // 388x388 is the size of the image
  var buckets = [];
  var emptySpace = SortCards.SCREEN_SIZE - totalNumOfBuckets * Bucket.imageDiameter;
  if (emptySpace < 0) {
    Bucket.originalScale = Bucket.originalScale - 0.05;
    return Bucket.createBuckets(game, totalNumOfBuckets);
  }
  var spacingBetweenBuckets = emptySpace / (totalNumOfBuckets + 1);
  var bucketSpace = spacingBetweenBuckets + Bucket.imageDiameter;
  for(var i =0; i < totalNumOfBuckets; i++) {
    buckets.push(new Bucket(spacingBetweenBuckets + bucketSpace*i, bucketTexts[i], game));
  }
  return buckets;
};

Bucket.prototype = {
  isInside: function(pos) {
    // Using formulae - (x - h)2 + (y - k)2 = r2
    return Math.sqrt((pos.x-this.x)*(pos.x-this.x) + (pos.y-this.y)*(pos.y-this.y)) < this.radius;
  },

  scaleUp: function(event) {
    if (this.bucketSprite.scale.x != Bucket.originalScale) {
      // Already scaled up.
      return;
    }
    this.bucketSprite.loadTexture('bucket_selected');
    var scale = Bucket.originalScale * 1.5;
    this.game.add.tween(
        this.bucketSprite.scale).to( { x: scale, y: scale },
        250, Phaser.Easing.Linear.None, true);
  },

  scaleDown: function(event) {
    if (this.bucketSprite.scale === this.bucketSprite.originalScale) {
      return;
    }
    this.bucketSprite.loadTexture('bucket');
    this.game.add.tween(
        this.bucketSprite.scale).to( { x: Bucket.originalScale, y: Bucket.originalScale },
        250, Phaser.Easing.Linear.None, true);
  },

  hasCardId: function(id) {
    return this.cards.indexOf(id) >= 0;
  },

  add: function(cardId){
    this.cards.push(cardId);
    this.updateScoreText();
  },

  remove: function(cardId){
    var index = this.cards.indexOf(cardId);
    if (this.hasCardId(cardId)) this.cards.splice(index, 1);

    this.updateScoreText();
  },

  clear: function(){
    this.cards = [];
    this.updateScoreText();
  },

  updateScoreText: function(){
    this.scoreText.text = 'Cards: ' + this.cards.length;
  }
};