from flask import render_template,jsonify,request
from flask_security.utils import hash_password
from flask_security import login_required,roles_required,auth_required,current_user,roles_accepted,SQLAlchemyUserDatastore    
import sqlite3
from extn import db
conn=sqlite3.connect(r'instance\baknd.db',check_same_thread=False)
cur=conn.cursor()
def create_view(app,ud:SQLAlchemyUserDatastore):
    @app.route('/')
    def home():
        return render_template('index.html')
    @app.route('/register',methods=['POST'])
    def register():
        data=request.json
        name=data['name']
        email=data['email']
        passwd=data['password']
        role=data['role']
        if role=='Inf':
            cat=data['Cat']
            nic=data['Nic']
            reach=int(data['reach'])
            act=True
            q="insert into Influencer(email_id,Category,Niche,Reach,Balance) values('{email}','{cat}','{nic}',{reach},0)".format(email=email,cat=cat,nic=nic,reach=reach)
        elif role=='Spons':
            ind=data['Ind']
            act=False
            q="insert into Sponsor(email_id,Industry) values('{email}','{ind}')".format(email=email,ind=ind)
        if (email and passwd) and role:
            if not ud.find_user(email=email):
                    ud.create_user(name=name,email=email,password=hash_password(passwd),roles=[role],active=act)
                    db.session.commit()
                    cur.execute(q)
                    conn.commit()
            else:
                 return (jsonify({"message":"User_exists"}),400)
        else:
            return (jsonify({"message":"Invalid"}),401)
        return ('success',200)