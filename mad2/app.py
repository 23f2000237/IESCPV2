from flask import Flask
import views
from flask_cors import CORS
"""from models import Admin,Influencer
from extn import db,sec
from cid import cd"""
def create_app():
    app=Flask(__name__)
    CORS(app)
    """db.init_app(app)"""
    """app.config['SECRET_KEY']="key_123"
    app.config['SQLALCHEMY_DATABASE_URI']="sqlite3://baknd.db"
    app.config['SECURITY_PASSWORD_SALT']='salt123'"""
    """with app.context():
        from models import admin,Influencer
        from flask_security import SQLALCHEMYUserDatastore
        user_datastore=SQLALCHEMYUserDatastore(db,admin,Influencer)
        sec.init_app(app,user_datastore)
        db.create_all()
        cd(user_datastore)"""

    views.create_view(app)
    return app
if __name__=='__main__':
    app=create_app()
    app.run(debug=True)