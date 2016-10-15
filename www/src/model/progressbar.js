/**
 * Defines a progressbar object.
 * @param titles an array of {@code TitleBar}s
 */
ProgressBar = function(game, titles, buckets) {
    this.titles = titles;
    this.buckets = buckets;
    this.size = titles.length;
    this.index = -1;

    /* next button */
    this.nextButton;
    /* previous button */
    this.previousButton;
    /* Element to help render the title bar */
    this.titleBarElement;
    /* Progress dots */
    this.progressDots = [];

    this.render_(game);
};

/**
 * Size of each progress dot.
 * @const
 */
ProgressBar.DOT_SIZE_ = 12;

ProgressBar.CARD_SET_TYPE = {
    FOOD: 0,
    END: 1
};

ProgressBar.prototype = {

    /**
     * Render the next progress bar element.
     * @return if this is the last element to render.
     */
    next: function(game) {
        this.index++;
        var isLast = !this.canNavigateTo(this.index);
          
        if (!isLast) { 
            this.titles[this.index].render(this.titleBarElement);
            this.renderProgressDots(game);

            game.buckets = Bucket.createBuckets(game, this.buckets[this.index]);
        }

        return isLast;
    },
    back: function(game) {
        if(!this.canNavigateTo(this.index-1)) return;

        this.titles[--this.index].render(this.titleBarElement);
        this.renderProgressDots(game);
        
        game.buckets = Bucket.createBuckets(game, this.buckets[this.index]);
    },
    canNavigateTo: function(index) {
        return this.titles[index] != undefined;
    },
    render_: function(game) {
        game.group.add(game.make.tileSprite(0, 0, 1280, 800, 'background'));

        this.titleBarElement = TitleBar.prepareForRendering(game);

        this.nextButton = game.make.button(game.world.centerX + 510, 20,
            'arrow_right_base',
            game.startNextTemplate,
            game);
        game.group.add(this.nextButton);

        this.previousButton = game.make.button(game.world.centerX - 620, 20,
            'arrow_left_base',
            game.startPreviousTemplate,
            game);
        game.group.add(this.previousButton);

        this.next(game)
    },
    renderProgressDots: function(game) {
        var yAxis = 20;
        for (var i = 0; i< this.size; i++) {
            if (this.progressDots[i]) {
                this.progressDots[i].destroy();
            }
            /** This formulae centers the progressDots **/
            var n = (this.size - 2*i);
            var offset = ProgressBar.DOT_SIZE_ * (2*n -1) / 2;
            var xAxis = game.world.centerX - offset;
            if (i != this.index) {
                this.progressDots[i] = game.add.sprite(xAxis, yAxis, 'dot_passive');
            } else {
                this.progressDots[i] = game.add.sprite(xAxis, yAxis-2, 'dot_active');
            }
        }
    },
}

TitleBar = function(title, cardset) {
    this.title_ = title;
    this.cardset_ = cardset;
};

TitleBar.prepareForRendering = function(game) {
    var titleBar = game.add.graphics();
    titleBar.drawRect(0, 0, 1280, 130);

    var titleElement = game.add.text(0, 20, '', TitleBar.getStyle());
    titleElement.setShadow(3, 3, 'rgba(0,0,0,0.5)', 2);
    titleElement.setTextBounds(0, 00, 1280, 130);

    return titleElement;
};

TitleBar.getStyle = function() {
    return {
        font: "bold 32px Arial",
        fill: "#fff",
        boundsAlignH: "center",
        boundsAlignV: "middle"
    };
};

TitleBar.prototype = {
    render: function(titleElement) {
        titleElement.text = this.title_;
    }
};
