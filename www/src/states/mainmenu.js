SortCards.MainMenu = function(game) {};

SortCards.MainMenu.prototype = {
  create: function() {
    this.game.add.tileSprite(0, 0, 1280, 750, 'background_start');

    this.startButton = this.game.add.button(450, 450,
                                            'start',
                                            this.startGame.bind(this),
                                            this.game);
    if (!this.storageCtrl) {
      this.storageCtrl = new StorageCtrl();
    }

    var style = { 
      font: "bold 100px Arial", 
      fill: "#fff", 
      boundsAlignH: "center", 
      boundsAlignV: "middle"
    };

    this.saveButton = this.game.add.button(50, 30,
                                           'upload',
                                           this.sendSave.bind(this),
                                           this.game);

    this.saveMessage = this.game.add.text(160, 60, '', { 
      font: "bold 30px Arial", 
      fill: "#fff"
    });

    var titleElement = this.game.add.text(0, 300, 'ក្នុងព្រះវិហារអាហារ', style);
    titleElement.setShadow(3, 3, 'rgba(0,0,0,0.5)', 2);
    titleElement.setTextBounds(0, 00, 1280, 130);
  },

  sendSave: function(){
    var analytics = this.storageCtrl.recoverAllTemplateResults();

    if (!analytics || analytics.length == 0) return;

    var url = "https://script.google.com/macros/s/AKfycbyQgVp4y0JxcQO08UkpPlN3hUxESNiuaeHtQhPLZPOCbwr4pnmA/exec";
    var params = "data=" + analytics;
   
    $.ajax({
      type: "POST",
      url: url,
      data: params, 
      success: this.confirmSave.bind(this),
      error: this.confirmSave.bind(this)
    });
  },

  confirmSave: function(data, status, j){
    if (status == "success") {
      this.saveMessage.text = "Save Confirmed";
      this.storageCtrl.clearTemplateResults();
    } else {
      this.saveMessage.text = "Save Failed. Please check your internet connection !";
    }
    var msg = this.saveMessage;
    setInterval(function(){
      msg.text = "";
    },2000)
  },

  startGame: function(){
    this.game.state.start('Game');
  }
}