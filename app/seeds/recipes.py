from app.models import db, Recipe, environment, SCHEMA
from sqlalchemy.sql import text


def seed_recipes():
  san_xian_noodles = Recipe(
    user_id=1, 
    url='https://recipe-capstone-project.s3.us-east-2.amazonaws.com/sanXianNoodles.jpg', 
    food_name='San Xian Noodles', 
    description="From the anime ''Flavors of Youth''.  I used to eat this with my grandma as a kid in Beijing.",
    ingredients='1 pack rice noodles, 4 cups dashi stock, 1/4 cup ground chicken, 1/4 cup shitake mushrooms, 1/4 cup wood ear mushrooms, 1 egg, 1 green onion, 1 Tbsp soy sauce, 1 Tbsp sesame oil',
    instructions='Make dashi stock.  Season the broth.  Boil rice noodles.  Sautee ground chicken and season.  Fry an egg till crispy.  Chop up the shitake mushrooms, wood ear mushrooms, and green onions.  Sautee both types of mushrooms in soy sauce and sesame oil.  Place the noodles in the broth.  Add the fried egg, sauteed mushrooms, chicken, and green onions on top.  Enjoy!'
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
  db.session.add(san_xian_noodles)
  db.session.add(pancakes)
  db.session.add(herring_and_pumpkin_pot_pie)
  db.session.add(jakes_perfect_sandwich)
  db.session.add(rainy_day_ramen)
  db.session.add(krabby_patty)
  db.session.add(chaliapin_steak_don)
  db.session.add(sumire_karaage_roll)
  db.session.add(char_okakiage)
  db.session.commit()

def undo_recipes():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.recipes RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM recipes"))
        
    db.session.commit()
