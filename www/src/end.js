SortCards.End = function(game) {};

SortCards.End.prototype = {
  create: function() {
    this.add.tileSprite(0, 0, 1280, 800, 'background');

    video = this.add.video('end_video');
    video.play(true);
    video.addToWorld(640,400,0.5,0.5,1,1);
  }
};