from flask import request, jsonify, url_for, session, render_template, redirect
from config import app
from models import *
from blueprints.reminder import reminder

app.register_blueprint(reminder, prefix='/reminder')

@app.route('/', methods=['GET', 'POST'])
def index():
    if not session.get("loggedin"):
        return redirect("/login")
    return redirect("/get")

@app.route('/login', methods =['POST'])
def login():
    if session.get("loggedin"):
        return jsonify({"message": "You Have Already login"}), 200
    
    data = request.json
    if all((x in data for x in ('email','password'))):

        email = data.get('email')
        password = data.get('password')

        current_user = user(email, password)
        current_user.load()

        if current_user.signed:

            session["loggedin"] = True
            session["user"] = current_user.user_info

            return jsonify({"message": "Login successfully"}), 200
        return jsonify({"message": "User not found"}), 404
    else:
        return jsonify({"message": "Unknow action"}), 404

@app.route("/user/get", methods=["GET"])
def get_user_data():
    if not session.get("loggedin"):
        return jsonify({"message": "Plz login first"}), 404
    return jsonify({"user_info": session["user"]}), 200

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

@app.route("/logout", methods =['POST'])
def logout():
    session.pop('loggedin', None)
    session.pop('user', None)
    return jsonify({"message": f"See you again"}), 200

if __name__ == '__main__':
    app.run()