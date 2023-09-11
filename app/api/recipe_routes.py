from flask import Blueprint, session, request
from flask_login import login_required, current_user
from app.models import Recipe, db
# from app.forms import CreateRecipeForm
# from app.forms import UpdateRecipeForm
# from app.api.aws_routes import get_unique_filename, upload_file_to_s3, remove_file_from_s3
from sqlalchemy import and_

recipe_routes = Blueprint('recipes', __name__)


@recipe_routes.route('/all')
@login_required
def all_recipes():
  """
  This is the logged-in home page. It displays all recipes of all users.
  """
  recipes = Recipe.query.all()
  # console.log('this is backend, recipes====', recipes)
  # res = [recipe.to_dict() for recipe in recipes]
  # console.log('this is backend, res====', res)
  # return {'Recipes': res}
  return {'Recipes': [recipe.to_dict() for recipe in recipes]}

@recipe_routes.route('/<int:recipeId>')         #converting the recipeId param string into an integer.
@login_required
def recipe_details(recipeId):
  """
  Query for a specific recipe by id and return that recipe in a dictionary.
  """
  recipe = Recipe.query.get(recipeId)
  return recipe.to_dict()

@recipe_routes.route('/delete/<int:recipeId>', methods=['DELETE'])
@login_required
def delete_recipe(recipeId):
  """
  Delete a specific recipe.
  """
  to_delete = Recipe.query.get(recipeId)
  db.session.delete(to_delete)
  db.session.commit()
  return {"Message": "Recipe Deleted Successfully"}