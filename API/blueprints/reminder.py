from flask import Blueprint, request, jsonify, session
from models import *
from flask_jwt_extended import jwt_required, get_jwt_identity

reminder = Blueprint('reminder', __name__, url_prefix="/reminder")
@reminder.route('/')
@reminder.route('/load', methods =['GET']) # load all event, deadline, ...
@jwt_required()
def get_all_reminder():
    # try to load event
    
    email, password, user_Id = get_jwt_identity()
    current_event = Event(user_Id)
    msg, status = current_event.load()

    if status != 200:
        return jsonify({"message": msg}), status
    
    # try to load deadline
    current_deadline = Deadline(user_Id)
    msg, status = current_deadline.load()

    if status != 200:
        return jsonify({"message": msg}), status

    # try to load Activity data
    current_activity = Activity(user_Id)
    msg, status = current_activity.load()

    if status != 200:
        return jsonify({"message": msg}), status

    # try to load Goal data
    current_goal = Goal(user_Id)
    msg, status = current_goal.load()

    if status != 200:
        return jsonify({"message": msg}), status

    # dump all out
    return jsonify({"event": current_event.data,
                    "deadline": current_deadline.data,
                    "activity": current_activity.data,
                    "goal": current_goal.data}), 200
    
################################################
############        Events       ###############
################################################

@reminder.route('/event/create', methods =['POST'])
def create_event():
    if not session.get("loggedin"):
        return jsonify({"message": "Please login first"}), 404
    
    try:
        data = request.json
    except Exception as e:
        return jsonify({"error": e.message}), 404
    
    if all((x in data for x in ('eventName' ,'dayStarted' ,'dayEnd' ,'repeated' ,'color'))):
        eventName = data.get('eventName')
        dayStarted = data.get('dayStarted')
        dayEnd = data.get('dayEnd')
        repeated = data.get('repeated')
        color = data.get('color')

        new_event = Event(session['user']['userId'])
        msg, status = new_event.create_event(event_name=eventName, start_date=dayStarted, end_date=dayEnd, repeated=repeated, color=color)
        return jsonify({"message": msg}), status
    
    return jsonify({"message": "Unknow Action"}), 400


@reminder.route('/event/update', methods =['PATCH'])
def update_event():
    if not session.get("loggedin"):
        return jsonify({"message": "Please login first"}), 404
    
    try:
        data = request.json
    except Exception as e:
        return jsonify({"error": e.message}), 404
    
    current_event = Event(session['user']['userId'])
    current_event.load()
    try:
        msg, status = current_event.update_event(**data)
    except Exception as e:
        return jsonify({"error": e.message}), 400
    
    if status == 200:
        session["event"] = current_event.data
    
    return jsonify({"message": msg}), status

@reminder.route('/event/delete', methods =['DELETE'])
def delete_event():
    if not session.get("loggedin"):
        return jsonify({"message": "Please login first"}), 404
    
    try:
        data = request.json
    except Exception as e:
        return jsonify({"error": e.message}), 404
    if all((x in data for x in ('eventId' ,'eventName'))):
        eventId = data.get('eventId')
        eventName = data.get('eventName')
        
        event = Event(session["user"]["userId"])
        try:
            msg, status = event.delete(eventId, eventName)
            return jsonify({"message": msg}), status
        except Exception as e:
            return jsonify({"error": e.message}), 404

################################################
###########        Deadline       ##############
################################################

@reminder.route('/deadline/create', methods =['POST'])
def create_deadline():
    if not session.get("loggedin"):
        return jsonify({"message": "Please login first"}), 404
    
    try:
        data = request.json
    except Exception as e:
        return jsonify({"error": e.message}), 404
    
    if all((x in data for x in ('deadlineName', 'timeEnd', 'color'))):
        deadlineName = data.get('deadlineName')
        timeEnd = data.get('timeEnd')
        color = data.get('color')

        new_deadline = Deadline(session['user']['userId'])
        msg, status = new_deadline.create_deadline(deadline_name=deadlineName, end_time=timeEnd, color=color)
        return jsonify({"message": msg}), status
    
    return jsonify({"message": "Unknow Action"}), 400


@reminder.route('/deadline/update', methods =['PATCH'])
def update_deadline():
    if not session.get("loggedin"):
        return jsonify({"message": "Please login first"}), 404
    
    try:
        data = request.json
    except Exception as e:
        return jsonify({"error": e.message}), 404
    
    current_deadline = Deadline(session['user']['userId'])
    current_deadline.load()
    try:
        msg, status = current_deadline.update_deadline(**data)
    except Exception as e:
        return jsonify({"error": e.message}), 400
    
    if status == 200:
        session["deadline"] = current_deadline.data
    
    return jsonify({"message": msg}), status

