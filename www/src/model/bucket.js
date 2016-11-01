
Bucket = function(x, bucketText, game) {
  this.cards = [];
  this.game = game;
  this.radius = Bucket.imageDiameter / 2;
  this.y = 120 + this.radius;
  this.x = x + this.radius;
  this.isScaledUp = false;

  /* Bucket sprite */
  this.internalBucketGroup = game.add.group();
  game.bucketGroup.add(this.internalBucketGroup);
  this.bucketSprite = this.internalBucketGroup.create(this.x, this.y, 'bucket');
  /* Resize the sprite */
  this.bucketSprite.scale.setTo(Bucket.originalScale, Bucket.originalScale);
  this.bucketSprite.anchor.setTo(0.5, 0.5);

  var bucketTextStyle = {
    font: '24px Helvetica Neue',
    fill: "#fff",
    boundsAlignH: "center",
    boundsAlignV: "middle",
    wordWrap: true,
    wordWrapWidth: 7*this.radius/4
  };

  this.bucketText = bucketText

  var text = game.add.text(0, 0, this.bucketText, bucketTextStyle, this.internalBucketGroup);
  text.setShadow(3, 3, 'rgba(0,0,0,0.5)', 2);
  text.setTextBounds(this.x-this.radius, this.y+this.radius/8, 2*this.radius, 1.2*this.radius);

  var scoreStyle = bucketTextStyle;
  scoreStyle.font = 'bold 30px Arial';
  scoreStyle.boundsAlignH = 'left';

  this.scoreText = game.add.text(0, 0, '0', bucketTextStyle, this.internalBucketGroup);
  this.internalBucketGroup.add(this.scoreText);
  this.scoreText.setTextBounds(this.x-10, this.y - 20, 20, 50);

  // register event listeners.
  this.bucketSprite.inputEnabled = true;
  this.bucketSprite.events.onInputDown.add(this.scaleUpAndBeyond, this);
};

Bucket.originalScale = 1;
/* Diameter of the buckets */
Bucket.imageDiameter = 0;

Bucket.imageWidth = 388;

Bucket.scaledBeyond = false;

Bucket.createBuckets = function(game, bucketTexts) {
  /* Enlarged bucket sprite */
  var scaledUpBucketSprite = game.add.sprite(500, 50, 'large_bucket');
  scaledUpBucketSprite.visible = false;

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
    var bucket = new Bucket(spacingBetweenBuckets + bucketSpace*i, bucketTexts[i], game);
    bucket.scaledUp = false;
    bucket.scaledUpBucketSprite = scaledUpBucketSprite;
    buckets.push(bucket);
  }
  return buckets;
};

Bucket.isInsideDropZone = function(x, y) {
    if (x < 0 || x > 450) {
      return false;
    }
    if (y < 85 || y > 625) {
      return false;
    } 
    return true;
}

Bucket.prototype = {
  isInside: function(pos) {
    if (Bucket.scaledBeyond) {
      return false
    }
    // Using formulae - (x - h)2 + (y - k)2 = r2
    return Math.sqrt((pos.x-this.x)*(pos.x-this.x) + (pos.y-this.y)*(pos.y-this.y)) < this.radius;
  },

  scaleUpAndBeyond: function () {
    if(this.cards.length == 0) {
      // No need to scale up when there are no cards.
      return;
    }
    this.game.enlargedBucketGroup.visible = true;
    this.scaledUpBucketSprite.visible = true;
    this.scaledUpBucketSprite.bringToTop();
    this.game.bucketGroup.visible = false;
    this.game.group.visible = false;
    this.game.hideCardsWithoutBuckets();
    // show cards
    var self = this; 
    for (i = 0; i < self.cards.length; i++) {
      self.cards[i].repositionCardInScaledBeyondWindow(i);
      self.cards[i].scaleCardDownSlowly();   
    }
    Bucket.scaledBeyond = true;
  },

  scaleDownToEarth: function () {
    this.scaleDown();
    for (i = 0; i < this.cards.length; i++) {
      this.cards[i].hideCard();
    }
    this.game.bucketGroup.visible = true;
    this.game.group.visible = true;
    Bucket.scaledBeyond = false;
    this.game.enlargedBucketGroup.visible = false;
    this.scaledUpBucketSprite.visible = false;
    this.game.showCardsWithoutBuckets();
  },

  scaleUpOrDown: function () {
    if (this.isScaledUp) {
      this.scaleDown();
    } else {
      this.scaleUp();
    }
  },

  scaleUp: function() {
    //this.bucketSprite.loadTexture('bucket_selected');
    var scale = Bucket.originalScale * 1.3;
    this.game.add.tween(
        this.bucketSprite.scale).to( { x: scale, y: scale },
        250, Phaser.Easing.Linear.None, true);
    // show cards
    var self = this;    
      window.setTimeout((function() {
        for (i = 0; i < self.cards.length; i++) {
          //self.cards[i].showCard();
        }
      }), 100);
    this.isScaledUp = true;
  },

  scaleDown: function() {
    if (Bucket.scaledBeyond) {
      return;
    }
    this.bucketSprite.sendToBack();
    this.bucketSprite.loadTexture('bucket');
    this.game.add.tween(
        this.bucketSprite.scale).to( { x: Bucket.originalScale, y: Bucket.originalScale },
        250, Phaser.Easing.Linear.None, true);
    this.game.add.tween(
        this.bucketSprite).to( { x: this.x, y: this.y },
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
    if (this.scoreText.text == this.cards.length) {
      return;
    }
    y = this.scoreText.y;
    this.game.add.tween(this.scoreText)
        .to({y:this.scoreText.y-20}, 50, Phaser.Easing.Linear.NONE, true, true, true, true);
    this.scoreText.text = this.cards.length;
  },

  updateScoreTextWithoutAnimation: function(){
    this.scoreText.text = this.cards.length;
  },

  getCardIds: function(){
    return this.cards.map(function(card){return card.id});
  },

  getText: function(){
    return this.bucketText;
  },

  hide: function() {
    this.internalBucketGroup.visible = false;
  },

  show: function() {
    this.internalBucketGroup.visible = true;
  },
};
