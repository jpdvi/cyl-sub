import os
from flask_sqlalchemy import SQLAlchemy


def create_app():
    """Initializes application"""

    # Imports must be inline
    from .extensions import application, db
    from .commands import register_commands
    import app.api
    import app.data

    application.config["SQLALCHEMY_DATABASE_URI"] = os.getenv("SQLALCHEMY_DATABASE_URI")
    application.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

    db.init_app(application)

    register_commands(application)

    return application
