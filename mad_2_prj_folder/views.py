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
    @app.route('/')
    def home():
        return render_template('index.html')