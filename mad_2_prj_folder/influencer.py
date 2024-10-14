from flask_restful import Resource,Api,fields,reqparse,marshal_with
from flask_security import auth_required
from extn import db
from views import cur,conn,current_user
from flask import jsonify
ipi=Api(prefix='/api')
parser=reqparse.RequestParser()
parser.add_argument("email",type=str)
parser.add_argument("category",type=str)
parser.add_argument("Niche",type=str)
parser.add_argument("Reach",type=int)
parser.add_argument("Balance",type=int)
parser.add_argument("Flag",type=str)
parser.add_argument("site",type=str)
parser.add_argument("name",type=str)
inf_fields={
    "name":fields.String,
    "email":fields.String,
    "category":fields.String,
    "Niche":fields.String,
    "Reach":fields.Integer,
    "Balance":fields.Integer,
    "Flag":fields.String,
    "site":fields.String
}

class Influencer(Resource):
    @auth_required()
    def get(self):
        role=current_user.roles[0].name
        #what does each user need?
        #Influencer needs to see theirs data and their friends data, deal with it afterwards
        if role=='Inf':
            email=current_user.email
            name=current_user.name
            q='select * from Influencer where email="{}"'.format(email)
            cur.execute(q)
            info=cur.fetchone()
            cat=info[1]
            nic=info[2]
            reach=info[3]
            bal=info[4]
            flag=info[5]
            site=info[6]
            inf_data=jsonify({"email":email,"category":cat,"Niche":nic,"Reach":reach,"Balance":bal,"Flag":flag,"site":site,"name":name,"role":role})
            return inf_data
        elif role=='Admin':
            q1='select name,i.email,Category,Niche,Reach,Balance,Flag,site from user u,Influencer i where i.email=u.email'
            cur.execute(q1)
            info=cur.fetchall()
            return info,'200'
    @auth_required()
    def put(self):
        role=current_user.roles[0].name
        if role=='Inf':
            #Influencer can edit their email,name,category,reach,site
            #they can't edit their balance and flag
            email=current_user.email
            args=parser.parse_args()
            for i in inf_fields:
                if i=="Reach":
                    q='update Influencer set Reach={r} where email="{e}"'.format(r=args[i],e=email)
                    cur.execute(q)
                    conn.commit()
                elif i=='name':
                    cur_email=current_user.email
                    q='update user set name="{v}" where email="{e}"'.format(v=args[i],e=cur_email)
                    cur.execute(q)
                    conn.commit()
                elif i=='email':
                    q="update Influencer set email='{ne}' where email='{e}'".format(e=email,ne=args[i])
                    q2="update user set email='{ne}' where email='{e}'".format(e=email,ne=args[i])
                    cur.execute(q)
                    conn.commit()
                    cur.execute(q2)
                    conn.commit()
                else:
                    q="update Influencer set {i}='{val}' where email='{e}'".format(i=i,val=args[i],e=email)
                    cur.execute(q)
                    conn.commit()
            return {"Message":"Updated Succesfully"},'200'
        elif role=='Admin':
            #Admin can flag or unflag an Influencer
            d={"True":"False","False":"True"} #this dictionary will be used so that admin can flip the flag of the influencer
            args=parser.parse_args()
            flag=args['Flag']
            email=args['email']
            q="update Influencer set Flag='{f}' where email='{e}'".format(f=d[flag],e=email)#This only flags the user, the can still login to the app
            cur.execute(q)
            conn.commit()
            return {"Message":"Updated Succesfully"},'200'

ipi.add_resource(Influencer,'/inf')