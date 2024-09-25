from flask import request, jsonify, url_for, session, render_template, redirect
from config import app
from models import *
from blueprints.reminder import reminder
from flask_jwt_extended import create_access_token, unset_jwt_cookies, jwt_required
from markupsafe import escape
app.register_blueprint(reminder, prefix='/reminder')

@app.route('/login', methods =['POST'])
def login():
    data = request.json
    if all((x in data for x in ('email','password'))):

        email = data.get('email')
        password = data.get('password')

        current_user = user(email, password)
        current_user.load()

        if current_user.signed:
            identity = str(email) + str(password)
            access_token = create_access_token(identity=identity)

            session[access_token] = current_user.user_info

            return jsonify({"access_token": access_token}), 200
        return jsonify({"message": "User not found"}), 401
    else:
        return jsonify({"message": "Unknow action"}), 404

@app.route("/get", methods=["GET"])
@jwt_required()
def get_user_data():
    token = str(request.headers.get("Authorization")).split(" ")[1]
    print(token)
    if not session.get(token):
        return jsonify({"message": "Plz login first"}), 404
    
    return jsonify({"user_info": session[token]}), 200

@app.route('/update', methods =["PATCH"])
def update():
    if not session.get("loggedin"):
        return jsonify({"message": "Plz login first"}), 404
    try:
        data = request.json
    except Exception as e:
        return jsonify({"message": e.message}), 404
    
    current_user = user(session['user']['email'], session['user']['password'])
    msg, status = current_user.update(**data)

    if status == 200:
        session["user"] = current_user.user_info

    return jsonify({"message": msg}), status

@app.route('/register', methods =['POST'])
def register():
    data = request.json
    if all((x in data for x in ('email', 'password', 'name', 'mobile', 'regionId', 'birth', 'gender'))):
        email = data.get('email')
        password = data.get('password')
        name = data.get('name')
        mobile = data.get('mobile')
        regionId = data.get('regionId')
        birth = data.get('birth')
        gender = data.get('gender')

        new_user = user()
        msg, status = new_user.register(email=email, password=password, name=name, mobile=mobile, regionId=regionId, birth=birth, gender=gender)
        if status == 200:
            session["loggedin"] = True
            session["user"] = new_user.user_info
        return jsonify({"message": msg}), status

@app.route("/<token>/logout", methods =['POST'])
def logout(token):
    session.pop(escape(token), None)
    response = jsonify({"message": "See you again"})
    unset_jwt_cookies(response)
    return response, 200

if __name__ == '__main__':
    app.run()