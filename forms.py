from flask_wtf import FlaskForm
from flask_wtf.csrf import CsrfProtect
from wtforms import StringField, IntegerField, SelectField, BooleanField

csrf = CsrfProtect()


class Submission(FlaskForm):
    submission = StringField('Post ID')
    comments = BooleanField('Include comments')
    comments_style = SelectField('Comments style', choices=[('numbers', 'numbers'), ('quotes', 'quotes')])
    email = StringField('Kindle email address')
    kindle_address = SelectField('Kindle address', choices=[('normal', '@kindle.com'), ('free', '@free.kindle.com')])
