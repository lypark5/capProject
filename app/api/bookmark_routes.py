from flask import Blueprint, session, request
from flask_login import login_required, current_user
from sqlalchemy import and_, select
from app.models import Bookmark, db, Recipe, User

bookmark_routes = Blueprint('bookmark', __name__)


@bookmark_routes.route('/<int:userId>/all')
@login_required
def all_bookmarks(userId):
  """Display all recipes bookmarked by the user"""
  res = []
  bookmarked = Bookmark.query.filter(Bookmark.user_id == userId).all()
  for bk in bookmarked:
    recipePicUrl = Recipe.query.filter(Recipe.id == bk.recipe_id).first().to_dict()
    res.append(recipePicUrl)

  return {"bookmarkedRecipes": res}


@bookmark_routes.route('/<int:userId>/<int:recipeId>/new', methods=["POST"])
@login_required
def new_bookmark(userId, recipeId):
  """User bookmarks a recipe"""
  recipe = Recipe.query.get(recipeId)
  searchBookmark = Bookmark.query.filter(and_(Bookmark.user_id == userId, Bookmark.recipe_id == recipeId)).first()

  if not searchBookmark:
    new_bm = Bookmark(user_id = userId, recipe_id = recipeId)

    db.session.add(new_bm)
    db.session.commit()

    return {"bookmarkedRecipes": new_bm.recipe.to_dict()}

  else:
    db.session.delete(searchBookmark)
    db.session.commit()
    return {"bookmarkedRecipes": recipe.to_dict(), 'Delete':'DeleteBookmark'}