from flask import request, jsonify, url_for
from config import app
from models import *
from blueprints.reminder import reminder
from flask_jwt_extended import create_access_token, unset_jwt_cookies, jwt_required, get_jwt_identity
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
            access_token = create_access_token(identity=(email, password, current_user.user_info['userId']))
            return jsonify({"access_token": access_token}), 200
        
        return jsonify({"msg": "User not found"}), 401
    else:
        return jsonify({"msg": "Unknow action"}), 404

@app.route("/get", methods=["GET"])
@jwt_required()
def get_data():
    email, password, user_Id = get_jwt_identity()
    current_user = user(email, password)
    current_user.load()

    if current_user.signed:
        # try to load event
        current_event = Event(user_Id)
        msg, status = current_event.load()

        if status == 200:
            event_data = current_event.data
        else:
            event_data = msg

        # try to load deadline
        current_deadline = Deadline(user_Id)
        msg, status = current_deadline.load()

        if status == 200:
            deadline_data = current_deadline.data
        else:
            deadline_data = msg

        # try to load Activity data
        current_activity = Activity(user_Id)
        msg, status = current_activity.load()

        if status == 200:
            activity_data = current_activity.data
        else:
            activity_data = msg

        # try to load Goal data
        current_goal = Goal(user_Id)
        msg, status = current_goal.load()

        if status == 200:
            goal_data = current_goal.data
        else:
            goal_data = msg

        # dump all out
        return jsonify({
                    "user_info": current_user.user_info,
                    "event": event_data,
                    "deadline": deadline_data,
                    "activity": activity_data,
                    "goal": goal_data
                    }), 200
    
    return jsonify({"msg": "User not found"}), 401

@app.route("/user/get", methods=["GET"])
@jwt_required()
def get_user_data():
    email, password, user_Id = get_jwt_identity()
    current_user = user(email, password)
    current_user.load()

    if current_user.signed:
        return jsonify({"user_info": current_user.user_info}), 200
    return jsonify({"msg": "User not found"}), 401

@app.route('/user/update', methods =["PATCH"])
@jwt_required()
def update():
    try:
        data = request.json
    except Exception as e:
        return jsonify({"msg": e.message}), 404
    
    email, password, user_Id = get_jwt_identity()
    current_user = user(email, password)

    msg, status = current_user.update(**data)

    return jsonify({"msg": msg}), status

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
            access_token = create_access_token(identity=(email, password, new_user.user_info['userId']))
            return jsonify({"access_token": access_token}), 200
        return jsonify({"msg": msg}), status

@app.route("/user/logout", methods =['POST'])
@jwt_required()
def logout():
    response = jsonify({"msg": "See you again"})
    unset_jwt_cookies(response)
    return response, 200

if __name__ == '__main__':
    app.run()