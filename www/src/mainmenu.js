SortCards.MainMenu = function(game) {};

SortCards.MainMenu.prototype = {
  create: function() {
    this.game.add.tileSprite(0, 0, 1280, 800, 'background');

    this.startButton = this.game.add.button(580, 480,
                                            'arrow_right_base',
                                            this.startGame.bind(this),
                                            this.game);

    var style = { 
      font: "bold 100px Arial", 
      fill: "#fff", 
      boundsAlignH: "center", 
      boundsAlignV: "middle"
    };

    var titleElement = this.game.add.text(0, 300, 'Sorting Cards\nPress to Start', style);
    titleElement.setShadow(3, 3, 'rgba(0,0,0,0.5)', 2);
    //titleElement.setTextBounds(0, 00, 1280, 130);
  },

  startGame: function(){
    this.game.state.start('Game');
  }
}