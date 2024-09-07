from flask import render_template_string,jsonify,request
from flask_login import LoginManager
from flask_security.utils import login_user
from flask_security import login_required
from extn import sd
def create_view(app):
    @app.route('/',methods=['POST'])
    def login():
        if request.method=='POST':
            email = request.json['email']
            password = request.json['password']
            data=sd.show_admin(email)
            if data and sd.verify_admin(data[1], password):
                login_user(data)
            return jsonify({
                "message": "Logged in successfully",
                "email": str(data[3])
            }), 200
        return jsonify({"message": "Invalid credentials"}), 400
    @app.route('/admin/name/<aid>')
    def adname(aid):
        data=sd.show_with_id(aid)
        return jsonify({'name':str(data[2])}),200
    @app.route('/admin/register',methods=['POST'])
    def adreg():
        email = request.json['email']
        password = request.json['password']
        name = request.json['name']
        data=[password,name,email]
        res=sd.create_admin(data)
        if res:
            return jsonify({"message":"registered succesfully"}),200
        else:
            return jsonify({"message":"some error has occured"})