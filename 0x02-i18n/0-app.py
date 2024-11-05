#!/usr/bin/env python3
"""
0-app.py - A basic Flask application with a single route.

This module sets up a basic Flask application that displays a simple
welcome message on the homepage.
"""

from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def index() -> str:
    """
    Renders the index page.

    Returns:
        str: The rendered HTML content of the index page.
    """
    return render_template('0-index.html')

if __name__ == '__main__':
    app.run(debug=True)

