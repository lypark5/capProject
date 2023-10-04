from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy import UniqueConstraint


class Bookmark(db.Model):
    __tablename__ = 'bookmarks'

    __table_args__ = (
        UniqueConstraint('user_id', 'recipe_id', name='unique_combination_constraint'),
        {'schema': SCHEMA} if environment == "production" else None,
    )

    id = db.Column(db.Integer, primary_key=True, unique=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))
    recipe_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('recipes.id')))

    users = db.relationship('User', back_populates='bookmarks')
    recipe = db.relationship('Recipe', back_populates='bookmarks')


    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.user_id,
            'recipeId': self.recipe_id
        }