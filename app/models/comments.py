from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime


class Comment(db.Model):
  __tablename__='comments'

  if environment == "production":
    __table_args__ = {'schema': SCHEMA}

  id = db.Column(db.Integer, primary_key=True)
  user_id =db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))
  recipe_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('recipes.id')))
  comment = db.Column(db.String(255), nullable=False)
  comment_pic = db.Column(db.String(255))
  created_at = db.Column(db.DateTime(), default=datetime.now())
  updated_at = db.Column(db.DateTime(), default=datetime.now())

  # Relationships
  user = db.relationship('User', back_populates='comments')         # 1 user posts many comments
  recipe = db.relationship('Recipe', back_populates='comments')     # many comments on 1 recipe


  def to_dict(self):
    return {
      'id': self.id,
      'userId': self.user_id,
      'recipeId': self.recipe_id,
      'comment': self.comment,
      'commentPic': self.comment_pic,
      'createdAt': self.created_at,
      'updatedAt': self.updated_at
    }