from flask import Flask
from flask_migrate import Migrate
import secrets
from flask_cors import CORS
# from werkzeug.middleware.proxy_fix import ProxyFix
from instance.config import DevelopmentConfig


def create_token():
    return secrets.token_urlsafe(14)


def create_app(test_config=None):
    # Create Flask app
    app = Flask(__name__, instance_relative_config=True,
                static_folder='static', static_url_path='')
    # app.config.from_pyfile('config.py', silent=True)
    app.config.from_object(DevelopmentConfig)

    # Set allowed resources for Cross Origin Requests (webhooks mainly)
    CORS(app, resources={r"/api/*": {"origins": ["http://localhost:8080/"]}})

    # Initialize Flask-SQLAlchemy
    migrate = Migrate()

    from docsign.db_model import db

    db.init_app(app)
    migrate.init_app(app, db)

    with app.app_context():
        db.create_all()
        
        # apply the blueprints to the app
        from docsign.views import api

        app.register_blueprint(api.bp)

        # App is behind one proxy that sets the -For and -Host headers.
        # return ProxyFix(app, x_for=1, x_host=1)
        return app
