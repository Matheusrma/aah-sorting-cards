/**
 * This file contains the configuration used to define the game.
 */
Config = {
    TEMPLATES:
    [
        new TitleBar('តើអាហារមួយណាដែលអ្នកនឹងផ្តល់ឲ្យកូនតូចជាងគេរបស់អ្នក?', ProgressBar.CARD_SET_TYPE.FOOD),
        new TitleBar('ចូររៀបអាហារទាំងនេះទៅតាមតម្លៃរបស់វា.', ProgressBar.CARD_SET_TYPE.FOOD),
    new TitleBar('តើអាហារមួយណាដែលងាយស្រួលរកបានជាងគេ ពេញមួយឆ្នាំ?', ProgressBar.CARD_SET_TYPE.FOOD),
        new TitleBar('តើអាហារមួយណាដែលងាយស្រួលទិញពីផ្សារ?', ProgressBar.CARD_SET_TYPE.FOOD),
    new TitleBar('តើអ្នកផ្តល់អាហារទាំងនេះដល់កូនញឹកញាប់យ៉ាងណាដែរ?', ProgressBar.CARD_SET_TYPE.FOOD),
        /* new TitleBar('The End', ProgressBar.CARD_SET_TYPE.END), */
    ],
    BUCKETS: [
      ['នឹងផ្តល់', 'នឹងមិនផ្តល់'],
      ['ថោកជាងគេ', 'ថោក', 'ថ្លៃ', 'ថ្លៃជាងគេ'],
      ['មិនងាយរកបាន', 'ងាយរកបាន'],
      ['មិនងាយទិញ', 'ងាយទិញ'],
      ['មិនដែលសោះ', 'ម្តងក្នុងមួយសប្តាហ៍', 'ច្រើនដងក្នុងមួយសប្តាហ៍', 'រៀងរាល់ថ្ងៃ'],
    ],
    CARDS: {
        // Type: [COUNT, IMAGE_PREFIX, IMAGE/PATH_PREFIX, CARD_POSITION]
        VEGETARIAN: [10, 'card_vegetable_', 'img/vegetable_', 0],
        FRUIT: [10, 'card_fruit_', 'img/fruit_', 1],
        STARCH: [6, 'card_starch_', 'img/starch_', 2]
    }
}
