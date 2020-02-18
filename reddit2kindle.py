import os

from flask import Flask, request, jsonify
from flask.templating import render_template

import forms
import util
import requests
import json

app = Flask(__name__)
app.secret_key = os.urandom(24)
forms.csrf.init_app(app)


@app.route('/')
def index():
    post = forms.Submission()
    return render_template('index.html', post=post)


@app.route('/thread', methods=['POST'])
def thread():
    if util.validate_request_post(request.form) is not None:
        return jsonify(type='danger', text=util.validate_request_post(request.form))

    # do this validation client side
    post_id = request.form['submission']
    if not post_id.isnumeric():
        return jsonify(type='danger', text='That wasn\'t an HN post ID, was it?')
    try:
        post = util.get_item(post_id)
    except:
        return jsonify(type='danger', text='That wasn\'t an HN post ID, was it?')

    # IMPLEMENT THIS for posts with URLs
    #if not submission.url.startswith('https://www.reddit.com/r/'):
    #   body = util.get_content(submission.url)
    #else:
    body = util.markdown(post['text'], output_format='html5')
    title = post['title']
    author = post['by']
    address = request.form['email']
    kindle_address = request.form['kindle_address']

    comments = None
    if request.form['comments'] == 'true':
        #submission.comments.replace_more(limit=0)
        # handle no comments
        comments = util.get_comments(post['kids'], request.form['comments_style'], author)

    attachment = render_template('comments.html', title=title, body=body, author=author,
                                 comments=comments)

    status = util.send_email(address, kindle_address, attachment, title)

    if status is None:
        return jsonify(type='success', text='Success!')
    else:
        return jsonify(type='warning', text='Uh oh! Something went wrong on our end')


if __name__ == '__main__':
    app.run(debug=True)
