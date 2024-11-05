from flask import render_template,jsonify,request
from flask_security.utils import hash_password
from flask_security import login_required,roles_required,auth_required,current_user,roles_accepted,SQLAlchemyUserDatastore    
import sqlite3
from extn import db
conn=sqlite3.connect(r'instance\baknd.db',check_same_thread=False)
cur=conn.cursor()

def cor(l):
    r=[]
    for i in l:
        r.append(i[0])
    return r

def conv(data,r):
    #this is a function that takes in a list we got from cur.fetchall() and returns a list of dictionaries as it is easier to acces in js
    l=[]
    for i in data:
        d={}
        d['c_id']=i[0]
        d['s_email']=i[1]
        d['title']=i[2]
        d['message']=i[3]
        d['s_date']=i[4]
        d['e_date']=i[5]
        d['budget']=i[6]
        d['niche']=i[7]
        d['flag']=i[8]
        if len(i)>9:
            d['site']=i[9]
            d['name']=i[10]
        if i[0] in r:
             d['part']='true'
        else:
             d['part']='false'
        l.append(d)
    return l    

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
                 return (jsonify({"message":"User_exists"}),200)
        else:
            return (jsonify({"message":"Invalid"}),401)
        return ('success',200)
    
    @app.route('/profile')
    @login_required
    def profile():
         email=current_user.email
         name=current_user.name
         role=current_user.roles[0].name
         if role=='Inf':
              q="select Category,Niche,Reach,Balance,flag,site from Influencer where email='{}'".format(email)
              cur.execute(q)
              cat,nic,reach,bal,flag,site=cur.fetchone()
              q2="select * from Campaigns where Niche in ('Public','{}')".format(nic)
              cur.execute(q2)
              camp=cur.fetchall()
              return jsonify({"email":email,"name":name,"cat":cat,"nic":nic,"reach":reach,"bal":bal,"flag":flag,"site":site,"role":role,"camps":camp}),200
         elif role=='Spons':
              q="select Industry,Flag,site from Sponsor where email_id='{}'".format(email)
              cur.execute(q)
              ind,flag,site=cur.fetchone()
              return jsonify({"email":email,"name":name,"role":role,"ind":ind,"flag":flag,"site":site}),200
         else:
              q="select * from Campaigns"
              cur.execute(q)
              camp=cur.fetchall()
              q="select * from Ads"
              cur.execute(q)
              ads=cur.fetchall()
              q='select * from Sponsor'
              cur.execute(q)
              spons=cur.fetchall()
              q="select * from Influencer"
              cur.execute(q)
              inf=cur.fetchall()
              q='select name from user where email="{}"'.format(current_user.email)
              cur.execute(q)
              name=cur.fetchone()[0]
              return jsonify({"text":"under construction. Admin's db should show some stats","name":name,"role":'Admin',"camps":camp,"Ads":ads,"spons":spons,"inf":inf}),200
    @app.route('/inf/spons/<cid>',methods=['POST','GET'])
    @roles_required('Spons')
    def inf_spons(cid):
        q1="select Niche from Campaigns where C_id={}".format(cid)
        cur.execute(q1)
        Nic=cur.fetchone()[0]
        if Nic=='public':
            q="select name,u.email from user u,Influencer i where i.email=u.email and Flag='True'"
        else:
            q="select name,u.email from user u,Influencer i where i.email=u.email and (Flag='True' and Niche ={})".format(Nic)
        cur.execute(q)
        dt=cur.fetchall()
        l=[]
        for i in dt:
             d={}
             d['name']=i[0]
             d['email']=i[1]
             l.append(d)
        return l,'200'
    @app.route('/aretheyloggedin')
    def logged_in():
         if current_user.is_authenticated:
              return jsonify({"message":"yes"})
         else:
              return jsonify({"message":"no"})
    @app.route('/search')
    def search():
         role=current_user.roles[0].name
         if role=='Inf':
              em=current_user.email
              #Influencer can search for all eligible campaigns that are running 
              q_nic="select Niche from Influencer where email='{}'".format(em)
              cur.execute(q_nic)
              nic=cur.fetchone()[0]
              q="select C_id,c.s_email,Title,Message,S_date,E_date,Budget,Niche,c.Flag,s.site,u.name from Campaigns c, Sponsor s,user u  where ((c.s_email=u.email and u.email=s.email_id) and (Niche='{}' or Niche='public')) and (c.Flag='True')".format(nic)
              cur.execute(q)
              l=cur.fetchall()
              #Let's add another attribute specifying if the influencer is already part of the campaign
              q_cid="select C_id from Ads where I_email='{}'".format(em)
              cur.execute(q_cid)
              cid=cor(cur.fetchall())
              res=conv(l,cid)
              return {"res":res,"role":role,"email":em},'200'
         elif role=='Spons':
              print('here')
              return '200'