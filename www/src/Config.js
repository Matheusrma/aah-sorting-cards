/**
 * This file contains the configuration used to define the game.
 */
Config = {
    TEMPLATES:
    [
        new TitleBar('Which foods are you most likely to feed your youngest child?', ProgressBar.CARD_SET_TYPE.FOOD),
        new TitleBar('Sort the foods by how expensive they are.', ProgressBar.CARD_SET_TYPE.FOOD),
		new TitleBar('Which foods are easiest to get year-round?', ProgressBar.CARD_SET_TYPE.FOOD),
        new TitleBar('Which foods are easily available to buy on the market?', ProgressBar.CARD_SET_TYPE.FOOD),
		new TitleBar('How often do you feed these foods to your child?', ProgressBar.CARD_SET_TYPE.FOOD),
        /* new TitleBar('The End', ProgressBar.CARD_SET_TYPE.END), */
    ],
    BUCKETS: [
      ['Would feed', 'Would not feed'],
      ['Very cheap', 'Cheap', 'Expensive', 'Very expensive'],
      ['Not easy', 'Easy'],
      ['Not easy', 'Easy'],
      ['Never', 'Once a week', 'Several days a week', 'Everyday'],
    ],
    CARDS: {
        // Type: [COUNT, IMAGE_PREFIX, IMAGE/PATH_PREFIX, CARD_POSITION]
        VEGETARIAN: [16, 'card_vegetable_', 'img/vegetable_', 0],
        MEAT: [4, 'card_meat_', 'img/meat_', 1],
        LEGUME: [5, 'card_legume_', 'img/legume_', 2],
        FRUIT: [10, 'card_fruit_', 'img/fruit_', 3],
		STARCH: [6, 'card_starch_', 'img/starch_', 4]
    }
}
