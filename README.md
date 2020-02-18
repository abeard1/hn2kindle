hn2kindle 
=============
[![license](https://img.shields.io/github/license/mashape/apistatus.svg)](https://opensource.org/licenses/MIT)

A web app to convert a Hacker News post and comments into an e-book, and send it directly to your kindle device or app.

Installation
============
1. Install [Python 3](https://www.python.org/downloads)
2. Install the required packages `pip install -r requirements.txt`
3. Either create a `settings.cfg` file of the format:

        [auth]
        username=johndoe@gmail.com
        password=hunter2
        [smtp]
        server=smtp.gmail.com
        port=587
or create environment variables for `SMTP_USERNAME`,`SMTP_PASSWORD`, `SMTP_SERVER`, `SMTP_PORT`.
4. Run the app `python hn2kindle.py`

Usage
=====
You need to add hn2kindle to your approved Kindle e-mail senders. To do this:

1. Visit [Manage Your Content and Devices](http://www.amazon.com/manageyourkindle) page.
2. Go to "Your Account", select "Manage Your Content and Devices" and then select "Personal Document Settings".
3. Under "Approved Personal Document E-mail List" click on "Add a new approved e-mail address".
4. Add "hn2kindle@gmail.com" and select "Add Address".
