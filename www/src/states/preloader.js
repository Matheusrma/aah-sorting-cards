SortCards.Preloader = function(game) {};

SortCards.Preloader.prototype = {
	preload: function() {
		for (var card in Config.CARDS){
            for (j = 0; j< Config.CARDS[card][0]; j++) {
                this.load.image(Config.CARDS[card][1] + j, Config.CARDS[card][2] + j + '.png');
            }
        }
    
    this.load.image('background_drop', 'img/Background_Drop.png');
    this.load.image('arrow_left_base', 'img/arrow_left_base.png');
    this.load.image('arrow_right_base', 'img/arrow_right_base.png');
    this.load.image('arrow_left_dimmed', 'img/arrow_left_dimmed.png');
    this.load.image('arrow_right_dimmed', 'img/arrow_right_dimmed.png');
    this.load.image('arrow_left_pressed', 'img/arrow_left_pressed.png');
    this.load.image('arrow_right_pressed', 'img/arrow_right_pressed.png');
    this.load.image('close_button', 'img/Close.png');

    this.load.image('dot_active', 'img/dot_current.png');
    this.load.image('dot_passive', 'img/dot.png');

    this.load.image('score_bucket', 'img/Bucket.png');
    this.load.image('bucket', 'img/Bucket.png');
    this.load.image('large_bucket', 'img/BigDropBasket.png');
    this.load.image('bucket_selected', 'img/bucket_selected.png');

    this.load.image('background', 'img/Background.png');
	this.load.video('end_video', 'video/end_video.mp4');
	},

	create: function() {
		this.game.state.start('MainMenu');
	}
};
