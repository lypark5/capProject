from flask import Blueprint, session, request
from flask_login import login_required, current_user
from app.models import Recipe, db, User
from app.forms import CreateRecipeForm
from app.forms import EditRecipeForm
from app.api.aws_routes import get_unique_filename, upload_file_to_s3, remove_file_from_s3
from sqlalchemy import and_

recipe_routes = Blueprint('recipes', __name__)


@recipe_routes.route('/all')
@login_required
def all_recipes():
  """
  This is the logged-in home page. It displays all recipes of all users.
  """
  recipes = Recipe.query.all()
  return {'Recipes': [recipe.to_dict() for recipe in recipes]}


@recipe_routes.route('/<int:recipeId>')         #converting the recipeId param string into an integer.
@login_required
def recipe_details(recipeId):
  """
  Query for a specific recipe by id and return that recipe in a dictionary.
  """
  recipe = Recipe.query.get(recipeId)
  return recipe.to_dict()


@recipe_routes.route('/new', methods=['POST'])
@login_required
def create_recipe():
  """
  Create a new recipe.
  """
  form = CreateRecipeForm()
  form['csrf_token'].data = request.cookies['csrf_token']

  if form.validate_on_submit():
    url = form.data["url"]
    url.filename = get_unique_filename(url.filename)
    upload = upload_file_to_s3(url)
  
    if "url" not in upload:
      return {"errors": upload}

    new_recipe = Recipe(
      user_id=current_user.id,
      food_name=form.data['food_name'],
      description=form.data['description'],
      url=upload['url'],
      ingredients=form.data['ingredients'],
      instructions=form.data['instructions']
    )

    db.session.add(new_recipe)
    db.session.commit()
    return new_recipe.to_dict()

  else:
    print(form.errors)
    return {'errors': form.errors}


# edit recipe with no file to update.
@recipe_routes.route('/<int:recipeId>/edit', methods=['PUT'])
@login_required
def update_recipe(recipeId):
  """
  Update a recipe by id (only text).
  """
  form = EditRecipeForm()
  form['csrf_token'].data = request.cookies['csrf_token']

  if form.validate_on_submit():
    recipe_to_edit = Recipe.query.get(recipeId)
    recipe_to_edit.food_name = form.data['food_name']
    recipe_to_edit.description = form.data['description']
    recipe_to_edit.ingredients = form.data['ingredients']
    recipe_to_edit.instructions = form.data['instructions']

    db.session.commit()
    return recipe_to_edit.to_dict()

  if form.errors:
    return {'errors': form.errors}


@recipe_routes.route('/<int:recipeId>/delete', methods=['DELETE'])
@login_required
def delete_recipe(recipeId):
  """
  Delete a specific recipe.
  """
  to_delete = Recipe.query.get(recipeId)
  db.session.delete(to_delete)
  db.session.commit()
  return {"Message": "Recipe Deleted Successfully"}


#filter all the users and take away session user for delete bookmark (list comprehension to do ur custom filter method, 
#filter out the current user that u queried)
#for create, query for the recipe, query for the user, append the user into the recipe.recipe_bookmarks.append(user)


@recipe_routes.route('/bookmark/<int:recipeId>/<int:userId>', methods=['POST'])
@login_required
def create_bookmark(recipeId, userId):
  """
  Create a bookmark of a recipe by session user.
  """
  print ("i'm in backend", recipeId, userId)
  recipe_to_bookmark = Recipe.query.get(recipeId)
  current_user = User.query.get(userId)
  recipe_to_bookmark.recipe_bookmarks.append(current_user)
  db.session.commit()
  return {"Message": "Successfully bookmarked"}

@recipe_routes.route('/<int:recipeId>/<int:userId>/unbookmark', methods=['DELETE'])
@login_required
def delete_bookmark(recipeId, userId):
  """
  Unbookmark a recipe by current user
  """
  recipe_to_unbookmark = Recipe.query.get(recipeId)
  current_user = User.query.get(userId)
  recipe_to_unbookmark.recipe_bookmarks = [user for user in recipe_to_unbookmark.recipe_bookmarks if user.id != userId]
  db.session.commit()
  return {"Message": "Successfully unbookmarked"}

@recipe_routes.route('/search', methods=['POST'])
@login_required
def search_recipe():
  """
  Query for a keyword in recipes and return the results of the search.
  """
  body = request.get_json()
  searchData = body['searchWord']
  print ('this is searchDataaaa', searchData)
  # print ('this is bodddyyyyy', body)
  chosenRecipes = Recipe.query.filter(Recipe.food_name.ilike(searchData)).all()
  # chosenRecipes = Recipe.query.filter(Recipe.food_name.lower() == body).all()
  if chosenRecipes:
    res = [recipe.to_dict() for recipe in chosenRecipes]
    return {"Recipes": res}
  else:
    return {"Message": "No recipes found with that food name"}









#############################
# @recipe_routes.route('/<int:recipeId>/edit', methods=['PUT'])
# @login_required
# def update_recipe(recipeId):
#   """
#   Update a recipe by id (form data style).
#   """
#   form = EditRecipeForm()
#   form['csrf_token'].data = request.cookies['csrf_token']

#   if form.validate_on_submit():
#     url = form.data["url"]  
#     if url is not None: 
#       url.filename = get_unique_filename(url.filename)
#       upload = upload_file_to_s3(url)
#       new_recipe = Recipe(
#         user_id=current_user.id,
#         food_name=form.data['food_name'],
#         description=form.data['description'],
#         url=upload['url'],
#         ingredients=form.data['ingredients'],
#         instructions=form.data['instructions']
#       )
#       db.session.add(new_recipe)
#       db.session.commit()
#       return new_recipe.to_dict()

#   new_recipe = Recipe(
#     user_id=current_user.id,
#     food_name=form.data['food_name'],
#     description=form.data['description'],
#     ingredients=form.data['ingredients'],
#     instructions=form.data['instructions']
#     )
#   db.session.add(new_recipe)
#   db.session.commit()
#   return new_recipe.to_dict()

#   if form.errors:
#     return {'errors': form.errors}
#############################