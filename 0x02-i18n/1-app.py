#!/usr/bin/env python3
"""
1-app.py - A basic Flask application with a single route
Inatantiated with babel.

This module sets up a basic Flask application that displays a simple
welcome message on the homepage.
"""

from flask import Flask, render_template
from flask_babel import Babel


class Config:
    """Configuration for the Flask application and Babel."""
    LAMGUAGES = ['en', 'fr']
    BABEL_DEFAULT_LANGUAGE = 'en'
    BABEL_DEFAULT_TIMEZONE = 'UTC'


app = Flask(__name__)

app.config.from_object(Config)

Babel(app)


@app.route('/')
def index() -> str:
    """
    Renders the index page.

    Returns:
        str: The rendered HTML content of the index page.
    """
    return render_template('1-index.html')


if __name__ == '__main__':
    app.run(debug=True)
