from flask_wtf import FlaskForm
from wtforms import TextAreaField, SubmitField
from flask_wtf.file import FileField, FileAllowed, FileRequired
from wtforms.validators import DataRequired, Length
from app.models import Comment
from app.api.aws_routes import ALLOWED_EXTENSIONS

class CreateCommentForm(FlaskForm):
  comment = TextAreaField('Add your comment here...', validators=[DataRequired(), Length(min=3, max=255)])
  comment_pic = FileField('Choose your photo', validators=[FileAllowed(list(ALLOWED_EXTENSIONS))])
  # submit = SubmitField('Submit')