from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from datetime import datetime
from .bookmarks import bookmarks


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    first_name = db.Column(db.String(255), nullable=False)
    last_name = db.Column(db.String(255), nullable=False)
    email = db.Column(db.String(255), nullable=False, unique=True)
    profile_pic = db.Column(db.String(255), nullable=False)
    hashed_password = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime(), default=datetime.now())
    updated_at = db.Column(db.DateTime(), default=datetime.now())

    # relationships
    recipes = db.relationship('Recipe', back_populates='user', cascade='all, delete-orphan')        # 1 user makes many recipes.  user is parent so cascade goes here.
    comments = db.relationship('Comment', back_populates='user', cascade='all, delete-orphan')      # 1 user makes many comments.  user is parent so cascade goes here.
    user_bookmarks = db.relationship('Recipe', secondary=bookmarks, back_populates='recipe_bookmarks')

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'firstName': self.first_name,
            'lastName': self.last_name,
            'email': self.email,
            'profilePic': self.profile_pic,
            'bookmark_recipe_ids': [recipe.id for recipe in self.user_bookmarks],
            'createdAt': self.created_at,
            'updatedAt': self.updated_at
        }
