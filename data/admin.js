const admin = require('firebase-admin');

// Firebase projenizin yapılandırma dosyasını buraya yerleştirin
const serviceAccount = require('./meals-b43f8-firebase-adminsdk-3ut43-98228ba218.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

// Category sınıfı tanımı
class Category {
  constructor(id, title, imageUrl) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
  }
}

// Meal sınıfı tanımı
class Meal {
  constructor(
    id,
    categoryIds,
    title,
    affordability,
    complexity,
    imageUrl,
    duration,
    ingredients,
    steps,
    isGlutenFree,
    isVegan,
    isVegetarian,
    isLactoseFree
  ) {
    this.id = id;
    this.categoryIds = categoryIds;
    this.title = title;
    this.imageUrl = imageUrl;
    this.ingredients = ingredients;
    this.steps = steps;
    this.duration = duration;
    this.complexity = complexity;
    this.affordability = affordability;
    this.isGlutenFree = isGlutenFree;
    this.isVegan = isVegan;
    this.isVegetarian = isVegetarian;
    this.isLactoseFree = isLactoseFree;
  }
}

// Verilerinizi buraya yapıştırın
// Örnek:
const categories = [new Category('c1', 'Italian Cuisine', 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/Spaghetti_vongole_2.jpg/230px-Spaghetti_vongole_2.jpg'),
new Category('c2', 'Snacks','https://i.nefisyemektarifleri.com/2018/05/02/kolay-tepsi-kumpiri-videolu-tarif-600x400.jpg'),
new Category('c3', 'Turkish Cuisine', 'https://mediap.flypgs.com/awh/1254/836/files/Sehirler-long-tail/Adana/adana-kebap.webp'),
new Category('c4', 'Fish', 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ed/Gurame_asam_pedas.jpg/150px-Gurame_asam_pedas.jpg'),
new Category('c5', 'Salad Types','https://www.allrecipes.com/thmb/mX8qiClNTpGmWkmBRbleZzDLE40=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/cobb-salad-1aad9a3839fc480a997cd4b8547809c7.jpeg'),
new Category('c6', 'Desserts', 'https://img.delicious.com.au/3elrK5g_/del/2023/11/cheats-pine-lime-and-caramel-ice-cream-parfaits-201069-2.jpg'),
new Category('c7', 'Gluten Free', 'https://www.coeliac.org.uk/public/images/medium_istock-478892144.png'),
new Category('c8', 'Eastern Foods', 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/Food_in_Israel.jpg/220px-Food_in_Israel.jpg'),
new Category('c9', 'Soups', 'https://safe.org.nz/wp-content/uploads/2019/09/Screen-Shot-2020-04-16-at-1.59.11-PM.png'),
new Category('c10', 'Detoxes', 'https://static.toiimg.com/photo/76152311.cms')];
const meals = [
    new Meal(
      'm1',
      ['c1'],
      'Spaghetti with Tomato Sauce',
      'affordable',
      'simple',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Spaghetti_Bolognese_mit_Parmesan_oder_Grana_Padano.jpg/800px-Spaghetti_Bolognese_mit_Parmesan_oder_Grana_Padano.jpg',
      20,
      [
        '4 Tomatoes',
        '1 Tablespoon of Olive Oil',
        '1 Onion',
        '250g Spaghetti',
        'Spices',
        'Cheese (optional)'
      ],
      [
        'Cut the tomatoes and the onion into small pieces.',
        'Boil some water - add salt to it once it boils.',
        'Put the spaghetti into the boiling water - they should be done in about 10 to 12 minutes.',
        'In the meantime, heaten up some olive oil and add the cut onion.',
        'After 2 minutes, add the tomato pieces, salt, pepper and your other spices.',
        'The sauce will be done once the spaghetti are.',
        'Feel free to add some cheese on top of the finished dish.'
      ],
      false,
      true,
      true,
      true
    ),
  
    new Meal(
      'm13',
      ['c1'],
      'Margherita Pizza',
      'affordable',
      'simple',
      'https://yemek.com/_next/image/?url=https%3A%2F%2Fcdn.yemek.com%2Fmnresize%2F1250%2F833%2Fuploads%2F2022%2F03%2Fpizza-margherita-tarifi-yemekcom.jpg&w=1920&q=75',
      35,
      [
        '1 pizza dough (store-bought or homemade)',
        '1/2 cup tomato sauce',
        '1 1/2 cups shredded mozzarella cheese',
        'Fresh basil leaves',
        '2 tablespoons olive oil',
        'Salt and pepper to taste'
      ],
      [
        'Preheat your oven to the highest temperature it can go (usually around 500°F or 260°C).',
        'Roll out the pizza dough on a floured surface into your desired pizza shape.',
        'Transfer the rolled-out dough to a pizza stone or a baking sheet.',
        'Spread the tomato sauce evenly over the dough, leaving a small border for the crust.',
        'Sprinkle the shredded mozzarella cheese on top of the tomato sauce.',
        'Tear fresh basil leaves and scatter them over the cheese.',
        'Drizzle olive oil over the pizza and season with salt and pepper.',
        'Place the pizza in the preheated oven and bake for about 10-12 minutes, or until the crust is golden and the cheese is bubbly and slightly browned.',
        'Remove from the oven, let it cool for a minute, slice, and serve hot.',
      ],
      false,
      true,
      true,
      true
    ),
  
    new Meal(
      'm14',
      ['c1'],
      'Risotto alla Milanese',
      'affordable',
      'simple',
      'https://i.lezzet.com.tr/images-xxlarge-recipe/risotto-alla-milonese-561de3ee-a5fa-4798-a39b-7e4379221c55.jpg',
      35,
      [
        '1 cup Arborio rice',
        '1/2 cup dry white wine',
        '4 cups chicken or vegetable broth',
        '1 small onion, finely chopped',
        '2 tablespoons unsalted butter',
        '2 tablespoons olive oil',
        '1/2 teaspoon saffron threads',
        '1/2 cup grated Parmesan cheese',
        'Salt and pepper to taste',
      ],
      [
        'In a small bowl, dissolve the saffron threads in the white wine and set it aside.',
        'In a large skillet or saucepan, heat the olive oil and 1 tablespoon of butter over medium heat.',
        'Add the finely chopped onion and sauté until translucent.',
        'Stir in the Arborio rice and cook for about 2 minutes, making sure the rice is well coated with the oil and butter.',
        'Pour in the saffron-infused white wine and cook until the wine is mostly absorbed by the rice.',
        'Begin adding the chicken or vegetable broth, one ladle at a time, stirring constantly and allowing each ladle to be absorbed before adding more. Continue this process until the rice is creamy and cooked to your desired level of doneness (usually about 18-20 minutes).',
        'Remove the risotto from the heat and stir in the remaining tablespoon of butter and grated Parmesan cheese.',
        'Season with salt and pepper to taste.',
        'Serve the Risotto alla Milanese hot, garnished with additional Parmesan cheese if desired.',
      ],
      false,
      true,
      true,
      true
    ),
  
    new Meal(
      'm2',
      ['c2', 'c10'],
      'Guacamole',
      'affordable',
      'simple',
      'https://yemek.com/_next/image/?url=https%3A%2F%2Fcdn.yemek.com%2Fmnresize%2F1250%2F833%2Fuploads%2F2014%2F09%2Fguacamole-sos-sunum-yemekcom.jpg&w=1920&q=75',
      10,
      [
        '2 ripe avocados',
        '1 large tomato (diced)',
        '1/2 onion (finely chopped)',
        '2 cloves of garlic (minced)',
        'Juice of 1 lemon',
        'Salt and pepper',
        'Hot pepper (optional)',
      ],
      [
        'Peel the avocados, remove the seeds, and place them in a bowl.',
        'Mash the avocados with a fork until they are smooth.',
        'Add the diced tomato, finely chopped onion, and minced garlic.',
        'Squeeze the lemon juice into the mixture.',
        'Season with salt, pepper, and optional hot pepper to taste.',
        'Let the guacamole sit for a moment, then serve it with tortilla chips or vegetables.',
      ],
      false,
      false,
      false,
      false
    ),
  
    new Meal(
      'm15',
      ['c2', 'c10'],
      'Hummus',
      'affordable',
      'simple',
      'https://cdn.loveandlemons.com/wp-content/uploads/2019/09/hummus.jpg',
      10,
      [
        '1 can of chickpeas (with liquid)',
        '2 tablespoons of tahini (sesame paste)',
        '2 cloves of garlic (minced)',
        '2 tablespoons of olive oil',
        '2 tablespoons of lemon juice',
        'Salt and cumin',
        'Red pepper flakes and fresh mint leaves (optional)',
      ],
      [
        'Place the canned chickpeas (including the liquid) in a blender or food processor.',
        'Add tahini, minced garlic, olive oil, and lemon juice.',
        'Season with salt and cumin.',
        'Blend the ingredients until the mixture becomes smooth and creamy.',
        'Transfer the hummus to a bowl, garnish with red pepper flakes and fresh mint leaves if desired.',
        'Serve hummus with bread, vegetables, or chips.',
      ],
      false,
      false,
      false,
      false
    ),
    
    new Meal(
      'm16',
      ['c2', 'c1'],
      'Mini Cheese Pizza',
      'affordable',
      'simple',
      'https://mojo.generalmills.com/api/public/content/8yLYDUdpoEqZSZuOLMeS-Q_gmi_hi_res_jpeg.jpeg?v=d7914c84&t=466b54bb264e48b199fc8e83ef1136b4',
      15,
      [
        'Mini pizza dough or tortilla chips',
        'Pizza sauce',
        'Shredded mozzarella cheese',
        'Sliced pepperoni or sausage',
        'Freshly sliced vegetables (e.g., bell peppers, mushrooms, olives)',
        'Salt, pepper, and red pepper flakes',
      ],
      [
        'Place mini pizza dough or tortilla chips on a baking sheet.',
        'Spread pizza sauce on each dough or chip.',
        'Add shredded mozzarella cheese, sliced pepperoni or sausage, and fresh vegetables.',
        'Season with salt, pepper, and red pepper flakes.',
        'Bake in a preheated oven at 200°C (400°F) for 10-12 minutes or until the cheese melts and turns golden.',
        'Serve hot and enjoy your mini cheese pizzas!',
      ],
      false,
      false,
      false,
      false
    ),
  
  
    new Meal(
      'm3',
      ['c3'],
      'Turkish Kebabs',
      'pricey',
      'simple',
      'https://cdn.goturkiye.com/goturkey/list-of-the-types-of-turkish-kebabs1.jpg',
      45,
      [
        '500g boneless chicken or beef, cut into cubes',
        '2 tablespoons olive oil',
        '2 tablespoons plain yogurt',
        '2 cloves garlic, minced',
        '1 teaspoon paprika',
        '1 teaspoon cumin',
        'Salt and pepper to taste',
        'Skewers (wooden skewers soaked in water for 30 minutes)',
      ],
      [
        'In a bowl, mix olive oil, plain yogurt, minced garlic, paprika, cumin, salt, and pepper to create a marinade.',
        'Add the chicken or beef cubes to the marinade and coat them well. Let it marinate for at least 30 minutes.',
        'Thread the marinated meat onto the skewers.',
        'Grill the skewers on a barbecue or in the oven for 10-15 minutes or until cooked through, turning occasionally.',
        'Serve the kebabs with rice, pita bread, and a side of salad.',
      ],
      false,
      false,
      false,
      true
    ),
  
    new Meal(
      'm17',
      ['c3', 'c9'],
      'Turkish Lentil Soup',
      'pricey',
      'simple',
      'https://thishealthytable.com/wp-content/uploads/2021/09/mercimek-corbasi-720x1080.jpg',
      45,
      [
        '1 cup red lentils, rinsed and drained',
        '1 onion, finely chopped',
        '1 carrot, finely chopped',
        '1 potato, finely chopped',
        '2 cloves garlic, minced',
        '1 teaspoon ground cumin',
        '1 teaspoon paprika',
        '4 cups vegetable or chicken broth',
        'Salt and pepper to taste',
        'Olive oil for drizzling',
        'Lemon wedges for serving',
      ],
      [
        'In a large pot, heat some olive oil over medium heat.',
        'Add the chopped onion, carrot, potato, and minced garlic. Sauté for about 5 minutes or until the vegetables are tender.',
        'Add the ground cumin and paprika. Cook for another 2 minutes.',
        'Add the red lentils and vegetable or chicken broth. Bring to a boil, then reduce the heat to low and simmer for about 15-20 minutes or until the lentils are cooked through.',
        'Season with salt and pepper to taste.',
        'Serve the soup hot with a drizzle of olive oil and a lemon wedge.',
      ],
      false,
      false,
      false,
      true
    ),
  
    new Meal(
      'm18',
      ['c3', 'c6'],
      'Turkish Baklava',
      'pricey',
      'simple',
      'https://static.ticimax.cloud/cdn-cgi/image/width=435,quality=85/54612/uploads/urunresimleri/buyuk/fistikli-vegan-baklava-karakoy-gulluog-dae-e4.jpg',
      75,
      [
        '1 package of phyllo pastry sheets',
        '2 cups finely chopped walnuts or pistachios',
        '1 cup unsalted butter, melted',
        '1 teaspoon ground cinnamon',
        '1 cup granulated sugar',
        '1 cup water',
        '1/2 cup honey',
        '1 teaspoon vanilla extract',
      ],
      [
        'Preheat your oven to 160°C (325°F).',
        'In a bowl, mix the chopped nuts and ground cinnamon.',
        'Brush a baking dish with melted butter. Place one phyllo sheet in the dish and brush it with more melted butter.',
        'Repeat this process, layering and buttering each sheet, until youve used half of the phyllo sheets.',
        'Sprinkle a layer of the nut mixture over the phyllo sheets.',
        'Continue layering the remaining phyllo sheets, buttering each one.',
        'Cut the baklava into diamond or square shapes using a sharp knife.',
        'Bake in the preheated oven for 40-45 minutes or until its golden brown and crisp.',
        'While the baklava is baking, prepare the syrup. In a saucepan, combine sugar, water, honey, and vanilla extract. Bring to a boil, then simmer for 10 minutes.',
        'As soon as the baklava is out of the oven, pour the hot syrup evenly over it.',
        'Allow the baklava to cool and absorb the syrup. Serve once its completely cooled.',
      ],
      false,
      false,
      false,
      true
    ),
  
  
    new Meal(
      'm4',
      ['c4'],
      'Grilled Lemon Herb Salmon',
      'luxurious',
      'challenging',
      'https://www.cookingclassy.com/wp-content/uploads/2018/05/grilled-lemon-herb-salmon-7-768x1152.jpg',
      25,
      [
        '4 salmon fillets',
        '2 lemons, thinly sliced',
        '2 tablespoons olive oil',
        '2 cloves garlic, minced',
        '1 teaspoon dried oregano',
        '1 teaspoon dried thyme',
        'Salt and pepper to taste',
        'Fresh parsley for garnish',
      ],
      [
        'Preheat your grill to medium-high heat.',
        'In a bowl, combine olive oil, minced garlic, dried oregano, dried thyme, salt, and pepper.',
        'Brush both sides of the salmon fillets with the olive oil mixture.',
        'Place lemon slices on the grill and lay the salmon fillets on top.',
        'Grill for about 5-7 minutes per side or until the salmon is flaky and cooked to your liking.',
        'Garnish with fresh parsley and serve with your favorite side dishes.',
      ],
      false,
      false,
      false,
      false
    ),
  
    new Meal(
      'm19',
      ['c4'],
      'Baked Cod with Garlic and Dijon',
      'luxurious',
      'challenging',
      'https://cdn.shopify.com/s/files/1/1661/8319/files/codrecipe4_grande.jpg?v=1519244544',
      25,
      [
        '4 cod fillets',
        '4 cloves garlic, minced',
        '2 tablespoons Dijon mustard',
        '2 tablespoons olive oil',
        '1 teaspoon dried basil',
        '1 teaspoon dried parsley',
        'Salt and pepper to taste',
        'Lemon wedges for serving',
      ],
      [
        'Preheat your oven to 190°C (375°F).',
        'In a bowl, mix minced garlic, Dijon mustard, olive oil, dried basil, dried parsley, salt, and pepper.',
        'Place the cod fillets on a baking sheet lined with parchment paper.',
        'Spread the garlic-Dijon mixture evenly over the fillets.',
        'Bake for 15-20 minutes or until the fish flakes easily with a fork and turns opaque.',
        'Serve with lemon wedges for added flavor.',
      ],
      false,
      false,
      false,
      false
    ),
  
    new Meal(
      'm20',
      ['c4'],
      ' Spicy Thai-Style Grilled Tilapia',
      'luxurious',
      'challenging',
      'https://www.allrecipes.com/thmb/mjSxFE5I4nGGSHTMjB0PHJXP6aw=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/7927117-8f43838a2d3c457d9650df93cc1bd34c.jpg',
      30,
      [
        '4 tilapia fillets',
        '2 tablespoons soy sauce',
        '2 tablespoons lime juice',
        '2 tablespoons honey',
        '1 tablespoon Sriracha sauce (adjust to your desired level of spiciness)',
        '2 cloves garlic, minced',
        '1 teaspoon grated ginger',
        'Fresh cilantro for garnish',
      ],
      [
        'In a bowl, whisk together soy sauce, lime juice, honey, Sriracha sauce, minced garlic, and grated ginger to create the marinade.',
        'Place the tilapia fillets in a shallow dish and pour the marinade over them. Let them marinate for 10-15 minutes.',
        'Preheat your grill to medium-high heat.',
        'Grill the marinated tilapia fillets for about 4-5 minutes per side or until they are cooked through and have grill marks.',
        'Garnish with fresh cilantro and serve with rice or vegetables.',
      ],
      false,
      false,
      false,
      false
    ),
  
    new Meal(
      'm5',
      ['c5', 'c4'],
      'Salad with Smoked Salmon',
      'luxurious',
      'simple',
      'https://wholeandheavenlyoven.com/wp-content/uploads/2020/12/Smoked-Salmon-Salad-Right-Overhead.jpg',
      15,
      [
        'Arugula',
        "Lamb's Lettuce",
        'Parsley',
        'Fennel',
        '200g Smoked Salmon',
        'Mustard',
        'Balsamic Vinegar',
        'Olive Oil',
        'Salt and Pepper'
      ],
      [
        'Wash and cut salad and herbs',
        'Dice the salmon',
        'Process mustard, vinegar and olive oil into a dessing',
        'Prepare the salad',
        'Add salmon cubes and dressing'
      ],
      true,
      false,
      true,
      true
    ),
  
    new Meal(
      'm21',
      ['c5', 'c4', 'c10'],
      'Tuna Salad',
      'luxurious',
      'simple',
      'https://i2.wp.com/www.downshiftology.com/wp-content/uploads/2020/04/Tuna-Salad-5.jpg',
      15,
      [
        '1 can of canned tuna (in water or olive oil)',
        '2 cups of green leafy lettuce or arugula',
        '1 large tomato',
        '1 cucumber',
        '1/2 red onion',
        '1/4 cup of black olives (pitted)',
        '1/4 cup of green olives (pitted)',
        '2 tablespoons of olive oil',
        '1 tablespoon of lemon juice',
        'Salt and pepper (optional)',
      ],
      [
        'Wash and chop the green leafy lettuce or arugula and place them in a large salad bowl.',
        'Slice the tomato and add it to the salad.',
        'Peel and slice the cucumber and add it to the salad.',
        'Thinly slice the red onion into rings and add it to the salad.',
        'Add both black and green olives to the salad.',
        'Drain the canned tuna and add it to the salad,',
        'In a separate bowl, mix together the olive oil and lemon juice. You can also add salt and pepper to taste if desired,',
        'Drizzle the dressing over the salad.',
        'Carefully toss all the ingredients together, ensuring that the dressing is evenly distributed.',
        'Serve your Tuna Salad immediately and enjoy!',
      ],
      true,
      false,
      true,
      true
    ),
  
    new Meal(
      'm22',
      ['c5', 'c10', 'c1'],
      'Caesar Salad',
      'luxurious',
      'simple',
      'https://assets.bonappetit.com/photos/624215f8a76f02a99b29518f/1:1/w_960,c_limit/0328-ceasar-salad-lede.jpg',
      15,
      [
        '1 head of Romaine lettuce, torn into bite-sized pieces',
        '1/2 cup croutons',
        '1/4 cup grated Parmesan cheese',
        '1/4 cup Caesar dressing',
        '1/4 teaspoon black pepper',
        'Lemon wedges for serving (optional)',
      ],
      [
        'In a large bowl, combine torn Romaine lettuce and croutons.',
        'Drizzle Caesar dressing over the salad and toss until evenly coated.',
        'Sprinkle grated Parmesan cheese and black pepper on top.',
        'Serve with lemon wedges for an extra burst of flavor.',
        'Enjoy your classic Caesar salad!',
      ],
      true,
      false,
      true,
      true
    ),
  
    new Meal(
      'm6',
      ['c6'],
      'Chocolate Brownie',
      'affordable',
      'hard',
      'https://www.recipetineats.com/wp-content/uploads/2016/08/Brownies_0.jpg?resize=650,813',
      45,
      [
        '1 cup of butter',
        '2 cups of granulated sugar',
        '4 large eggs',
        '1/2 cup of cocoa powder',
        '1 cup of all-purpose flour',
        '1/2 cup of milk',
        '1/2 cup of chocolate chips',
        '1/2 cup of chopped walnuts (optional)',
      ],
      [
        'Melt the butter and mix it with sugar.',
        'Add the eggs and beat well.',
        'Stir in cocoa, flour, and milk.',
        'Add chocolate chips and chopped walnuts (if desired).',
        'Pour the mixture into a greased baking pan.',
        'Bake in a preheated oven at 350°F (175°C) for 25-30 minutes.',
        'Cool, cut into squares, and serve.',
      ],
      true,
      false,
      true,
      false
    ),
  
    new Meal(
      'm23',
      ['c6'],
      'Apple Pie',
      'affordable',
      'hard',
      'https://www.allrecipes.com/thmb/y4A1u56wlxTpMexUFWXQxNyZz8k=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/Screen-Shot-2022-01-30-at-8.33.07-PM-9fbdb6fefa41482d8a1dc1f56266d8fb.png',
      60,
      [
        '2 pie crusts (for the top and bottom)',
        '5-6 peeled and sliced apples',
        '1 cup of granulated sugar',
        '1/4 cup of all-purpose flour',
        '1 teaspoon of cinnamon',
        '1 tablespoon of butter',
        '1 egg (for egg wash)',
      ],
      [
        'Place one pie crust in the bottom of a pie dish.',
        'In a large bowl, mix sliced apples with sugar, flour, and cinnamon.',
        'Pour the apple mixture into the pie crust.',
        'Dot with butter.',
        'Slice the second pie crust into strips and create a lattice pattern on top.',
        'Brush with beaten egg.',
        'Bake in a preheated oven at 375°F (190°C) for 45-50 minutes.',
        'Cool, slice, and serve.',
      ],
      true,
      false,
      true,
      false
    ),
  
    new Meal(
      'm24',
      ['c6'],
      'Vanilla Ice Cream',
      'affordable',
      'hard',
      'https://www.allrecipes.com/thmb/5OpKluXrX9IDvHMbwAC9DPSkzYg=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/1293054_HowtoMakeVanillaIceCream_ChefJohnsVanillaIceCream4x3-a4ee04c60fc449beb31a2af6f6255d5e.jpg',
      240,
      [
        '2 cups of milk',
        '2 cups of heavy cream',
        '1 cup of granulated sugar',
        '1 tablespoon of vanilla extract',
        'Egg yolks (optional)',
      ],
      [
        'In a saucepan, combine milk, heavy cream, and sugar. Heat over medium heat, stirring until sugar dissolves.',
        'Once the mixture is warm, stir in the vanilla extract.',
        'Allow the mixture to cool, then refrigerate for 2-3 hours.',
        'Transfer the cooled mixture to an ice cream maker and churn according to the manufacturer is instructions.',
        'If you want to add egg yolks, mix them into the mixture before churning and follow the ice cream maker instructions.',
        'Your ice cream is ready to serve! You can garnish it with fruits, chocolate sauce, or nuts if desired.',
      ],
      true,
      false,
      true,
      false
    ),
  
    new Meal(
      'm7',
      ['c7'],
      'Gluten-Free Chicken and Rice Casserole',
      'affordable',
      'simple',
      'https://cdn.pixabay.com/photo/2018/07/10/21/23/pancake-3529653_1280.jpg',
      70,
      [
        '2 cups cooked chicken, diced',
        '1 cup cooked rice (gluten-free)',
        '1 cup frozen peas and carrots, thawed',
        '1 cup gluten-free chicken broth',
        '1 cup shredded cheddar cheese',
        '1/2 cup gluten-free mayonnaise',
        '1/2 cup gluten-free sour cream',
        '1/4 cup grated Parmesan cheese',
        '1/2 teaspoon garlic powder',
        'Salt and pepper to taste',
      ],
      [
        'Preheat your oven to 175°C.',
        'In a large mixing bowl, combine the cooked chicken, cooked rice, peas, carrots, and cheddar cheese.',
        'In a separate bowl, whisk together the chicken broth, mayonnaise, sour cream, grated Parmesan cheese, garlic powder, salt, and pepper.',
        'Pour the sauce over the chicken and rice mixture and stir until well combined.',
        'Transfer the mixture to a greased baking dish.',
        'Bake in the preheated oven for 25-30 minutes or until bubbly and golden brown.',
        'Let it cool for a few minutes before serving',
      ],
      true,
      false,
      true,
      false
    ),
    new Meal(
      'm11',
      ['c7','c5'],
      'Gluten-Free Quinoa Salad',
      'affordable',
      'simple',
      'https://lh3.googleusercontent.com/CIlLA2CUbL40-99OJktveUx0G3LPWAjZggNG45E3kD0UYIV3kCk7UzkE2OkwyCi3zuUJZgOGil8HcWY2rnMgZ6k=w320-h320-c-rw-v1-e365',
      30,
      [
        '1 cup quinoa (rinsed and drained',
        '2 cups water',
        '1 red bell pepper (diced)',
        '1 cucumber (diced)',
        '1/2 red onion (finely chopped)',
        '1/4 cup fresh parsley (chopped)',
        '1/4 cup fresh mint leaves (chopped)',
        'Juice of 2 lemons',
        '1/4 cup olive oil',
        'Salt and pepper to taste',
      ],
      [
        'In a saucepan, combine the quinoa and water. Bring to a boil, then reduce the heat to low, cover, and simmer for about 15-20 minutes, or until the quinoa is cooked and the water is absorbed.',
        'Fluff the cooked quinoa with a fork and let it cool to room temperature.',
        'In a large mixing bowl, combine the cooked quinoa, diced red bell pepper, cucumber, red onion, parsley, and mint.',
        'In a small bowl, whisk together the lemon juice, olive oil, salt, and pepper.',
        'Transfer the mixture to a greased baking dish.',
        'Drizzle the dressing over the salad and toss everything together until well combined.',
        'Serve chilled.',
      ],
      true,
      false,
      true,
      false
    ),
  
    new Meal(
      'm12',
      ['c7','c6'],
      'Gluten-Free Chocolate Chip Cookies',
      'affordable',
      'simple',
      'https://iowagirleats.com/wp-content/uploads/2020/02/One-Pot-Chicken-and-Rice-iowagirleats-Hero1.jpg',
      30,
      [
        '1 cup gluten-free all-purpose flour',
        '1/2 teaspoon baking soda',
        '1/4 teaspoon salt',
        '1/2 cup unsalted butter, softened',
        '1/2 cup granulated sugar',
        '1/2 cup brown sugar, packed',
        '1 large egg',
        'Juice of 2 lemons',
        '1 teaspoon pure vanilla extract',
        '1 cup gluten-free chocolate chips',
      ],
      [
        'Preheat your oven to 175°C and line a baking sheet with parchment paper.',
        'In a small bowl, whisk together the gluten-free flour, baking soda, and salt.',
        'In a separate large bowl, cream together the softened butter, granulated sugar, and brown sugar until light and fluffy.',
        'Beat in the egg and vanilla extract until well combined.',
        'Gradually add the dry ingredients to the wet ingredients and mix until a dough forms.',
        'Drop rounded tablespoons of dough onto the prepared baking sheet.',
        'Bake in the preheated oven for 10-12 minutes or until the edges are golden brown.',
        'Let the cookies cool on the baking sheet for a few minutes before transferring them to a wire rack to cool completely.',
      ],
      true,
      false,
      true,
      false
    ),
  
    new Meal(
      'm8',
      ['c8'],
      'Creamy Indian Chicken Curry',
      'pricey',
      'challenging',
      'https://www.allrecipes.com/thmb/SlKkRNwgfbQF2_sj8M16Kd7zmXo=/960x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/1053643-295634ecf1344093987892a016024411.jpg',
      35,
      [
        '4 Chicken Breasts',
        '1 Onion',
        '2 Cloves of Garlic',
        '1 Piece of Ginger',
        '4 Tablespoons Almonds',
        '1 Teaspoon Cayenne Pepper',
        '500ml Coconut Milk'
      ],
      [
        'Slice and fry the chicken breast',
        'Process onion, garlic and ginger into paste and sauté everything',
        'Add spices and stir fry',
        'Add chicken breast + 250ml of water and cook everything for 10 minutes',
        'Add coconut milk',
        'Serve with rice'
      ],
      true,
      false,
      false,
      true
    ),
  
    new Meal(
      'm25',
      ['c8'],
      'Sushi',
      'pricey',
      'challenging',
      'https://i.sushico.com.tr/site/products/small/1529678010_1.jpg',
      35,
      [
        'Sushi rice',
        'Sushi vinegar',
        'Seafood (e.g., salmon or tuna)',
        'Avocado',
        'Cucumber',
        'Nori seaweed sheets',
        'Soy sauce',
        'Wasabi',
        'Pickled ginger',
      ],
      [
        'Mix sushi rice with sushi vinegar and let it cool.',
        'Spread the rice on a nori sheet.',
        'Add sliced seafood, avocado, or cucumber on top.',
        'Roll it up, slice, and serve with soy sauce.',
      ],
      true,
      false,
      false,
      true
    ),
  
    new Meal(
      'm26',
      ['c8', 'c9'],
      'Pho',
      'pricey',
      'challenging',
      'https://www.unileverfoodsolutions.com.tr/dam/global-ufs/mcos/TURKEY/calcmenu/recipes/TR-recipes/general/dana-etli-vietnam-usul%C3%BC-pho-bo-%C3%A7orbas%C4%B1-soya-filizi-ve-ye%C5%9Fil-so%C4%9Fan-i%CC%87le/main-header.jpg/jcr:content/renditions/cq5dam.thumbnail.tablet.jpeg',
      35,
      [
        'Beef or chicken',
        'Rice noodles',
        'Fresh cilantro',
        'Fresh lime',
        'Bean sprouts',
        'White onion',
        'Red chili (optional)',
        'Broth',
        'Salt',
      ],
      [
        'Boil beef or chicken in water.',
        'In a separate pot, put rice noodles in boiling water and wait until soft.',
        'Combine boiling water, broth, and salt.',
        'Add sliced onions, fresh cilantro, lime juice, and red chili.',
      ],
      true,
      false,
      false,
      true
    ),
  
    new Meal(
      'm27',
      ['c8'],
      'Kung Pao Chicken',
      'pricey',
      'challenging',
      'https://www.allrecipes.com/thmb/op-yti2ZKmBCsWYtKDLyozBWxt4=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/9027-Kung-Pao-Chicken-8eeef0f719d842639b52db1c81b77d3d.jpg',
      35,
      [
        'Chicken breast',
        'Peanuts',
        'Soy sauce',
        'Sesame oil',
        'Ginger',
        'Garlic',
        'Red pepper',
        'Green onions',
        'Sichuan peppercorns',
      ],
      [
        'Slice chicken breast and sauté in a pan with sesame oil.',
        'Add chopped garlic, ginger, green onions, and red pepper.',
        'Add soy sauce, Sichuan peppercorns, and peanuts.',
        'Cook the mixture and serve hot.',
      ],
      true,
      false,
      false,
      true
    ),
  
    new Meal(
      'm9',
      ['c9','c3'],
      'Yogurt Soup',
      'affordable',
      'hard',
      'https://i.nefisyemektarifleri.com/2018/05/17/yogurt-corbasi-videolu.jpg',
      45,
      [
        '1 cup yogurt',
        '2 tablespoons all-purpose flour',
        '1 egg yolk',
        '6 cups chicken broth or water',
        '1/2 cup rice (optional)',
        '2 tablespoons butter or margarine',
        '2 cloves garlic, minced or grated',
        'Salt, to taste',
      ],
      [
        'In a bowl, combine yogurt and egg yolk. Mix well and set aside.',
        'In a large pot, melt the butter or margarine.',
        'Add minced or grated garlic and sauté until fragrant.',
        'Stir in the flour and continue to cook over low heat until it loses its raw smell.',
        'If using rice, add it to the pot and sauté for a few minutes.',
        'Slowly pour in the chicken broth or water while constantly stirring to prevent lumps.',
        'Bring the mixture to a boil and add salt to taste.',
        'If you added rice, simmer until the rice is cooked, about 15-20 minutes.',
        'Remove the pot from heat.',
        'Gradually add the yogurt and egg mixture to the soup, stirring quickly to prevent curdling.',
        'Taste the soup and adjust the salt if needed.',
       ' Serve the Yogurt Soup hot, optionally garnished with melted butter or a drizzle of mint sauce.',
      ],
      true,
      false,
      true,
      false
    ),
  
    new Meal(
      'm28',
      ['c9'],
      'Tomato Basil Soup',
      'affordable',
      'hard',
      'https://www.allrecipes.com/thmb/YdFt1QPjN3ZyuUUzoIebPjU3Hc8=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/13113-rich-and-creamy-tomato-basil-soup-DDMFS-4x3-e7bc78ff4c6b4f999f9e178d97466e6f.jpg',
      45,
      [
        '4 cups tomato juice',
        '1 can (14 oz) diced tomatoes',
        '1/4 cup fresh basil leaves',
        '2 cloves garlic, minced',
        '1/4 cup heavy cream',
        'Salt and pepper to taste',
        'Grated Parmesan cheese for garnish',
      ],
      [
        'In a blender, combine tomato juice, diced tomatoes, fresh basil, and minced garlic. Blend until smooth.',
        'Pour the mixture into a pot and heat over medium heat.',
        'Stir in heavy cream and simmer for 10-15 minutes.',
        'Season with salt and pepper to taste.',
        'Garnish with grated Parmesan cheese and extra basil leaves before serving.',
      ],
      true,
      false,
      true,
      false
    ),
  
    new Meal(
      'm29',
      ['c9'],
      'Chicken Noodle Soup',
      'affordable',
      'hard',
      'https://www.allrecipes.com/thmb/Kv-IIQBiMgIiXlVkR2vgriIV-QA=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/26460-quick-and-easy-chicken-noodle-soup-allrecipes-1x1-1-b88125437574471db3e114c40bc6928e.jpg',
      45,
      [
        '1 pound chicken breast',
        '8 cups chicken broth',
        '2 cups egg noodles',
        '1 cup chopped carrots',
        '1 cup chopped celery',
        '1 cup chopped onions',
        '2 cloves garlic, minced',
        '1 bay leaf',
        'Salt and pepper to taste',
        'Fresh parsley for garnish',
      ],
      [
        'In a large pot, combine chicken broth, chicken breast, carrots, celery, onions, garlic, and bay leaf.',
        'Bring to a boil, then reduce heat and simmer for 20-30 minutes or until chicken is cooked through.',
        'Remove chicken, shred it, and return it to the pot.',
        'Add egg noodles and cook until tender.',
        'Season with salt and pepper, garnish with fresh parsley, and serve.',
      ],
      true,
      false,
      true,
      false
    ),
  
    new Meal(
      'm10',
      ['c10'],
      ' Chicken and Broccoli Stir-Fry',
      'luxurious',
      'simple',
      'https://www.allrecipes.com/thmb/ZMQTt5wAgiGd1cLnHZEIoa6Hf-0=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/240708-chicken-broccoli-stir-fry-ddmfs-3x4-2441-3a0afb6c6a914d64919f93b4c5b53562.jpg',
      30,
      [
        '2 chicken breasts, diced',
        '2 cups broccoli florets',
        '1 large carrot, sliced',
        '1 red bell pepper, diced',
        '2 tablespoons olive oil',
        '2 cloves garlic, minced',
        'Salt and pepper to taste',
        '1 teaspoon balsamic vinegar (optional)',
      ],
      [
        'Sauté diced chicken in olive oil until cooked through.',
        'Add sliced carrots when the chicken starts to cook and stir.',
        'Add broccoli florets and red bell pepper and continue stirring.',
        'Add minced garlic, salt, and pepper, and optionally, balsamic vinegar.',
        'Cook until all ingredients are well combined and cooked through.',
      ],
      true,
      true,
      true,
      true
    ),
  
    new Meal(
      'm31',
      ['c4', 'c10'],
      'Grilled Salmon',
      'luxurious',
      'simple',
      'https://www.allrecipes.com/thmb/5bGb-f8sAQ1lUs332cymzHyVEfY=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/Screen-Shot-2022-05-20-at-2.43.04-PM-d08fcdc038804bf8be273978f1abdaa9.png',
      30,
      [
        '2 salmon fillets',
        '2 tablespoons olive oil',
        'Lemon juice',
        'Salt and pepper',
        'Fresh thyme or arugula (optional)',
      ],
      [
        'Brush salmon fillets with olive oil.',
        'Season salmon with salt, pepper, and lemon juice.',
        'Grill for about 4-5 minutes on each side or until fully cooked.',
        'Garnish with fresh thyme or arugula if desired.',
      ],
      true,
      true,
      true,
      true
    ),
  
    new Meal(
      'm30',
      ['c5', 'c10'],
      'Quinoa and Vegetable Salad',
      'luxurious',
      'simple',
      'https://lh3.googleusercontent.com/0VeFiOyg1Wvzs0Q9f9FQEtIPePkzIP-aDJXJSyxXeBa6GT7Mq1nT7N_5bVH-2adcdjW8tD-lf8VajoqVmvCEYw=w320-h320-c-rw-v1-e365',
      30,
      [
        '1 cup quinoa',
        '2 cups water or vegetable broth',
        '1 cucumber, diced',
        '1 tomato, diced',
        '1 red onion, diced',
        '1/4 cup fresh mint leaves',
        'Olive oil',
        'Lemon juice',
        'Salt and pepper',
      ],
      [
        'Rinse quinoa and cook with water or vegetable broth in a saucepan.',
        'While quinoa is cooking, dice cucumber, tomato, and red onion.',
        'Chop fresh mint leaves.',
        'Once quinoa is cooked, transfer to a large bowl and add diced vegetables.',
        'Drizzle with olive oil, lemon juice, and season with salt and pepper.',
        'Mix well to combine.',
        'Serve cold or at room temperature.',
      ],
      true,
      true,
      true,
      true
    ),
  ];

// Verilerinizi Firestore'a yükleyen fonksiyon
async function uploadDataa(categories, meals) {
    const categoriesCollection = db.collection('categories');
    const mealsCollection = db.collection('meals');
  
    // Kategorileri yükleme
    for (const category of categories) {
      try {
        await categoriesCollection.doc(category.id).set(Object.assign({}, category));
      } catch (error) {
        console.error(`Error uploading category ${category.id}: ${error.message}`);
      }
    }
  
    // Yemekleri yükleme
    for (const meal of meals) {
      try {
        await mealsCollection.doc(meal.id).set(Object.assign({}, meal));
      } catch (error) {
        console.error(`Error uploading meal ${meal.id}: ${error.message}`);
      }
    }
  
    console.log('Data uploaded successfully!');
  }
  

// Verilerinizi Firestore'a yüklemek için bu fonksiyonu çağırın
// uploadData(categories, meals).catch(console.error);

// Veritabanına bir kategori eklemek için fonksiyon
const addCategory = async (category) => {
    const categoryRef = db.collection('categories').doc(category.id);
    await categoryRef.set({
      title: category.title,
      imageUrl: category.imageUrl
    });
  };
  
  // Veritabanına bir yemek eklemek için fonksiyon
  const addMeal = async (meal) => {
    const mealRef = db.collection('meals').doc(meal.id);
    await mealRef.set({
      categoryIds: meal.categoryIds,
      title: meal.title,
      affordability: meal.affordability,
      complexity: meal.complexity,
      imageUrl: meal.imageUrl,
      duration: meal.duration,
      ingredients: meal.ingredients,
      steps: meal.steps,
      isGlutenFree: meal.isGlutenFree,
      isVegan: meal.isVegan,
      isVegetarian: meal.isVegetarian,
      isLactoseFree: meal.isLactoseFree
    });
  };
  
  // Kategorileri ve yemekleri veritabanına eklemek
  const uploadData = async () => {
    for (const category of categories) {
      await addCategory(category);
    }
  
    for (const meal of meals) {
      await addMeal(meal);
    }
  };
  
  // Veri yükleme işlemini başlat
  uploadData().then(() => {
    console.log('Veriler başarıyla yüklendi!');
  }).catch((error) => {
    console.error('Veri yükleme sırasında bir hata oluştu:', error);
  });
