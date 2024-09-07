from flask_sqlalchemy import SQLAlchemy
from flask_security import Security,UserMixin, RoleMixin, LoginForm,login_user
from cid import usd
class CustomLoginForm(LoginForm):
    def validate(self):
        email = self.email.data
        password = self.password.data
        user = usd.show_admin(email)
        if user and usd.verify_admin(user['password'], password):
            login_user(user)  # Manually log in the user
            return True
        return False
sd=usd()


"""import sqlite3
conn=sqlite3.connect('baknd.db',check_same_thread=False)
cur=conn.cursor()

def fet(q):
    cur.execute(q)
    r=cur.fetchall()
    return r

def pst(q):
    cur.execute(q)
    conn.commit()
    return ('Success',200)

"""