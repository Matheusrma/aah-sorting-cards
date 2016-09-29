SortCards.End = function(game) {};

SortCards.End.prototype = {
  create: function() {
    this.background = this.add.tileSprite(0, 0, 1280, 800, 'background');

    this.testButton = this.game.add.button(1100, 100,
                                          'arrow_right_base',
                                          this.backToMainMenu.bind(this),
                                          this.game);

    this.end_video = this.add.video('end_video');
    this.end_video.addToWorld(640,400,0.5,0.5,0.5,0.5);
    this.end_video.play();
  },

  backToMainMenu: function(){
    this.end_video.destroy();
    this.background.destroy();
    this.game.state.start('MainMenu');
  },
};