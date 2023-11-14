exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('ingredients')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('ingredients').insert([
        {
          id: 7,
          name: 'Ground beef',
          id_dishes: 2
        },
        {
          id: 8,
          name: 'Tortillas',
          id_dishes: 2
        },
        {
          id: 9,
          name: 'Lettuce',
          id_dishes: 2
        },
        {
          id: 10,
          name: 'Tomatoes',
          id_dishes: 2
        },
        {
          id: 11,
          name: 'Cheese',
          id_dishes: 2
        },
        {
          id: 12,
          name: 'Salsa',
          id_dishes: 2
        },
        {
          id: 13,
          name: 'Assorted vegetables (e.g., potatoes, carrots, bell peppers, peas)',
          id_dishes: 3
        },
        {
          id: 14,
          name: 'Curry paste',
          id_dishes: 3
        },
        {
          id: 15,
          name: 'Coconut milk',
          id_dishes: 3
        },
        {
          id: 16,
          name: 'Onions',
          id_dishes: 3
        },
        {
          id: 17,
          name: 'Garlic',
          id_dishes: 3
        },
        {
          id: 18,
          name: 'Ginger',
          id_dishes: 3
        },
        {
          id: 19,
          name: 'Steamed rice',
          id_dishes: 3
        },
        {
          id: 20,
          name: 'Salmon fillet',
          id_dishes: 4
        },
        {
          id: 21,
          name: 'Lemon',
          id_dishes: 4
        },
        {
          id: 22,
          name: 'Butter',
          id_dishes: 4
        },
        {
          id: 23,
          name: 'Asparagus',
          id_dishes: 4
        },
        {
          id: 24,
          name: 'Potatoes',
          id_dishes: 4
        },
        {
          id: 25,
          name: 'Olive oil',
          id_dishes: 4
        },
        {
          id: 26,
          name: 'Salt',
          id_dishes: 4
        },
        {
          id: 27,
          name: 'Pepper',
          id_dishes: 4
        },
        {
          id: 28,
          name: 'Pizza dough',
          id_dishes: 5
        },
        {
          id: 29,
          name: 'Tomatoes',
          id_dishes: 5
        },
        {
          id: 30,
          name: 'Mozzarella cheese',
          id_dishes: 5
        },
        {
          id: 31,
          name: 'Basil leaves',
          id_dishes: 5
        },
        {
          id: 32,
          name: 'Olive oil',
          id_dishes: 5
        },
        {
          id: 33,
          name: 'Salt',
          id_dishes: 5
        },
        {
          id: 34,
          name: 'Pepper',
          id_dishes: 5
        },
        {
          id: 35,
          name: 'Pork ribs',
          id_dishes: 6
        },
        {
          id: 36,
          name: 'Barbecue sauce',
          id_dishes: 6
        },
        {
          id: 37,
          name: 'Coleslaw',
          id_dishes: 6
        },
        {
          id: 38,
          name: 'Cornbread',
          id_dishes: 6
        },
        {
          id: 39,
          name: 'Shrimp',
          id_dishes: 7
        },
        {
          id: 40,
          name: 'Butter',
          id_dishes: 7
        },
        {
          id: 41,
          name: 'Garlic',
          id_dishes: 7
        },
        {
          id: 42,
          name: 'Linguine pasta',
          id_dishes: 7
        },
        {
          id: 43,
          name: 'Lemon juice',
          id_dishes: 7
        },
        {
          id: 44,
          name: 'Parsley',
          id_dishes: 7
        },
        {
          id: 45,
          name: 'Beef sirloin',
          id_dishes: 8
        },
        {
          id: 46,
          name: 'Broccoli',
          id_dishes: 8
        },
        {
          id: 47,
          name: 'Soy sauce',
          id_dishes: 8
        },
        {
          id: 48,
          name: 'Ginger',
          id_dishes: 8
        },
        {
          id: 49,
          name: 'Garlic',
          id_dishes: 8
        },
        {
          id: 50,
          name: 'Cornstarch',
          id_dishes: 8
        },
        {
          id: 51,
          name: 'Rice',
          id_dishes: 8
        },
        {
          id: 52,
          name: 'Fresh lemons',
          id_dishes: 9
        },
        {
          id: 53,
          name: 'Strawberries',
          id_dishes: 9
        },
        {
          id: 54,
          name: 'Sugar',
          id_dishes: 9
        },
        {
          id: 55,
          name: 'Water',
          id_dishes: 9
        },
        {
          id: 56,
          name: 'Ice',
          id_dishes: 9
        },
        {
          id: 57,
          name: 'Fresh mint leaves',
          id_dishes: 10
        },
        {
          id: 58,
          name: 'Lime juice',
          id_dishes: 10
        },
        {
          id: 59,
          name: 'Sugar',
          id_dishes: 10
        },
        {
          id: 60,
          name: 'White rum',
          id_dishes: 10
        },
        {
          id: 61,
          name: 'Soda water',
          id_dishes: 10
        },
        {
          id: 62,
          name: 'Ice',
          id_dishes: 10
        },
        {
          id: 63,
          name: 'Espresso',
          id_dishes: 11
        },
        {
          id: 64,
          name: 'Milk',
          id_dishes: 11
        },
        {
          id: 65,
          name: 'Caramel syrup',
          id_dishes: 11
        },
        {
          id: 66,
          name: 'Vanilla syrup',
          id_dishes: 11
        },
        {
          id: 67,
          name: 'Ice',
          id_dishes: 11
        },
        {
          id: 68,
          name: 'Black tea',
          id_dishes: 12
        },
        {
          id: 69,
          name: 'Mangoes',
          id_dishes: 12
        },
        {
          id: 70,
          name: 'Peaches',
          id_dishes: 12
        },
        {
          id: 71,
          name: 'Sugar',
          id_dishes: 12
        },
        {
          id: 72,
          name: 'Water',
          id_dishes: 12
        },
        {
          id: 73,
          name: 'Ice',
          id_dishes: 12
        },
        {
          id: 74,
          name: 'Fresh raspberries',
          id_dishes: 13
        },
        {
          id: 75,
          name: 'Lemon juice',
          id_dishes: 13
        },
        {
          id: 76,
          name: 'Sparkling water',
          id_dishes: 13
        },
        {
          id: 77,
          name: 'Sugar',
          id_dishes: 13
        },
        {
          id: 78,
          name: 'Ice',
          id_dishes: 13
        },
        {
          id: 79,
          name: 'Fresh strawberries',
          id_dishes: 14
        },
        {
          id: 80,
          name: 'Yogurt',
          id_dishes: 14
        }
      ])
    })
}
