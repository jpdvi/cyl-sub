from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS

application = Flask(__name__, instance_relative_config=True)
CORS(application)
db = SQLAlchemy(session_options={"autocommit": False, "autoflush": False})
migrate = Migrate(application, db)
