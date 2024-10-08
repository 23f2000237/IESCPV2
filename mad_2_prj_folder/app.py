from flask import Flask
from views import create_view
from extn import db,sec
from create_initial_data import create_data
from campaigns import api
from ads import adpi
from influencer import ipi
from sponsor import spi
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
    app.config['WTF_CSRF_CHECK_DEFAULT']=False
    app.config["SECURITY_CSRF_PROTECH_MECHANISMS"]=[]
    app.config["SECURITY_CSRF_IGNORE_UNAUTH_ENDPOINTS"]=True
    create_view(app,ud)
    api.init_app(app)
    adpi.init_app(app)
    ipi.init_app(app)
    spi.init_app(app)
    return app

if __name__=='__main__':
    app=create_app()
    app.run(debug=True)
