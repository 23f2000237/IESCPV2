from flask import Flask
import views
from extn import db,security
from cid import cd
def create_app():
    app=Flask(__name__)
    app.config['SECRET_KEY']="key_123"
    app.config['SQLALCHEMY_DATABASE_URI']="sqlite3://baknd.db"
    app.config['SECURITY_PASSWORD_SALT']='salt123'
    db.init_app(app)
    with app.context():
        from models import admin,Influencer
        from flask_security import SQLALCHEMYUserDatastore
        user_datastore=SQLALCHEMYUserDatastore(db,admin,Influencer)
        security.init_app(app,user_datastore)
        db.create_all()
        cd(user_datastore)

    views.create_view(app)
    return app
if __name__=='__main__':
    app=create_app()
    app.run(debug=True)