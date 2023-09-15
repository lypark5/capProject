from flask import Blueprint, session, request
from flask_login import login_required, current_user
from app.models import Recipe, db
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

# @recipe_routes.route('/<int:recipeId>/edit', methods=['PUT'])
# @login_required
# def update_recipe_route(recipeId):
#   """
#   Update a recipe by id.
#   """
#   form = EditRecipeForm()
#   form['csrf_token'].data = request.cookies['csrf_token']

#   if form.validate_on_submit():
#     recipe_to_edit = Recipe.query.get(recipeId)
#     recipe_to_edit.food_name = form.data['food_name']
#     recipe_to_edit.description = form.data['description']
#     recipe_to_edit.url = form.data['url']
#     recipe_to_edit.ingredients = form.data['ingredients']
#     recipe_to_edit.instructions = form.data['instructions']

#     print('i am in backenddddddddd')

#     db.session.commit()
#     return recipe_to_edit.to_dict()

#   if form.errors:
#     return {'errors': form.errors}


@recipe_routes.route('/<int:recipeId>/edit', methods=['PUT'])
@login_required
def update_recipe_route(recipeId):
  """
  Update a recipe by id.
  """
  form = EditRecipeForm()
  form['csrf_token'].data = request.cookies['csrf_token']

  if form.validate_on_submit():
    url = form.data["url"]  
    if url is not None: 
      url.filename = get_unique_filename(url.filename)
      upload = upload_file_to_s3(url)
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

  new_recipe = Recipe(
    user_id=current_user.id,
    food_name=form.data['food_name'],
    description=form.data['description'],
    ingredients=form.data['ingredients'],
    instructions=form.data['instructions']
    )
  db.session.add(new_recipe)
  db.session.commit()
  return new_recipe.to_dict()

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