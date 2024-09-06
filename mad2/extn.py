"""from flask_sqlalchemy import SQLAlchemy
from flask_security import Security
db=SQLAlchemy()
sec=Security()"""
import sqlite3
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

