from extn import db
from flask_security import UserMixin,RoleMixin 
from flask_security.models import fsqla_v3 as fsq
fsq.FsModels.set_db_info(db)

class admin(db.Model,UserMixin):
    a_id=db.column(db.Integer,primary_key=True)
    name=db.column(db.String,nullable=False)
    email=db.column(db.String,nullable=False,unique=True)
    passwd=db.column(db.String,nullable=False)
    fs_uniquifier = db.Column(db.String(65), unique = True, nullable = False)

class Influencer(db.model,UserMixin):
    I_id=db.column(db.Integer,primary_key=True)
    name=db.column(db.String,nullable=False)
    passwd=db.column(db.String,nullable=False)
    cat=db.column(db.String,nullable=False)
    nic=db.column(db.String,nullable=False)
    Reach=db.column(db.Integer,nullable=False)
    Bal=db.column(db.Integer,nullable=False)
    flag=db.column(db.String,nullable=False)
    email=db.column(db.String,nullable=False,unique=True)
    fs_uniquifier = db.Column(db.String(65), unique = True, nullable = False)
