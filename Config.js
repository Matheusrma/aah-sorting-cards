/**
 * This file contains the configuration used to define the game.
 */
Config = {
    TEMPLATES:
    [
        new TitleBar('Which foods are you most likely to feed your youngest child?', ProgressBar.CARD_SET_TYPE.FOOD),
        new TitleBar('Which foods are easiest to get year-round?', ProgressBar.CARD_SET_TYPE.FOOD),
        new TitleBar('Which foods are easily available to buy on the market?', ProgressBar.CARD_SET_TYPE.FOOD),
        new TitleBar('The End', ProgressBar.CARD_SET_TYPE.END),
    ],
    BUCKETS: [
      ['Like', 'Dislike', 'Love'],
      ['Nada'],
      ['1', '2', '3', '4'],
    ],
    CARDS: {
        // Type: [COUNT, IMAGE_PREFIX, IMAGE/PATH_PREFIX, CARD_POSITION]
        VEGETARIAN: [3, 'card_vegetable_', 'img/vegetable_', 0],
        MEAT: [1, 'card_meat_', 'img/meat_', 1],
        LEGUME: [1, 'card_legume_', 'img/legume_', 2],
        FRUIT: [1, 'card_fruit_', 'img/fruit_', 3]
    }
}
