from flask import render_template
from flask_security import login_required,roles_required,auth_required,current_user,roles_accepted
import sqlite3
conn=sqlite3.connect(r'instance\baknd.db')
cur=conn.cursor()
def create_view(app):
    @app.route('/admin/home/<id>')
    @roles_required('Admin')
    def adhome(id):
        
        cur.execute('select name from user where id=1')
        name=cur.fetchone()
        return name[0]
    @app.route('/home')
    @login_required
    def home():
        email=current_user.email
        role=current_user.roles
        r_name=role[0].name
        print(r_name)
        nae=current_user.name
        if r_name=='Inf':
            return 'Ah!!! An Influencer! Welcome'+nae
        else:
            return 'Ah!!! A Sponsor! Welcome'+nae