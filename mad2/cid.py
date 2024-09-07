import sqlite3
from werkzeug.security import generate_password_hash, check_password_hash
class usd:
    def __init__(self):
        self.conn=sqlite3.connect('baknd.db',check_same_thread=False)
        self.cur=self.conn.cursor()
    def create_admin(self,data):
        #currently testing with only admin table
        pwd=generate_password_hash(data[0])
        name=data[1]
        email=data[2]
        q='insert into Admin(Password,Name,Email) values("{pwd}","{name}","{email}")'.format(pwd=pwd,name=name,email=email)
        self.cur.execute(q)
        self.conn.commit()
        return True
    def show_admin(self,email):
        q="select * from Admin where Email='{}'".format(email)
        self.cur.execute(q)
        return self.cur.fetchone()
    def show_with_id(self,id):
        q="select * from Admin where A_id={}".format(id)
        self.cur.execute(q)
        return self.cur.fetchone()
    def upd_admin(self,id,name):
        q='update Admin set Name="{name}" where A_id={id}'.format(name=name,id=id)
        self.cur.execute(q)
        self.conn.commit()
        return 'success'
    def verify_admin(self,stored_pwd,given_pwd):
        check_password_hash(stored_pwd, given_pwd)
    # we don't delete admin because we have only one.