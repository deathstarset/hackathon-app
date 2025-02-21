from flask import Flask
from .extensions import db

def create_app():
    app = Flask(__name__)

    # Load configuration
    app.config.from_object('app.config.Config')

    # Initialize extensions
    db.init_app(app)

    # Register blueprints (routes)
    from . import routes
    app.register_blueprint(routes.bp)

    return app
