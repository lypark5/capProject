from flask_wtf import FlaskForm
from wtforms import TextAreaField, SubmitField, StringField
from flask_wtf.file import FileField, FileAllowed, FileRequired
from wtforms.validators import DataRequired, Length
from app.models import Recipe
from app.api.aws_routes import ALLOWED_EXTENSIONS

class UpdateRecipeForm(FlaskForm):
  url = FileField('Choose Your Photo', validators=[FileRequired(), FileAllowed(list(ALLOWED_EXTENSIONS))])
  food_name = StringField('Add a title', validators=[DataRequired(), Length(min=3)])
  description = TextAreaField('Add a description', validators=[DataRequired(), Length(min=3, max=1000)])
  ingredients = TextAreaField('List your ingredients, separated by a comma and space between each', validators=[DataRequired(), Length(min=3, max=1000)])
  instructions = TextAreaField('Add your instructions', validators=[DataRequired(), Length(min=3, max=2000)])
  submit = SubmitField('Create a new recipe')