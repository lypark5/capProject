from flask import Blueprint, session, request
from flask_login import login_required, current_user
from app.models import Recipe, db, Comment, User
from app.api.aws_routes import get_unique_filename, upload_file_to_s3, remove_file_from_s3
from app.forms import CreateCommentForm


comment_routes = Blueprint('comments', __name__)


@comment_routes.route('/<int:recipeId>')     # <int: converts the param to integer
@login_required
def all_comments(recipeId):
  """
  Get all comments by the recipe's id.
  """
  comments = Comment.query.filter(Comment.recipe_id == recipeId).all()    # all the comments for this recipe
  lst = []                                                                # empty list
  res = {"comments": lst}                                                 # res body gonna be this obj with key comments, value list.
  for comment in comments:                                                # for each comment of this recipe,
    user = User.query.filter(User.id == comment.user_id).first()          # user = the first user that matches with comment user id.
    new_comment = comment.to_dict()                                       # new_comment = to dicted comment object.
    user = user.to_dict()                                                 # user is now to dicted.
    new_comment["Author"] = user                                          # tacking on Author key to equal user object value to the comment.
    res["comments"].append(new_comment)                                   # so basically appending the newly formed, Author tacked on, to dicted single comment in for loop into res. lst.
  return res


@comment_routes.route('/<int:recipeId>/new', methods=["POST"])
@login_required
def create_comment(recipeId):
  """
  Create a new comment.
  """
  form = CreateCommentForm()
  form['csrf_token'].data = request.cookies['csrf_token']

  if form.validate_on_submit():
    comment_pic = form.data["comment_pic"]
    comment_pic.filename = get_unique_filename(comment_pic.filename)
    upload = upload_file_to_s3(comment_pic)
    print('create_comment uploaddddddd = ', upload)
    # return upload
  
    if "url" not in upload:               # when you request to aws, it should return a dict to u.  url is a keyword inside there.
      return {"errors": upload}

    new_comment = Comment(
      comment=form.data["comment"],
      comment_pic=upload['url'],
      user_id=current_user.id,
      recipe_id=recipeId
    )

    db.session.add(new_comment)
    db.session.commit()
    return new_comment.to_dict()

  if form.errors:
      print(form.errors)
      return {'errors': form.errors}


@comment_routes.route('/<int:id>/delete', methods=["DELETE"])
@login_required
def delete_comment(id):
  to_delete = Comment.query.get(id)
  db.session.delete(to_delete)
  db.session.commit()
  return {"Message": "Comment Deleted Successfully"}