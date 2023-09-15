from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime


class Recipe(db.Model):
  __tablename__ = 'recipes'

  if environment == "production":
    __table_args__ = {'schema': SCHEMA}

  id = db.Column(db.Integer, primary_key=True)
  user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))
  url = db.Column(db.String(255), nullable=True)
  food_name = db.Column(db.String(100), nullable=False)
  description = db.Column(db.String(1000), nullable=False)
  ingredients = db.Column(db.String(1000), nullable=False)
  instructions = db.Column(db.String(2000), nullable=False)
  created_at = db.Column(db.DateTime(), default=datetime.now())
  updated_at = db.Column(db.DateTime(), default=datetime.now())

  #relationships
  user = db.relationship('User', back_populates='recipes')                                          # 1 user makes many recipes
  comments = db.relationship('Comment', back_populates='recipe', cascade='all, delete-orphan')      # 1 recipe has many comments.  recipe is parent so cascade goes here.


  def to_dict(self):
    return {
      'id': self.id,
      'userId': self.user_id,
      'url': self.url,
      'foodName': self.food_name,
      'description': self.description,
      'ingredients': self.ingredients,
      'instructions': self.instructions,
      'createdAt': self.created_at,
      'updatedAt': self.updated_at
    }

