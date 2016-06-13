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
        'Does not like to eat.',
        'Likes to eat',
        'Loves it',
    ],
}