import os
import re
import smtplib
from configparser import ConfigParser
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

import praw
import requests
from markdown import markdown

import json


# combine these 2 functions
# clean up comment vs comment_id usage - doing a double GET right now

def to_html_numbers(comment_id, op):
    comment = get_item(comment_id)
    result = markdown(comment['text']) + \
             ('<footer class="op">' if comment['by'] == op else '<footer>') + \
             comment['by'] + '</footer>'

    if 'kids' not in comment:
        return result

    children = []
    for reply_id in comment['kids']:
        reply_result = '<li>' + to_html_numbers(reply_id, op) + '</li>'
        children.append(reply_result)
        

    result += '<ol>' + ''.join(children) + '</ol>'

    return result


# fix this and combine with above
def to_html_quotes(comment_id, op):
    result = markdown(comment['text']) + \
             ('<footer class="op">' if comment['by'] == op else '<footer>') + \
             comment['by'] + '</footer>'
    children = ['<blockquote>' + to_html_numbers(reply_id, op) + '</blockquote>' for reply_id in comment['kids'] if
                'kids' in comment]
    if children:
        result += ''.join(children)
    return result


def get_comments(comment_ids, comments_style, op):
    out = '<ol>' if comments_style == 'numbers' else ''
    for comment_id in comment_ids:
        comment = get_item(comment_id)
        if comment['by'] is not None:
            if comments_style == 'numbers':
                out += '<li>' + to_html_numbers(comment_id, op) + '</li>'
            else:
                out += '<blockquote>' + to_html_quotes(comment_id, op) + '</blockquote>'
    return out + ('</ol>' if comments_style == 'numbers' else '')


def get_auth():
    if os.path.isfile(os.path.join(os.path.dirname(__file__), 'settings.cfg')):
        config = ConfigParser()
        config.read(os.path.join(os.path.dirname(__file__), 'settings.cfg'))
        username = config.get('auth', 'username')
        password = config.get('auth', 'password')
    else:
        username = os.environ['SMTP_USERNAME']
        password = os.environ['SMTP_PASSWORD']
    return username, password


def get_smtp():
    if os.path.isfile(os.path.join(os.path.dirname(__file__), 'settings.cfg')):
        config = ConfigParser()
        config.read(os.path.join(os.path.dirname(__file__), 'settings.cfg'))
        server = config.get('smtp', 'server')
        port = config.get('smtp', 'port')
    else:
        server = os.environ['SMTP_SERVER']
        port = os.environ['SMTP_PORT']
    return server, port

def send_email(to, kindle_address, attachment, title):
    msg = MIMEMultipart()
    msg['From'] = 'hn2kindle@gmail.com'
    if kindle_address == 'free':
        msg['To'] = to + '@free.kindle.com'
    else:
        msg['To'] = to + '@kindle.com'
    title = "".join(c for c in title if c.isalnum() or c.isspace()).rstrip()
    msg['Subject'] = title

    attach = MIMEText(attachment.encode('iso-8859-1', 'xmlcharrefreplace'), 'html', 'iso-8859-1')
    attach.add_header('Content-Disposition', 'attachment',
                      filename=title + '.html')
    msg.attach(attach)

    s = smtplib.SMTP(get_smtp()[0], get_smtp()[1])

    s.starttls()
    s.login(get_auth()[0], get_auth()[1])
    s.send_message(msg)

    s.quit()


def validate_request_post(values):
    if values['submission'] is '':
        return 'You need to put a URL in!'
    if values['email'] is '':
        return 'How am I supposed to send it to you without an email address?'
    if values['kindle_address'] not in ['free', 'normal']:
        return 'Which kindle address do you want me to send to?'
    return None


def get_item(item_id):
    url = 'https://hacker-news.firebaseio.com/v0/item/' + str(item_id) + '.json'
    response = requests.get(url)
    return json.loads(response.text)


