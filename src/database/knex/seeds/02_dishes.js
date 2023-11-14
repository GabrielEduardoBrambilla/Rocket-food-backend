/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('dishes').del()
  await knex('dishes').insert([
    {
      id: 2,
      price: 9.99,
      name: 'Beef Tacos',
      image: '097ae02d29c7f62e24a3-jeswin-thomas-z_PfaGzeN9E-unsplash.jpg',
      category: 'Meal',
      description:
        'Flavorful seasoned ground beef wrapped in warm tortillas and topped with lettuce, tomatoes, cheese, and salsa.'
    },
    {
      id: 3,
      price: 12.99,
      name: 'Curry',
      image: 'f480a6888f6d168e86af-kalyani-akella-vgTntT8PmIM-unsplash.jpg',
      category: 'Meal',
      description:
        'Aromatic blend of assorted vegetables cooked in a rich and spicy curry sauce, served with steamed rice'
    },
    {
      id: 4,
      price: 16.99,
      name: 'Grilled Salmon with Lemon Butter Sauce',
      image: '8596410fb2e6ea2c11ec-salmon-lemon-garlic-sauce-1200x900.jpg',
      category: 'Meal',
      description:
        'Tender grilled salmon fillet topped with a tangy lemon butter sauce, served with roasted asparagus and mashed potatoes.'
    },
    {
      id: 5,
      price: 10.99,
      name: 'Margherita Pizza',
      image:
        'd27bff7aed7e963df264-amirali-mirhashemian-XtLPfib7OuM-unsplash.jpg',
      category: 'Meal',
      description:
        'Thin crust pizza topped with fresh tomatoes, mozzarella cheese, basil leaves, and a drizzle of olive oil.'
    },
    {
      id: 6,
      price: 18.99,
      name: 'BBQ Ribs',
      image: '8ef5ff6e2bde23991b12-jon-tyson-kctt4tL1dkE-unsplash.jpg',
      category: 'Meal',
      description:
        'Slow-cooked and tender pork ribs glazed with a tangy barbecue sauce, served with coleslaw and cornbread'
    },
    {
      id: 7,
      price: 13.99,
      name: 'Shrimp Scampi Pasta',
      image: '53f55cdfacc8796ee2fc-jon-tyson-kctt4tL1dkE-unsplash.jpg',
      category: 'Meal',
      description:
        'Succulent shrimp sautéed in garlic-infused butter, tossed with linguine pasta and a hint of lemon juice'
    },
    {
      id: 8,
      price: 11.99,
      name: 'Beef Stir-Fry with Broccoli',
      image:
        '61bcf05f64988e024cd3-delish-230510-beef-broccoli-613-rv-index-646bca228a2b3.jpg',
      category: 'Meal',
      description:
        'Sliced beef and fresh broccoli stir-fried in a savory sauce, served over steamed rice.'
    },
    {
      id: 9,
      price: 3.99,
      name: 'Strawberry Lemonade',
      image: '389b14cfaf11588ef4ca-whitney-wright-TgQkxQc-t_U-unsplash.jpg',
      category: 'Beverage',
      description:
        'Refreshing blend of freshly squeezed lemons and ripe strawberries, sweetened with a touch of sugar'
    },
    {
      id: 10,
      price: 6.99,
      name: 'Mint Mojito',
      image: '057d7367c46f31aa35d9-andrejs-sims-j8GBWTZ4GAw-unsplash.jpg',
      category: 'Beverage',
      description:
        'Cool and minty cocktail made with muddled fresh mint leaves, lime juice, sugar, and rum, topped with soda water'
    },
    {
      id: 11,
      price: 4.99,
      name: 'Iced Caramel Macchiato',
      image: '8cf60e87a38d9e716c20-nathan-dumlao-vZOZJH_xkUk-unsplash.jpg',
      category: 'Beverage',
      description:
        'Smooth and creamy iced coffee drink with a hint of caramel and a drizzle of caramel sauce on top.'
    },
    {
      id: 12,
      price: 3.99,
      name: 'Mango-Peach Iced Tea',
      image:
        'a106fa21a75fc8fd3088-food-photographer-jennifer-pallian-sSnCZlEWN5E-unsplash.jpg',
      category: 'Beverage',
      description:
        'Iced tea infused with the flavors of sweet mangoes and ripe peaches, served over ice.'
    },
    {
      id: 13,
      price: 4.99,
      name: 'Raspberry Lemon Spritzer',
      image: '748566ab7eeb6cc08835-Raspberry-Lemonade-Horizontal-3.jpg',
      category: 'Beverage',
      description:
        'Bubbly and refreshing spritzer made with fresh raspberries, lemon juice, sparkling water, and a touch of sweetness'
    },
    {
      id: 14,
      price: 5.99,
      name: 'Strawberry Smoothie',
      image: 'ea393a781360fc11a473-element5-digital-kxW731QLajM-unsplash.jpg',
      category: 'Beverage',
      description: 'Refreshing and fruity strawberry'
    },
    {
      id: 16,
      price: 7.99,
      name: 'Apple Pie',
      image: 'ff303f6da88dae0d9be0-deborah-rainford-yISrQEZjF8s-unsplash.jpg',
      category: 'Dessert',
      description:
        'Flaky and buttery crust filled with sweet and cinnamon-spiced apple slices, served with a scoop of vanilla ice cream'
    },
    {
      id: 17,
      price: 8.99,
      name: 'Crème Brûlée',
      image: '3752336133894e40e515-max-griss-DCFt4KA0EuM-unsplash.jpg',
      category: 'Dessert',
      description:
        'Creamy vanilla custard topped with a caramelized sugar crust for a delightful contrast of textures and flavors'
    },
    {
      id: 18,
      price: 7.99,
      name: 'Tiramisu',
      image: 'f476cb77940f9cf2c9fa-jay-gajjar-lGIXXpeERSM-unsplash.jpg',
      category: 'Dessert',
      description:
        'Classic Italian dessert made with layers of coffee-soaked ladyfingers and mascarpone cream, dusted with cocoa powder'
    },
    {
      id: 19,
      price: 6.99,
      name: 'New York Cheesecake',
      image: '34234860f1d28a95d577-yulia-khlebnikova-FDYbS43jUrU-unsplash.jpg',
      category: 'Dessert',
      description:
        'Creamy and luscious cheesecake bars with a sweet graham cracker crust, topped with a tangy raspberry swirl'
    },
    {
      id: 20,
      price: 6.99,
      name: 'Mango Coconut Panna Cotta',
      image: 'cbf054333ed7de2349c9-vegan-mango-pudding-feature.jpg',
      category: 'Dessert',
      description:
        'Smooth and creamy Italian dessert made with coconut milk and ripe mangoes, served with a fresh mango compote.'
    },
    {
      id: 21,
      price: 1.99,
      name: 'Chocolate Chip Cookies',
      image: 'd7778f358b4ce6aa5358-sj-YDvfndOs4IQ-unsplash.jpg',
      category: 'Dessert',
      description:
        'Homemade classic chocolate chip cookies with a soft and chewy texture and chunks of rich chocolate'
    },
    {
      id: 22,
      price: 7.99,
      name: 'Lemon Tart',
      image: 'lemon_tart_image_url.jpg',
      category: 'Dessert',
      description:
        'Tangy and sweet lemon filling in a buttery tart shell, topped with powdered sugar'
    },
    {
      id: 23,
      price: 5.99,
      name: 'Pistachio Gelato',
      image: 'pistachio_gelato_image_url.jpg',
      category: 'Dessert',
      description: 'Smooth and creamy pistachio-flavored Italian ice cream'
    }
  ])
}
