from flask import Flask
from views import create_view
from extn import db,sec
from create_initial_data import create_data
def create_app():
    app=Flask(__name__)
    app.config['SECRET_KEY']="secret"
    app.config['SQLALCHEMY_DATABASE_URI']="sqlite:///baknd.db"
    app.config['SECURITY_PASSWORD_SALT']='salt'
    db.init_app(app)
    with app.app_context():
        from models import User,Role
        from flask_security import SQLAlchemyUserDatastore
        ud=SQLAlchemyUserDatastore(db,User,Role)
        sec.init_app(app,ud)
        db.create_all()
        create_data(ud)
    create_view(app)
    return app

if __name__=='__main__':
    app=create_app()
    app.run(debug=True)
