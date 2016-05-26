/**
 * Defines a progressbar object.
 * @param titles an array of {@code TitleBar}s
 */
ProgressBar = function(game, titles) {
    this.titles = titles;
    this.size = titles.length;
    this.index = -1;
    /* next button */
    this.nextButton;
    /* previous button */
    this.previousButton;
    /* Element to help render the title bar */
    this.titleBarElement;

    this.render_(game);
};

/**
 * Render the next progress bar element.
 * @return if this is the last element to render.
 */
ProgressBar.prototype.next = function() {
    if(!this.canNavigateTo(this.index+1)) return;
    this.titles[++this.index].render(this.titleBarElement);

    var isLast = !this.canNavigateTo(this.index+1);

    if (isLast) {
        this.nextButton.destroy();
    }
    return isLast;
}

ProgressBar.prototype.back = function() {
    if(!this.canNavigateTo(this.index-1)) return;
    
    this.titles[--this.index].render(this.titleBarElement);
}

ProgressBar.prototype.canNavigateTo = function(index) {
    return this.titles[index] != undefined;
}

ProgressBar.prototype.render_ = function(game) {
    game.add.tileSprite(0, 0, 1280, 800, 'background');

    this.titleBarElement = TitleBar.prepareForRendering(game);

    this.nextButton = game.add.button(game.world.centerX + 510, 20,
        'arrow_right_base',
        game.startNextTemplate,
        game);

    this.previousButton = game.add.button(game.world.centerX - 620, 20,
        'arrow_left_base',
        game.startPreviousTemplate,
        game);
}

TitleBar = function(title, cardset) {
    this.title_ = title;
    this.cardset_ = cardset;
};

TitleBar.prepareForRendering = function(game) {
    var titleBar = game.add.graphics();
    titleBar.beginFill("#0000FF", 0.4);
    titleBar.drawRect(0, 0, 1280, 140);

    var titleElement = game.add.text(0, 20, '', TitleBar.getStyle());
    titleElement.setShadow(3, 3, 'rgba(0,0,0,0.5)', 2);
    titleElement.setTextBounds(0, 00, 1280, 120);

    return titleElement;
}

TitleBar.getStyle = function() {
    return {
        font: "bold 32px Arial",
        fill: "#fff",
        boundsAlignH: "center",
        boundsAlignV: "middle"
    };
}

TitleBar.prototype.render = function(titleElement) {
    titleElement.text = this.title_;
};

var CARD_SET_TYPE = {
    FOOD: 0,
    END: 1
}