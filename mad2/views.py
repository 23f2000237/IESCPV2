from flask import render_template_string,jsonify
from extn import conn,cur,fet,pst

def create_view(app):
    @app.route('/')
    def home():
        return jsonify({'testing jsonify within views': 'oh yeah baby!'})
    @app.route('/admin/name/<aid>')
    def infname(aid):
        q="select name from Admin where A_id={}".format(aid)
        data=fet(q)
        return jsonify({'name':str(data[0][0])}),200
        
