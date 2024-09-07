from flask import Flask
import views
from flask_cors import CORS
from flask_security import Security
from extn import sd,CustomLoginForm
"""from models import Admin,Influencer
from extn import db,sec
from cid import cd"""
def create_app():
    app=Flask(__name__)
    CORS(app)
    app.config['SECRET_KEY']="key_123"
    app.config['SECURITY_PASSWORD_SALT']='salt123'
    """with app.context():
        from models import admin,Influencer
        from flask_security import SQLALCHEMYUserDatastore
        user_datastore=SQLALCHEMYUserDatastore(db,admin,Influencer)
        sec.init_app(app,user_datastore)
        db.create_all()
        cd(user_datastore)"""
    sec=Security(app,sd,login_form=CustomLoginForm)
    views.create_view(app)
    return app
if __name__=='__main__':
    app=create_app()
    app.run(debug=True)