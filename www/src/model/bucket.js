Bucket = function(x,y,w,h,game) {
  this.rect = new Phaser.Rectangle(x,y,w,h);
  this.cardIds = [];

  var graphics = game.add.graphics();

  graphics.lineStyle(2, 0x000, 1);
  graphics.beginFill(0xAAA, 0.2);
  graphics.drawRect(x, y, w, h);

  var style = { 
    font: "bold 40px Arial", 
    fill: "#fff", 
    boundsAlignH: "center", 
    boundsAlignV: "middle" 
  };

  var copy = x < 100 ? "In":"Out";
  this.bucketText = game.add.text(0, 0, copy, style);
  this.bucketText.setShadow(3, 3, 'rgba(0,0,0,0.5)', 2);

  //  We'll set the bounds to be from x0, y100 and be 800px wide by 100px high
  this.bucketText.setTextBounds(x, y, w, h);

  style = { 
    font: "bold 15px Arial", 
    fill: "#fff", 
    boundsAlignH: "left", 
    boundsAlignV: "top" 
  };

  copy = 'Cards: 0';
  this.scoreText = game.add.text(0, 0, copy, style);

  //  We'll set the bounds to be from x0, y100 and be 800px wide by 100px high
  this.scoreText.setTextBounds(x, y, w, 30);
};

Bucket.prototype = {
  isInside: function(pos) {
    var topLeft = this.rect.topLeft;
    var bottomRight = this.rect.bottomRight;

    return pos.x > topLeft.x && pos.y > topLeft.y && pos.x < bottomRight.x && pos.y < bottomRight.y;
  },

  hasCardId: function(id) {
    return this.cardIds.indexOf(id) >= 0;
  },

  add: function(cardId){
    this.cardIds.push(cardId);
    this.updateScoreText();
  },

  remove: function(cardId){
    var index = this.cardIds.indexOf(cardId);
    if (this.hasCardId(cardId)) this.cardIds.splice(index, 1);

    this.updateScoreText();
  },

  clear: function(){
    this.cardIds = []
    this.updateScoreText();
  },

  updateScoreText: function(){
    this.scoreText.text = 'Cards: ' + this.cardIds.length;
  },

  getCardIds: function(){
    return this.cardIds;
  },

  getText: function(){
    return this.bucketText.text;
  }
}