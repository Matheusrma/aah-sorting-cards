
Bucket = function(x, bucketText, game) {
  this.cards = [];
  this.game = game;
  this.radius = Bucket.imageDiameter / 2;
  this.y = 140 + this.radius;
  this.x = x + this.radius;
  this.isScaledUp = false;

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

  var scoreStyle = bucketTextStyle;
  scoreStyle.font = 'bold 30px Arial';
  scoreStyle.boundsAlignH = 'left';

  var bucketsDistance = this.radius + 40;
  var scoreBucketY = this.y + bucketsDistance;

  /* Score bucket sprite */
  this.scoreBucketSprite = game.add.sprite(this.x, scoreBucketY, 'score_bucket');
  /* Resize the sprite */
  this.scoreBucketSprite.scale.setTo(0.15, 0.15);
  this.scoreBucketSprite.anchor.setTo(0.5, 0.5);

  this.scoreText = game.add.text(0, 0, '0', bucketTextStyle);
  this.scoreText.setTextBounds(this.x-10, scoreBucketY-20, 20, 50);

  // register event listeners.
  this.bucketSprite.inputEnabled = true;
  this.scoreBucketSprite.inputEnabled = true;
  this.scoreBucketSprite.events.onInputDown.add(this.scaleUpOrDown, this);
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
  for(var i = 0; i < totalNumOfBuckets; i++) {
    buckets.push(new Bucket(spacingBetweenBuckets + bucketSpace*i, bucketTexts[i], game));
  }
  return buckets;
};

Bucket.prototype = {
  isInside: function(pos) {
    // Using formulae - (x - h)2 + (y - k)2 = r2
    return Math.sqrt((pos.x-this.x)*(pos.x-this.x) + (pos.y-this.y)*(pos.y-this.y)) < this.radius;
  },

  scaleUpOrDown: function () {
    if(this.cards.length == 0) {
      // No need to scale up when there are no cards.
      return;
    }
    if (this.isScaledUp) {
      this.scaleDown();
    } else {
      this.scaleUp();
    }
  },

  scaleUp: function() {
    if (this.isScaledUp) {
      return;
    }
    this.bucketSprite.loadTexture('bucket_selected');
    var scale = Bucket.originalScale * 1.5;
    this.game.add.tween(
        this.bucketSprite.scale).to( { x: scale, y: scale },
        250, Phaser.Easing.Linear.None, true);
    // show cards
    for (i = 0; i < this.cards.length; i++) {
      this.cards[i].setCardInABucket(i, this.x, this.y, this.radius);
      this.cards[i].showCard();
    }
    this.isScaledUp = true;
  },

  scaleDown: function() {
    if (!this.isScaledUp) {
      return;
    }
    this.bucketSprite.loadTexture('bucket');
    this.game.add.tween(
        this.bucketSprite.scale).to( { x: Bucket.originalScale, y: Bucket.originalScale },
        250, Phaser.Easing.Linear.None, true);
    // hide cards
    for (var i = 0; i < this.cards.length; i++) {
      this.cards[i].hideCard();
    }
    this.isScaledUp = false;
  },

  add: function(card){
    if (this.cards.indexOf(card)>-1) {
      return;
    }
    this.cards.push(card);
    this.updateScoreTextWithAnimation();
  },

  remove: function(card){
    var index = this.cards.indexOf(card);
    if (index < 0) {
      return;
    }
    this.cards = this.cards.slice(0,index).concat(this.cards.slice(index+1))
    this.updateScoreTextWithoutAnimation();
  },

  clear: function(){
    this.cards = [];
    this.updateScoreTextWithAnimation();
  },

  updateScoreTextWithAnimation: function(){
    y = this.scoreText.y;
    this.game.add.tween(this.scoreText)
        .to({y:this.scoreText.y-20}, 50, Phaser.Easing.Linear.NONE, true, true, true, true);
    this.scoreText.text = this.cards.length;
  },

  updateScoreTextWithoutAnimation: function(){
    this.scoreText.text = this.cards.length;
  }
};