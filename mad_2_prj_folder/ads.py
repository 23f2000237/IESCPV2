from flask_restful import Resource,Api,fields,reqparse,marshal_with
from flask_security import auth_required
from models import Campaigns
from extn import db
from views import cur,conn,current_user
adpi=Api(prefix='/api')
parser=reqparse.RequestParser()


parser.add_argument('A_id', type=int)
parser.add_argument('C_id', type=int)
parser.add_argument('I_email', type=str)
parser.add_argument('title', type=str)
parser.add_argument('Title', type=str)
parser.add_argument('Message', type=str)
parser.add_argument('Flag', type=str)
parser.add_argument('Status', type=str)
parser.add_argument('salary', type=int)
parser.add_argument('Salary', type=int)
parser.add_argument('Negotiated', type=int)
parser.add_argument('bud', type=int)
parser.add_argument('cham', type=bool)
parser.add_argument('chat', type=bool)
advert_fields={
    "A_id":fields.Integer,
    "C_id":fields.Integer,
    "I_email":fields.String,
    "title":fields.String,
    "Message":fields.String,
    "salary":fields.Integer,
    "Status":fields.String,
    "Flag":fields.String,
    "Negotiated":fields.Integer
}

def upd(A_id,field,val):
    q="update Ads set {field}='{val}' where A_id={aid}".format(field=field,val=val,aid=A_id)
    cur.execute(q)
    conn.commit()
def fn(l):
    data=[]
    for i in l:
        d={}
        d['A_id']=i[0]
        d['C_id']=i[1]
        d['I_email']=i[2]
        d['Title']=i[3]
        d['Message']=i[4]
        d['Flag']=i[5]
        d['Status']=i[6]
        d['Salary']=i[7]
        d['Negotiated']=i[8]
        data.append(d)
    return data

class ads(Resource):
    @auth_required()
    def get(self):
        role=current_user.roles[0].name
        if role=='Spons':
            q="select * from Ads where C_id in (select C_id from Campaigns where s_email='{}')".format(current_user.email)
            cur.execute(q)
            ads_of_sponsor=fn(cur.fetchall()) #all the ads of the sponsor
            return ads_of_sponsor,200
        elif role=='Inf':
            q="select * from Ads where I_email='{}'".format(current_user.email)
            cur.execute(q)
            ads=cur.fetchall()#contains the ads the influencer has been a part of
            flagged_ads,un_flagged_ads=[],[]
            for i in ads:
                if i[5]=='true':
                    un_flagged_ads.append(i)
                else:
                    flagged_ads.append(i)
            #for ads shown to Influencer who are not part of 
            q="select * from Ads where C_id in (select C_id from Ads where I_email<>'{email}' and C_id in (select C_id from Campaigns where Niche='Public' or Niche in (select Niche from Influencer where I_email='{email}')))".format(email=current_user.email)
            cur.execute(q)
            ads_Influ_not_partof=cur.fetchall()
            return {"flagged_ads":flagged_ads,"un_flagged_ads":un_flagged_ads,"ads_Influ_not_partof":ads_Influ_not_partof},200
        elif role=='Admin':
            q="select * from Ads"
            cur.execute(q)
            ads=cur.fetchall()
            flagged_ads,un_flagged_ads=[],[]
            for i in ads:
                if i[5]=='true':
                    un_flagged_ads.append(i)
                else:
                    flagged_ads.append(i)
            return {"flagged_ads":flagged_ads,"un_flagged_ads":un_flagged_ads},200 #Admin can see every advertisment 

    
    @auth_required()
    def post(self):
        args=parser.parse_args()
        q="insert into Ads(C_id,I_email,title,Message,Salary,Status,Negotiated) values({cid},'{I_email}','{title}','{message}',{salary},'{status}',{neg})".format(cid=args.C_id,I_email=args.I_email,title=args.title,message=args.Message,salary=args.salary,neg=args.Negotiated,status=args.Status)
        cur.execute(q)
        conn.commit()
        return {"Message":"Ad Added"},200
    
    @auth_required()
    def delete(self):
        args=parser.parse_args()
        q="delete from Ads where A_id={}".format(args.A_id)
        cur.execute(q)
        conn.commit()
        return {"Message":"Ad deleted"},200
    
    @auth_required()
    def put(self):
        args=parser.parse_args()
        role=current_user.roles[0].name
        if role== 'Admin':
            #admin can possible only flag or unflag the campaign.
            q='update Ads set Flag="{flag}" where A_id={aid}'.format(aid=args.A_id,flag=args.Flag)
            cur.execute(q)
            conn.commit()
        elif role=='Inf':
            #influ can change Pending to either Negotiated or Paid and only one of them will be sent to the server
            upd(args.A_id,'Status',args.Status)
            upd(args.A_id,'Negotiated',args.Negotiated)
        elif role=='Spons':
            #sponsor can change the Status to Pending ,Negotiated(the negotiated salary) and the Salary(once the satus is Either Negotiated or paid)
            upd(args.A_id,'Status',args.Status)
            upd(args.A_id,'Negotiated',args.Negotiated)
            if (args.Salary)!=0:
                #print(args.salary)
                q="update Campaigns set Budget={bud} where C_id={cid}".format(bud=args.bud,cid=args.C_id) #budget of the campaign will change only if salary is fixed
                upd(args.A_id,'Salary',args.Salary)
                cur.execute(q)
                conn.commit()
            if(args.cham):
                q="update Ads set Message='{msg}' where A_id={aid}".format(aid=args.A_id,msg=args.Message)
                cur.execute(q)
                conn.commit()
            if(args.chat):
                q="update Ads set Title='{title}' where A_id={aid}".format(aid=args.A_id,title=args.Title)
                cur.execute(q)
                conn.commit()
        return {"Message":"Ad Updated"},200


adpi.add_resource(ads,'/ads')