@reminder.route('/deadline/delete', methods =['DELETE'])
def delete_deadline():
    if not session.get("loggedin"):
        return jsonify({"message": "Please login first"}), 404
    
    try:
        data = request.json
    except Exception as e:
        return jsonify({"error": e.message}), 404
    if all((x in data for x in ('deadlineId' ,'deadlineName'))):
        deadlineId = data.get('deadlineId')
        deadlineName = data.get('deadlineName')
        
        deadline = Deadline(session["user"]["userId"])
        try:
            msg, status = deadline.delete(deadlineId, deadlineName)
            return jsonify({"message": msg}), status
        except Exception as e:
            return jsonify({"error": e.message}), 404

################################################
###########        Activity       ##############
################################################


@reminder.route('/activity/create', methods =['POST'])
def create_activity():
    if not session.get("loggedin"):
        return jsonify({"message": "Please login first"}), 404
    
    try:
        data = request.json
    except Exception as e:
        return jsonify({"error": e.message}), 404
    
    if all((x in data for x in ('activityName' ,'timeStarted' ,'timeEnd' ,'repeated' ,'color'))):
        activityName = data.get('activityName')
        timeStarted = data.get('timeStarted')
        timeEnd = data.get('timeEnd')
        repeated = data.get('repeated')
        color = data.get('color')

        new_activity = Activity(session['user']['userId'])
        msg, status = new_activity.create_activity(activityName=activityName, timeStarted=timeStarted, timeEnd=timeEnd, repeated=repeated, color=color)
        return jsonify({"message": msg}), status
    
    return jsonify({"message": "Unknow Action"}), 400


@reminder.route('/activity/update', methods =['PATCH'])
def update_activity():
    if not session.get("loggedin"):
        return jsonify({"message": "Please login first"}), 404
    
    try:
        data = request.json
    except Exception as e:
        return jsonify({"error": e.message}), 404
    
    current_activity = Activity(session['user']['userId'])
    current_activity.load()
    try:
        msg, status = current_activity.update_activity(**data)
    except Exception as e:
        return jsonify({"error": e.message}), 400
    
    if status == 200:
        session["activity"] = current_activity.data
    
    return jsonify({"message": msg}), status

@reminder.route('/activity/delete', methods =['DELETE'])
def delete_activity():
    if not session.get("loggedin"):
        return jsonify({"message": "Please login first"}), 404
    
    try:
        data = request.json
    except Exception as e:
        return jsonify({"error": e.message}), 404
    if all((x in data for x in ('activityId' ,'activityName'))):
        activityId = data.get('activityId')
        activityName = data.get('activityName')
        
        activity = Activity(session["user"]["userId"])
        try:
            msg, status = activity.delete(activityId, activityName)
            return jsonify({"message": msg}), status
        except Exception as e:
            return jsonify({"error": e.message}), 404
        

################################################
#############        Goal       ################
################################################

@reminder.route('/goal/create', methods =['POST'])
def create_goal():
    if not session.get("loggedin"):
        return jsonify({"message": "Please login first"}), 404
    
    try:
        data = request.json
    except Exception as e:
        return jsonify({"error": e.message}), 404
    
    if all((x in data for x in ('goalName' ,'timeStarted' ,'unitsOfTime' ,'repeated' ,'color'))):
        goalName = data.get('goalName')
        timeStarted = data.get('timeStarted')
        unitsOfTime = data.get('unitsOfTime')
        repeated = data.get('repeated')
        color = data.get('color')

        new_goal = Goal(session['user']['userId'])
        msg, status = new_goal.create_goal(goalName=goalName, timeStarted=timeStarted, unitsOfTime=unitsOfTime, repeated=repeated, color=color)
        return jsonify({"message": msg}), status
    
    return jsonify({"message": "Unknow Action"}), 400


@reminder.route('/goal/update', methods =['PATCH'])
def update_goal():
    if not session.get("loggedin"):
        return jsonify({"message": "Please login first"}), 404
    
    try:
        data = request.json
    except Exception as e:
        return jsonify({"error": e.message}), 404
    
    current_goal = Goal(session['user']['userId'])
    current_goal.load()
    try:
        msg, status = current_goal.update_goal(**data)
    except Exception as e:
        return jsonify({"error": e.message}), 400
    
    if status == 200:
        session["goal"] = current_goal.data
    
    return jsonify({"message": msg}), status

@reminder.route('/goal/delete', methods =['DELETE'])
def delete_goal():
    if not session.get("loggedin"):
        return jsonify({"message": "Please login first"}), 404
    
    try:
        data = request.json
    except Exception as e:
        return jsonify({"error": e.message}), 404
    if all((x in data for x in ('goalId' ,'goalName'))):
        goalId = data.get('goalId')
        goalName = data.get('goalName')
        
        goal = Goal(session["user"]["userId"])
        try:
            msg, status = goal.delete(goalId, goalName)
            return jsonify({"message": msg}), status
        except Exception as e:
            return jsonify({"error": e.message}), 404
        