from flask_wtf import FlaskForm
from wtforms import TextAreaField, SubmitField
from wtforms.validators import DataRequired, Length
from app.models import Comment


class EditCommentForm(FlaskForm):
  comment = TextAreaField('Add your comment here...', validators=[DataRequired(), Length(min=3, max=255)])