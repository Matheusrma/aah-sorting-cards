SortCards.Preloader = function(game) {};

SortCards.Preloader.prototype = {
	preload: function() {
		for (var i = 0; i < SortCards.constants.FRUIT_COUNT; ++i){
      this.load.image('card_fruit_' + i, 'img/fruit_' + i + '.png');
    }

    for (var i = 0; i < SortCards.constants.VEGETABLE_COUNT; ++i){
      this.load.image('card_vegetable_' + i, 'img/vegetable_' + i + '.png');
    }

    for (var i = 0; i < SortCards.constants.MEAT_COUNT; ++i){
      this.load.image('card_meat_' + i, 'img/meat_' + i + '.png');
    }

    for (var i = 0; i < SortCards.constants.LEGUME_COUNT; ++i){
      this.load.image('card_legume_' + i, 'img/legume_' + i + '.png');
    }
    
    this.load.image('arrow_left_base', 'img/arrow_left_base.png');
    this.load.image('arrow_right_base', 'img/arrow_right_base.png');
    this.load.image('arrow_left_dimmed', 'img/arrow_left_dimmed.png');
    this.load.image('arrow_right_dimmed', 'img/arrow_right_dimmed.png');
    this.load.image('arrow_left_pressed', 'img/arrow_left_pressed.png');
    this.load.image('arrow_right_pressed', 'img/arrow_right_pressed.png');

    this.load.image('dot_active', 'img/dot_current.png');
    this.load.image('dot_passive', 'img/dot.png');

    this.load.image('bucket', 'img/bucket.png');
    this.load.image('bucket_selected', 'img/bucket_selected.png');

    this.load.image('background', 'img/background.png');
	},

	create: function() {
		this.game.state.start('Game');
	}
};
