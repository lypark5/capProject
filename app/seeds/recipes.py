from app.models import db, Recipe, environment, SCHEMA
from sqlalchemy.sql import text


def seed_recipes(user):
  san_xian_noodles = Recipe(
    user_id=1, 
    recipe_bookmarks=[user[5]],
    url='https://recipe-capstone-project.s3.us-east-2.amazonaws.com/sanXianNoodles.jpg', 
    food_name='San Xian Noodles', 
    description="From the anime ''Flavors of Youth''.  I used to eat this with my grandma as a kid in Beijing.",
    ingredients='13 oz. ground chicken, ½ tsp salt, ½ tsp sugar, ¼ tsp black pepper, 2 tps corn starch, 1 Tbsp Chinese cooking wine, 1.5 tsp soy sauce, ¼ cup shiitake mushrooms, ¼ cup wood ear mushrooms, 2 Tbsp finely chopped shallot, 2 green onions, 6 cloves minced garlic, 1 tsp minced ginger, 2.5 Tbsp oil to stir-fry, 6-8 cups unsalted chicken stock, salt to taste, 1 pk rice noodles, 1 egg',
    instructions='Slice shiitake mushrooms.  Marinade ground chicken with Chinese cooking wine, soy sauce, sugar, salt, black pepper, and corn starch.  Heat up your wok and add cooking oil.  Add minced garlic, chopped white parts of the green onions, diced shallots, and minced ginger.  Sautee for a few minutes.  Add ground chicken and sautee.  Add both types of mushrooms and sautee a few more minutes.  Add chicken stock.  Bring to a boil.  Meanwhile, boil the rice noodles.  Fry an egg till crispy.  Place the noodles in the broth.  Serve with fried egg and chopped green parts of green onion.  Enjoy!'
  )
  pancakes = Recipe(
    user_id=2,
    url='https://recipe-capstone-project.s3.us-east-2.amazonaws.com/kikiPancake.jpg',
    food_name='Pancakes',
    description="From ''Kiki\'s Delivery Service''.  When I lived on my own for the first time, I made this in my room in the attic of the bakery to feed myself.",
    ingredients='1.5 cups flour, a pinch of salt, 2 Tbsp sugar, 3 tsp baking powder, 1 egg, 1 tsp vanilla extract, 1 cup milk',
    instructions='Mix dry ingredients.  In separate bowl, combine wet ingredients.  Slowly mix wet ingredients into the dry ingredients.  Stir minimally.  Let stand 3-5 minutes.  Drop 1/3 cup of batter onto a non-stick pan.  Cook over medium heat until you see bubbles.  Flip.  Serve with syrup, sausages, and cherry tomatoes.  Enjoy!'
  )
  herring_and_pumpkin_pot_pie = Recipe(
    user_id=2,
    url='https://recipe-capstone-project.s3.us-east-2.amazonaws.com/herringPie.jpg',
    food_name='Herring and Pumpkin Pot Pie',
    description="From ''Kiki\'s Delivery Service''.  I helped Granny Lou make this for her ingrate granddaughter's birthday.  If she don't want it I'll eat it fo sho.",
    ingredients='1 carrot, 1 onion, 1 kabocha squash, 10 Tbsp butter, salt + pepper, olive oil, 2 slices of herring or salmon, 2 Tbsp garlic, 400mL milk, 1Tbsp milk(for egg wash), 4 Tbsp flour, 1 cup peas, 2 cups shredded mozzarella cheese, puff pastry, 1 egg, handful of black olives for garnish',
    instructions='Dice carrot and onion.  Microwave carrots until soft.  Set aside.  Roughly chop the kabocha.  Microwave kabocha till soft.  Remove skin.  Mash kabocha.  Add 4 Tbsp of butter, salt, and pepper.  Grease baking dish with olive oil.  Add kabocha mash mixture into the dish.  Caramelize onions in oil.  Add water to prevent burning.  Spread caramelized onions over the kabocha mash.  In a pan, grill the fish with 2 Tbsp butter, garlic, salt, and pepper.  When fragrant, add milk and simmer on low heat for 10 minutes.  Set fish aside.  In a separate pot, add 4 Tbsp of butter, flour, and a pinch of salt and melt over low heat.  Now add the milk mixture bit by bit into the pot.  Add fish, carrots, peas, salt and pepper and break up the fish.  Spread this mixture over the caramelized onions in the baking dish.  Top this with shredded cheese.  Cover with puff pastry and decorate in the shape of a herring.  Coat with egg wash made from 1 egg and 1 Tbsp milk.  Garnish with black olives.  Preheat oven to 430°F.  Put dish in oven and reduce to 390°F.  Bake for 15 minutes.  Reduce to 355°F and bake for 25-30 minutes.  Enjoy!'
  )
  jakes_perfect_sandwich = Recipe(
    user_id=3,
    url='https://recipe-capstone-project.s3.us-east-2.amazonaws.com/jakeSandwichCropped.jpg',
    food_name="Jake's Perfect Sandwich",
    description="From ''Adventure Time''.  I made this and it made me cry.",
    ingredients="3 carrots (for washing only), 1 potato (for washing only), 1 bulb garlic (for washing only), 2 globe tomatoes (for washing only), 2 sprigs rosemary, 5 sprigs thyme, 1 thick ribeye steak, 1 thick french bread, cream cheese, 3 long pickle slices from my boy Prizmo, 6 pieces of dill, live bird from window, window bird's egg baby, 1 common cucumber, 1 roma tomato, 1 sweet yellow onion (organic), 4 drops of your onion tears for salt, 3 slices bacon, 1 happy live lobster",
    instructions="Get into the zone.  Play sick viola music in the background. Wash 3 carrots, 1 potato, 1 garlic, and 2 globe tomatoes.  Never use them again.  Sharpen your knife 6 times.  Put rosemary and thyme in a sous vide bag with a ribeye steak.  Sous vide at 135°F.  Cut your french bread in half and torch both sides. Spread both sides with cream cheese.  Put Prizmo pickles on one side and dill on the other. Kidnap a bird from a window and grill it.  Take its baby egg and boil it.  Slice egg and put it on the pickle side.  Put grilled bird on top of eggs.  Place 6 slices of common cucumbers, 2 slices of roma tomatoes, and 2 slices of sweet yellow onions (organic) onto the bird.  Add your onion tears onto both sides.  Take out the ribeye steak from the sous vide tank.  Add it on top of the vegetables whole.  Fry up 3 bacon slices and put them on top of the steak.  Now for the MOST IMPORTANT PART.  Boil a live lobster.  As it dies, fan the lobster's soul onto the sandwich.  Now close the sandwich.  If made correctly, it will glow.  Enjoy!"
  )
  rainy_day_ramen = Recipe(
    user_id=4,
    url='https://recipe-capstone-project.s3.us-east-2.amazonaws.com/ramen.jpeg',
    food_name='Rainy Day Ramen',
    description="From ''Ponyo''.  I made this for Ponyo and Sosuke one rainy day.  It was perfect.",
    ingredients="1 pack instant ramen, hot water, 1 egg, 1 slice thick cut ham, 1 green onion",
    instructions="Make sure it is a rainy day.  Boil an egg and slice in half.  Put aside.  In a ramen bowl that comes with lid, place the ramen patty in bowl, along with the seasoning packets.  Pour hot water into bowl.  Cover bowl for 3 minutes.  Slice ham in half and fry.  Chop green onions.  After 3 minutes, ninja throw the egg, ham, and green onions into bowl as you open the lid.  Watch the children's enchantment.  Enjoy!"
  )
  krabby_patty = Recipe(
    user_id=5,
    url='https://recipe-capstone-project.s3.us-east-2.amazonaws.com/krabbypatty.jpg',
    food_name='Krabby Patty',
    description="From ''Spongebob Squarepants''.  The Krusty Krab Patty, is the Patty for you and me...",
    ingredients='1 burger bun, butter, 1 patty ground beef, ketchup, mustard, pickles, extra onions, lettuce, cheese, tomato, secret ingredient',
    instructions="Butter the buns and grill.  Season the beef patty and grill.  Assemble bun, beef patty, ketchup, mustard, pickles, extra onions, lettuce, cheese, tomato, and secret ingredient in that order and in that order only.  Enjoy!"
  )
  chaliapin_steak_don = Recipe(
    user_id=6,
    url='https://recipe-capstone-project.s3.us-east-2.amazonaws.com/chaliapin.jpg',
    food_name='Chaliapin Steak Don',
    description="From ''Food Wars!: Shokugeki no Soma''.  This was my winning dish in the beef shokugeki against the queen of meat herself, Ikumi Mito.",
    ingredients='270g steak, 350g onion, salt + pepper, cooking oil, 2 Tbsp soy sauce, ⅓ cup red wine, 2 Tbsp unsalted butter, 70g umeboshi (japanese pickled plums), 2 cups Japanese short grain rice, 1 green onion',
    instructions="Finely score the steak on both sides, around ¼ inch apart.  Finely dice the whole onion.  Smother the steak with the onions, along with some salt.  Cover and refrigerate overnight.  The next day, take all the onions off the steak and set aside.  Season both sides of the steak with pepper.  Fry the steak in cooking oil on a pan over medium heat.  Make sure both sides have a good crust.  Let the steak rest.  Turn the heat to low and sautee the onions until edges are brown but not caramelized.  Add soy sauce and continue sauteeing until the soy sauce begins to smell toasty.  Add the red wine and simmer till the smell of alcohol leaves the dish.  Add the butter and whisk vigorously to thicken the sauce.  Finely chop up the umeboshi and mix it in evenly throughout the cooked rice.  Slice the steak.  Fill 2 bowls with the rice and top with steak slices.  Finish each bowl with a mound of onions.  Chop up the green onion and sprinkle on top of the bowls.  Enjoy!"
  )
  sumire_karaage_roll = Recipe(
    user_id=6,
    url='https://recipe-capstone-project.s3.us-east-2.amazonaws.com/karaageRoll.png',
    food_name='Sumire Karaage Roll',
    description="From ''Food Wars!: Shokugeki no Soma''.  I came up with this dish to bring business back to our dying neighborhood.  It's so good we beat out Mozuya Chicken!",
    ingredients='⅛ apple, ⅛ onion, potato starch, ¼ tsp chicken bouillon, 2 Tbsp soy sauce, 2 Tbsp sake, ½ tsp salt, ¼ tsp black pepper, ¼ tsp cayenne pepper, 100g flour, 100g rice flour, 1 tsp turmeric, 200cc coconut milk, 250cc water, 4 tsp sesame oil, cooking oil, red leaf lettuce, black pepper, 3 Tbsp hot sauce, 1 Tbsp lemon juice, 1 Tbsp fish sauce',
    instructions="Dice chicken, onion, apple into bite-sized pieces.  Put diced apple and diced onion into a food processor.  Add chicken bouillon, soy sauce, sake, salt, ¼ tsp black pepper, and cayenne pepper into the food processor and puree.  Pour the puree into a ziploc bag and add the diced chicken.  Marinate overnight in the refrigerator.  Heat frying oil to 350°F.  Lightly coat the marinated chicken with potato starch and deep-fry for 5 minutes.  Deep-fry a second time briefly.  To make the crepe batter, add the 2 types of flour and turmeric into a mixing bowl and slowly mix in the coconut milk and water.  Put cooking oil into a pan and pour ¼ of the batter into it.  Quickly spread the batter thinly across the pan and cook on low.  Once the edges start curling, put 1 tsp of sesame oil under the edges.  Flip and cook the other side briefly.  Move crepe onto a plate.  Place a lettuce leaf onto the crepe.  Add the fried chicken.  Mix hot sauce, lemon juice, and fish sauce together.  Pour sauce over chicken.  Season with black pepper.  Wrap the crepe.  Enjoy!"
  )
  char_okakiage = Recipe(
    user_id=7,
    url='https://recipe-capstone-project.s3.us-east-2.amazonaws.com/char.png',
    food_name='Char Okakiage',
    description="From ''Food Wars!: Shokugeki no Soma''.  Yukihira and I were paired up as a team and this was the dish that let us pass the course.  We used the teacher's rice crackers as the breading!",
    ingredients='2-3 filets of cod, 3.5 oz of kaki no tane crackers, black pepper, garlic powder, salt, egg, flour, frying oil, 2-3 Tbsp mayonnaise, 1-2 tsp dijon mustard',
    instructions="Pat down and dry the cod.  Grind crackers into small pieces.  Add some black pepper and garlic powder to the crackers.  Mix well.  On another plate, beat the egg.  On another plate, place the flour.  Mix in some salt into the flour.  Heat up the frying oil.  Take the cod pieces and dredge them first in flour, then egg, then cracker crumbs.  Deep fry the cod for 2-3 minutes.  Remove excess grease with paper towels.  Mix the mayo, dijon mustard, some salt and pepper together.  Serve the fish with the dipping sauce.  Enjoy!"
  )
  kikis_chocolate_cake = Recipe(
    user_id=2,
    url='https://recipe-capstone-project.s3.us-east-2.amazonaws.com/kikicake.jpg',
    food_name="Madame's Chocolate Cake",
    description="From ''Kiki\'s Delivery Service''.  Madame baked this beautiful cake for me for helping her bake the herring pie.  It brought me to tears.  I asked if I could have the recipe so I can bake this whenever I need cheering up.",
    ingredients = '1 cup sugar, ¾ cup flour (plus 2 tbsp), ¼ cup cocoa powder (plus 2 tbsp), 1 tsp baking soda, ½ tsp baking powder, ½ tsp salt, 1 egg, ½ cup buttermilk, ½ cup cooled coffee, ¼ cup vegetable oil, ½ tsp vanilla extract, ½ bag mini semi-sweet chocolate chips, ¾ cup heavy whipping cream, 4 Tbsp salted butter, 1 cup white frosting, 1 green icing pen, 1 red icing pen',
    instructions="Place your chocolate chips in a large bowl and set aside.  Cook the whipping cream and butter in a saucepan over medium heat until just boiling, stirring frequently. Pour the cream mix over the chocolate and whisk briskly until completely smooth.  Place some plastic wrap over the bowl and put it in the fridge to chill. After 1 hour, stir the mix thoroughly. Replace the cover and put the mix back in the fridge for another hour or until it reaches spreading consistency.  Preheat your oven to 350°. Thoroughly spray a 9-inch round cake pan with cooking spray or grease it with butter and flour.  Dump the sugar, flour, cocoa, baking soda, baking powder, and salt into a large bowl and whisk together.  Whisk in the egg, buttermilk, coffee, oil and vanilla. Beat the mix briskly for 2 minutes.  Pour the batter into your pan and bake for 25-30 minutes or until a toothpick inserted in the center comes out clean.  Let cool on a cooling rack.  Spread on a layer of chocolate frosting.  Let it set for 5-10 minutes.  Use a toothpick to draw out where you’ll put the decorative icing. This makes it easier to replicate the look of the cake in the movie. If you make a mistake, just use an icing knife or butter knife to smooth it out.  Pipe your decorative icing over the toothpick drawing and allow it to set for another 5-10 minutes.  Enjoy!"
  )
  bacon_pancakes = Recipe(
    user_id=3,
    url='https://recipe-capstone-project.s3.us-east-2.amazonaws.com/baconPancakes.jpg',
    food_name="Bacon Pancakes",
    description="From ''Adventure Time''.  Bacon pancakes, makin' bacon pancakes, take some bacon and I put it in a pancake, bacon pancakes, that's what it's gonna make, bacon pancakkkkkessss~~",
    ingredients="2 cups all-purpose flour, 1½ tsp baking powder, 1 tsp baking soda, 3 Tbsp sugar, ¼ tsp salt, 4 eggs, 2 cups buttermilk, ½ cup butter (melted), ⅓ lb smoked bacon",
    instructions="Cook the bacon until crispy, then dice and set aside. Combine dry pancake ingredients (flour, sugar, baking powder, baking soda, salt) in a large mixing bowl. In a separate bowl, whisk together wet ingredients (eggs, buttermilk, melted butter), then slowly add the dry ingredients until mixed thoroughly.  Heat nonstick pan over medium heat and coat with nonstick spray. Using a serving spoon, carefully place a large spoonful of batter on pan. Cook until bottom side is nicely browned, then sprinkle the crisped bacon generously onto the pancake and flip immediately to cook the other side and seal the bacon into the pancake. Serve with butter and syrup.  Enjoy!"
  )
  ratatouille = Recipe(
    user_id=10,
    url='https://recipe-capstone-project.s3.us-east-2.amazonaws.com/ratatouille.jpg',
    food_name="Ratatouille",
    description="From ''Ratatouille''.  I made this for Anton Ego, and he loved it.  This will make you think of your childhood and shed a tear.",
    ingredients="6 large roma tomatoes (divided), 2 red bell peppers (seeded and left whole), ½ cup vegetable stock, ½ cup water, 2 sprigs rosemary (picked and divided), 2 sprigs thyme (picked), 1 clove garlic, ½ small onion, 3 Tbsp olive oil (divided), 2 medium green squash, 2 medium yellow squash, 2 medium Japanese eggplants, 1 tsp kosher salt, 1 tsp freshly ground pepper, 5 leaves fresh parsley (torn)",
    instructions="Cut a small “X” into the bottom of 4 of the roma tomatoes, and prepare both a pot of boiling water and a large bowl of ice water.  Blanch the tomatoes for less than one minute, until cuts just begin to split up the sides of the tomatoes.  Remove immediately and place in the ice bath, and allow to cool completely.  Set aside.  Set a large stovetop gas burner to high, and place two bell peppers directly on the grate over the flame.  Allow to char completely before flipping, and blackening on all sides.  Remove from heat and cover with tin foil for about 5 minutes, until softened.  Peel off skins and place in a high-powered blender or food processor, along with remaining tomatoes, the picked leaves of one rosemary sprig, thyme, garlic, onion, vegetable stock, water, and 1 tablespoon olive oil.  Blend on high speed until completely smooth.  Preheat oven to 225°F.  Using a very sharp knife, cut tomatoes into ⅛ inch thick slices, and place on a parchment-lined baking sheet.  Using a mandolin, slice squash and eggplants into ⅛ inch thick slices, and stack on the baking sheet.  In a shallow roaster or casserole, pour a thin layer of the roast pepper mixture, and spread evenly.  Begin shingling vegetables on top: eggplant, followed by tomato, yellow squash, and green squash - continuing the pattern around the edge of the roaster, letting each slice stick out less than ¼ inch from underneath the following slice.  Once the outside of the roaster has been lined with vegetables, repeat another layer inside, and continue until roaster is filled with patterned vegetables.  Finely chop remaining rosemary, and sprinkle over top with 1 Tbsp olive oil, salt, and pepper.  Cut a piece of parchment paper to the size of the roaster, place on top of vegetables.  Roast for 90 minutes, removing the parchment paper during the final 20 minutes of cooking.  Once vegetables are completely softened but still hold their shape, remove from the oven.  Place a ring mold in the center of a large plate, and fill widthwise with vegetables stacked vertically.  Place a layer of vegetables staggered horizontally over top, and slowly remove ring mold.  Combine 1 Tbsp of the red pepper sauce from the bottom of the roaster with remaining olive oil, and drizzle in a circle around the outside of the vegetable stack.  Garnish with torn parsley.  Enjoy!"
  )
  vichyssoise = Recipe(
    user_id=10,
    url='https://recipe-capstone-project.s3.us-east-2.amazonaws.com/vich.png',
    food_name='Vichyssoise',
    description="From ''Ratatouille''.  Gusteau's fell in love with my cooking after they tried this delicious soup.",
    ingredients="2-3 medium leeks (whites and light green parts only; trimmed), 2 Tbsp unsalted butter, 4 cups vegetable or chicken stock, 2-3 medium russet potatoes (peeled and diced), ½ cup heavy cream (more to finish; cold), kosher salt to taste, freshly ground black pepper to taste, chopped chives",
    instructions="Cut the leeks in half and soak them in cold water for 10 minutes. Drain and pat dry, then chop into thin strips.  Melt the butter in a saucepot. Add the leeks and cook for 3-5 minutes or until softened.  Add the stock and potatoes to the pot and bring the mixture to a simmer.  Cook, uncovered, until the potatoes are tender, about 15-20 minutes.  Carefully transfer the soup to a heat-safe cylindrical container. Then, using an immersion blender, blend the soup until smooth.  Stir in the cream and season to taste with salt and pepper.  Allow the soup to cool before refrigerating until completely chilled, about 3-4 hours.  Serve with chopped chives and an additional drizzle of cream.  Enjoy!"
  )
  calzone = Recipe(
    user_id=11,
    url='https://recipe-capstone-project.s3.us-east-2.amazonaws.com/calzone.png',
    food_name='Calzone',
    description="From ''We Bare Bears''.  Ice Bear made this because the ramen taco was trash and Ice Bear could do better Ice Bear did.",
    ingredients="all-purpose flour (for dusting), 1 ball pizza dough, 12 slices pepperoni, 1 cup cubed provolone, 1 cup cubed mozzarella, 1 cup grated Parmesan, 1 egg beaten with ½ tsp water, salt and ground black pepper, extra-virgin olive oil (for drizzling), ½ onion (chopped), 1 clove garlic (crushed), 1 can (15-oz) San Marzano crushed tomatoes, ¼ cup chopped basil",
    instructions="Heat a saucepan over medium-high heat with a drizzle of oil.  Add the onions and garlic and cook for 3-4 minutes.  Add your tomatoes, season with salt and pepper and cook until the sauce begins to simmer.  Remove from heat and add the basil.  Preheat oven to 400° F.  On a large floured surface take your pizza dough and cut it into fourths. Roll out the quartered dough until it forms a circle (think mini pizzas).  Ladle on the sauce and add 3 slices of the pepperoni, ¼ cup provolone, ¼ cup mozzarella and ¼ cup Parmesan on the bottom of a dough circle. Repeat with the remaining circles.  Brush the edges of the dough with some egg wash; this will act as the glue and seal the calzones. Fold the top of the dough over the filling and press to seal.  Once all the calzones are stuffed and sealed, brush the remaining egg wash on top of the calzones, sprinkle with salt and bake until the dough is golden brown and the cheese is melted inside, 12-15 minutes.  Enjoy!"
  )
  
  db.session.add(san_xian_noodles)
  db.session.add(pancakes)
  db.session.add(herring_and_pumpkin_pot_pie)
  db.session.add(jakes_perfect_sandwich)
  db.session.add(rainy_day_ramen)
  db.session.add(krabby_patty)
  db.session.add(chaliapin_steak_don)
  db.session.add(sumire_karaage_roll)
  db.session.add(char_okakiage)
  db.session.add(kikis_chocolate_cake)
  db.session.add(bacon_pancakes)
  db.session.add(ratatouille)
  db.session.add(vichyssoise)
  db.session.add(calzone)
  db.session.commit()

def undo_recipes():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.recipes RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM recipes"))
        
    db.session.commit()
