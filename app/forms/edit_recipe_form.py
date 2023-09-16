from flask_wtf import FlaskForm
from wtforms import TextAreaField, StringField
from wtforms.validators import DataRequired, Length
from app.models import Recipe

class EditRecipeForm(FlaskForm):
  food_name = StringField('Add a title', validators=[DataRequired(), Length(min=3)])
  description = TextAreaField('Add a description', validators=[DataRequired(), Length(min=3, max=1000)])
  ingredients = TextAreaField('List your ingredients, separated by a comma and space between each', validators=[DataRequired(), Length(min=3, max=1000)])
  instructions = TextAreaField('Add your instructions', validators=[DataRequired(), Length(min=3, max=2000)])