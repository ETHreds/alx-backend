#!/usr/bin/env python3
"""
2-app.py - A basic Flask application with a single route
Instantiated with Babel.

This module sets up a basic Flask application that displays a simple
welcome message on the homepage.
"""

from flask import Flask, request, render_template
from flask_babel import Babel


class Config:
    """Configuration for the Flask application and Babel."""
    LANGUAGES = ['en', 'fr']
    BABEL_DEFAULT_LOCALE = 'en'
    BABEL_DEFAULT_TIMEZONE = 'UTC'


app = Flask(__name__)

app.config.from_object(Config)

babel = Babel(app)  # Assign Babel instance to a variable


@babel.localeselector
def get_locale() -> str:
    """Determine the best match for supported languages,
    or fall back to default."""
    return request.accept_languages.best_match(app.config["LANGUAGES"]) \
    or app.config["BABEL_DEFAULT_LOCALE"]


@app.route('/')
def index() -> str:
    """
    Renders the index page.

    Returns:
        str: The rendered HTML content of the index page.
    """
    return render_template('2-index.html')


if __name__ == '__main__':
    app.run(debug=True)
